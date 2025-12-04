import { NavLink } from "react-router"
import { HomeIcon } from "../../../shared/components/icons/HomeIcon"

export const RoomNotFound = () => {

  return (
    <div className="flex flex-col justify-center items-center p-6 rounded-md  max-w-xs gap-4 bg-[#27282c]">
      <p className="text-pretty text-center text-white">Room not found. It may no longer exist.</p>
      <NavLink
        to={'/'}
       className="hover:bg-[#5a5d63] px-3 py-1 rounded-md cursor-pointer font-semibold text-[#fff] flex gap-2 justify-center items-center transition-all ease-in-out border-2 border-[#5a5d63] w-full"
      >
        <HomeIcon />
        <span>
        Back to home
        </span>
      </NavLink>
    </div>
  )
}