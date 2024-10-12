import generateIdRandom from "./generateIdRandom";

export function generateIdMessage() {
  return "msg_" + generateIdRandom();
}

export function createNewMessage(
  tempId,
  senderId,
  isGroup,
  receiverId,
  messageType = "TEXT",
  content = "",
  fileUrl = "",
  createdAt = new Date().toISOString()
) {
  return {
    tempId,
    senderId,
    receiverId: isGroup === "group" ? null : receiverId,
    groupId: isGroup === "group" ? receiverId : null,
    content,
    fileUrl,
    messageType,
    createdAt,
    statusMess: "pending",
  };
}
