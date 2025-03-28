/* eslint-disable @next/next/no-img-element */

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { MessageAttachment } from "@/lib/interface";

interface ThumbnailProps {
  attachment: MessageAttachment;
}

const Thumbnail = ({ attachment }: ThumbnailProps) => {
  if (!attachment) return null;

  return (
    <Dialog>
      <DialogTrigger>
        <Image
          src={attachment.url}
          alt={attachment.key || "Attachment"}
          width={400}
          height={400}
          priority
          className="aspect-auto object-cover rounded-sm w-fit"
        />
      </DialogTrigger>
      <DialogTitle className="sr-only "></DialogTitle>
      <DialogContent
        aria-describedby={undefined}
        className="h-full min-w-fit border-none bg-transparent py-10 shadow-none flex justify-center items-center"
      >
        <img
          src={attachment.url}
          alt="Message image"
          className="rounded-md object-contain max-h-full max-w-full"
        />
      </DialogContent>
    </Dialog>
  );
};

export default Thumbnail;
