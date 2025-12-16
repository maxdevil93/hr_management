import { useState, useRef } from "react";
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
import { Progress } from "../ui/progress";
import { 
  Calendar,
  Plus, 
  Clock, 
  Users, 
  MapPin, 
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
  GripVertical,
  AlertCircle,
  CheckCircle2,
  Pause,
  Play,
  User,
  FolderKanban,
  Target,
  Calendar as CalendarIcon,
  BarChart3,
  Settings,
  MoreHorizontal
} from "lucide-react";

interface ProjectMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar?: string;
  email: string;
  skills: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "계획" | "진행중" | "보류" | "완료" | "취소";
  priority: "낮음" | "보통" | "높음" | "긴급";
  progress: number;
  manager: string;
  members: string[]; // member IDs
  color: string;
  tasks: ProjectTask[];
  budget?: number;
  client?: string;
}

interface ProjectTask {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "할일" | "진행중" | "검토" | "완료" | "보류";
  assignedTo: string[];
  priority: "낮음" | "보통" | "높음" | "긴급";
  estimatedHours: number;
  actualHours: number;
  dependencies: string[]; // task IDs
  tags: string[];
}

const mockMembers: ProjectMember[] = [
  {
    id: "member1",
    name: "김철수",
    role: "시니어 개발자",
    department: "개발팀",
    email: "kim@company.com",
    skills: ["React", "Node.js", "TypeScript"]
  },
  {
    id: "member2", 
    name: "이영희",
    role: "프로젝트 매니저",
    department: "기획팀",
    email: "lee@company.com",
    skills: ["프로젝트 관리", "기획", "분석"]
  },
  {
    id: "member3",
    name: "박민수",
    role: "디자이너",
    department: "디자인팀", 
    email: "park@company.com",
    skills: ["UI/UX", "Figma", "Adobe"]
  },
  {
    id: "member4",
    name: "최지원",
    role: "백엔드 개발자",
    department: "개발팀",
    email: "choi@company.com",
    skills: ["Java", "Spring", "DB"]
  },
  {
    id: "member5",
    name: "정수현",
    role: "프론트엔드 개발자",
    department: "개발팀",
    email: "jung@company.com",
    skills: ["Vue.js", "React", "CSS"]
  },
  {
    id: "member6",
    name: "한미정",
    role: "QA 엔지니어",
    department: "QA팀",
    email: "han@company.com",
    skills: ["테스팅", "자동화", "품질관리"]
  }
];

const mockProjects: Project[] = [
  {
    id: "proj1",
    name: "ERP 시스템 개발",
    description: "기업 자원 관리 시스템 구축",
    startDate: "2024-08-01",
    endDate: "2024-12-31",
    status: "진행중",
    priority: "높음",
    progress: 65,
    manager: "member2",
    members: ["member1", "member2", "member3", "member4"],
    color: "#3b82f6",
    budget: 50000000,
    client: "ABC기업",
    tasks: [
      {
        id: "task1",
        title: "사용자 인터페이스 설계",
        description: "ERP 시스템의 메인 UI/UX 설계",
        startDate: "2024-08-01",
        endDate: "2024-08-15",
        status: "완료",
        assignedTo: ["member3"],
        priority: "높음",
        estimatedHours: 80,
        actualHours: 85,
        dependencies: [],
        tags: ["설계", "UI/UX"]
      },
      {
        id: "task2",
        title: "백엔드 API 개발",
        description: "REST API 서버 구축",
        startDate: "2024-08-16",
        endDate: "2024-09-30",
        status: "진행중",
        assignedTo: ["member4"],
        priority: "높음",
        estimatedHours: 120,
        actualHours: 80,
        dependencies: ["task1"],
        tags: ["백엔드", "API"]
      },
      {
        id: "task3",
        title: "프론트엔드 구현",
        description: "React 기반 프론트엔드 개발",
        startDate: "2024-09-01",
        endDate: "2024-11-15",
        status: "진행중",
        assignedTo: ["member1", "member5"],
        priority: "높음",
        estimatedHours: 200,
        actualHours: 120,
        dependencies: ["task1", "task2"],
        tags: ["프론트엔드", "React"]
      }
    ]
  },
  {
    id: "proj2",
    name: "모바일 앱 개발",
    description: "고객용 모바일 애플리케이션 개발",
    startDate: "2024-09-01",
    endDate: "2025-02-28",
    status: "계획",
    priority: "보통",
    progress: 5,
    manager: "member2",
    members: ["member1", "member3", "member5"],
    color: "#10b981",
    budget: 30000000,
    client: "XYZ기업",
    tasks: [
      {
        id: "task4",
        title: "앱 기획 및 설계",
        description: "모바일 앱 기능 정의 및 화면 설계",
        startDate: "2024-09-01",
        endDate: "2024-09-20",
        status: "할일",
        assignedTo: ["member2", "member3"],
        priority: "높음",
        estimatedHours: 60,
        actualHours: 0,
        dependencies: [],
        tags: ["기획", "설계"]
      }
    ]
  },
  {
    id: "proj3",
    name: "데이터 분석 플랫폼",
    description: "빅데이터 분석 및 대시보드 구축",
    startDate: "2024-07-15",
    endDate: "2024-10-31",
    status: "보류",
    priority: "낮음",
    progress: 30,
    manager: "member1",
    members: ["member1", "member4", "member6"],
    color: "#f59e0b",
    budget: 40000000,
    tasks: [
      {
        id: "task5",
        title: "데이터 수집 모듈",
        description: "다양한 소스에서 데이터 수집",
        startDate: "2024-07-15",
        endDate: "2024-08-30",
        status: "보류",
        assignedTo: ["member4"],
        priority: "보통",
        estimatedHours: 100,
        actualHours: 30,
        dependencies: [],
        tags: ["데이터", "수집"]
      }
    ]
  }
];

