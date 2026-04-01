import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { productService } from '@/services/productService'
import Loader from '@/components/ui/Loader'
import toast from 'react-hot-toast'

const EMPTY_FORM = {
  name: '', description: '', price: '', oldPrice: '',
  category: '', material: '', dimensions: '',
  stock: '', featured: false, isNew: true,
  colors: [], images: [],
}

export default function AdminProducts() {
  const qc = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing]   = useState(null)
  const [form, setForm]         = useState(EMPTY_FORM)

  const { data, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => productService.getAll({ limit: 100 }),
  })

  const createMut = useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      qc.invalidateQueries(['admin-products'])
      toast.success('Produit créé ✅')
      setShowForm(false)
      setForm(EMPTY_FORM)
    },
    onError: () => toast.error('Erreur lors de la création'),
  })

  const updateMut = useMutation({
    mutationFn: ({ id, data }) => productService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries(['admin-products'])
      toast.success('Produit mis à jour ✅')
      setShowForm(false)
      setEditing(null)
    },
  })

  const deleteMut = useMutation({
    mutationFn: productService.delete,
    onSuccess: () => {
      qc.invalidateQueries(['admin-products'])
      toast.success('Produit supprimé')
    },
  })

  const openEdit = (product) => {
    setEditing(product._id)
    setForm({
      name: product.name, description: product.description,
      price: product.price, oldPrice: product.oldPrice || '',
      category: product.category?._id || '', material: product.material || '',
      dimensions: product.dimensions || '', stock: product.stock,
      featured: product.featured, isNew: product.isNew,
      colors: product.colors || [], images: product.images || [],
    })
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) }
    if (editing) {
      updateMut.mutate({ id: editing, data: payload })
    } else {
      createMut.mutate(payload)
    }
  }

  if (isLoading) return <Loader />

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold">Produits</h1>
        <button onClick={() => { setEditing(null); setForm(EMPTY_FORM); setShowForm(true) }}
                className="btn-gold flex items-center gap-2 text-sm">
          <FiPlus /> Ajouter
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
             onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
               onClick={e => e.stopPropagation()}>
            <h2 className="font-display text-xl font-bold mb-4">
              {editing ? 'Modifier le produit' : 'Nouveau produit'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {[
                { key: 'name',       label: 'Nom',         type: 'text',   required: true  },
                { key: 'price',      label: 'Prix (FCFA)', type: 'number', required: true  },
                { key: 'oldPrice',   label: 'Ancien prix', type: 'number', required: false },
                { key: 'stock',      label: 'Stock',       type: 'number', required: true  },
                { key: 'material',   label: 'Matière',     type: 'text',   required: false },
                { key: 'dimensions', label: 'Dimensions',  type: 'text',   required: false },
              ].map(({ key, label, type, required }) => (
                <div key={key}>
                  <label className="text-sm font-medium mb-1 block">{label}</label>
                  <input type={type} required={required} value={form[key]}
                         onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                         className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm
                                    focus:border-gold-500 focus:outline-none" />
                </div>
              ))}
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <textarea rows={3} value={form.description}
                          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm
                                     focus:border-gold-500 focus:outline-none resize-none" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">URLs images (une par ligne)</label>
                <textarea rows={3}
                          value={form.images.join('\n')}
                          onChange={e => setForm(f => ({ ...f, images: e.target.value.split('\n').filter(Boolean) }))}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm
                                     focus:border-gold-500 focus:outline-none resize-none"
                          placeholder="https://..." />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.featured}
                         onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                         className="accent-gold-500" />
                  Mis en avant
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.isNew}
                         onChange={e => setForm(f => ({ ...f, isNew: e.target.checked }))}
                         className="accent-gold-500" />
                  Nouveau
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                        className="flex-1 border-2 border-gray-200 rounded-full py-2.5 text-sm hover:bg-gray-50">
                  Annuler
                </button>
                <button type="submit"
                        disabled={createMut.isPending || updateMut.isPending}
                        className="flex-1 btn-gold text-sm py-2.5 disabled:opacity-70">
                  {editing ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 font-medium">
            <tr>
              <th className="px-4 py-3 text-left">Produit</th>
              <th className="px-4 py-3 text-right">Prix</th>
              <th className="px-4 py-3 text-right">Stock</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(data?.products || []).map(product => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={product.images?.[0] || '/placeholder.jpg'} alt=""
                         className="w-10 h-12 rounded-lg object-cover bg-silk" />
                    <div>
                      <p className="font-medium line-clamp-1">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.category?.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-medium">
                  {product.price?.toLocaleString('fr-FR')} FCFA
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`font-medium ${product.stock === 0 ? 'text-red-500' : product.stock <= 5 ? 'text-orange-500' : 'text-green-600'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => openEdit(product)}
                            className="text-gray-400 hover:text-gold-500 transition-colors">
                      <FiEdit2 size={16} />
                    </button>
                    <button onClick={() => {
                      if (confirm('Supprimer ce produit ?')) deleteMut.mutate(product._id)
                    }}
                            className="text-gray-400 hover:text-red-500 transition-colors">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
