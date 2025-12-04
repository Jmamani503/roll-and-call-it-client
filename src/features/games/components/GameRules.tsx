export const GamesRules = () => {
  return (
    <div className="text-white max-w-sm max-h-[700px] overflow-y-scroll custom-scroll px-2">
      <h2 className="text-3xl font-bold mb-4 text-center text-[#26b0a1]">
        Game Rules
      </h2>
      <p className="mb-3 text-sm text-pretty">
        Score the highest points by achieving the best dice combinations.
      </p>
      <p className="mb-3 text-sm text-pretty">
        Players roll 5 dice and may re-roll up to 2 times per turn.
        You can keep any dice you want and re-roll the rest.
        After the re-rolls, you must flip at least one dice — up to two — to improve your combination.
        Once a category is scored, it cannot be selected again.
      </p>
      <h3 className="font-semibold text-[#26b0a1] mb-2 text-center">
        Combinations and Scores
      </h3>
      <div className="overflow-x-auto mb-5">
        <table className="w-full text-sm border border-[#5a5d63] border-collapse">
          <thead>
            <tr className="bg-[#2f3034] text-[#26b0a1]">
              <th className="p-2 border border-[#5a5d63]">Combination</th>
              <th className="p-2 border border-[#5a5d63]">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">Bullets (1s)</td>
              <td className="p-2 border" colSpan={2}>1 pts per die showing a 1</td>
            </tr>
            <tr>
              <td className="p-2 border">Dummies (2s)</td>
              <td className="p-2 border" colSpan={2}>2 pts per die showing a 2</td>
            </tr>
            <tr>
              <td className="p-2 border">Triplets (3s)</td>
              <td className="p-2 border" colSpan={2}>3 pts per die showing a 3</td>
            </tr>
            <tr>
              <td className="p-2 border">Quads (4s)</td>
              <td className="p-2 border" colSpan={2}>4 pts per die showing a 4</td>
            </tr>
            <tr>
              <td className="p-2 border">Fives (5s)</td>
              <td className="p-2 border" colSpan={2}>5 pts per die showing a 5</td>
            </tr>
            <tr>
              <td className="p-2 border">Sixes (6s)</td>
              <td className="p-2 border" colSpan={2}>6 pts per die showing a 6</td>
            </tr>
            <tr>
              <td className="p-2 border">Straight</td>
              <td className="p-2 border">1 to 5 or 2 to 6 - 20 pts</td>
            </tr>
            <tr>
              <td className="p-2 border">Full </td>
              <td className="p-2 border">Three of a kind + Pair - 30 pts</td>
            </tr>
            <tr>
              <td className="p-2 border">Poker</td>
              <td className="p-2 border">Four of a kind - 40 pts</td>
            </tr>
            <tr>
              <td className="p-2 border">Grand</td>
              <td className="p-2 border">Five of a kind - 50 pts</td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};