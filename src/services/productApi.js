
const BASE = 'https://dummyjson.com';

async function req(path, signal) {
  const r = await fetch(BASE + path, { signal });

  if (!r.ok) {
    throw Error(`Request failed: ${r.status}`);
  }

  return r.json();
}

export const getProducts = ({
  limit = 100,
  skip = 0,
  signal,
} = {}) => req(`/products?limit=${limit}&skip=${skip}`, signal);

export const getProduct = (id, signal) =>
  req(`/products/${id}`, signal);

export const getProductsByCategory = (c, signal) =>
  req(`/products/category/${encodeURIComponent(c)}`, signal);

export const searchProducts = (q, signal) =>
  req(`/products/search?q=${encodeURIComponent(q)}`, signal);