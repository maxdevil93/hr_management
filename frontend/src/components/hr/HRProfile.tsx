import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Building, 
  Clock,
  Edit,
  Save,
  X,
  Camera,
  Award,
  GraduationCap,
  Briefcase
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  joinDate: string;
  employeeId: string;
  status: string;
  avatar?: string;
  bio?: string;
}

interface WorkHistory {
  id: string;
  position: string;
  department: string;
  startDate: string;
  endDate?: string;
  description: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
}

const mockProfile: UserProfile = {
  id: "USER001",
  name: "김철수",
  position: "대리",
  department: "개발팀",
  email: "kim@company.com",
  phone: "010-1234-5678",
  birthDate: "1990-05-15",
  address: "서울시 강남구 테헤란로 123",
  joinDate: "2022-03-15",
  employeeId: "EMP001",
  status: "재직",
  bio: "웹 개발과 시스템 설계에 관심이 많은 개발자입니다. 새로운 기술을 배우고 적용하는 것을 좋아하며, 팀워크를 중시합니다.",
};

const mockWorkHistory: WorkHistory[] = [
  {
    id: "WH001",
    position: "대리",
    department: "개발팀",
    startDate: "2022-03-15",
    description: "웹 애플리케이션 개발 및 유지보수"
  },
  {
    id: "WH002",
    position: "사원",
    department: "개발팀",
    startDate: "2020-06-01",
    endDate: "2022-03-14",
    description: "프론트엔드 개발 담당"
  }
];

const mockEducation: Education[] = [
  {
    id: "EDU001",
    school: "서울대학교",
    degree: "학사",
    major: "컴퓨터공학과",
    startDate: "2016-03",
    endDate: "2020-02"
  },
  {
    id: "EDU002",
    school: "서울고등학교",
    degree: "졸업",
    major: "이과",
    startDate: "2013-03",
    endDate: "2016-02"
  }
];

const mockCertifications: Certification[] = [
  {
    id: "CERT001",
    name: "정보처리기사",
    issuer: "한국산업인력공단",
    issueDate: "2020-05-15"
  },
  {
    id: "CERT002",
    name: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    issueDate: "2023-01-10",
    expiryDate: "2026-01-10"
  }
];

export function HRProfile() {
  const [profile, setProfile] = useState(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(mockProfile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">인사정보</h1>
        <p className="text-muted-foreground">개인 프로필과 이력을 관리하세요</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 프로필 카드 */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="text-2xl">{profile.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="secondary" 
                className="absolute bottom-0 right-0 rounded-full w-8 h-8"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <CardTitle className="text-xl">{profile.name}</CardTitle>
              <CardDescription>{profile.position} • {profile.department}</CardDescription>
              <Badge variant="secondary" className="mt-2">
                {profile.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{profile.employeeId}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">입사일: {profile.joinDate}</span>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{profile.department}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 상세 정보 */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">기본 정보</TabsTrigger>
              <TabsTrigger value="history">경력</TabsTrigger>
              <TabsTrigger value="education">학력</TabsTrigger>
              <TabsTrigger value="certificates">자격증</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>기본 정보</CardTitle>
                    <CardDescription>개인 기본 정보를 관리합니다</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button variant="outline" size="sm" onClick={handleCancel}>
                          <X className="h-4 w-4 mr-2" />
                          취소
                        </Button>
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4 mr-2" />
                          저장
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={handleEdit}>
                        <Edit className="h-4 w-4 mr-2" />
                        편집
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">이름</Label>
                      <Input
                        id="name"
                        value={isEditing ? editedProfile.name : profile.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">직급</Label>
                      <Input
                        id="position"
                        value={isEditing ? editedProfile.position : profile.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">이메일</Label>
                      <Input
                        id="email"
                        type="email"
                        value={isEditing ? editedProfile.email : profile.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">전화번호</Label>
                      <Input
                        id="phone"
                        value={isEditing ? editedProfile.phone : profile.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">생년월일</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={isEditing ? editedProfile.birthDate : profile.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">부서</Label>
                      <Input
                        id="department"
                        value={isEditing ? editedProfile.department : profile.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">주소</Label>
                    <Input
                      id="address"
                      value={isEditing ? editedProfile.address : profile.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">자기소개</Label>
                    <Textarea
                      id="bio"
                      value={isEditing ? editedProfile.bio || '' : profile.bio || ''}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>경력 사항</CardTitle>
                    <CardDescription>회사 내 경력 이력을 관리합니다</CardDescription>
                  </div>
                  <Button size="sm">
                    <Briefcase className="h-4 w-4 mr-2" />
                    경력 추가
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockWorkHistory.map((work, index) => (
                      <div key={work.id}>
                        <div className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{work.position}</h4>
                              <span className="text-sm text-muted-foreground">
                                {work.startDate} - {work.endDate || '현재'}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{work.department}</p>
                            <p className="text-sm mt-1">{work.description}</p>
                          </div>
                        </div>
                        {index < mockWorkHistory.length - 1 && (
                          <Separator className="my-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>학력 사항</CardTitle>
                    <CardDescription>학력 정보를 관리합니다</CardDescription>
                  </div>
                  <Button size="sm">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    학력 추가
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockEducation.map((edu, index) => (
                      <div key={edu.id}>
                        <div className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{edu.school}</h4>
                              <span className="text-sm text-muted-foreground">
                                {edu.startDate} - {edu.endDate}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{edu.degree} • {edu.major}</p>
                          </div>
                        </div>
                        {index < mockEducation.length - 1 && (
                          <Separator className="my-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certificates">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>자격증</CardTitle>
                    <CardDescription>보유한 자격증을 관리합니다</CardDescription>
                  </div>
                  <Button size="sm">
                    <Award className="h-4 w-4 mr-2" />
                    자격증 추가
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockCertifications.map((cert) => (
                      <Card key={cert.id} className="p-4">
                        <div className="flex items-start gap-3">
                          <Award className="h-5 w-5 text-yellow-500 mt-1" />
                          <div className="flex-1">
                            <h5 className="font-medium">{cert.name}</h5>
                            <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                            <div className="text-xs text-muted-foreground mt-2">
                              <p>발급일: {cert.issueDate}</p>
                              {cert.expiryDate && (
                                <p>만료일: {cert.expiryDate}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}