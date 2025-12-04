import type { Player } from "@/shared/models/player.interface"
import { PlayerCard } from "./PlayerCard"
import { useRemovePlayer } from "../hooks/useRemovePlayer"
import { useModal } from "@/shared/hooks/useModal"
import { ConfirmAction } from "@/shared/components/ConfirmAction"

interface Props {
  roomId: string
  hostId: string
  players: Player[]
}

export const PlayersList = ({ players, hostId, roomId }: Props) => {

  const { mutate: removePlayer } = useRemovePlayer()
  const { openModal } = useModal()
  const MAX_PLAYERS = 4;
  const emptySlots = MAX_PLAYERS - (players.length || 0);
  
  const onRemoveUser = (userId: string) => {
      openModal(<ConfirmAction
        title="Remove User from Room"
        message="Are you sure you want to remove [User's Name] from the room?"
        onConfirm={() => removePlayer({ roomId, userId })}
      />)
    }

  return (
    <div className="flex flex-col gap-2">
      {
        players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            hostId={hostId}
            onRemove={() => onRemoveUser(player.id)}
          />
        ))
      }
      {Array.from({ length: emptySlots }).map((_, index) => (
        <div
          key={`empty-${index}`}
          className="w-[200px] h-10 flex flex-col items-center justify-center border-2 border-dashed border-[#5a5d63] rounded-md text-[#5a5d63]"
        >
          <span className="text-sm p-2">Available Slot</span>
        </div>
      ))}
    </div>
  )
}