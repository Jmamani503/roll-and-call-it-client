import { useParams } from "react-router"
import { useGetRoom } from "../hooks/useGetRoom"
import { RoomNotFound } from "./RoomNotFound"
import { LoadingIcon, UsersIcon } from "@/shared/components/icons"
import { PlayersList } from "../components/PlayersList"
import { RoomActions } from "../components/RoomActions"

export const RoomPage = () => {

  const { roomId } = useParams()
  const { data: room, isLoading } = useGetRoom()

  if(isLoading) {
    return <LoadingIcon className="animate-spin" stroke="#fff"/>
  } 

  if (!roomId || !room) {
    return <RoomNotFound />
  } 

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-6 rounded-md  bg-[#27282c]">
      <div className="flex gap-1 items-center">
        <UsersIcon stroke="#fff"/>
        <span className="text-white text-xl font-bold">Players</span>
      </div>
      <PlayersList
        roomId={roomId}
        hostId={room.host.id}
        players={room.players}
      />
      <RoomActions room={room}/>
    </div>
  )
}
