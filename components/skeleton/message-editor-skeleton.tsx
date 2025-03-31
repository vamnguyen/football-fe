import { Skeleton } from "@/components/ui/skeleton";

export const MessageEditorSkeleton = () => {
  return (
    <div className="space-y-2 py-2 px-5">
      <div className="flex items-center justify-between gap-5">
        <Skeleton className="flex-1 h-12 rounded-xl" />
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    </div>
  );
};
