import { CrownIcon } from "../../../shared/components/icons/CrownIcon"
import { TrashIcon } from "../../../shared/components/icons/TrashIcon"
import { usePlayerStore } from "../../../shared/store/user-store"
import type { Player } from "../../../shared/models/player.interface"

interface Pros {
  player: Player,
  hostId: string,
  onRemove: () => void
}

export const PlayerCard = ({ player, onRemove, hostId }: Pros) => {

  const { player: currentPlayer } = usePlayerStore()

  return (

    <div className={`flex justify-between items-center w-[200px]  py-1 px-2 rounded-md text-white border-2 border-[#5a5d63] ${currentPlayer.id === player.id && 'bg-[#5a5d63]'}`}>
      <span className="text-base">{player.name}</span>
      {
        player.id === hostId
        && <CrownIcon stroke="#26b0a1" width={24} height={24} />
      }
      {
        currentPlayer.id === hostId && currentPlayer.id !== player.id && (
          <button
            onClick={onRemove}
            className="rounded-full cursor-pointer hover:bg-[#5a5d63] h-6 w-6 flex items-center justify-center"
          >
            <TrashIcon width={20} height={20} strokeWidth={2}/>
          </button>
        )
      }
    </div>
  )
}