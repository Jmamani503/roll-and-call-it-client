import { useQuery } from "@tanstack/react-query"
import { getGame } from "../services/get-game"
import { useParams } from "react-router";

export const useGetGame = () => {
  
  const { roomId } = useParams();

  return useQuery({
    queryKey: ['game', roomId],
    queryFn: () => getGame(roomId!),
    enabled: !!roomId,
  })
}