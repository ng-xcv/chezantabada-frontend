import api from './api'

export const productService = {
  getAll:  (params) => api.get('/products', { params }).then(r => r.data),
  getOne:  (id)     => api.get(`/products/${id}`).then(r => r.data),
  create:  (data)   => api.post('/products', data).then(r => r.data),
  update:  (id, data) => api.put(`/products/${id}`, data).then(r => r.data),
  delete:  (id)     => api.delete(`/products/${id}`).then(r => r.data),
  getCategories: () => api.get('/categories').then(r => r.data),

  // Upload une image fichier → retourne l'URL base64
  uploadImage: async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    const res = await api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data.url
  },

  // Upload plusieurs images → retourne un tableau d'URLs base64
  uploadImages: async (files) => {
    const formData = new FormData()
    files.forEach(f => formData.append('images', f))
    const res = await api.post('/upload/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data.urls
  },
}
