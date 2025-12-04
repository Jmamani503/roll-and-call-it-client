import { useEffect } from "react"
import { useSocket } from "../../../contexts/SocketContext"
import { useQueryClient } from "@tanstack/react-query";
import type { Room } from "../models/room.interface";
import { usePlayerStore } from "../../../shared/store/user-store";
import { useNavigate, useParams } from "react-router";
import type { Game } from "../../games/models/game.interface";
import { useModal } from "../../../shared/hooks/useModal";
import { GameNotification } from "../../../shared/components/NotificationMessage";
import { useToast } from "@/shared/contexts/toast-context";

export const useRoomSocketHandler = () => {

  const socket = useSocket()
  const queryClient = useQueryClient();
  const { player } = usePlayerStore()
  const { roomId } = useParams()
  const navigate = useNavigate()
  const { openModal } = useModal()
  const { addToast } = useToast()

  useEffect(() => {
    socket.on('room:userJoined', ({ roomId, user }) => {
      console.log(`${user.name} has joined the room: ${roomId}`);

      queryClient.setQueryData<Room>(['room', roomId], (oldRoom) => {
        if (!oldRoom) return oldRoom;

        const alreadyJoined = oldRoom.players.some((p) => p.id === user.id);
        if (alreadyJoined) return oldRoom;

        const updatedRoom = {
          ...oldRoom,
          players: [...oldRoom.players, user],
        };
        addToast(`${user.name} has joined`, 'info')
        return updatedRoom;
      });
    });

    socket.on('game:started', (room: Room) => {
      queryClient.setQueryData<Room>(['room', room.id], (oldRoom) => {
        if (!oldRoom) return oldRoom
        return {
          ...room
        }
      })
      navigate(`/rooms/${room.id}/game`)
      addToast('Game has started', "info")
    })

    socket.on('game:restarted', ({ game }: { game: Game }) => {
      queryClient.setQueryData<Room>(['room', game.id], (oldRoom) => {
        if (!oldRoom) return oldRoom
        return {
          ...oldRoom,
          game
        }
      })
      addToast('Game has been restarted', "info")
    })

    socket.on('game:update', ({ game }: { game: Game }) => {
      queryClient.setQueryData<Room>(['room', roomId], (oldRoom) => {
        if (!oldRoom) return oldRoom
        return {
          ...oldRoom,
          game
        }
      })
      if (game.hasFinished) {
        const message = game.winner.names.length === 1
          ? `${game.winner.names[0]} takes the victory with ${game.winner.score} points!`
          : `It's a tie between ${game.winner.names.join(", ")} — all with ${game.winner.score} points!`
        openModal(<GameNotification title="Game Over" message={message} />)
      }
    });


    socket.on('room:player-left', (room: Room, userId: string) => {
      const currentRoom = queryClient.getQueryData<Room>(['room', room.id])
      const removed = currentRoom?.players.find(p => p.id === userId)
      queryClient.setQueryData<Room>(['room', roomId], (oldRoom) => {
        if (!oldRoom) return oldRoom;
        return {
          ...room
        }
      })
      if(removed && player.id === removed.id) {
        addToast(`You leave the room`, 'success')
      } else {
        addToast(`${removed?.name} has left the room`, 'info')
      }
    })

    socket.on('room:player-removed', (room: Room, playerRemovedId: string) => {
      if (player.id === playerRemovedId) {
        queryClient.removeQueries({ queryKey: ['room', room.id], exact: true })
        openModal(<GameNotification title="Game Over" message='You have been removed from the game by the host.' />)
        navigate('/', { replace: true })
      } else {
        const currentRoom = queryClient.getQueryData<Room>(['room', room.id])
        const removed = currentRoom?.players.find(p => p.id === playerRemovedId)
        queryClient.setQueryData<Room>(['room', room.id], (oldRoom) => {
          if (!oldRoom) return oldRoom;
          return {
            ...room
          }
        })
        addToast(`${removed?.name} been removed`, 'info')
      }
    })

    return () => {
      socket.off('room:userJoined')
      socket.off('room:player-left')
      socket.off('game:started')
      socket.off('game:restarted')
      socket.off('game:update')
      socket.off('room:player-removed')
    }
  }, [queryClient, roomId, socket])
}