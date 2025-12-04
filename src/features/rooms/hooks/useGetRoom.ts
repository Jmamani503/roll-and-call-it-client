import { useQuery } from "@tanstack/react-query"
import { getRoom } from "../services/get-room"
import { useParams } from "react-router"
import { usePlayerStore } from "../../../shared/store/user-store"

export const useGetRoom = () => {
  const { roomId } = useParams();
  const { player } = usePlayerStore();

  const query = useQuery({
    queryKey: ['room', roomId],
    queryFn: () => getRoom(roomId!, player.id, player.name),
    enabled: !!roomId,
    staleTime: Infinity,
  });

  return query;
}; 