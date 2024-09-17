import { GoTriangleDown } from "react-icons/go";
import { useState } from "react";

const ChatFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState({
    type: 1,
    value: "All Chats",
  });

  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const hanldeClickFilter = (e) => {
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
        {selectedFilter.value}&nbsp;
        <GoTriangleDown className="inline-block my-auto" />
      </button>
      <ul
        className={
          "absolute top-[41px] w-[140px] bg-white py-1 z-10 border rounded-md" +
          (isOpenFilter ? "" : " hidden")
        }
      >
        <li
          className="text-[14px] text-[#495057cc] px-8 py-2 hover:bg-[#f8f8f8] hover:text-black cursor-pointer"
          value={1}
          onClick={hanldeClickFilter}
        >
          All Chats
        </li>
        <li
          className="text-[14px] text-[#495057cc] px-8 py-2 hover:bg-[#f8f8f8] hover:text-black cursor-pointer"
          value={2}
          onClick={hanldeClickFilter}
        >
          Friends
        </li>
        <li
          className="text-[14px] text-[#495057cc] px-8 py-2 hover:bg-[#f8f8f8] hover:text-black cursor-pointer"
          value={3}
          onClick={hanldeClickFilter}
        >
          Groups
        </li>
      </ul>
    </div>
  );
};

export default ChatFilter;
