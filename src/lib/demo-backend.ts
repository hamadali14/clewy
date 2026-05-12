"use client";

type DemoRecord = Record<string, unknown>;

const memory = new Map<string, DemoRecord[]>();

function canUseLocalStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function read(key: string): DemoRecord[] {
  if (!canUseLocalStorage()) return memory.get(key) ?? [];
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? "[]") as DemoRecord[];
  } catch {
    return [];
  }
}

function write(key: string, value: DemoRecord[]) {
  memory.set(key, value);
  if (canUseLocalStorage()) window.localStorage.setItem(key, JSON.stringify(value));
}

function push(key: string, payload: DemoRecord) {
  const item = { id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, createdAt: new Date().toISOString(), ...payload };
  const next = [item, ...read(key)].slice(0, 50);
  write(key, next);
  return { ok: true, item, items: next };
}

export const demoBackend = {
  createBooking(payload: DemoRecord) {
    return push("demo:bookings", { status: "confirmed", ...payload });
  },
  cancelBooking(id: string) {
    const next = read("demo:bookings").map((item) => item.id === id ? { ...item, status: "cancelled" } : item);
    write("demo:bookings", next);
    return { ok: true, items: next };
  },
  createOrder(payload: DemoRecord) {
    return push("demo:orders", { status: "created", ...payload });
  },
  addToCart(payload: DemoRecord) {
    return push("demo:cart", { quantity: 1, ...payload });
  },
  checkoutDemoPayment(payload: DemoRecord) {
    write("demo:cart", []);
    return push("demo:orders", { status: "paid-demo", ...payload });
  },
  submitContactForm(payload: DemoRecord) {
    return push("demo:contacts", { status: "received", ...payload });
  },
  loginDemoUser(payload: DemoRecord) {
    const session = { id: "demo-user", name: String(payload.name ?? "Demo User"), email: String(payload.email ?? "demo@example.com") };
    write("demo:session", [session]);
    return { ok: true, item: session };
  },
  registerDemoUser(payload: DemoRecord) {
    return push("demo:users", { role: "member", ...payload });
  },
  updateProfile(payload: DemoRecord) {
    write("demo:profile", [{ updatedAt: new Date().toISOString(), ...payload }]);
    return { ok: true, item: payload };
  },
  createReview(payload: DemoRecord) {
    return push("demo:reviews", { rating: 5, ...payload });
  },
  addFavorite(payload: DemoRecord) {
    return push("demo:favorites", payload);
  },
  redeemReward(payload: DemoRecord) {
    return push("demo:rewards", { redeemed: true, ...payload });
  },
  createAdminItem(payload: DemoRecord) {
    return push("demo:admin", { status: "created", ...payload });
  },
  updateAdminItem(payload: DemoRecord) {
    return push("demo:admin", { status: "updated", ...payload });
  },
  deleteAdminItem(payload: DemoRecord) {
    return push("demo:admin", { status: "deleted", ...payload });
  },
  list(key: string) {
    return read(`demo:${key}`);
  }
};

export type DemoBackendAction = keyof typeof demoBackend;
