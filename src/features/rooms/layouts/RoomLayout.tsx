import { Outlet, useParams } from "react-router"
import { usePlayerStore } from "../../../shared/store/user-store";
import { useSocket } from "../../../contexts/SocketContext";
import { useEffect, useRef } from "react";
import { useRoomSocketHandler } from "../hooks/useRoomSocketHandler";

export const RoomLayout = () => {

  const { roomId } = useParams()
  const { player } = usePlayerStore();
  const socket = useSocket();
  const hasJoinedRef = useRef(false);
  useRoomSocketHandler()

  useEffect(() => {
    if (!roomId || !player.id) return;
    if (hasJoinedRef.current) return;

    socket.emit("room:join", { roomId, userId: player.id });
    console.log(`✅ socket.emit room:join → ${roomId} (user ${player.id})`);
    hasJoinedRef.current = true;
  }, [roomId, player.id, socket]);

  return (
    <Outlet />
  )
}