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
  Building, 
  Eye, 
  Edit, 
  Trash2,
  MessageSquare,
  Calendar,
  User,
  Users,
  Filter
} from "lucide-react";

interface DepartmentNotice {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  department: string;
  category: "업무" | "회의" | "교육" | "이벤트" | "기타";
  priority: "높음" | "보통" | "낮음";
  targetMembers: string[];
  views: number;
  likes: number;
  comments: number;
  createdDate: string;
  updatedDate?: string;
  isActive: boolean;
}

const mockDepartmentNotices: DepartmentNotice[] = [
  {
    id: "DEPT001",
    title: "개발팀 주간 스프린트 회의 안내",
    content: "이번 주 스프린트 회의가 목요일 오후 2시에 진행됩니다. 진행 현황과 이슈 사항을 공유하겠습니다.",
    author: "김팀장",
    authorId: "DEV001",
    department: "개발팀",
    category: "회의",
    priority: "높음",
    targetMembers: ["전체"],
    views: 45,
    likes: 8,
    comments: 3,
    createdDate: "2024-08-26",
    isActive: true,
  },
  {
    id: "DEPT002",
    title: "마케팅팀 Q3 캠페인 결과 공유",
    content: "3분기 마케팅 캠페인 결과를 공유드립니다. 목표 대비 120% 달성하였습니다.",
    author: "이과장",
    authorId: "MKT001",
    department: "마케팅팀",
    category: "업무",
    priority: "보통",
    targetMembers: ["전체"],
    views: 72,
    likes: 15,
    comments: 8,
    createdDate: "2024-08-25",
    isActive: true,
  },
  {
    id: "DEPT003",
    title: "영업팀 신규 CRM 시스템 교육",
    content: "신규 도입된 CRM 시스템 사용법 교육을 실시합니다. 필수 참석 부탁드립니다.",
    author: "박차장",
    authorId: "SALES001",
    department: "영업팀",
    category: "교육",
    priority: "높음",
    targetMembers: ["전체"],
    views: 38,
    likes: 5,
    comments: 2,
    createdDate: "2024-08-24",
    isActive: true,
  },
  {
    id: "DEPT004",
    title: "인사팀 신입사원 오리엔테이션 준비",
    content: "다음 주 신입사원 오리엔테이션 준비사항을 확인해주세요. 담당자별 역할을 배정했습니다.",
    author: "정부장",
    authorId: "HR001",
    department: "인사팀",
    category: "업무",
    priority: "보통",
    targetMembers: ["김사원", "이대리", "박과장"],
    views: 23,
    likes: 3,
    comments: 1,
    createdDate: "2024-08-23",
    isActive: true,
  },
  {
    id: "DEPT005",
    title: "개발팀 회식 장소 투표",
    content: "팀 회식 장소를 결정하기 위한 투표를 진행합니다. 선택지는 다음과 같습니다.",
    author: "김팀장",
    authorId: "DEV001",
    department: "개발팀",
    category: "이벤트",
    priority: "낮음",
    targetMembers: ["전체"],
    views: 67,
    likes: 12,
    comments: 15,
    createdDate: "2024-08-22",
    isActive: true,
  },
];

const departments = ["전체", "개발팀", "마케팅팀", "영업팀", "인사팀", "재무팀"];

