export const API_URL = process.env.EXPO_PUBLIC_API_URL;;

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  // Si no hay body (delete a veces), evita fallo
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return null;

  return res.json();
}

// CRUD tickets
export const TicketsAPI = {
  list: () => request("/tickets/"),
  get: (id) => request(`/tickets/${id}`),
  create: (ticket) =>
    request("/tickets/", { method: "POST", body: JSON.stringify(ticket) }),
  update: (id, ticket) =>
    request(`/tickets/${id}`, { method: "PUT", body: JSON.stringify(ticket) }),
  remove: (id) => request(`/tickets/${id}`, { method: "DELETE" }),
};