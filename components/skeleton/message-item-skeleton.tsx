import { Skeleton } from "@/components/ui/skeleton";

export const MessageItemSkeleton = ({ align }: { align: "left" | "right" }) => {
  return (
    <div
      className={`flex items-end ${
        align === "right" ? "flex-row-reverse" : ""
      } mb-4`}
    >
      {align === "left" && <Skeleton className="w-8 h-8 rounded-full mr-2" />}
      <div
        className={`${
          align === "right" ? "items-end" : "items-start"
        } flex flex-col gap-1`}
      >
        <Skeleton
          className={`h-5 w-24 ${align === "right" ? "ml-auto" : ""}`}
        />
        <Skeleton className="h-10 w-[300px]" />
      </div>
    </div>
  );
};
