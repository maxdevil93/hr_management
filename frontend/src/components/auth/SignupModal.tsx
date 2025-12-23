import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { User } from "lucide-react";
import "../../styles/signup-modal.css";
import { signupUser } from "../../api/auth";

declare global {
  interface Window {
    daum?: any;
  }
}

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export function SignupModal({ isOpen, onClose, onSuccess }: SignupModalProps) {
  const [signupForm, setSignupForm] = useState({
    empName: "",
    email: "",
    pw: "",
    pwConfirm: "",
    birth: "",
    gender: "",
    tel: "",
    addr: "",
    addrDetail: "",
    position: "",
    job: "",
    startDate: "",
    workType: "",
  });
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [addrError, setAddrError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!window.daum) {
      const script = document.createElement("script");
      script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleSearchAddress = () => {
    if (!window.daum?.Postcode) {
      setAddrError("주소 검색 스크립트를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    setAddrError(null);
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        const fullAddr = data.roadAddress || data.address || "";
        const extra = data.buildingName ? ` ${data.buildingName}` : "";
        setSignupForm((prev) => ({ ...prev, addr: `${fullAddr}${extra}`.trim() }));
      },
    }).open();
  };

  const isPwMismatch = Boolean(
    signupForm.pw &&
    signupForm.pwConfirm &&
    signupForm.pw !== signupForm.pwConfirm
  );

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { empName, email, pw, pwConfirm } = signupForm;
    if (!empName || !email || !pw || !pwConfirm || isPwMismatch) return;

    setIsSignupLoading(true);
    setSubmitError(null);

    try {
      const fullAddress = [signupForm.addr, signupForm.addrDetail].filter(Boolean).join(" ").trim() || null;

      await signupUser({
        empName: signupForm.empName,
        email: signupForm.email,
        pw: signupForm.pw,
        birth: signupForm.birth || null,
        gender: signupForm.gender || null,
        tel: signupForm.tel || null,
        addr: fullAddress,
        position: signupForm.position || null,
        job: signupForm.job || null,
        start_date: signupForm.startDate || null,
        workType: signupForm.workType || null,
        approval: 0,
        isActive: true,
      });

      onSuccess(email);
      setSignupForm({
        empName: "",
        email: "",
        pw: "",
        pwConfirm: "",
        birth: "",
        gender: "",
        tel: "",
        addr: "",
        addrDetail: "",
        position: "",
        job: "",
        startDate: "",
        workType: "",
      });
    } catch (error: any) {
      setSubmitError(error?.message || "회원가입 요청 중 오류가 발생했습니다.");
    } finally {
      setIsSignupLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="signup-modal-content">
        <DialogHeader>
          <DialogTitle className="text-center">회원가입</DialogTitle>
          <DialogDescription className="text-center">
            기본 정보를 입력하고 계정을 생성하세요.
          </DialogDescription>
        </DialogHeader>

        <Card className="border-0 shadow-none">
          <CardHeader className="text-center pb-2">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle>새 계정 생성</CardTitle>
            <CardDescription>필수 정보를 모두 입력해주세요.</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignup} className="signup-form">
              <div className="signup-row">
                <Label htmlFor="signup-empName" className="text-right">
                  이름
                </Label>
                <Input
                  id="signup-empName"
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={signupForm.empName}
                  onChange={(e) => setSignupForm({ ...signupForm, empName: e.target.value })}
                  className="signup-name-input"
                  required
                />
              </div>

              <div className="signup-row">
                <Label htmlFor="signup-email" className="text-right">
                  이메일
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="예: user@company.com"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  className="signup-input"
                  required
                />
              </div>

              <div className="signup-row signup-row-top">
                <Label htmlFor="signup-pw" className="text-right">
                  비밀번호
                </Label>
                <div className="space-y-2">
                  <Input
                    id="signup-pw"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={signupForm.pw}
                    onChange={(e) => setSignupForm({ ...signupForm, pw: e.target.value })}
                    className="signup-input"
                    required
                  />
                </div>
              </div>

              <div className="signup-row signup-row-top">
                <Label htmlFor="signup-pwConfirm" className="text-right">
                  비밀번호 확인
                </Label>
                <div className="space-y-1">
                  <Input
                    id="signup-pwConfirm"
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요"
                    value={signupForm.pwConfirm}
                    onChange={(e) => setSignupForm({ ...signupForm, pwConfirm: e.target.value })}
                    className="signup-input"
                    required
                  />
                  {signupForm.pw && signupForm.pwConfirm && signupForm.pw !== signupForm.pwConfirm && (
                    <p className="text-sm text-destructive">비밀번호가 일치하지 않습니다.</p>
                  )}
                </div>
              </div>

              <div className="signup-row">
                <Label htmlFor="signup-birth" className="text-right">
                  생년월일
                </Label>
                <Input
                  id="signup-birth"
                  type="date"
                  value={signupForm.birth}
                  onChange={(e) => setSignupForm({ ...signupForm, birth: e.target.value })}
                  className="signup-input"
                />
              </div>

              <div className="signup-row">
                <Label htmlFor="signup-gender" className="text-right">
                  성별
                </Label>
                <select
                  id="signup-gender"
                  className="signup-select rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={signupForm.gender}
                  onChange={(e) => setSignupForm({ ...signupForm, gender: e.target.value })}
                >
                  <option value="">선택하세요</option>
                  <option value="MALE">남성(MALE)</option>
                  <option value="FEMALE">여성(FEMALE)</option>
                </select>
              </div>

              <div className="signup-row">
                <Label htmlFor="signup-tel" className="text-right">
                  전화번호
                </Label>
                <Input
                  id="signup-tel"
                  type="tel"
                  placeholder="010-1234-5678"
                  value={signupForm.tel}
                  onChange={(e) => setSignupForm({ ...signupForm, tel: e.target.value })}
                  className="signup-input"
                />
              </div>

              <div className="signup-row">
                <Label htmlFor="signup-position" className="text-right">
                  직책
                </Label>
                <Input
                  id="signup-position"
                  type="text"
                  placeholder="예: 대리, 팀장"
                  value={signupForm.position}
                  onChange={(e) => setSignupForm({ ...signupForm, position: e.target.value })}
                  className="signup-input"
                />
              </div>

              <div className="signup-row">
                <Label htmlFor="signup-job" className="text-right">
                  직무
                </Label>
                <Input
                  id="signup-job"
                  type="text"
                  placeholder="예: 개발, 인사"
                  value={signupForm.job}
                  onChange={(e) => setSignupForm({ ...signupForm, job: e.target.value })}
                  className="signup-input"
                />
              </div>

              <div className="signup-row signup-row-top">
                <Label htmlFor="signup-addr" className="text-right">
                  주소
                </Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="signup-addr"
                      type="text"
                      placeholder="주소 검색 버튼을 눌러 선택하세요"
                      value={signupForm.addr}
                      onChange={(e) => setSignupForm({ ...signupForm, addr: e.target.value })}
                    className="signup-addr-input"
                    />
                    <Button type="button" variant="secondary" onClick={handleSearchAddress}>
                      주소 검색
                    </Button>
                  </div>
                  <Input
                    id="signup-addr-detail"
                    type="text"
                    placeholder="상세 주소를 입력하세요"
                    value={signupForm.addrDetail}
                    onChange={(e) => setSignupForm({ ...signupForm, addrDetail: e.target.value })}
                    className="signup-addr-input"
                  />
                  {addrError && <p className="text-sm text-destructive">{addrError}</p>}
                </div>
              </div>

              <div className="signup-row">
                <Label htmlFor="signup-start" className="text-right">
                  입사일
                </Label>
                <Input
                  id="signup-start"
                  type="date"
                  value={signupForm.startDate}
                  onChange={(e) => setSignupForm({ ...signupForm, startDate: e.target.value })}
                  className="signup-input"
                />
              </div>

              <div className="signup-row">
                <Label htmlFor="signup-workType" className="text-right">
                  근무형태
                </Label>
                <Input
                  id="signup-workType"
                  type="text"
                  placeholder="예: 정규직, 계약직"
                  value={signupForm.workType}
                  onChange={(e) => setSignupForm({ ...signupForm, workType: e.target.value })}
                  className="signup-input"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  isSignupLoading ||
                  !signupForm.empName ||
                  !signupForm.email ||
                  !signupForm.pw ||
                  !signupForm.pwConfirm ||
                  isPwMismatch
                }
              >
                {isSignupLoading ? "회원가입 중..." : "회원가입"}
              </Button>

              {submitError && (
                <p className="text-sm text-destructive text-center">{submitError}</p>
              )}

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={onClose}
              >
                돌아가기
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

