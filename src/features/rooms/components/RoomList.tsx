import { useGetRooms } from "../hooks/useGetRooms"
import { RoomCard } from "./RoomCard"



export const RoomList = () => {

  const { data: rooms } = useGetRooms()

  return (
    <div className="w-full p-16 flex flex-col gap-6">
      <h3 className="text-2xl text-white">Public rooms :</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          rooms?.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))
        }
      </div>
    </div>
  )
}