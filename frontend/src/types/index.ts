export interface ChatRoom {
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

export interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  key: string;
}

export interface Order {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
}

export interface ChartData {
  month: string;
  sales: number;
  target: number;
}

export interface InventoryData {
  name: string;
  value: number;
  color: string;
}