export function DepartmentNotices() {
  const [notices] = useState(mockDepartmentNotices);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("전체");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedNotice, setSelectedNotice] = useState<DepartmentNotice | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [userDepartment] = useState("개발팀"); // 현재 사용자의 부서

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "전체" || notice.department === selectedDepartment;
    const matchesCategory = selectedCategory === "all" || notice.category === selectedCategory;
    
    return matchesSearch && matchesDepartment && matchesCategory && notice.isActive;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "업무": return "bg-blue-500";
      case "회의": return "bg-green-500";
      case "교육": return "bg-purple-500";
      case "이벤트": return "bg-yellow-500";
      case "기타": return "bg-gray-500";
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

  const getDepartmentStats = () => {
    const stats: Record<string, number> = {};
    departments.forEach(dept => {
      if (dept === "전체") {
        stats[dept] = notices.filter(n => n.isActive).length;
      } else {
        stats[dept] = notices.filter(n => n.department === dept && n.isActive).length;
      }
    });
    return stats;
  };

  const departmentStats = getDepartmentStats();
  const myDepartmentNotices = notices.filter(n => n.department === userDepartment && n.isActive).length;
  const unreadNotices = Math.floor(Math.random() * 5) + 1; // 모의 미읽음 공지
  const totalViews = notices.reduce((sum, notice) => sum + notice.views, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">부서공지</h1>
        <p className="text-muted-foreground">부서별 공지사항을 확인하고 관리하세요</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">내 부서 공지</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myDepartmentNotices}개</div>
            <p className="text-xs text-muted-foreground">
              {userDepartment} 공지사항
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">미읽음 공지</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadNotices}개</div>
            <p className="text-xs text-muted-foreground">
              확인 필요한 공지
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 부서 공지</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departmentStats["전체"]}개</div>
            <p className="text-xs text-muted-foreground">
              모든 부서 공지
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 조회수</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
            <p className="text-xs text-muted-foreground">
              전체 누적 조회수
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="notices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notices">공지 목록</TabsTrigger>
          <TabsTrigger value="departments">부서별 현황</TabsTrigger>
        </TabsList>

        <TabsContent value="notices" className="space-y-4">
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
                  
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="부서 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="카테고리" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체 카테고리</SelectItem>
                      <SelectItem value="업무">업무</SelectItem>
                      <SelectItem value="회의">회의</SelectItem>
                      <SelectItem value="교육">교육</SelectItem>
                      <SelectItem value="이벤트">이벤트</SelectItem>
                      <SelectItem value="기타">기타</SelectItem>
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
                      <DialogTitle>부서 공지사항 작성</DialogTitle>
                      <DialogDescription>
                        부서 공지사항을 작성하여 팀원들에게 공유하세요.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="department">부서</Label>
                          <Select defaultValue={userDepartment}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.filter(d => d !== "전체").map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">카테고리</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="카테고리 선택" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="업무">업무</SelectItem>
                              <SelectItem value="회의">회의</SelectItem>
                              <SelectItem value="교육">교육</SelectItem>
                              <SelectItem value="이벤트">이벤트</SelectItem>
                              <SelectItem value="기타">기타</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
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
                    <TableHead>부서</TableHead>
                    <TableHead>카테고리</TableHead>
                    <TableHead>작성자</TableHead>
                    <TableHead>우선순위</TableHead>
                    <TableHead>조회수</TableHead>
                    <TableHead>작성일</TableHead>
                    <TableHead className="text-right">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotices.map((notice) => (
                    <TableRow key={notice.id}>
                      <TableCell className="font-medium">
                        <span className="cursor-pointer hover:text-blue-600" 
                              onClick={() => setSelectedNotice(notice)}>
                          {notice.title}
                        </span>
                        {notice.targetMembers.length > 0 && notice.targetMembers[0] !== "전체" && (
                          <div className="text-xs text-muted-foreground mt-1">
                            대상: {notice.targetMembers.join(", ")}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {notice.department}
                        </Badge>
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
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          {/* 부서별 통계 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.filter(d => d !== "전체").map((dept) => (
              <Card key={dept}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{dept}</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{departmentStats[dept] || 0}개</div>
                  <p className="text-xs text-muted-foreground">
                    이번 달 공지사항
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 부서별 최근 공지사항 */}
          <Card>
            <CardHeader>
              <CardTitle>부서별 최근 공지사항</CardTitle>
              <CardDescription>각 부서의 최신 공지사항을 확인하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departments.filter(d => d !== "전체").map((dept) => {
                  const recentNotice = notices.find(n => n.department === dept && n.isActive);
                  return (
                    <div key={dept} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{dept}</Badge>
                        <div>
                          <p className="font-medium">
                            {recentNotice ? recentNotice.title : "공지사항 없음"}
                          </p>
                          {recentNotice && (
                            <p className="text-sm text-muted-foreground">
                              {recentNotice.author} • {recentNotice.createdDate}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {departmentStats[dept] || 0}개 공지
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 공지사항 상세보기 모달 */}
      <Dialog open={!!selectedNotice} onOpenChange={() => setSelectedNotice(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedNotice && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <DialogTitle className="flex-1">{selectedNotice.title}</DialogTitle>
                  <Badge variant="outline">{selectedNotice.department}</Badge>
                  <Badge 
                    variant="secondary" 
                    className={`${getCategoryColor(selectedNotice.category)} text-white`}
                  >
                    {selectedNotice.category}
                  </Badge>
                </div>
                <DialogDescription>
                  {selectedNotice.department} 부서 공지사항입니다.
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

                {selectedNotice.targetMembers.length > 0 && selectedNotice.targetMembers[0] !== "전체" && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">대상자</p>
                    <p className="text-sm text-blue-700">{selectedNotice.targetMembers.join(", ")}</p>
                  </div>
                )}
                
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