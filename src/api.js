const API_URL = "https://dummyjson.com/products";

export async function getProducts(limit = 20) {
  const res = await fetch(`${API_URL}?limit=${limit}`);
  const data = await res.json();
  return data.products;
}

export async function getProductById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
}