export function Schedule() {
  const [projects, setProjects] = useState(mockProjects);
  const [members] = useState(mockMembers);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [draggedTask, setDraggedTask] = useState<ProjectTask | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("projects");
  const [selectedMember, setSelectedMember] = useState<ProjectMember | null>(null);
  
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    manager: "",
    priority: "보통",
    budget: "",
    client: "",
    members: [] as string[]
  });

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    assignedTo: [] as string[],
    priority: "보통",
    estimatedHours: "",
    tags: ""
  });

  const dragRef = useRef<HTMLDivElement>(null);

  // 프로젝트 통계 계산
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === "진행중").length;
  const completedProjects = projects.filter(p => p.status === "완료").length;
  const onHoldProjects = projects.filter(p => p.status === "보류").length;

  // 멤버별 프로젝트 통계
  const getMemberProjects = (memberId: string) => {
    return projects.filter(project => project.members.includes(memberId));
  };

  const getMemberTasks = (memberId: string) => {
    const tasks: ProjectTask[] = [];
    projects.forEach(project => {
      project.tasks.forEach(task => {
        if (task.assignedTo.includes(memberId)) {
          tasks.push(task);
        }
      });
    });
    return tasks;
  };

  // 필터링된 프로젝트
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // 상태별 색상
  const getStatusColor = (status: string) => {
    switch (status) {
      case "계획": return "bg-gray-500";
      case "진행중": return "bg-blue-500";
      case "보류": return "bg-yellow-500";
      case "완료": return "bg-green-500";
      case "취소": return "bg-red-500";
      default: return "bg-gray-500";
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

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "할일": return "bg-gray-100 text-gray-800";
      case "진행중": return "bg-blue-100 text-blue-800";
      case "검토": return "bg-yellow-100 text-yellow-800";
      case "완료": return "bg-green-100 text-green-800";
      case "보류": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // 드래그 앤 드롭 핸들러
  const handleDragStart = (task: ProjectTask) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: string, projectId: string) => {
    e.preventDefault();
    if (draggedTask) {
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === projectId
            ? {
                ...project,
                tasks: project.tasks.map(task =>
                  task.id === draggedTask.id
                    ? { ...task, status: newStatus as any }
                    : task
                )
              }
            : project
        )
      );
      setDraggedTask(null);
    }
  };

  // 프로젝트 생성
  const handleCreateProject = () => {
    if (newProject.name.trim()) {
      const project: Project = {
        id: `proj${projects.length + 1}`,
        name: newProject.name,
        description: newProject.description,
        startDate: newProject.startDate,
        endDate: newProject.endDate,
        status: "계획",
        priority: newProject.priority as any,
        progress: 0,
        manager: newProject.manager,
        members: newProject.members,
        color: "#3b82f6",
        budget: newProject.budget ? parseInt(newProject.budget) : undefined,
        client: newProject.client,
        tasks: []
      };
      
      setProjects([...projects, project]);
      setNewProject({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        manager: "",
        priority: "보통",
        budget: "",
        client: "",
        members: []
      });
      setIsCreateProjectModalOpen(false);
    }
  };

  // 태스크 생성
  const handleCreateTask = () => {
    if (selectedProject && newTask.title.trim()) {
      const task: ProjectTask = {
        id: `task${Date.now()}`,
        title: newTask.title,
        description: newTask.description,
        startDate: newTask.startDate,
        endDate: newTask.endDate,
        status: "할일",
        assignedTo: newTask.assignedTo,
        priority: newTask.priority as any,
        estimatedHours: parseInt(newTask.estimatedHours) || 0,
        actualHours: 0,
        dependencies: [],
        tags: newTask.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      setProjects(prevProjects =>
        prevProjects.map(project =>
          project.id === selectedProject.id
            ? { ...project, tasks: [...project.tasks, task] }
            : project
        )
      );

      setNewTask({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        assignedTo: [],
        priority: "보통",
        estimatedHours: "",
        tags: ""
      });
      setIsCreateTaskModalOpen(false);
    }
  };

  // 프로젝트 상태 변경
  const handleProjectStatusChange = (projectId: string, newStatus: string) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId
          ? { ...project, status: newStatus as any }
          : project
      )
    );
  };

  // 프로젝트 삭제
  const handleDeleteProject = (projectId: string) => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
    }
  };

  // 태스크 삭제
  const handleDeleteTask = (projectId: string, taskId: string) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId
          ? { ...project, tasks: project.tasks.filter(task => task.id !== taskId) }
          : project
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">프로젝트 일정관리</h1>
        <p className="text-muted-foreground">프로젝트별 인원 배치와 일정을 체계적으로 관리하세요</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 프로젝트</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}개</div>
            <p className="text-xs text-muted-foreground">등록된 모든 프로젝트</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">진행중</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects}개</div>
            <p className="text-xs text-muted-foreground">현재 진행중인 프로젝트</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">완료</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedProjects}개</div>
            <p className="text-xs text-muted-foreground">완료된 프로젝트</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">보류</CardTitle>
            <Pause className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onHoldProjects}개</div>
            <p className="text-xs text-muted-foreground">보류중인 프로젝트</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">프로젝트 관리</TabsTrigger>
          <TabsTrigger value="kanban">칸반 보드</TabsTrigger>
          <TabsTrigger value="members">인원 현황</TabsTrigger>
          <TabsTrigger value="calendar">캘린더</TabsTrigger>
        </TabsList>

        {/* 프로젝트 관리 탭 */}
        <TabsContent value="projects" className="space-y-4">
          {/* 검색 및 필터 */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex-1 flex gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="프로젝트명, 설명으로 검색..."
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
                      <SelectItem value="계획">계획</SelectItem>
                      <SelectItem value="진행중">진행중</SelectItem>
                      <SelectItem value="보류">보류</SelectItem>
                      <SelectItem value="완료">완료</SelectItem>
                      <SelectItem value="취소">취소</SelectItem>
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

                <Dialog open={isCreateProjectModalOpen} onOpenChange={setIsCreateProjectModalOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      프로젝트 추가
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>새 프로젝트 생성</DialogTitle>
                      <DialogDescription>
                        새로운 프로젝트를 생성하고 팀원을 배정하세요.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="projectName">프로젝트명</Label>
                          <Input 
                            id="projectName"
                            placeholder="프로젝트명을 입력하세요"
                            value={newProject.name}
                            onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="manager">프로젝트 매니저</Label>
                          <Select value={newProject.manager} onValueChange={(value) => setNewProject({...newProject, manager: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="매니저 선택" />
                            </SelectTrigger>
                            <SelectContent>
                              {members.map(member => (
                                <SelectItem key={member.id} value={member.id}>
                                  {member.name} ({member.role})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">설명</Label>
                        <Textarea 
                          id="description"
                          placeholder="프로젝트 설명을 입력하세요"
                          value={newProject.description}
                          onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="startDate">시작일</Label>
                          <Input 
                            id="startDate"
                            type="date"
                            value={newProject.startDate}
                            onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endDate">종료일</Label>
                          <Input 
                            id="endDate"
                            type="date"
                            value={newProject.endDate}
                            onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="priority">우선순위</Label>
                          <Select value={newProject.priority} onValueChange={(value) => setNewProject({...newProject, priority: value})}>
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
                        <div className="space-y-2">
                          <Label htmlFor="budget">예산 (원)</Label>
                          <Input 
                            id="budget"
                            type="number"
                            placeholder="예산을 입력하세요"
                            value={newProject.budget}
                            onChange={(e) => setNewProject({...newProject, budget: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="client">클라이언트</Label>
                        <Input 
                          id="client"
                          placeholder="클라이언트명을 입력하세요"
                          value={newProject.client}
                          onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>팀원 선택</Label>
                        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                          {members.map(member => (
                            <div key={member.id} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`member-${member.id}`}
                                checked={newProject.members.includes(member.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setNewProject({...newProject, members: [...newProject.members, member.id]});
                                  } else {
                                    setNewProject({...newProject, members: newProject.members.filter(id => id !== member.id)});
                                  }
                                }}
                                className="rounded"
                              />
                              <label htmlFor={`member-${member.id}`} className="text-sm cursor-pointer">
                                {member.name} ({member.role})
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsCreateProjectModalOpen(false)}>
                          취소
                        </Button>
                        <Button onClick={handleCreateProject}>
                          생성
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
          </Card>

          {/* 프로젝트 목록 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: project.color }}
                        />
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <Badge 
                          variant="secondary" 
                          className={`${getStatusColor(project.status)} text-white`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <CardDescription className="mb-3">{project.description}</CardDescription>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4" />
                            {project.startDate} ~ {project.endDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {members.find(m => m.id === project.manager)?.name}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`${getPriorityColor(project.priority)}`}>
                            우선순위: {project.priority}
                          </span>
                          {project.budget && (
                            <span className="text-muted-foreground">
                              예산: {project.budget.toLocaleString()}원
                            </span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>진행률</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">팀원:</span>
                          <div className="flex -space-x-2">
                            {project.members.slice(0, 4).map(memberId => {
                              const member = members.find(m => m.id === memberId);
                              return member ? (
                                <Avatar key={member.id} className="w-6 h-6 border-2 border-background">
                                  <AvatarFallback className="text-xs">
                                    {member.name.slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                              ) : null;
                            })}
                            {project.members.length > 4 && (
                              <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                                <span className="text-xs">+{project.members.length - 4}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Select 
                        value={project.status} 
                        onValueChange={(value) => handleProjectStatusChange(project.id, value)}
                      >
                        <SelectTrigger className="w-[100px] h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="계획">계획</SelectItem>
                          <SelectItem value="진행중">진행중</SelectItem>
                          <SelectItem value="보류">보류</SelectItem>
                          <SelectItem value="완료">완료</SelectItem>
                          <SelectItem value="취소">취소</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setSelectedProject(project)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">태스크 목록</h4>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedProject(project);
                          setIsCreateTaskModalOpen(true);
                        }}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        태스크 추가
                      </Button>
                    </div>
                    
                    {project.tasks.length > 0 ? (
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {project.tasks.map(task => (
                          <div key={task.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className={`text-xs ${getTaskStatusColor(task.status)}`}>
                                  {task.status}
                                </Badge>
                                <span className="text-sm font-medium">{task.title}</span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                <span>{task.startDate} ~ {task.endDate}</span>
                                <span className={getPriorityColor(task.priority)}>
                                  {task.priority}
                                </span>
                                <span>
                                  {task.assignedTo.length > 0 && 
                                    members.find(m => m.id === task.assignedTo[0])?.name
                                  }
                                  {task.assignedTo.length > 1 && ` 외 ${task.assignedTo.length - 1}명`}
                                </span>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleDeleteTask(project.id, task.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        등록된 태스크가 없습니다.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 칸반 보드 탭 */}
        <TabsContent value="kanban" className="space-y-4">
          {selectedProject ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedProject.name} - 칸반 보드</CardTitle>
                    <CardDescription>드래그 앤 드롭으로 태스크 상태를 변경하세요</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedProject(null)}
                    >
                      뒤로가기
                    </Button>
                    <Button onClick={() => setIsCreateTaskModalOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      태스크 추가
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {["할일", "진행중", "검토", "완료", "보류"].map(status => (
                    <div 
                      key={status} 
                      className="space-y-2"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, status, selectedProject.id)}
                    >
                      <h3 className="font-medium text-center p-2 bg-muted rounded-lg">
                        {status} ({selectedProject.tasks.filter(t => t.status === status).length})
                      </h3>
                      <div className="space-y-2 min-h-[200px]">
                        {selectedProject.tasks
                          .filter(task => task.status === status)
                          .map(task => (
                            <div 
                              key={task.id}
                              className="p-3 bg-card border rounded-lg cursor-move hover:shadow-md transition-shadow"
                              draggable
                              onDragStart={() => handleDragStart(task)}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-sm">{task.title}</h4>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => handleDeleteTask(selectedProject.id, task.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                {task.description}
                              </p>
                              
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <span>{task.startDate}</span>
                                  <span className={getPriorityColor(task.priority)}>
                                    {task.priority}
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <div className="flex -space-x-1">
                                    {task.assignedTo.slice(0, 2).map(memberId => {
                                      const member = members.find(m => m.id === memberId);
                                      return member ? (
                                        <Avatar key={member.id} className="w-5 h-5 border border-background">
                                          <AvatarFallback className="text-xs">
                                            {member.name.slice(0, 1)}
                                          </AvatarFallback>
                                        </Avatar>
                                      ) : null;
                                    })}
                                    {task.assignedTo.length > 2 && (
                                      <div className="w-5 h-5 rounded-full bg-muted border border-background flex items-center justify-center">
                                        <span className="text-xs">+{task.assignedTo.length - 2}</span>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {task.tags.length > 0 && (
                                    <div className="flex gap-1">
                                      {task.tags.slice(0, 2).map(tag => (
                                        <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                                          {tag}
                                        </Badge>
                                      ))}
                                      {task.tags.length > 2 && (
                                        <Badge variant="outline" className="text-xs px-1 py-0">
                                          +{task.tags.length - 2}
                                        </Badge>
                                      )}
                                    </div>
                                  )}
                                </div>
                                
                                <div className="text-xs text-muted-foreground">
                                  예상: {task.estimatedHours}h | 실제: {task.actualHours}h
                                </div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <FolderKanban className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="font-medium">프로젝트를 선택하세요</h3>
                    <p className="text-sm text-muted-foreground">
                      칸반 보드를 보려면 먼저 프로젝트를 선택해주세요.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {projects.map(project => (
                      <Button 
                        key={project.id}
                        variant="outline" 
                        onClick={() => setSelectedProject(project)}
                        className="flex items-center gap-2"
                      >
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: project.color }}
                        />
                        {project.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* 인원 현황 탭 */}
        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>팀원별 프로젝트 현황</CardTitle>
              <CardDescription>각 팀원의 담당 프로젝트와 태스크 현황을 확인하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map(member => {
                  const memberProjects = getMemberProjects(member.id);
                  const memberTasks = getMemberTasks(member.id);
                  const activeTasks = memberTasks.filter(t => t.status === "진행중").length;
                  const completedTasks = memberTasks.filter(t => t.status === "완료").length;
                  
                  return (
                    <Card key={member.id} className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setSelectedMember(member)}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                            <p className="text-xs text-muted-foreground">{member.department}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="space-y-1">
                            <div className="text-lg font-bold text-blue-600">{memberProjects.length}</div>
                            <div className="text-xs text-muted-foreground">프로젝트</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-lg font-bold text-yellow-600">{activeTasks}</div>
                            <div className="text-xs text-muted-foreground">진행중</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-lg font-bold text-green-600">{completedTasks}</div>
                            <div className="text-xs text-muted-foreground">완료</div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">참여 프로젝트</h4>
                          {memberProjects.length > 0 ? (
                            <div className="space-y-1">
                              {memberProjects.slice(0, 2).map(project => (
                                <div key={project.id} className="flex items-center gap-2">
                                  <div 
                                    className="w-2 h-2 rounded-full" 
                                    style={{ backgroundColor: project.color }}
                                  />
                                  <span className="text-xs">{project.name}</span>
                                  <Badge variant="outline" className={`text-xs ${getStatusColor(project.status)} text-white`}>
                                    {project.status}
                                  </Badge>
                                </div>
                              ))}
                              {memberProjects.length > 2 && (
                                <div className="text-xs text-muted-foreground">
                                  외 {memberProjects.length - 2}개 프로젝트
                                </div>
                              )}
                            </div>
                          ) : (
                            <p className="text-xs text-muted-foreground">참여중인 프로젝트가 없습니다.</p>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">보유 스킬</h4>
                          <div className="flex flex-wrap gap-1">
                            {member.skills.slice(0, 3).map(skill => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {member.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{member.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 캘린더 탭 */}
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>프로젝트 캘린더</CardTitle>
              <CardDescription>프로젝트와 태스크 일정을 달력으로 확인하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">캘린더 기능</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  프로젝트 일정과 태스크를 달력 형태로 보여주는 기능이 곧 추가될 예정입니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-sm mb-2">예정 기능</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• 월/주/일 달력 보기</li>
                      <li>• 프로젝트 일정 표시</li>
                      <li>• 태스크 마감일 확인</li>
                      <li>• 팀원별 일정 조회</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-sm mb-2">현재 활성 프로젝트</h4>
                    <div className="space-y-1">
                      {projects.filter(p => p.status === "진행중").map(project => (
                        <div key={project.id} className="flex items-center gap-2 text-xs">
                          <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: project.color }}
                          />
                          <span>{project.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 태스크 생성 모달 */}
      <Dialog open={isCreateTaskModalOpen} onOpenChange={setIsCreateTaskModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>새 태스크 생성</DialogTitle>
            <DialogDescription>
              {selectedProject?.name}에 새로운 태스크를 추가하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="taskTitle">태스크명</Label>
              <Input 
                id="taskTitle"
                placeholder="태스크명을 입력하세요"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taskDescription">설명</Label>
              <Textarea 
                id="taskDescription"
                placeholder="태스크 설명을 입력하세요"
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taskStartDate">시작일</Label>
                <Input 
                  id="taskStartDate"
                  type="date"
                  value={newTask.startDate}
                  onChange={(e) => setNewTask({...newTask, startDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taskEndDate">종료일</Label>
                <Input 
                  id="taskEndDate"
                  type="date"
                  value={newTask.endDate}
                  onChange={(e) => setNewTask({...newTask, endDate: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taskPriority">우선순위</Label>
                <Select value={newTask.priority} onValueChange={(value) => setNewTask({...newTask, priority: value})}>
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
              <div className="space-y-2">
                <Label htmlFor="estimatedHours">예상 작업시간 (시간)</Label>
                <Input 
                  id="estimatedHours"
                  type="number"
                  placeholder="예상 시간"
                  value={newTask.estimatedHours}
                  onChange={(e) => setNewTask({...newTask, estimatedHours: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>담당자 선택</Label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded-lg p-3">
                {selectedProject?.members.map(memberId => {
                  const member = members.find(m => m.id === memberId);
                  return member ? (
                    <div key={member.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`task-member-${member.id}`}
                        checked={newTask.assignedTo.includes(member.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewTask({...newTask, assignedTo: [...newTask.assignedTo, member.id]});
                          } else {
                            setNewTask({...newTask, assignedTo: newTask.assignedTo.filter(id => id !== member.id)});
                          }
                        }}
                        className="rounded"
                      />
                      <label htmlFor={`task-member-${member.id}`} className="text-sm cursor-pointer">
                        {member.name} ({member.role})
                      </label>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">태그 (쉼표로 구분)</Label>
              <Input 
                id="tags"
                placeholder="예: 프론트엔드, React, 우선처리"
                value={newTask.tags}
                onChange={(e) => setNewTask({...newTask, tags: e.target.value})}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateTaskModalOpen(false)}>
                취소
              </Button>
              <Button onClick={handleCreateTask}>
                생성
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 멤버 상세 정보 모달 */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-2xl">
          {selectedMember && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedMember.avatar} />
                    <AvatarFallback>{selectedMember.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{selectedMember.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedMember.role} • {selectedMember.department}</div>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  {selectedMember.email}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">보유 스킬</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map(skill => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">참여 프로젝트 ({getMemberProjects(selectedMember.id).length}개)</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {getMemberProjects(selectedMember.id).map(project => (
                      <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: project.color }}
                          />
                          <div>
                            <div className="font-medium text-sm">{project.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {project.startDate} ~ {project.endDate}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className={`${getStatusColor(project.status)} text-white mb-1`}>
                            {project.status}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {project.manager === selectedMember.id ? "매니저" : "팀원"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">담당 태스크 ({getMemberTasks(selectedMember.id).length}개)</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {getMemberTasks(selectedMember.id).map(task => {
                      const project = projects.find(p => p.tasks.some(t => t.id === task.id));
                      return (
                        <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{task.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {project?.name} • {task.startDate} ~ {task.endDate}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className={`${getTaskStatusColor(task.status)} mb-1`}>
                              {task.status}
                            </Badge>
                            <div className="text-xs text-muted-foreground">
                              {task.estimatedHours}h 예상
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}