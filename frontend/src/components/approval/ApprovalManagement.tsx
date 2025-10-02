import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { 
  CheckSquare,
  Plus, 
  Clock, 
  Users, 
  FileText, 
  Search,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Calendar,
  Building,
  ChevronRight,
  Download,
  Upload,
  Filter,
  MoreHorizontal,
  Send,
  ArrowRight
} from "lucide-react";

interface ApprovalRequest {
  id: string;
  title: string;
  type: "휴가" | "출장" | "구매" | "계약" | "인사" | "예산" | "기타";
  requester: string;
  requesterId: string;
  department: string;
  submittedDate: string;
  status: "대기중" | "검토중" | "승인" | "반려" | "보류";
  priority: "낮음" | "보통" | "높음" | "긴급";
  description: string;
  amount?: number;
  attachments?: string[];
  approvers: ApprovalStep[];
  currentStep: number;
  comments: ApprovalComment[];
}

interface ApprovalStep {
  id: string;
  order: number;
  approverId: string;
  approverName: string;
  approverRole: string;
  status: "대기중" | "승인" | "반려" | "보류";
  approvedDate?: string;
  comment?: string;
}

interface ApprovalComment {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  createdDate: string;
  type: "일반" | "승인" | "반려" | "보류";
}

const mockApprovalRequests: ApprovalRequest[] = [
  {
    id: "APR-001",
    title: "연차 휴가 신청 (3일)",
    type: "휴가",
    requester: "김철수",
    requesterId: "EMP001",
    department: "개발팀",
    submittedDate: "2024-08-26",
    status: "검토중",
    priority: "보통",
    description: "가족 여행을 위한 연차 휴가를 신청합니다. 8월 30일~9월 1일 3일간 휴가를 사용하겠습니다.",
    approvers: [
      {
        id: "step1",
        order: 1,
        approverId: "MGR001",
        approverName: "이팀장",
        approverRole: "팀장",
        status: "승인",
        approvedDate: "2024-08-26",
        comment: "업무 인수인계 확인 완료. 승인합니다."
      },
      {
        id: "step2",
        order: 2,
        approverId: "DIR001",
        approverName: "박부장",
        approverRole: "부장",
        status: "대기중"
      }
    ],
    currentStep: 2,
    comments: [
      {
        id: "comment1",
        userId: "EMP001",
        userName: "김철수",
        comment: "업무 인수인계는 정수현 사원에게 완료했습니다.",
        createdDate: "2024-08-26",
        type: "일반"
      }
    ]
  },
  {
    id: "APR-002",
    title: "신규 개발 장비 구매 요청",
    type: "구매",
    requester: "이영희",
    requesterId: "EMP002",
    department: "개발팀",
    submittedDate: "2024-08-25",
    status: "승인",
    priority: "높음",
    description: "개발 효율성 향상을 위한 고성능 워크스테이션 구매 요청",
    amount: 3500000,
    attachments: ["견적서.pdf", "사양서.pdf"],
    approvers: [
      {
        id: "step1",
        order: 1,
        approverId: "MGR001",
        approverName: "이팀장",
        approverRole: "팀장",
        status: "승인",
        approvedDate: "2024-08-25",
        comment: "필요한 장비입니다. 승인합니다."
      },
      {
        id: "step2",
        order: 2,
        approverId: "FIN001",
        approverName: "최재무",
        approverRole: "재무팀장",
        status: "승인",
        approvedDate: "2024-08-25",
        comment: "예산 범위 내에서 승인합니다."
      }
    ],
    currentStep: 2,
    comments: []
  },
  {
    id: "APR-003",
    title: "클라이언트 미팅 출장 신청",
    type: "출장",
    requester: "박민수",
    requesterId: "EMP003",
    department: "영업팀",
    submittedDate: "2024-08-24",
    status: "반려",
    priority: "보통",
    description: "ABC 기업과의 계약 논의를 위한 부산 출장 신청",
    amount: 450000,
    approvers: [
      {
        id: "step1",
        order: 1,
        approverId: "MGR002",
        approverName: "정팀장",
        approverRole: "팀장",
        status: "반려",
        approvedDate: "2024-08-24",
        comment: "화상회의로 대체 가능합니다. 출장 필요성을 재검토해주세요."
      }
    ],
    currentStep: 1,
    comments: [
      {
        id: "comment2",
        userId: "EMP003",
        userName: "박민수",
        comment: "클라이언트 요청으로 대면 미팅이 필요한 상황입니다.",
        createdDate: "2024-08-24",
        type: "일반"
      }
    ]
  },
  {
    id: "APR-004",
    title: "신규 직원 채용 승인 요청",
    type: "인사",
    requester: "한미정",
    requesterId: "HR001",
    department: "인사팀",
    submittedDate: "2024-08-23",
    status: "보류",
    priority: "높음",
    description: "개발팀 시니어 개발자 1명 채용 승인 요청",
    amount: 45000000,
    approvers: [
      {
        id: "step1",
        order: 1,
        approverId: "MGR001",
        approverName: "이팀장",
        approverRole: "팀장",
        status: "승인",
        approvedDate: "2024-08-23",
        comment: "팀 확장이 필요합니다."
      },
      {
        id: "step2",
        order: 2,
        approverId: "CEO001",
        approverName: "김대표",
        approverRole: "대표이사",
        status: "보류",
        approvedDate: "2024-08-23",
        comment: "Q4 예산 검토 후 재논의 예정"
      }
    ],
    currentStep: 2,
    comments: []
  },
  {
    id: "APR-005",
    title: "마케팅 캠페인 예산 승인",
    type: "예산",
    requester: "최수진",
    requesterId: "MKT001",
    department: "마케팅팀",
    submittedDate: "2024-08-22",
    status: "대기중",
    priority: "긴급",
    description: "Q4 신제품 런칭 캠페인 예산 승인 요청",
    amount: 15000000,
    attachments: ["캠페인_기획서.pdf", "예산_계획서.xlsx"],
    approvers: [
      {
        id: "step1",
        order: 1,
        approverId: "MGR003",
        approverName: "윤팀장",
        approverRole: "팀장",
        status: "대기중"
      },
      {
        id: "step2",
        order: 2,
        approverId: "FIN001",
        approverName: "최재무",
        approverRole: "재무팀장",
        status: "대기중"
      }
    ],
    currentStep: 1,
    comments: []
  }
];

