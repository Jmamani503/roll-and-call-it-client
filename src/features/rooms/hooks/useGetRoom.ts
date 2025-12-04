import { useQuery } from "@tanstack/react-query"
import { getRoom } from "../services/get-room"
import { useParams } from "react-router"
import { usePlayerStore } from "../../../shared/store/user-store"
import { useSocket } from "../../../contexts/SocketContext";
import { useEffect, useRef } from "react";

export const useGetRoom = () => {
  const { roomId } = useParams();
  const { player } = usePlayerStore();
  const socket = useSocket();
  const hasJoinedRef = useRef(false);

  const query = useQuery({
    queryKey: ['room', roomId],
    queryFn: () => getRoom(roomId!, player.id, player.name),
    enabled: !!roomId,
    staleTime: Infinity,
  });

  // useEffect(() => {
  //   console.log('valod er fetcgafterM antes del if', query.isFetchedAfterMount);

  //   if (
  //     query.isSuccess &&
  //     query.data &&
  //     query.isFetchedAfterMount &&
  //     !hasJoinedRef.current
  //   ) {
  //     socket.emit("room:join", { roomId: query.data.id, userId: player.id });
  //     console.log(`🔁 Emit room:join from useEffect -> room ${query.data.id}`);
  //     console.log('valod er fetcgafterM', query.isFetchedAfterMount);

  //     hasJoinedRef.current = true;
  //   }
  // }, [query.isSuccess, query.data, query.isFetchedAfterMount, player.id, socket]);
  return query;
}; 