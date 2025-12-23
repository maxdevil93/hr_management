const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "/api";

export interface SignupPayload {
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

export async function signupUser(payload: SignupPayload) {
  const res = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `회원가입 요청 실패 (status: ${res.status})`);
  }

  return res.json().catch(() => ({}));
}

