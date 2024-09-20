import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateGroupModal } from "../features/modal/modalSlice";
import { IoMdClose, IoIosSearch } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";

// Hằng số cho các bước
const STEP_CREATE_GROUP = 1;
const STEP_ADD_MEMBERS = 2;

// Danh sách bạn bè, có thể được lưu trong store hoặc tải từ API
const users = [
  {
    id: 1,
    name: "Catherine Richardson",
    status: "Online",
    avatar:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
  },
  {
    id: 2,
    name: "Katherine Schneider",
    status: "Online",
    avatar:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
  },
  {
    id: 3,
    name: "Brittany K. Williams",
    status: "Offline",
    avatar:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
  },
  {
    id: 4,
    name: "Christina Turner",
    status: "Busy",
    avatar:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
  },
  {
    id: 5,
    name: "Annie Richardson",
    status: "Away",
    avatar:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
  },
  {
    id: 6,
    name: "Christina Turner",
    status: "Busy",
    avatar:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
  },
  {
    id: 7,
    name: "Annie Richardson",
    status: "Away",
    avatar:
      "https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg",
  },
];

// Thành phần Create Group Content
const CreateGroupContent = ({
  groupName,
  setGroupName,
  fileName,
  handleFileChange,
  handleNext,
}) => (
  <div>
    <div className="p-6">
      <div className="mb-4">
        <label
          htmlFor="groupName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Group name
        </label>
        <input
          type="text"
          id="groupName"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
          placeholder="Type group name here"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="profilePicture"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Choose profile picture
        </label>
        <div className="relative flex border border-gray-300 rounded-l-md shadow-sm">
          <span className="flex-1 flex items-center text-sm px-2">
            {fileName}
          </span>
          <input
            type="file"
            id="profilePicture"
            className="absolute top-0 flex-grow w-full h-full opacity-0 z-10"
            placeholder="Choose file"
            onChange={handleFileChange}
          />
          <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 border border-gray-300 rounded-r-md hover:bg-gray-200">
            Browse
          </button>
        </div>
      </div>
    </div>
    <div className="flex justify-end space-x-2 p-6 border-t">
      <button
        onClick={() => dispatch(closeCreateGroupModal())}
        className="px-4 py-2 border border-gray-300 rounded-md hover:text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Cancel
      </button>
      <button
        onClick={handleNext}
        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Next
      </button>
    </div>
  </div>
);

// Thành phần Add Group Members Content
const AddGroupMembersContent = ({
  searchQuery,
  setSearchQuery,
  selectedMembers,
  toggleMember,
  handlePrevious,
  handleSubmit,
}) => (
  <div>
    <div className="p-6">
      <div className="relative mb-4">
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <IoIosSearch className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className=" max-h-64 overflow-y-auto no-scrollbar">
        {users.map((user) => (
          <div key={user.id} className="flex items-center my-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-grow pl-3">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.status}</p>
            </div>
            <input
              type="checkbox"
              checked={selectedMembers.includes(user.id)}
              onChange={() => toggleMember(user.id)}
              className="h-4 w-4 checked:accent-[#665dfe] border-gray-300 rounded"
            />
          </div>
        ))}
      </div>
    </div>
    <div className="relative flex justify-end space-x-2 p-6 border-t">
      <button></button>
      <button
        onClick={handlePrevious}
        className="px-4 py-2 border border-gray-300 rounded-md hover:text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Previous
      </button>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </div>
  </div>
);

const CreateGroupModal = () => {
  const modal = useSelector((state) => state.modal.isCreateGroupModalOpen);
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(STEP_CREATE_GROUP);

  const [groupName, setGroupName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [fileName, setFileName] = useState("Choose file");

  useEffect(() => {
    if (modal) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [modal]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setFileName(file.name);
  };

  const toggleMember = (userId) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleNext = () => {
    if (!groupName) {
      toast.error("Please fill the Group's name");
      return;
    }
    setCurrentStep(STEP_ADD_MEMBERS);
  };

  const handlePrevious = () => setCurrentStep(STEP_CREATE_GROUP);

  const handleSubmit = () => {
    // Thực hiện submit logic
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => dispatch(closeCreateGroupModal())}
      ></div>

      <div
        className={`bg-white flex flex-col sm:min-w-[340px] md:min-w-[420px] rounded-lg z-10 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="p-4 flex items-center justify-between text-[#495057] border-b">
          <h5 className="text-[17px] font-medium">
            {currentStep === STEP_CREATE_GROUP
              ? "Invite Others"
              : "Add Members Group"}
          </h5>
          <IoMdClose
            className="h-[22px] w-[22px] text-[#adb5bd] cursor-pointer hover:text-black"
            onClick={() => dispatch(closeCreateGroupModal())}
          />
        </div>

        {currentStep === STEP_CREATE_GROUP ? (
          <CreateGroupContent
            groupName={groupName}
            setGroupName={setGroupName}
            fileName={fileName}
            handleFileChange={handleFileChange}
            handleNext={handleNext}
          />
        ) : (
          <AddGroupMembersContent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedMembers={selectedMembers}
            toggleMember={toggleMember}
            handlePrevious={handlePrevious}
            handleSubmit={handleSubmit}
          />
        )}

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default CreateGroupModal;
