import { GoTriangleDown } from "react-icons/go";
import { useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";

const ChatFilter = ({ selectedFilter, setSelectedFilter }) => {
  const menuRef = useRef();

  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const handleClickFilter = (e) => {
    console.log(e);
    setSelectedFilter({ type: e.target.value, value: e.target.innerText });
    setIsOpenFilter(false);
  };
  return (
    <div className="relative">
      <button
        className="text-[15px] h-[38px] w-[110px] border border-[#cfcfcf] text-center rounded-md"
        onClick={() => setIsOpenFilter(!isOpenFilter)}
      >
        {selectedFilter?.value}&nbsp;
        <GoTriangleDown className="inline-block my-auto" />
      </button>
      <ul
        className={
          "absolute z-20 top-[41px] w-[140px] bg-white py-1 border rounded-md " +
          (isOpenFilter ? "" : " hidden")
        }
      >
        <li
          className="text-[14px] text-[#495057cc] px-8 py-2 hover:bg-[#f8f8f8] hover:text-black cursor-pointer"
          value={1}
          onClick={handleClickFilter}
        >
          All Chats
        </li>
        <li
          className="text-[14px] text-[#495057cc] px-8 py-2 hover:bg-[#f8f8f8] hover:text-black cursor-pointer"
          value={2}
          onClick={handleClickFilter}
        >
          Friends
        </li>
        <li
          className="text-[14px] text-[#495057cc] px-8 py-2 hover:bg-[#f8f8f8] hover:text-black cursor-pointer"
          value={3}
          onClick={handleClickFilter}
        >
          Groups
        </li>
      </ul>
    </div>
  );
};

export default ChatFilter;
