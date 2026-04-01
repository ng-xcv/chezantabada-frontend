import api from './api'

export const orderService = {
  getMyOrders:        ()       => api.get('/orders/my').then(r => r.data),
  getOrder:           (id)     => api.get(`/orders/${id}`).then(r => r.data),
  createPaymentIntent: (data)  => api.post('/payment/create-intent', data).then(r => r.data),
  confirmOrder:        (orderId, paymentIntentId) =>
    api.post('/payment/confirm', { orderId, paymentIntentId }).then(r => r.data),
}
