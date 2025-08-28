import { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Badge } from "./components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  FileText,
  Settings,
  Menu,
  Bell,
  Search,
  MessageCircle
} from "lucide-react";
import { Input } from "./components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { ChatPanel } from "./components/ChatPanel";
import { ChatPopup } from "./components/ChatPopup";

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

const salesData = [
  { month: "1월", sales: 4500, target: 5000 },
  { month: "2월", sales: 5200, target: 5000 },
  { month: "3월", sales: 4800, target: 5000 },
  { month: "4월", sales: 6100, target: 5500 },
  { month: "5월", sales: 5900, target: 5500 },
  { month: "6월", sales: 7200, target: 6000 },
];

const inventoryData = [
  { name: "전자제품", value: 45, color: "#8884d8" },
  { name: "의류", value: 30, color: "#82ca9d" },
  { name: "가구", value: 15, color: "#ffc658" },
  { name: "기타", value: 10, color: "#ff7300" },
];

const recentOrders = [
  { id: "ORD-001", customer: "삼성전자", amount: 2450000, status: "배송중", date: "2024-12-20" },
  { id: "ORD-002", customer: "LG전자", amount: 1850000, status: "완료", date: "2024-12-19" },
  { id: "ORD-003", customer: "현대자동차", amount: 3200000, status: "처리중", date: "2024-12-18" },
  { id: "ORD-004", customer: "SK텔레콤", amount: 980000, status: "대기", date: "2024-12-17" },
];

const menuItems = [
  { icon: LayoutDashboard, label: "대시보드", key: "dashboard" },
  { icon: Package, label: "재고 관리", key: "inventory" },
  { icon: ShoppingCart, label: "판매 관리", key: "sales" },
  { icon: Users, label: "고객 관리", key: "customers" },
  { icon: DollarSign, label: "재무 관리", key: "finance" },
  { icon: FileText, label: "보고서", key: "reports" },
  { icon: Settings, label: "설정", key: "settings" },
];

export default function App() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isChatCollapsed, setIsChatCollapsed] = useState(true);
  const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom | null>(null);
  const [isChatPopupOpen, setIsChatPopupOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "완료": return "bg-green-500";
      case "배송중": return "bg-blue-500";
      case "처리중": return "bg-yellow-500";
      case "대기": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Left Sidebar */}
        <Sidebar className="border-r">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">E</span>
              </div>
              <span className="font-bold text-lg">ERP System</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <nav className="px-4 py-2">
              {menuItems.map((item) => (
                <Button
                  key={item.key}
                  variant={activeMenu === item.key ? "secondary" : "ghost"}
                  className="w-full justify-start mb-1"
                  onClick={() => setActiveMenu(item.key)}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-card flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="검색..." 
                  className="pl-10 w-64"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleChatPanel}
                className="md:hidden"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage src="" alt="사용자" />
                <AvatarFallback>관리자</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6">
            {activeMenu === "dashboard" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">대시보드</h1>
                  <p className="text-muted-foreground">전체 비즈니스 현황을 한눈에 확인하세요</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">총 매출</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₩34,580,000</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-600">+12.5%</span> 전월 대비
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">주문 수</CardTitle>
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,234</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-600">+8.2%</span> 전월 대비
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">고객 수</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">892</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-600">+15.3%</span> 전월 대비
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">재고 수준</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">85%</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-yellow-600">-2.1%</span> 전월 대비
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>월별 매출 현황</CardTitle>
                      <CardDescription>목표 대비 실제 매출</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`₩${value.toLocaleString()}`, ""]} />
                          <Bar dataKey="sales" fill="#8884d8" name="실제 매출" />
                          <Bar dataKey="target" fill="#82ca9d" name="목표 매출" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>재고 분포</CardTitle>
                      <CardDescription>카테고리별 재고 현황</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={inventoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {inventoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <CardTitle>최근 주문</CardTitle>
                    <CardDescription>최근 처리된 주문 목록</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="font-medium">{order.id}</p>
                              <p className="text-sm text-muted-foreground">{order.customer}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-medium">₩{order.amount.toLocaleString()}</p>
                            <Badge variant="secondary" className={`${getStatusColor(order.status)} text-white`}>
                              {order.status}
                            </Badge>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeMenu === "inventory" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">재고 관리</h1>
                  <p className="text-muted-foreground">상품 재고를 효율적으로 관리하세요</p>
                </div>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">재고 관리 기능이 곧 추가될 예정입니다.</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeMenu === "sales" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">판매 관리</h1>
                  <p className="text-muted-foreground">주문과 판매를 체계적으로 관리하세요</p>
                </div>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">판매 관리 기능이 곧 추가될 예정입니다.</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeMenu === "customers" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">고객 관리</h1>
                  <p className="text-muted-foreground">고객 정보와 관계를 관리하세요</p>
                </div>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">고객 관리 기능이 곧 추가될 예정입니다.</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeMenu === "finance" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">재무 관리</h1>
                  <p className="text-muted-foreground">재무 현황과 회계를 관리하세요</p>
                </div>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">재무 관리 기능이 곧 추가될 예정입니다.</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeMenu === "reports" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">보고서</h1>
                  <p className="text-muted-foreground">다양한 비즈니스 보고서를 확인하세요</p>
                </div>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">보고서 기능이 곧 추가될 예정입니다.</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeMenu === "settings" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">설정</h1>
                  <p className="text-muted-foreground">시스템 설정을 관리하세요</p>
                </div>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">설정 기능이 곧 추가될 예정입니다.</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>

        {/* Right Chat Panel - 데스크톱에서만 표시 */}
        <div className="hidden md:block">
          <ChatPanel 
            isCollapsed={isChatCollapsed} 
            onToggleCollapse={toggleChatPanel}
            onChatRoomClick={handleChatRoomClick}
          />
        </div>

        {/* Mobile Chat Overlay */}
        {!isChatCollapsed && (
          <div className="md:hidden fixed inset-0 z-40 bg-background">
            <ChatPanel 
              isCollapsed={false} 
              onToggleCollapse={toggleChatPanel}
              onChatRoomClick={handleChatRoomClick}
            />
          </div>
        )}

        {/* Chat Popup */}
        <ChatPopup
          chatRoom={selectedChatRoom}
          isOpen={isChatPopupOpen}
          onClose={handleCloseChatPopup}
        />
      </div>
    </SidebarProvider>
  );
}