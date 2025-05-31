import { FiX } from "react-icons/fi";
import { VscAdd } from "react-icons/vsc";

interface IngredientsItemsProps {
  value: string;
  isNew: boolean;
  onClick: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function IngredientsItems({
  isNew,
  value,
  onClick,
  onChange,
  placeholder,
}: IngredientsItemsProps) {
  return (
    <div className="flex justify-start w-full cursor-pointer">
      <div
        className={`${
          isNew
            ? "flex items-center justify-around border-2 border-dashed border-zinc-500 rounded-md p-2  "
            : "flex  items-center justify-between bg-[#76797B] border-none rounded-md p-2 "
        }`}
      >
        <input
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          readOnly={!isNew}
          className="flex items-center bg-transparent font-roboto border-none text-[#ffffff] text-[16px] gap-2 outline-none"
        />
        <button type="button" onClick={onClick}>
          {isNew ? (
            <VscAdd size={20} className="text-[#FF9000] cursor-pointer" />
          ) : (
            <FiX size={20} className="text-[#FF002E] cursor-pointer" />
          )}
        </button>
      </div>
    </div>
  );
}
