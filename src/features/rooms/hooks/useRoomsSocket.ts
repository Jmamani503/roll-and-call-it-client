import { useEffect } from "react";
import { useSocket } from "../../../contexts/SocketContext";
import type { Room } from "../models/room.interface";
import { useQueryClient } from "@tanstack/react-query";

export const useRoomsSocket = () => {
  const socket = useSocket();
  const queryClient = useQueryClient();
  useEffect(() => {

    socket.on('room:created' , (room : Room) => {
      console.log('llego algo', room)
      queryClient.setQueryData<Room[]>(['rooms'], (oldRooms = []) => {
        return [...oldRooms, room]
      })
    });

    socket.on('room:deleted' , ({ roomId }: { roomId: string }) => {
      console.log('se eliminto la sala', roomId )
      queryClient.setQueryData<Room[]>(['rooms'], (oldRooms = []) => {
        return oldRooms.filter((room) => room.id !== roomId)
      })
    });

    return () => {
      socket.off('room:deleted');
      socket.off('room:created');
      socket.off('room:userJoined');
      socket.off('userLeft');
    };
  }, [socket]);
};