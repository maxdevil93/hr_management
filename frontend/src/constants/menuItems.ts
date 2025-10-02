import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  FileText,
  Settings,
  UserCheck,
  IdCard,
  Megaphone,
  Building,
  Calendar,
  CheckSquare
} from "lucide-react";
import { MenuItem } from "../types";

export const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: "대시보드", key: "dashboard" },
  { icon: Package, label: "재고 관리", key: "inventory" },
  { icon: ShoppingCart, label: "판매 관리", key: "sales" },
  { icon: Users, label: "고객 관리", key: "customers" },
  { icon: DollarSign, label: "재무 관리", key: "finance" },
  { icon: CheckSquare, label: "결재관리", key: "approval" },
  { icon: UserCheck, label: "인사관리", key: "hr-management" },
  { icon: IdCard, label: "인사정보", key: "hr-profile" },
  { icon: Megaphone, label: "사내공지", key: "company-notices" },
  { icon: Building, label: "부서공지", key: "department-notices" },
  { icon: Calendar, label: "일정", key: "schedule" },
  { icon: FileText, label: "보고서", key: "reports" },
  { icon: Settings, label: "설정", key: "settings" },
];