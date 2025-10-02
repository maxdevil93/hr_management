import { ChartData, InventoryData, Order } from "../types";

export const salesData: ChartData[] = [
  { month: "1월", sales: 4500, target: 5000 },
  { month: "2월", sales: 5200, target: 5000 },
  { month: "3월", sales: 4800, target: 5000 },
  { month: "4월", sales: 6100, target: 5500 },
  { month: "5월", sales: 5900, target: 5500 },
  { month: "6월", sales: 7200, target: 6000 },
];

export const inventoryData: InventoryData[] = [
  { name: "전자제품", value: 45, color: "#8884d8" },
  { name: "의류", value: 30, color: "#82ca9d" },
  { name: "가구", value: 15, color: "#ffc658" },
  { name: "기타", value: 10, color: "#ff7300" },
];

export const recentOrders: Order[] = [
  { id: "ORD-001", customer: "삼성전자", amount: 2450000, status: "배송중", date: "2024-12-20" },
  { id: "ORD-002", customer: "LG전자", amount: 1850000, status: "완료", date: "2024-12-19" },
  { id: "ORD-003", customer: "현대자동차", amount: 3200000, status: "처리중", date: "2024-12-18" },
  { id: "ORD-004", customer: "SK텔레콤", amount: 980000, status: "대기", date: "2024-12-17" },
];