export function ApprovalManagement() {
  const [requests] = useState(mockApprovalRequests);
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  // 필터링된 결재 요청
  const filteredRequests = requests.filter((request) => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    const matchesType = typeFilter === "all" || request.type === typeFilter;
    const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  // 탭별 필터링
  const getRequestsByTab = (tab: string) => {
    switch (tab) {
      case "pending":
        return filteredRequests.filter(r => r.status === "대기중");
      case "reviewing":
        return filteredRequests.filter(r => r.status === "검토중");
      case "approved":
        return filteredRequests.filter(r => r.status === "승인");
      case "rejected":
        return filteredRequests.filter(r => r.status === "반려" || r.status === "보류");
      default:
        return filteredRequests;
    }
  };

  const currentRequests = getRequestsByTab(activeTab);

  // 상태별 색상
  const getStatusColor = (status: string) => {
    switch (status) {
      case "대기중": return "bg-gray-500";
      case "검토중": return "bg-blue-500";
      case "승인": return "bg-green-500";
      case "반려": return "bg-red-500";
      case "보류": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "휴가": return "bg-blue-100 text-blue-800";
      case "출장": return "bg-purple-100 text-purple-800";
      case "구매": return "bg-orange-100 text-orange-800";
      case "계약": return "bg-teal-100 text-teal-800";
      case "인사": return "bg-pink-100 text-pink-800";
      case "예산": return "bg-green-100 text-green-800";
      case "기타": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "낮음": return "text-green-600";
      case "보통": return "text-yellow-600";
      case "높음": return "text-orange-600";
      case "긴급": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  // 통계 계산
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === "대기중").length;
  const reviewingRequests = requests.filter(r => r.status === "검토중").length;
  const approvedRequests = requests.filter(r => r.status === "승인").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">결재관리</h1>
        <p className="text-muted-foreground">결재 요청을 체계적으로 관리하고 승인 프로세스를 추적하세요</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 요청</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}건</div>
            <p className="text-xs text-muted-foreground">이번 달 총 결재 요청</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">대기중</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}건</div>
            <p className="text-xs text-muted-foreground">승인 대기중인 요청</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">검토중</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviewingRequests}건</div>
            <p className="text-xs text-muted-foreground">현재 검토중인 요청</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">승인 완료</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedRequests}건</div>
            <p className="text-xs text-muted-foreground">승인 완료된 요청</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="pending">대기중</TabsTrigger>
          <TabsTrigger value="reviewing">검토중</TabsTrigger>
          <TabsTrigger value="approved">승인완료</TabsTrigger>
          <TabsTrigger value="rejected">반려/보류</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {/* 검색 및 필터 */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex-1 flex gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="제목, 신청자, 부서로 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="상태" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체 상태</SelectItem>
                      <SelectItem value="대기중">대기중</SelectItem>
                      <SelectItem value="검토중">검토중</SelectItem>
                      <SelectItem value="승인">승인</SelectItem>
                      <SelectItem value="반려">반려</SelectItem>
                      <SelectItem value="보류">보류</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="유형" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체 유형</SelectItem>
                      <SelectItem value="휴가">휴가</SelectItem>
                      <SelectItem value="출장">출장</SelectItem>
                      <SelectItem value="구매">구매</SelectItem>
                      <SelectItem value="계약">계약</SelectItem>
                      <SelectItem value="인사">인사</SelectItem>
                      <SelectItem value="예산">예산</SelectItem>
                      <SelectItem value="기타">기타</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="우선순위" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체 우선순위</SelectItem>
                      <SelectItem value="낮음">낮음</SelectItem>
                      <SelectItem value="보통">보통</SelectItem>
                      <SelectItem value="높음">높음</SelectItem>
                      <SelectItem value="긴급">긴급</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      결재 요청
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>새 결재 요청</DialogTitle>
                      <DialogDescription>
                        새로운 결재 요청을 작성하세요.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="type">결재 유형</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="유형 선택" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="휴가">휴가</SelectItem>
                              <SelectItem value="출장">출장</SelectItem>
                              <SelectItem value="구매">구매</SelectItem>
                              <SelectItem value="계약">계약</SelectItem>
                              <SelectItem value="인사">인사</SelectItem>
                              <SelectItem value="예산">예산</SelectItem>
                              <SelectItem value="기타">기타</SelectItem>
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
                              <SelectItem value="낮음">낮음</SelectItem>
                              <SelectItem value="보통">보통</SelectItem>
                              <SelectItem value="높음">높음</SelectItem>
                              <SelectItem value="긴급">긴급</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="title">제목</Label>
                        <Input id="title" placeholder="결재 요청 제목을 입력하세요" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">내용</Label>
                        <Textarea 
                          id="description"
                          placeholder="결재 요청 내용을 상세히 입력하세요"
                          rows={4}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="amount">금액 (선택사항)</Label>
                        <Input 
                          id="amount"
                          type="number"
                          placeholder="금액을 입력하세요"
                        />
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                          취소
                        </Button>
                        <Button onClick={() => setIsCreateModalOpen(false)}>
                          <Send className="h-4 w-4 mr-2" />
                          제출
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
          </Card>

          {/* 결재 요청 목록 */}
          <div className="space-y-4">
            {currentRequests.map((request) => (
              <Card key={request.id} className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedRequest(request)}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{request.title}</h3>
                        <Badge variant="outline" className={getTypeColor(request.type)}>
                          {request.type}
                        </Badge>
                        <Badge variant="secondary" className={`${getStatusColor(request.status)} text-white`}>
                          {request.status}
                        </Badge>
                        <span className={`text-sm ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {request.description}
                      </p>
                      
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{request.requester} ({request.department})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{request.submittedDate}</span>
                        </div>
                        {request.amount && (
                          <div className="flex items-center gap-2">
                            <span>₩{request.amount.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      
                      {/* 승인 단계 표시 */}
                      <div className="text-xs text-muted-foreground">
                        {request.currentStep}/{request.approvers.length} 단계
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* 승인자 상태 */}
                  <div className="flex items-center gap-2">
                    {request.approvers.map((approver, index) => (
                      <div key={approver.id} className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {approver.approverName.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs">{approver.approverName}</span>
                          <div className={`w-2 h-2 rounded-full ${
                            approver.status === "승인" ? "bg-green-500" :
                            approver.status === "반려" ? "bg-red-500" :
                            approver.status === "보류" ? "bg-yellow-500" :
                            "bg-gray-300"
                          }`} />
                        </div>
                        {index < request.approvers.length - 1 && (
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {currentRequests.length === 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium mb-2">결재 요청이 없습니다</h3>
                    <p className="text-sm text-muted-foreground">
                      조건에 맞는 결재 요청을 찾을 수 없습니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* 결재 요청 상세보기 모달 */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedRequest && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DialogTitle>{selectedRequest.title}</DialogTitle>
                    <Badge variant="outline" className={getTypeColor(selectedRequest.type)}>
                      {selectedRequest.type}
                    </Badge>
                    <Badge variant="secondary" className={`${getStatusColor(selectedRequest.status)} text-white`}>
                      {selectedRequest.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      다운로드
                    </Button>
                  </div>
                </div>
                <DialogDescription>
                  {selectedRequest.id} • {selectedRequest.submittedDate} 제출
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* 기본 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">신청자 정보</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedRequest.requester}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedRequest.department}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedRequest.submittedDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">요청 정보</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">우선순위:</span>
                        <span className={getPriorityColor(selectedRequest.priority)}>
                          {selectedRequest.priority}
                        </span>
                      </div>
                      {selectedRequest.amount && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">금액:</span>
                          <span>₩{selectedRequest.amount.toLocaleString()}</span>
                        </div>
                      )}
                      {selectedRequest.attachments && selectedRequest.attachments.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">첨부파일:</span>
                          <span>{selectedRequest.attachments.join(", ")}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* 요청 내용 */}
                <div>
                  <h4 className="font-medium mb-3">요청 내용</h4>
                  <p className="text-sm leading-relaxed">{selectedRequest.description}</p>
                </div>

                <Separator />

                {/* 승인 과정 */}
                <div>
                  <h4 className="font-medium mb-4">승인 과정</h4>
                  <div className="space-y-4">
                    {selectedRequest.approvers.map((approver, index) => (
                      <div key={approver.id} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                            approver.status === "승인" ? "bg-green-500" :
                            approver.status === "반려" ? "bg-red-500" :
                            approver.status === "보류" ? "bg-yellow-500" :
                            "bg-gray-300"
                          }`}>
                            {approver.status === "승인" ? <CheckCircle className="h-4 w-4" /> :
                             approver.status === "반려" ? <XCircle className="h-4 w-4" /> :
                             approver.status === "보류" ? <AlertCircle className="h-4 w-4" /> :
                             <Clock className="h-4 w-4" />}
                          </div>
                          {index < selectedRequest.approvers.length - 1 && (
                            <div className="w-px h-8 bg-border mt-2" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{approver.approverName}</span>
                            <span className="text-sm text-muted-foreground">({approver.approverRole})</span>
                            <Badge variant="outline" className={`${
                              approver.status === "승인" ? "bg-green-100 text-green-800" :
                              approver.status === "반려" ? "bg-red-100 text-red-800" :
                              approver.status === "보류" ? "bg-yellow-100 text-yellow-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {approver.status}
                            </Badge>
                          </div>
                          {approver.approvedDate && (
                            <p className="text-xs text-muted-foreground mb-2">
                              {approver.approvedDate}
                            </p>
                          )}
                          {approver.comment && (
                            <p className="text-sm bg-muted p-3 rounded-lg">
                              {approver.comment}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 댓글 섹션 */}
                {selectedRequest.comments.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-4">댓글</h4>
                      <div className="space-y-3">
                        {selectedRequest.comments.map((comment) => (
                          <div key={comment.id} className="flex gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs">
                                {comment.userName.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{comment.userName}</span>
                                <span className="text-xs text-muted-foreground">{comment.createdDate}</span>
                              </div>
                              <p className="text-sm">{comment.comment}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* 댓글 작성 */}
                <div>
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">관리</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Textarea 
                        placeholder="댓글을 입력하세요..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                      />
                      <div className="flex justify-end">
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-2" />
                          댓글 작성
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 승인/반려 버튼 (승인자인 경우) */}
                {selectedRequest.status === "대기중" || selectedRequest.status === "검토중" ? (
                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button variant="outline">
                      <XCircle className="h-4 w-4 mr-2" />
                      반려
                    </Button>
                    <Button variant="outline">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      보류
                    </Button>
                    <Button>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      승인
                    </Button>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}