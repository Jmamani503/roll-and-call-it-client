import { Dice0 } from "../../../shared/components/icons/Dice0";

export const GameBoardSkeleton = () => {
  return (
    <section className="flex flex-col items-center p-2 md:p-4 rounded-md bg-[#27282c] gap-2 md:gap-4 animate-pulse w-[348px]">
      {/* ScoreBoard Skeleton */}
      <div className="w-full flex flex-col items-center gap-2">
        <div className="h-7 w-52 bg-[#5a5d63] rounded"></div>
        
      </div>
      <div className="grid grid-cols-3 gap-1 bg-[#5a5d63] p-1 rounded-sm">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-16 h-12 md:w-20 md:h-16 bg-[#27282c] rounded-sm"
            ></div>
          ))}
        </div>
      {/* Dice Skeleton */}
      <div className="flex gap-1 mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Dice0 key={i} width={52} height={52} strokeWidth={1} stroke={'#fff'}/>
        ))}
      </div>

      {/* GameActions Skeleton */}
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-24 md:w-16 bg-[#5a5d63] rounded-md"
          ></div>
        ))}
      </div>
    </section>
  );
};
