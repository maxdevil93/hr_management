import { useState } from "react";
import { ChatRoom } from "../types";

export function useChat() {
  const [isChatCollapsed, setIsChatCollapsed] = useState(true);
  const [selectedChatRoom, setSelectedChatRoom] =
    useState<ChatRoom | null>(null);
  const [isChatPopupOpen, setIsChatPopupOpen] = useState(false);

  const toggleChatPanel = () => {
    setIsChatCollapsed(!isChatCollapsed);
  };

  const handleChatRoomClick = (chatRoom: ChatRoom) => {
    setSelectedChatRoom(chatRoom);
    setIsChatPopupOpen(true);
  };

  const handleCloseChatPopup = () => {
    setIsChatPopupOpen(false);
    setSelectedChatRoom(null);
  };

  return {
    isChatCollapsed,
    selectedChatRoom,
    isChatPopupOpen,
    toggleChatPanel,
    handleChatRoomClick,
    handleCloseChatPopup,
  };
}