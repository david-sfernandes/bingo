import NumberBlock from "./NumberBlock";

export default function Card({ numbers }: { numbers: BingoNum[] }) {
  const selectCount = numbers.filter((num) => num.selected).length;
  if (selectCount == 16) {
    alert("Bingo!");
  }

  return (
    <div className="p-10 pt-8 bg-white border-4 rounded-2xl">
      <p className="text-center text-gray-500 p-1 mb-2">{selectCount}/{numbers.length}</p>
      {numbers.length == 0 && (
        <p className="text-center text-white bg-green-500 border-4 border-green-300 px-4 py-2 font-medium text-lg rounded-lg">
          Gerar cartela
        </p>
      )}
      {numbers.length > 0 && (
        <div className="border border-gray-400/80 grid grid-cols-4 grid-rows-4">
          {numbers.map((num) => (
            <NumberBlock bingoNum={num} />
          ))}
        </div>
      )}
    </div>
  );
}
