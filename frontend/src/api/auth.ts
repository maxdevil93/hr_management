const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "/api";

// 공통 API 요청 함수 (모든 요청에 credentials: 'include' 자동 포함)
async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  return fetch(`${API_BASE}${endpoint}`, {
    ...options,
    credentials: 'include', // ✅ 모든 요청에 Cookie 자동 포함
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
}

export interface SignupPayload {
  id: string;
  empName: string;
  email: string;
  pw: string;
  birth?: string | null;
  gender?: string | null;
  tel?: string | null;
  addr?: string | null;
  position?: string | null;
  job?: string | null;
  start_date?: string | null;
  workType?: string | null;
  approval?: number;
  isActive?: boolean;
}

export async function checkIdDuplicate(id: string): Promise<boolean> {
  const res = await apiFetch(`/employees/checkId/${id}`, {
    method: "GET",
  });
 
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `ID 중복 확인 요청 실패 (status: ${res.status})`);
  }

  const data = await res.json().catch(() => ({}));
  // true면 사용 가능, false면 중복
  return data.available !== false;
}

export interface LoginPayload {
  id: string;
  pw: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    empName: string;
    email: string;
    [key: string]: any;
  };
  token?: string;
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const res = await apiFetch(`/employees/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `로그인 요청 실패 (status: ${res.status})`);
  }

  return res.json().catch(() => ({}));
}

export async function signupUser(payload: SignupPayload) {
  const res = await apiFetch(`/employees/signUp`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `회원가입 요청 실패 (status: ${res.status})`);
  }

  return res.json().catch(() => ({}));
}

