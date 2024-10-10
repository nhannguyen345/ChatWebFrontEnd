export function generateIdMessage() {
  return "msg_" + (Math.random() + 1).toString(36).substring(2);
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
