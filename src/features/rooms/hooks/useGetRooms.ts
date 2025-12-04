import { useQuery } from "@tanstack/react-query"
import { getRooms } from "../services/get-rooms"

export const useGetRooms = () => {

  return useQuery({
    queryKey: ['rooms'],
    queryFn: () => getRooms()
  })
}