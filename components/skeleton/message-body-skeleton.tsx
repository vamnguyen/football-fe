import { MessageItemSkeleton } from "./message-item-skeleton";

export const MessageBodySkeleton = () => {
  return (
    <div className="flex-1 py-2 pr-3 space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <MessageItemSkeleton key={i} align={i % 2 === 0 ? "left" : "right"} />
      ))}
    </div>
  );
};
