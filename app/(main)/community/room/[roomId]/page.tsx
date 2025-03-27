import { RoomMessages } from "@/components/community/room/room-messages";

export default function RoomIdPage({ params }: { params: { roomId: string } }) {
  return <RoomMessages roomId={params.roomId} />;
}
