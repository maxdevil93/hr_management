import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { 
  Search, 
  Plus, 
  Bell, 
  Eye, 
  Edit, 
  Trash2,
  MessageSquare,
  Calendar,
  User,
  Pin,
  TrendingUp
} from "lucide-react";

interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  category: "일반" | "긴급" | "인사" | "교육" | "시스템";
  priority: "높음" | "보통" | "낮음";
  isPinned: boolean;
  views: number;
  likes: number;
  comments: number;
  createdDate: string;
  updatedDate?: string;
  isActive: boolean;
}

const mockNotices: Notice[] = [
  {
    id: "NOTICE001",
    title: "2024년 하반기 인사발령 공지",
    content: "2024년 하반기 인사발령에 대해 안내드립니다. 자세한 내용은 인사팀에 문의해주세요.",
    author: "인사팀",
    authorId: "HR001",
    category: "인사",
    priority: "높음",
    isPinned: true,
    views: 245,
    likes: 12,
    comments: 8,
    createdDate: "2024-08-25",
    isActive: true,
  },
  {
    id: "NOTICE002",
    title: "시스템 정기 점검 안내",
    content: "매월 첫째 주 일요일 시스템 정기 점검이 진행됩니다. 서비스 이용에 참고 바랍니다.",
    author: "IT팀",
    authorId: "IT001",
    category: "시스템",
    priority: "보통",
    isPinned: false,
    views: 187,
    likes: 5,
    comments: 3,
    createdDate: "2024-08-20",
    isActive: true,
  },
  {
    id: "NOTICE003",
    title: "신규 보안 교육 이수 안내",
    content: "전 직원 대상 보안 교육이 실시됩니다. 기한 내 이수해주시기 바랍니다.",
    author: "보안팀",
    authorId: "SEC001",
    category: "교육",
    priority: "높음",
    isPinned: true,
    views: 312,
    likes: 18,
    comments: 15,
    createdDate: "2024-08-18",
    isActive: true,
  },
  {
    id: "NOTICE004",
    title: "사무용품 신청 방법 변경 안내",
    content: "사무용품 신청 시스템이 변경되었습니다. 새로운 신청 방법을 확인해주세요.",
    author: "총무팀",
    authorId: "GA001",
    category: "일반",
    priority: "보통",
    isPinned: false,
    views: 89,
    likes: 3,
    comments: 1,
    createdDate: "2024-08-15",
    isActive: true,
  },
  {
    id: "NOTICE005",
    title: "긴급: 화재 대피 훈련 실시",
    content: "오늘 오후 2시 화재 대피 훈련이 실시됩니다. 모든 직원은 참여해주시기 바랍니다.",
    author: "안전관리팀",
    authorId: "SAF001",
    category: "긴급",
    priority: "높음",
    isPinned: true,
    views: 456,
    likes: 25,
    comments: 12,
    createdDate: "2024-08-12",
    isActive: true,
  },
];

