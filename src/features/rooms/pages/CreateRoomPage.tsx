import { usePlayerStore } from "@/shared/store/user-store"
import { PlusIcon } from "@/shared/components/icons/PlusIcon"
import { ActionButton } from "@/shared/components/ui/ActionButton"
import { useCreateRoom } from "../hooks/useCreateRoom"

export const CreateRoomPage = () => {

  const { player, setName } = usePlayerStore()
  const { mutate: createRoom, isPending } = useCreateRoom()

  return (
    <div className="flex flex-col items-center">
      <h1 
        className="text-[#26b0a1] text-4xl md:text-6xl font-bold text-center mb-6"
      >
        Roll & Call It!
      </h1>
      <div className="bg-[#27282c] rounded-xl p-6 flex flex-col gap-6 w-xs  shadow-[#a8d8cd]">
        <h3
          className="text-[#f1f1f1] text-base text-balance text-center font-medium"
        >
          Create a room and start playing
        </h3>
        <input
          className="bg-[#f1f1f1] rounded-md px-2 py-1"
          value={player.name}
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Player name"
        />
        <div className="flex gap-4 justify-center">
          <ActionButton
            onClick={createRoom}
            label="Create Room"
            isDisabled={player.name === ''}
            isLoading={isPending}
          >
            <PlusIcon />
          </ActionButton>
        </div>
      </div>
    </div>
  )
}
