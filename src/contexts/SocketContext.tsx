import { createContext, useContext } from "react";
import { io, type Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL
const socket = io(SOCKET_URL);

const SocketContext = createContext<Socket | null>(null);

interface Props{
  children: React.ReactNode
}

export const SocketProvider = ({ children }: Props) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if(!context) throw new Error('useSocket must be used insede SocketProvider');
  return context;
}