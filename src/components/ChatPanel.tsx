import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  MessageCircle,
  ChevronRight,
  Plus
} from "lucide-react";

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

const mockChatRooms: ChatRoom[] = [
  {
    id: "1",
    name: "김영희 (영업팀)",
    type: "individual",
    lastMessage: "견적서 검토 완료했습니다.",
    lastMessageTime: "10:30",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "2",
    name: "개발팀",
    type: "group",
    lastMessage: "이번 주 배포 일정 공유드립니다.",
    lastMessageTime: "09:45",
    unreadCount: 5,
    participants: ["박철수", "이민수", "정유진"],
  },
  {
    id: "3",
    name: "박철수 (개발팀)",
    type: "individual",
    lastMessage: "API 문서 업데이트했습니다.",
    lastMessageTime: "어제",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "4",
    name: "마케팅팀",
    type: "group",
    lastMessage: "캠페인 결과 보고서입니다.",
    lastMessageTime: "어제",
    unreadCount: 1,
    participants: ["최수진", "김민호", "이상현"],
  },
  {
    id: "5",
    name: "이민수 (기획팀)",
    type: "individual",
    lastMessage: "회의 자료 준비 완료했습니다.",
    lastMessageTime: "2일 전",
    unreadCount: 0,
    isOnline: true,
  },
];

interface ChatPanelProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onChatRoomClick: (chatRoom: ChatRoom) => void;
}

export function ChatPanel({ isCollapsed, onToggleCollapse, onChatRoomClick }: ChatPanelProps) {
  const getTotalUnreadCount = () => {
    return mockChatRooms.reduce((total, room) => total + room.unreadCount, 0);
  };

  if (isCollapsed) {
    return (
      <div className="w-16 border-l bg-card flex flex-col">
        {/* 헤더 */}
        <div className="h-16 border-b flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="relative"
          >
            <MessageCircle className="h-5 w-5" />
            {getTotalUnreadCount() > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {getTotalUnreadCount()}
              </Badge>
            )}
          </Button>
        </div>

        {/* 간략한 채팅방 목록 */}
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-2">
            {mockChatRooms.slice(0, 5).map((room) => (
              <div key={room.id} className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 p-0"
                  onClick={() => onChatRoomClick(room)}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={room.avatar} />
                    <AvatarFallback className="text-xs">
                      {room.type === "group" ? "그룹" : room.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {room.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </Button>
                {room.unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs"
                  >
                    {room.unreadCount}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* 새 채팅 버튼 */}
        <div className="p-2 border-t">
          <Button variant="ghost" size="icon" className="w-12 h-12">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 border-l bg-card flex flex-col">
      {/* 헤더 */}
      <div className="h-16 border-b flex items-center justify-between px-4">
        <h2 className="font-semibold">채팅</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 채팅방 목록 */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {mockChatRooms.map((room) => (
            <div key={room.id}>
              <Button
                variant="ghost"
                className="w-full p-3 h-auto justify-start"
                onClick={() => onChatRoomClick(room)}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={room.avatar} />
                      <AvatarFallback>
                        {room.type === "group" ? "그룹" : room.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {room.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{room.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {room.lastMessageTime}
                        </span>
                        {room.unreadCount > 0 && (
                          <Badge variant="destructive" className="h-5 px-2">
                            {room.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {room.lastMessage}
                    </p>
                    {room.type === "group" && room.participants && (
                      <p className="text-xs text-muted-foreground">
                        {room.participants.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </Button>
              <Separator />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}