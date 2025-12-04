import { useNavigate } from "react-router"
import { ConfirmAction } from "../../../shared/components/ConfirmAction"
import { ClipboardIcon } from "../../../shared/components/icons/ClipboardIcon"
import { LinkIcon } from "../../../shared/components/icons/Linkicon"
import { LogoutIcon } from "../../../shared/components/icons/LogoutIcon"
import { PlayIcon } from "../../../shared/components/icons/PlayIcon"
import { ActionButton } from "../../../shared/components/ui/ActionButton"
import { IconButton } from "../../../shared/components/ui/IconButton"
import { useModal } from "../../../shared/hooks/useModal"
import { usePlayerStore } from "../../../shared/store/user-store"
import { GamesRules } from "../../games/components/GameRules"
import { RoomStatus } from "../models/room-status.enum"
import type { Room } from "../models/room.interface"
import { useLeaveRoom } from "../hooks/useLeaveRoom"
import { PlusIcon } from "../../../shared/components/icons/PlusIcon"
import { useToast } from "../../../shared/contexts/toast-context"
import { useStartGame } from "../hooks/useStartGame"

interface Props {
  room: Room
}

export const RoomActions = ({ room }: Props) => {

  const { player } = usePlayerStore()
  const { mutate: leaveRoom } = useLeaveRoom()
  const { mutate: startGame, isPending: startGameLoading } = useStartGame()
  const { openModal } = useModal()
  const navigate = useNavigate()
  const { addToast } = useToast()

  const handleLeaveRoom = () => {
    openModal(
      <ConfirmAction
        title="Leave the Room"
        message="Are you sure want to leave the room?"
        onConfirm={() => leaveRoom({ roomId: room.id, userId: player.id })}
      ></ConfirmAction>
    )
  }

  const handleStartGame = () => {
    startGame({ roomId: room.id, players: room.players })
  }

  const onResumeGame = () => {
    navigate("game")
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`http://localhost:5173/rooms/${room.id}/invite`);
      addToast('Url Copied', "success")
    } catch (error) {
      console.error('Error al copiar el enlace:', error);
      addToast('Error copying the Url', "error")
    }
  };

  const onShowRules = () => {
    openModal(<GamesRules></GamesRules>)
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-1 justify-between">
        <IconButton
          onClick={handleLeaveRoom}
          title="Leave Room"
        >
          <LogoutIcon width={24} height={24}/>
        </IconButton>
        <IconButton
            onClick={onShowRules}
            title="Show Rules"
          >
            <ClipboardIcon width={24} height={24}/>
        </IconButton>
        <IconButton
            onClick={handleCopy}
            title="Copy Invitation Link"
          >
            <LinkIcon width={24} height={24}/>
        </IconButton>
      </div>
      {
        player.id === room.host.id
        && 
        <ActionButton
          onClick={handleStartGame}
          label="Start"
          isDisabled={room.players.length <= 1}  
          isLoading={startGameLoading}
        >
         <PlusIcon />
        </ActionButton>
      }
      {
        room.status === RoomStatus.IN_GAME &&
        <ActionButton 
          onClick={onResumeGame}
          label="Continue"
        >
          <PlayIcon height={24} width={24}/>
        </ActionButton>
      }
     
    </div>
  )
}