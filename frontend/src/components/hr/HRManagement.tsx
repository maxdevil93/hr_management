import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Users, 
  Building, 
  UserPlus,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: "재직" | "휴직" | "퇴사";
  startDate: string;
  avatar?: string;
}

const mockEmployees: Employee[] = [
  {
    id: "EMP001",
    name: "김철수",
    position: "대리",
    department: "개발팀",
    email: "kim@company.com",
    phone: "010-1234-5678",
    status: "재직",
    startDate: "2022-03-15",
  },
  {
    id: "EMP002",
    name: "이영희",
    position: "과장",
    department: "마케팅팀",
    email: "lee@company.com",
    phone: "010-2345-6789",
    status: "재직",
    startDate: "2021-08-20",
  },
  {
    id: "EMP003",
    name: "박민수",
    position: "주임",
    department: "영업팀",
    email: "park@company.com",
    phone: "010-3456-7890",
    status: "휴직",
    startDate: "2023-01-10",
  },
  {
    id: "EMP004",
    name: "정유진",
    position: "사원",
    department: "인사팀",
    email: "jung@company.com",
    phone: "010-4567-8901",
    status: "재직",
    startDate: "2023-06-01",
  },
  {
    id: "EMP005",
    name: "최수진",
    position: "차장",
    department: "재무팀",
    email: "choi@company.com",
    phone: "010-5678-9012",
    status: "퇴사",
    startDate: "2020-04-15",
  },
];

const departmentStats = [
  { name: "개발팀", count: 25, manager: "김팀장" },
  { name: "마케팅팀", count: 12, manager: "이팀장" },
  { name: "영업팀", count: 18, manager: "박팀장" },
  { name: "인사팀", count: 8, manager: "정팀장" },
  { name: "재무팀", count: 10, manager: "최팀장" },
];

export function HRManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment;
    const matchesStatus = selectedStatus === "all" || employee.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "재직": return "bg-green-500";
      case "휴직": return "bg-yellow-500";
      case "퇴사": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">인사관리</h1>
        <p className="text-muted-foreground">직원 정보와 조직 현황을 관리하세요</p>
      </div>

      <Tabs defaultValue="employees" className="space-y-4">
        <TabsList>
          <TabsTrigger value="employees">직원 목록</TabsTrigger>
          <TabsTrigger value="departments">부서 현황</TabsTrigger>
          <TabsTrigger value="analytics">통계</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-4">
          {/* 검색 및 필터 영역 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                직원 관리
              </CardTitle>
              <CardDescription>직원 정보를 조회하고 관리할 수 있습니다</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="이름, 이메일, 부서로 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="부서 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 부서</SelectItem>
                    <SelectItem value="개발팀">개발팀</SelectItem>
                    <SelectItem value="마케팅팀">마케팅팀</SelectItem>
                    <SelectItem value="영업팀">영업팀</SelectItem>
                    <SelectItem value="인사팀">인사팀</SelectItem>
                    <SelectItem value="재무팀">재무팀</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full md:w-32">
                    <SelectValue placeholder="상태" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="재직">재직</SelectItem>
                    <SelectItem value="휴직">휴직</SelectItem>
                    <SelectItem value="퇴사">퇴사</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    직원 추가
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 직원 목록 테이블 */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>직원 정보</TableHead>
                    <TableHead>부서/직급</TableHead>
                    <TableHead>연락처</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>입사일</TableHead>
                    <TableHead className="text-right">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={employee.avatar} />
                            <AvatarFallback>{employee.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-muted-foreground">{employee.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{employee.department}</p>
                          <p className="text-sm text-muted-foreground">{employee.position}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{employee.email}</p>
                          <p className="text-sm text-muted-foreground">{employee.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={`${getStatusColor(employee.status)} text-white`}
                        >
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{employee.startDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon">
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                부서 현황
              </CardTitle>
              <CardDescription>각 부서별 인원 현황과 관리자 정보입니다</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departmentStats.map((dept) => (
                  <Card key={dept.name}>
                    <CardContent className="pt-6">
                      <div className="text-center space-y-2">
                        <h3 className="font-semibold">{dept.name}</h3>
                        <div className="text-2xl font-bold text-primary">{dept.count}명</div>
                        <p className="text-sm text-muted-foreground">관리자: {dept.manager}</p>
                        <Button variant="outline" size="sm" className="w-full">
                          상세 보기
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">총 직원 수</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">73명</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+5.2%</span> 전월 대비
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">신입 직원</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3명</div>
                <p className="text-xs text-muted-foreground">이번 달 입사</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">퇴사 직원</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1명</div>
                <p className="text-xs text-muted-foreground">이번 달 퇴사</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">평균 근속연수</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.8년</div>
                <p className="text-xs text-muted-foreground">전체 평균</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>월별 인사 현황</CardTitle>
              <CardDescription>입사자와 퇴사자 현황을 확인할 수 있습니다</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                차트 기능이 곧 추가될 예정입니다.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}