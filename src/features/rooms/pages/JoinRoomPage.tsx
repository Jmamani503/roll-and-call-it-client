import { NavLink, useParams } from "react-router"
import { useJoinRoom } from "../hooks/useJoinRoom"
import { RoomNotFound } from "./RoomNotFound"
import { usePlayerStore } from "@/shared/store/user-store"
import { ActionButton } from "@/shared/components/ui/ActionButton"
import { HomeIcon, LoginIcon } from "@/shared/components/icons"

export const JoinRoomPage = () => {

  const { mutate: joinRoom, error, isPending } = useJoinRoom()
  const { roomId } = useParams()
  const { player, setName } = usePlayerStore()

  if (!roomId) {
    return <RoomNotFound />
  }

  const onJoinRoom = () => {
    joinRoom(roomId)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-[#27282c] rounded-xl p-6 flex flex-col gap-6 w-xs shadow-[#a8d8cd]">
        <h3 className="text-[#f1f1f1] text-base text-balance text-center font-medium">
          Join the room to start playing
        </h3>
        <input
          className="bg-[#f1f1f1] rounded-md px-2 py-1"
          value={player.name}
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="player name"
        />
        <div className="flex flex-col gap-2 justify-center">
          <ActionButton
            onClick={onJoinRoom}
            label='Join Room'
            isLoading={isPending}
            isDisabled={player.name === ''}
          >
            <LoginIcon />
          </ActionButton>
          {
            error &&
            <NavLink
              to={'/home'}
              className={`px-3 py-1 rounded-md font-semibold  flex gap-2 justify-center items-center transition-all ease-in-out border-2 border-[#5a5d63] w-full hover:bg-[#5a5d63] cursor-pointer text-white`}
            >
              <HomeIcon />
              Back To Home
            </NavLink>
          }
        </div>
      </div>
    </div>
  )
}
