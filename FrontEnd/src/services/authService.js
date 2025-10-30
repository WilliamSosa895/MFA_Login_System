import api from "./api";

export async function registerUser({ first_name, last_name, email, password }) {
  const res = await api.post("/api/users/create", {
    first_name,
    last_name,
    email,
    password,
  });
  return res.data;
}

export async function loginUser({ email, password }) {
  const res = await api.post("/api/auth/login", null, {
    params: { email, password },
  });
  return res.data;
}

export async function verifyOtp({ email, code }) {
  const res = await api.post("/api/auth/verify-otp", { email, code });
  return res.data;
}

export async function resendOtp({ email }) {
  const res = await api.post("/api/auth/resend-otp", { email });
  return res.data;
}
