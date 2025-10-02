import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Minimize2,
  X
} from "lucide-react";
import { Textarea } from "../ui/textarea";

interface ChatRoom {
  id: string;
  name: string;
  type: "individual" | "group";
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline?: boolean;
  participants?: string[];
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: "text" | "file" | "image";
}

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "user1",
    senderName: "김영희",
    content: "안녕하세요! 견적서 관련해서 문의드립니다.",
    timestamp: "10:25",
    type: "text",
  },
  {
    id: "2",
    senderId: "me",
    senderName: "나",
    content: "네, 어떤 부분이 궁금하신가요?",
    timestamp: "10:26",
    type: "text",
  },
  {
    id: "3",
    senderId: "user1",
    senderName: "김영희",
    content: "총 금액과 납기일정을 확인하고 싶습니다.",
    timestamp: "10:28",
    type: "text",
  },
  {
    id: "4",
    senderId: "me",
    senderName: "나",
    content: "견적서를 첨부해드릴게요. 확인 후 연락주세요.",
    timestamp: "10:29",
    type: "text",
  },
  {
    id: "5",
    senderId: "user1",
    senderName: "김영희",
    content: "견적서 검토 완료했습니다. 진행하겠습니다.",
    timestamp: "10:30",
    type: "text",
  },
];

interface ChatPopupProps {
  chatRoom: ChatRoom | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ChatPopup({ chatRoom, isOpen, onClose }: ChatPopupProps) {
  const [newMessage, setNewMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("메시지 전송:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!chatRoom) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] p-0 gap-0">
        {/* 채팅방 헤더 */}
        <DialogHeader className="h-16 border-b flex flex-row items-center justify-between px-4 py-0 space-y-0">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={chatRoom.avatar} />
              <AvatarFallback>
                {chatRoom.type === "group" ? "그룹" : chatRoom.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <DialogTitle className="font-medium truncate">{chatRoom.name}</DialogTitle>
              {chatRoom.type === "individual" && (
                <p className="text-xs text-muted-foreground">
                  {chatRoom.isOnline ? "온라인" : "오프라인"}
                </p>
              )}
              {chatRoom.type === "group" && chatRoom.participants && (
                <p className="text-xs text-muted-foreground">
                  {chatRoom.participants.length}명
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {!isMinimized && (
          <>
            {/* 메시지 영역 */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex gap-2 max-w-[80%] ${message.senderId === "me" ? "flex-row-reverse" : "flex-row"}`}>
                      {message.senderId !== "me" && (
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {message.senderName.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`space-y-1 ${message.senderId === "me" ? "items-end" : "items-start"}`}>
                        {message.senderId !== "me" && (
                          <p className="text-xs text-muted-foreground">{message.senderName}</p>
                        )}
                        <div
                          className={`px-3 py-2 rounded-lg ${
                            message.senderId === "me"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* 메시지 입력 영역 */}
            <div className="border-t p-4">
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <Textarea
                    placeholder="메시지를 입력하세요..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="min-h-[40px] max-h-[120px] resize-none"
                  />
                </div>
                <Button variant="ghost" size="icon">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}