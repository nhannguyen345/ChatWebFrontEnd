import React, { useEffect } from "react";
import { FaUserGroup } from "react-icons/fa6";
import { useSelector } from "react-redux";
import useFetchData from "../../hooks/useFetchData";

const ChatGroupInfo = ({ groupInfo, selectedConversation }) => {
  const jwt = sessionStorage.getItem("auth-tk-webchat");
  const { onlineFriends } = useSelector((state) => state.connectionStatus);

  console.log(selectedConversation);

  const { data, loading, error } = useFetchData(
    "http://localhost:8080/group/get-members-group",
    {
      method: "POST",
      body: {
        groupId: selectedConversation.entity.id,
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const getUsersList = () => {
    return data.map((item) => {
      return {
        ...item.user,
        status: onlineFriends.includes(item.user.username)
          ? "Online"
          : "Offline",
      };
    });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md p-6 bg-white">
      {/* Group Members Count */}
      <div className="flex items-center gap-2 mb-6">
        <FaUserGroup className="w-5 h-5 text-gray-600" />
        <span className="text-lg font-medium text-gray-700">
          Group Members ({data && data.length})
        </span>
      </div>

      {/* Members List */}
      <div className="w-full space-y-3">
        {data &&
          getUsersList().map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="relative">
                <img
                  src={member.avatarUrl}
                  alt={member.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    member?.status === "Online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{member.username}</h3>
                <p className="text-sm text-gray-500 capitalize">
                  {member?.status}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatGroupInfo;
