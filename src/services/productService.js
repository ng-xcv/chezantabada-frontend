import api from './api'

export const productService = {
  getAll:  (params) => api.get('/products', { params }).then(r => r.data),
  getOne:  (id)     => api.get(`/products/${id}`).then(r => r.data),
  create:  (data)   => api.post('/products', data).then(r => r.data),
  update:  (id, data) => api.put(`/products/${id}`, data).then(r => r.data),
  delete:  (id)     => api.delete(`/products/${id}`).then(r => r.data),
  getCategories: () => api.get('/categories').then(r => r.data),
}
