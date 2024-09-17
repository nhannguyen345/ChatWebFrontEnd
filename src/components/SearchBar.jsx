import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
  return (
    <div className="w-8/12 h-[38px] flex flex-row p-1 border border-[#cfcfcf] rounded-md">
      <input
        className="flex-1 text-[15px] py-1 pl-2 pr-1 outline-none bg-transparent"
        type="text"
        placeholder="Search users"
      />
      <IoIosSearch className="text-[22px] stroke-1 my-auto mr-2 fill-[#adb5bd] cursor-pointer" />
    </div>
  );
};

export default SearchBar;
