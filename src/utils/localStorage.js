
export function readStorage(k, f) {
  try {
    const v = localStorage.getItem(k);

    return v ? JSON.parse(v) : f;
  } catch {
    return f;
  }
}

export function writeStorage(k, v) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
}

export function removeStorage(k) {
  try {
    localStorage.removeItem(k);
  } catch {}
}