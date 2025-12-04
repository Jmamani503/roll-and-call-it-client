import { BrowserRouter, Route, Routes } from "react-router"
import { RoomLayout } from "../features/rooms/layouts/RoomLayout"
import { GamePage } from "../features/games/pages/GamePage"
import { CreateRoomPage, JoinRoomPage, RoomPage } from "@/features/rooms/pages"

export const AppRouter = () => {

  return (
    <BrowserRouter>
      <Routes>    
        <Route path="/" element={<CreateRoomPage />} />
        <Route path="/rooms/:roomId" element={<RoomLayout />}>
          <Route index element={<RoomPage />} /> 
          <Route path="game" element={<GamePage />} />  
          <Route path="invite" element={<JoinRoomPage />} />
        </Route>
        <Route path="*" element={<h1 className="text-white text-4xl">404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}