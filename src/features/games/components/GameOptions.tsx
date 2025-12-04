import { useRestartGame } from "../hooks/useRestartGame"
import { ResetIcon } from "../../../shared/components/icons/ResetIcon"
import { LogoutIcon } from "../../../shared/components/icons/LogoutIcon"
import { ActionButton } from "../../../shared/components/ui/ActionButton"
import { usePlayerStore } from "../../../shared/store/user-store"
import { ConfirmAction } from "../../../shared/components/ConfirmAction"
import { useModal } from "../../../shared/hooks/useModal"
import { ClipboardIcon } from "../../../shared/components/icons/ClipboardIcon"
import { GamesRules } from "./GameRules"
import { useNavigate } from "react-router"
import { IconButton } from "../../../shared/components/ui/IconButton"
import { useToast } from "../../../shared/contexts/toast-context"
import { LinkIcon } from "../../../shared/components/icons/Linkicon"

interface Props {
  gameId: string
  hostId: string
}

export const GameOptions = ({ gameId, hostId }: Props) => {

  const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;
  const { mutate: restartGame } = useRestartGame()
  const { player } = usePlayerStore()
  const { openModal } = useModal()
  const navigate = useNavigate()
  const { addToast } = useToast()

  const onRestartGame = () => {
    openModal(
      <ConfirmAction
        title="Restart the Game"
        message="Are you sure want to restart the game?"
        onConfirm={() => restartGame(gameId)}
      ></ConfirmAction>
    )
  }

  const onLeaveGame = () => {
    navigate('../')
  }

  const onShowRules = () => {
    openModal(<GamesRules></GamesRules>)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${CLIENT_URL}/rooms/${gameId}/invite`);
      addToast('Url Copied', "success")
    } catch (error) {
      console.error('Error al copiar el enlace:', error);
      alert('No se pudo copiar el enlace. Por favor, cópialo manualmente.');
    }
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex">
        <IconButton
          onClick={onLeaveGame}
          title="Back to Lobby"
        >
          <LogoutIcon className="size-5 md:size-6" />
        </IconButton>
        <IconButton
          onClick={onShowRules}
          title="Show Rules"
        >
          <ClipboardIcon className="size-5 md:size-6" />
        </IconButton>
        <IconButton
          onClick={handleCopy}
          title="Copy Invitation Link"
        >
          <LinkIcon className="size-5 md:size-6"/>
        </IconButton>
      </div>
      {
        hostId === player.id &&
        <>
          <ActionButton
            onClick={onRestartGame}
            label="Restart"
          >
            <ResetIcon className="size-5 md:size-6"/>
          </ActionButton>
        </>
      }
    </div>

  )
}
