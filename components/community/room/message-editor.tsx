import { useEffect, useRef, useState, useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { toast } from "sonner";
import {
  CirclePlay,
  FileText,
  ImageUp,
  Loader2,
  SendHorizonal,
  Smile,
  X,
  XIcon,
} from "lucide-react";
import { EmojiClickData, EmojiStyle } from "emoji-picker-react";
import { Link } from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";
import Image from "next/image";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { MessageAttachment, Message } from "@/lib/interface";
import { Textarea } from "@/components/ui/textarea";
import { useCreateMessage } from "@/hooks/messages/use-create-message";
import { MessageReply } from "@/components/community/room/message-reply";
import useGetMe from "@/hooks/auth/use-get-me";
import { useUploadFiles } from "@/hooks/files/use-upload-files";
import { FILE_TYPE } from "@/lib/enum";
import Hint from "@/components/shared/hint";
import { cn } from "@/lib/utils";

// Dynamically import EmojiPicker with no SSR
const DynamicEmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

interface MessageEditorProps {
  roomId: string;
  replyingState: {
    isReplying: boolean;
    message: Message | null;
  };
  setReplyingState: (state: {
    isReplying: boolean;
    message: Message | null;
  }) => void;
  editingState: {
    isEditing: boolean;
    message: Message | null;
  };
  setEditingState: (state: {
    isEditing: boolean;
    message: Message | null;
  }) => void;
  sendTypingStatus: () => void;
}

export const MessageEditor = ({
  roomId,
  replyingState,
  setReplyingState,
  editingState,
  setEditingState,
  sendTypingStatus,
}: MessageEditorProps) => {
  const { data: me } = useGetMe();
  const [mounted, setMounted] = useState(false);
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState<MessageAttachment[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { message: replyingMessage, isReplying } = replyingState;
  const { message: editingMessage, isEditing } = editingState;
  const { mutate: createMessage, isPending: isCreatingMessage } =
    useCreateMessage();
  const { mutate: uploadFiles, isPending: isUploadingFiles } = useUploadFiles();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isEditing && editingMessage?.content) {
      setContent(editingMessage.content);
    }
  }, [editingMessage, isEditing]);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      uploadFiles(
        {
          files: acceptedFiles,
          type: FILE_TYPE.MESSAGE,
        },
        {
          onSuccess: (newFiles) => {
            setAttachments((prev) => [...prev, ...newFiles]);
          },
          onError: (error) => {
            toast.error(`Lỗi khi tải lên file: ${error.message}`);
          },
        }
      );

      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    },
    [uploadFiles]
  );

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        const files: File[] = [];
        for (const item of Array.from(items)) {
          if (item.kind === "file") {
            const file = item.getAsFile();
            if (file) {
              files.push(file);
            }
          }
        }
        if (files.length > 0) {
          handleDrop(files);
        }
      }
    };

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener("paste", handlePaste);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("paste", handlePaste);
      }
    };
  }, [handleDrop]);

  const handleDropRejected = (fileRejections: FileRejection[]) => {
    const errors = fileRejections.map(({ file, errors }) => {
      return `${file.name} - ${errors
        .map((e: { message: string }) => e.message)
        .join(", ")}`;
    });
    toast.error(`Lỗi khi tải lên file: ${errors.join("\n")}`);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    onDropRejected: handleDropRejected,
    multiple: true,
    noClick: true,
  });

  const {
    getRootProps: getRootPropsAsClick,
    getInputProps: getInputPropsAsClick,
  } = useDropzone({
    onDrop: handleDrop,
    onDropRejected: handleDropRejected,
    multiple: true,
    noDrag: true,
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleEmojiClick = (e: EmojiClickData) => {
    setContent((prev) => prev + e.emoji);
  };
  useOnClickOutside(emojiPickerRef, () => setShowEmojiPicker(false));

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!content.trim() && attachments.length === 0) {
      toast.error("Vui lòng nhập nội dung tin nhắn hoặc đính kèm file");
      return;
    }

    createMessage(
      {
        roomId,
        createMessageParams: {
          content,
          attachments,
          parentMessageId:
            isReplying && replyingMessage ? replyingMessage.id : undefined,
        },
      },
      {
        onSuccess: () => {
          setContent("");
          setAttachments([]);
          setReplyingState({ isReplying: false, message: null });
          setShowEmojiPicker(false);
        },
        onError: (error) => {
          toast.error(`Có lỗi xảy ra khi gửi tin nhắn: ${error.message}`);
        },
      }
    );

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  if (!mounted) {
    return (
      <div className="space-y-2 py-2 px-5">
        <div className="flex items-center justify-between gap-5">
          <div className="relative flex-1 border rounded-xl">
            <Textarea
              placeholder="Nhập tin nhắn..."
              className="flex-grow resize-none overflow-auto min-h-10 max-h-52 h-fit"
              disabled
            />
          </div>
          <Button size="icon" disabled>
            <SendHorizonal />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 py-2 px-5">
      {isReplying && replyingMessage && (
        <MessageReply
          replyingMessage={replyingMessage}
          setReplyingState={setReplyingState}
          user={me}
        />
      )}
      {isEditing && (
        <div className="flex items-center justify-between">
          <p className="text-base">Chỉnh sửa tin nhắn</p>
          <Button
            variant="ghost"
            className="rounded-full"
            size="icon"
            onClick={() => {
              setEditingState({ isEditing: false, message: null });
              setContent("");
            }}
          >
            <X />
          </Button>
        </div>
      )}
      {attachments.length > 0 && (
        <div className="relative p-2 flex items-center gap-2">
          <div className="relative flex w-[350px] sm:w-[400px] md:w-[550px] xl:w-[680px] overflow-x-auto gap-2 p-2">
            <Hint label="Tải thêm files khác" duration={0}>
              <Button
                {...getRootPropsAsClick()}
                variant="outline"
                className="flex items-center justify-center rounded-lg size-[52px] cursor-pointer"
              >
                <input {...getInputPropsAsClick()} className="hidden" />
                <ImageUp className="text-foreground/40" size={40} />
              </Button>
            </Hint>
            {attachments.map((attachment, index) => (
              <div
                key={index}
                className={cn(
                  "relative h-[52px] w-[52px] flex-shrink-0 group",
                  attachment.mimetype.includes("application") && "w-[104px]"
                )}
              >
                <Hint label="Xóa ảnh">
                  <button
                    onClick={() =>
                      setAttachments(attachments.filter((_, i) => i !== index))
                    }
                    className="hidden group-hover:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-2 border-white items-center justify-center"
                  >
                    <XIcon className="size-3.5" />
                  </button>
                </Hint>
                {attachment.mimetype.includes("image") && (
                  <Image
                    src={attachment.url}
                    alt="uploaded"
                    fill
                    className="rounded-xl overflow-hidden border object-cover"
                  />
                )}
                {attachment.mimetype.includes("video") && (
                  <div className="relative h-full w-full">
                    <CirclePlay className="absolute top-0 z-10" />
                    <video
                      src={attachment.url}
                      controls
                      className="rounded-xl w-[52px] h-[52px] overflow-hidden border object-cover"
                    />
                  </div>
                )}
                {attachment.mimetype.includes("application") && (
                  <div className="flex items-center justify-center rounded-xl h-[52px] w-[104px] overflow-hidden border object-cover bg-accent px-1 gap-1">
                    <FileText size={32} />
                    <p className="text-xs truncate">{attachment.key}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          {...getRootProps()}
          className="flex items-center justify-between gap-5"
        >
          <div
            className={`relative flex-1 border border-dashed rounded-xl ${
              isDragActive ? "border-primary" : "border-muted"
            }`}
          >
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center z-10">
              <Button
                {...getRootPropsAsClick()}
                variant="ghost"
                size="icon"
                type="button"
              >
                <input {...getInputPropsAsClick()} className="hidden" />
                <Link className="text-muted-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile className="text-muted-foreground" />
              </Button>
              {showEmojiPicker && (
                <div
                  ref={emojiPickerRef}
                  className="absolute bottom-full right-0 mb-2"
                >
                  <DynamicEmojiPicker
                    emojiStyle={EmojiStyle.FACEBOOK}
                    onEmojiClick={handleEmojiClick}
                  />
                </div>
              )}
            </div>
            <input {...getInputProps()} />
            <Textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                sendTypingStatus();
              }}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              placeholder="Nhập tin nhắn..."
              autoFocus
              className="resize-none overflow-auto min-h-10 max-h-52 h-fit bg-transparent"
            />
          </div>
          <Button
            type="submit"
            disabled={
              content.trim() === "" &&
              attachments.length === 0 &&
              (isUploadingFiles || isCreatingMessage)
            }
            size="icon"
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreatingMessage ? (
              <Loader2 className="animate-spin" />
            ) : (
              <SendHorizonal />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
