import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateGroupModal } from "../features/modal/modalSlice";
import { IoMdClose } from "react-icons/io";

const CreateGroupModal = () => {
  const modal = useSelector((state) => state.modal.isCreateGroupModalOpen);
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false); // Quản lý trạng thái hiển thị của modal

  // state for CreateGroupContent
  const [groupName, setGroupName] = useState("");
  const [groupPrivacy, setGroupPrivacy] = useState("private");

  // state for AddGroupMembersContent
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("Choose file");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  useEffect(() => {
    if (modal) {
      setIsVisible(true); // Bắt đầu hiệu ứng khi modal mở
    } else {
      setIsVisible(false); // Khi modal đóng, ẩn hiệu ứng
    }
  }, [modal]);

  //   if (!isOpen) return null;
  const CreateGroupContent = () => {};

  const AddGroupMembersContent = () => {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* background black */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => dispatch(closeInviteModal())}
      ></div>

      <div
        className={`bg-white flex flex-col sm:min-w-[340px] md:min-w-[420px] rounded-lg z-10 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Header Modal */}
        <div className="p-4 flex items-center justify-between text-[#495057] border-b">
          <h5 className="text-[17px] font-medium">Invite Others</h5>
          <IoMdClose
            className="h-[22px] w-[22px] text-[#adb5bd] cursor-pointer hover:text-black"
            onClick={() => dispatch(closeCreateGroupModal())}
          />
        </div>

        <form>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                <span className="flex-1 flex items-center px-2">
                  {fileName}
                </span>
                <input
                  type="file"
                  id="profilePicture"
                  className="absolute top-0 flex-grow w-full h-full opacity-0 z-10"
                  placeholder="Choose file"
                  onChange={handleFileChange}
                />
                <button className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-r-md hover:bg-gray-200">
                  Browse
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2 p-6 border-t">
            <button
              onClick={null}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              onClick={null}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
