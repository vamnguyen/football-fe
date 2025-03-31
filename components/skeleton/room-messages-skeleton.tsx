import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageEditorSkeleton } from "./message-editor-skeleton";
import { MessageBodySkeleton } from "./message-body-skeleton";

export const RoomMessagesSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="w-10 h-6" />
              <Skeleton className="w-12 h-12 rounded-full" />
            </div>
            <Skeleton className="h-4 w-[250px]" />
          </div>
          <Skeleton className="h-8 w-[150px]" />
        </div>
      </CardHeader>
      <Separator className="mb-5" />
      <CardContent className="bg-background flex flex-col gap-4 h-[calc(100vh-260px)]">
        <MessageBodySkeleton />
        <MessageEditorSkeleton />
      </CardContent>
    </Card>
  );
};
