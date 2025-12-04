import { useMutation, useQueryClient } from "@tanstack/react-query"
import { RestartGame } from "../services/restart-game"
import { useModal } from "../../../shared/hooks/useModal";

export const useRestartGame = () => {

  const queryClient = useQueryClient();
  const { closeModal } = useModal()

  return useMutation({
    mutationFn: (gameId: string) => RestartGame(gameId),
    onSuccess: (game) => {
      console.log('game has restarted', game)
      queryClient.setQueryData(['game', game.id], game);
      closeModal()
    },
    onError: () => {
      console.log('error on restart game')
    }
  })
}