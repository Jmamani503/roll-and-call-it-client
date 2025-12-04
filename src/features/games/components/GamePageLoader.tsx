import { ClipboardIcon } from "../../../shared/components/icons/ClipboardIcon"
import { LinkIcon } from "../../../shared/components/icons/Linkicon"
import { LogoutIcon } from "../../../shared/components/icons/LogoutIcon"
import { GameBoardSkeleton } from "./GameBoardSkeleton"

export const GamePageLoader = () => {

  return (
    <div className="flex flex-col justify-center gap-2 md:gap-4 md:flex-row">
      <aside className="flex flex-row gap-2 w-full md:gap-4 md:flex-col animate-pulse bg-[#27282c] rounded-md md:w-48 p-2 md:p-4 h-fit">
        <h3 className="text-white font-bold text-base md:text-xl text-center">Scores </h3>
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-md px-3 py-1 flex border-[#5a5d63] border-2 h-9 w-[160px]`}
            >
            </div>
          ))}
        </div>

        <div className="flex text-white">
          <div className="w-full flex py-2 justify-center items-center">
            <LogoutIcon />
          </div>
          <div className="w-full flex py-2 justify-center items-center">

            <ClipboardIcon />
          </div>
          <div className="w-full flex py-2 justify-center items-center">
            <LinkIcon />
          </div>
        </div>
      </aside>

      <GameBoardSkeleton />
    </div>
  )
}