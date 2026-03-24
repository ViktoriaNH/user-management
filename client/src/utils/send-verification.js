export const sendVerification = async (userId, email) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const res = await fetch(`${BACKEND_URL}/send-verification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, email }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};
