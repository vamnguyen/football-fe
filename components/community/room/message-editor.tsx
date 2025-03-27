import { useEffect, useRef, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { toast } from "sonner";
import { SendHorizonal, Smile, X } from "lucide-react";
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";
import { Link } from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { MessageAttachment, Message } from "@/lib/interface";
import { Textarea } from "@/components/ui/textarea";
import { useCreateMessage } from "@/hooks/messages/use-create-message";
import { MessageReply } from "@/components/community/room/message-reply";
import useGetMe from "@/hooks/auth/use-get-me";

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
}

export const MessageEditor = ({
  roomId,
  replyingState,
  setReplyingState,
  editingState,
  setEditingState,
}: MessageEditorProps) => {
  const { data: me } = useGetMe();
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState<MessageAttachment[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { message: replyingMessage, isReplying } = replyingState;
  const { message: editingMessage, isEditing } = editingState;
  const { mutate: createMessage, isPending: isCreatingMessage } =
    useCreateMessage();

  useEffect(() => {
    if (isEditing && editingMessage?.content) {
      setContent(editingMessage.content);
    }
  }, [editingMessage, isEditing]);

  const handleDrop = (acceptedFiles: File[]) => {
    // TODO: Handle drop files

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

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

    createMessage({
      roomId,
      createMessageParams: {
        content,
        attachments,
        parentMessageId: undefined,
      },
    });
  };

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
          <p className="text-base">Edit message</p>
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

      <form onSubmit={handleSubmit}>
        <div
          {...getRootProps()}
          className="flex items-center justify-between gap-5"
        >
          <div
            className={`relative flex-1 border border-dashed rounded-xl ${
              isDragActive ? "border-primary" : "border-transparent"
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
                <Link />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile />
              </Button>
              {showEmojiPicker && (
                <div
                  ref={emojiPickerRef}
                  className="absolute bottom-full right-0 mb-2"
                >
                  <EmojiPicker
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
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              placeholder="Nhập tin nhắn..."
              autoFocus
              className="flex-grow resize-none overflow-auto min-h-10 max-h-52 h-fit"
            />
          </div>
          <Button
            type="submit"
            disabled={content.trim() === "" && attachments.length === 0}
            size="icon"
          >
            <SendHorizonal />
          </Button>
        </div>
      </form>
    </div>
  );
};
