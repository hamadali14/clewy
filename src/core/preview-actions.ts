export type PreviewAction =
  | { type: "booking"; payload: Record<string, string> }
  | { type: "contact"; payload: Record<string, string> }
  | { type: "cart"; payload: Record<string, unknown> }
  | { type: "checkout"; payload: Record<string, string> };

const keys = {
  bookings: "blueprint-preview-bookings",
  contacts: "blueprint-preview-contacts",
  cart: "blueprint-preview-cart",
  orders: "blueprint-preview-orders"
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    return JSON.parse(localStorage.getItem(key) || "") as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function submitBooking(payload: Record<string, string>) {
  const bookings = read<Array<Record<string, string>>>(keys.bookings, []);
  const booking = { ...payload, id: `${Date.now()}` };
  write(keys.bookings, [booking, ...bookings]);
  return booking;
}

export function submitContact(payload: Record<string, string>) {
  const submissions = read<Array<Record<string, string>>>(keys.contacts, []);
  const submission = { ...payload, id: `${Date.now()}` };
  write(keys.contacts, [submission, ...submissions]);
  return submission;
}

export function addToCart(item: Record<string, unknown>) {
  const cart = read<Array<Record<string, unknown>>>(keys.cart, []);
  write(keys.cart, [{ ...item, quantity: 1, id: `${Date.now()}` }, ...cart]);
  return read<Array<Record<string, unknown>>>(keys.cart, []);
}

export function updateCart(next: Array<Record<string, unknown>>) {
  write(keys.cart, next);
  return next;
}

export function getCart() {
  return read<Array<Record<string, unknown>>>(keys.cart, []);
}

export function checkout(payload: Record<string, string>) {
  const orders = read<Array<Record<string, unknown>>>(keys.orders, []);
  const order = { ...payload, id: `${Date.now()}`, items: getCart() };
  write(keys.orders, [order, ...orders]);
  write(keys.cart, []);
  return order;
}
