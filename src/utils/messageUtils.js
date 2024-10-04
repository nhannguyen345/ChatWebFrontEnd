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
  createAt = new Date().toISOString()
) {
  return {
    tempId,
    senderId,
    receiverId: isGroup ? null : receiverId,
    groupId: isGroup ? receiverId : null,
    content,
    fileUrl,
    messageType,
    createAt,
    statusMess: "pending",
  };
}