export function CompanyNotices() {
  const [notices] = useState(mockNotices);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || notice.category === selectedCategory;
    const matchesPriority = selectedPriority === "all" || notice.priority === selectedPriority;
    
    return matchesSearch && matchesCategory && matchesPriority && notice.isActive;
  });

  // 고정된 공지사항을 먼저 정렬
  const sortedNotices = filteredNotices.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "긴급": return "bg-red-500";
      case "인사": return "bg-blue-500";
      case "교육": return "bg-green-500";
      case "시스템": return "bg-purple-500";
      case "일반": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "높음": return "text-red-600";
      case "보통": return "text-yellow-600";
      case "낮음": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const totalNotices = notices.filter(n => n.isActive).length;
  const pinnedNotices = notices.filter(n => n.isPinned && n.isActive).length;
  const urgentNotices = notices.filter(n => n.category === "긴급" && n.isActive).length;
  const totalViews = notices.reduce((sum, notice) => sum + notice.views, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">사내공지</h1>
        <p className="text-muted-foreground">회사 전체 공지사항을 확인하고 관리하세요</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 공지</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalNotices}개</div>
            <p className="text-xs text-muted-foreground">
              이번 달 +3개
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">고정 공지</CardTitle>
            <Pin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pinnedNotices}개</div>
            <p className="text-xs text-muted-foreground">
              중요 공지사항
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">긴급 공지</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{urgentNotices}개</div>
            <p className="text-xs text-muted-foreground">
              확인 필요
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 조회수</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              전체 누적 조회수
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 검색 및 필터 */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 flex gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="제목, 내용, 작성자로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 카테고리</SelectItem>
                  <SelectItem value="일반">일반</SelectItem>
                  <SelectItem value="긴급">긴급</SelectItem>
                  <SelectItem value="인사">인사</SelectItem>
                  <SelectItem value="교육">교육</SelectItem>
                  <SelectItem value="시스템">시스템</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="우선순위" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 우선순위</SelectItem>
                  <SelectItem value="높음">높음</SelectItem>
                  <SelectItem value="보통">보통</SelectItem>
                  <SelectItem value="낮음">낮음</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  공지 작성
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>새 공지사항 작성</DialogTitle>
                  <DialogDescription>
                    새로운 공지사항을 작성하여 전체 직원에게 공유하세요.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">카테고리</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="카테고리 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="일반">일반</SelectItem>
                          <SelectItem value="긴급">긴급</SelectItem>
                          <SelectItem value="인사">인사</SelectItem>
                          <SelectItem value="교육">교육</SelectItem>
                          <SelectItem value="시스템">시스템</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">우선순위</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="우선순위 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="높음">높음</SelectItem>
                          <SelectItem value="보통">보통</SelectItem>
                          <SelectItem value="낮음">낮음</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">제목</Label>
                    <Input id="title" placeholder="공지사항 제목을 입력하세요" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">내용</Label>
                    <Textarea 
                      id="content" 
                      placeholder="공지사항 내용을 입력하세요" 
                      rows={8}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                      취소
                    </Button>
                    <Button onClick={() => setIsCreateModalOpen(false)}>
                      등록
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* 공지사항 목록 */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>제목</TableHead>
                <TableHead>카테고리</TableHead>
                <TableHead>작성자</TableHead>
                <TableHead>우선순위</TableHead>
                <TableHead>조회수</TableHead>
                <TableHead>작성일</TableHead>
                <TableHead className="text-right">작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedNotices.map((notice) => (
                <TableRow key={notice.id} className={notice.isPinned ? "bg-blue-50" : ""}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {notice.isPinned && (
                        <Pin className="h-4 w-4 text-blue-500" />
                      )}
                      <span className="cursor-pointer hover:text-blue-600" 
                            onClick={() => setSelectedNotice(notice)}>
                        {notice.title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={`${getCategoryColor(notice.category)} text-white`}
                    >
                      {notice.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {notice.author.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      {notice.author}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${getPriorityColor(notice.priority)}`}>
                      {notice.priority}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {notice.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {notice.comments}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{notice.createdDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setSelectedNotice(notice)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 공지사항 상세보기 모달 */}
      <Dialog open={!!selectedNotice} onOpenChange={() => setSelectedNotice(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedNotice && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  {selectedNotice.isPinned && (
                    <Pin className="h-5 w-5 text-blue-500" />
                  )}
                  <DialogTitle className="flex-1">{selectedNotice.title}</DialogTitle>
                  <Badge 
                    variant="secondary" 
                    className={`${getCategoryColor(selectedNotice.category)} text-white`}
                  >
                    {selectedNotice.category}
                  </Badge>
                </div>
                <DialogDescription>
                  공지사항 상세 내용을 확인하세요.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {selectedNotice.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {selectedNotice.createdDate}
                    </div>
                    <span className={`font-medium ${getPriorityColor(selectedNotice.priority)}`}>
                      우선순위: {selectedNotice.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {selectedNotice.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {selectedNotice.comments}
                    </span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {selectedNotice.content}
                  </p>
                </div>
                
                <div className="border-t pt-4 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelectedNotice(null)}>
                    닫기
                  </Button>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    수정
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}