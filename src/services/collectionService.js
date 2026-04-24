import api from './api'

export const collectionService = {
  getAll:  ()         => api.get('/collections').then(r => r.data),
  create:  (data)     => api.post('/collections', data).then(r => r.data),
  update:  (id, data) => api.put(`/collections/${id}`, data).then(r => r.data),
  delete:  (id)       => api.delete(`/collections/${id}`).then(r => r.data),

  uploadImage: async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    const res = await api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data.url
  },
}
