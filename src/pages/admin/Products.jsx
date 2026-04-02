import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSearch, FiImage, FiSave, FiAlertTriangle, FiPackage } from 'react-icons/fi'
import { productService } from '@/services/productService'
import Loader from '@/components/ui/Loader'
import toast from 'react-hot-toast'

const EMPTY = {
  name: '', description: '', price: '', oldPrice: '',
  category: '', material: '', dimensions: '',
  stock: '', lowStockAlert: 5,
  featured: false, isNew: true, isActive: true,
  colors: [], images: [], tags: '',
  seo: { metaTitle: '', metaDescription: '' },
}

const COLORS_OPTIONS = [
  { value: 'noir',     label: 'Noir',     hex: '#111111' },
  { value: 'blanc',    label: 'Blanc',    hex: '#f8f8f8' },
  { value: 'or',       label: 'Doré',     hex: '#C9A84C' },
  { value: 'bleu',     label: 'Bleu',     hex: '#1E90FF' },
  { value: 'rose',     label: 'Rose',     hex: '#f9a8d4' },
  { value: 'rouge',    label: 'Rouge',    hex: '#ef4444' },
  { value: 'vert',     label: 'Vert',     hex: '#22c55e' },
  { value: 'beige',    label: 'Beige',    hex: '#e8d5b7' },
  { value: 'bordeaux', label: 'Bordeaux', hex: '#7f1d1d' },
  { value: 'gris',     label: 'Gris',     hex: '#9ca3af' },
  { value: 'violet',   label: 'Violet',   hex: '#8b5cf6' },
  { value: 'camel',    label: 'Camel',    hex: '#c2956c' },
]

export default function AdminProducts() {
  const qc = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [editing,  setEditing]  = useState(null)
  const [form,     setForm]     = useState(EMPTY)
  const [search,   setSearch]   = useState('')
  const [deleting, setDeleting] = useState(null)

  const { data, isLoading } = useQuery({
    queryKey: ['admin-products', search],
    queryFn:  () => productService.getAll({ limit: 100, search }),
  })

  const { data: cats } = useQuery({
    queryKey: ['categories'],
    queryFn:  productService.getCategories,
  })

  const createMut = useMutation({
    mutationFn: productService.create,
    onSuccess:  () => { qc.invalidateQueries(['admin-products']); toast.success('Produit créé ✅'); closeForm() },
    onError:    (e) => toast.error(e.response?.data?.message || 'Erreur création'),
  })

  const updateMut = useMutation({
    mutationFn: ({ id, data }) => productService.update(id, data),
    onSuccess:  () => { qc.invalidateQueries(['admin-products']); toast.success('Produit mis à jour ✅'); closeForm() },
    onError:    (e) => toast.error(e.response?.data?.message || 'Erreur mise à jour'),
  })

  const deleteMut = useMutation({
    mutationFn: productService.delete,
    onSuccess:  () => { qc.invalidateQueries(['admin-products']); toast.success('Produit supprimé'); setDeleting(null) },
    onError:    () => toast.error('Erreur suppression'),
  })

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const openCreate = () => { setEditing(null); setForm(EMPTY); setShowForm(true) }

  const openEdit = (p) => {
    setEditing(p._id)
    setForm({
      name:          p.name,
      description:   p.description,
      price:         p.price,
      oldPrice:      p.oldPrice || '',
      category:      p.category?._id || p.category || '',
      material:      p.material || '',
      dimensions:    p.dimensions || '',
      stock:         p.stock,
      lowStockAlert: p.lowStockAlert || 5,
      featured:      p.featured,
      isNew:         p.isNew,
      isActive:      p.isActive !== false,
      colors:        p.colors || [],
      images:        p.images || [],
      tags:          (p.tags || []).join(', '),
      seo:           p.seo || { metaTitle: '', metaDescription: '' },
    })
    setShowForm(true)
  }

  const closeForm = () => { setShowForm(false); setEditing(null); setForm(EMPTY) }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return toast.error('Le nom est requis')
    if (!form.price)       return toast.error('Le prix est requis')
    if (!form.category)    return toast.error('La catégorie est requise')
    if (!form.stock && form.stock !== 0) return toast.error('Le stock est requis')

    const payload = {
      ...form,
      price:         Number(form.price),
      oldPrice:      form.oldPrice ? Number(form.oldPrice) : undefined,
      stock:         Number(form.stock),
      lowStockAlert: Number(form.lowStockAlert),
      tags:          form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    }

    if (editing) updateMut.mutate({ id: editing, data: payload })
    else         createMut.mutate(payload)
  }

  const toggleColor = (c) => {
    set('colors', form.colors.includes(c)
      ? form.colors.filter(x => x !== c)
      : [...form.colors, c]
    )
  }

  const addImage = (url) => {
    if (url && !form.images.includes(url)) set('images', [...form.images, url])
  }

  const removeImage = (idx) => set('images', form.images.filter((_, i) => i !== idx))

  const loading = createMut.isPending || updateMut.isPending

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Produits</h1>
          <p className="text-muted text-sm mt-1">{data?.total || 0} article{data?.total !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openCreate} className="btn-gold flex items-center gap-2 text-sm">
          <FiPlus /> Nouveau produit
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
        <input
          type="text" placeholder="Rechercher..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="input-field pl-11 text-sm py-2.5"
        />
      </div>

      {/* Table */}
      {isLoading ? <Loader /> : (
        <div className="card-dark border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr className="text-left text-muted text-xs uppercase tracking-wider">
                  <th className="px-5 py-4">Produit</th>
                  <th className="px-5 py-4">Catégorie</th>
                  <th className="px-5 py-4 text-right">Prix</th>
                  <th className="px-5 py-4 text-right">Stock</th>
                  <th className="px-5 py-4 text-center">Statut</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {(data?.products || []).map(product => (
                  <tr key={product._id} className="hover:bg-white/3 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt=""
                               className="w-10 h-12 rounded-lg object-cover bg-darker" />
                        ) : (
                          <div className="w-10 h-12 rounded-lg bg-darker flex items-center justify-center">
                            <FiImage size={16} className="text-muted" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-white line-clamp-1">{product.name}</p>
                          {product.featured && <span className="text-xs text-gold-400">★ Mis en avant</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted text-xs">{product.category?.name || '—'}</td>
                    <td className="px-5 py-4 text-right">
                      <span className="font-semibold text-gold-400">{product.price?.toLocaleString('fr-FR')} FCFA</span>
                      {product.oldPrice && (
                        <p className="text-xs text-muted line-through">{product.oldPrice?.toLocaleString('fr-FR')}</p>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className={`font-semibold ${
                        product.stock === 0 ? 'text-red-400' :
                        product.stock <= product.lowStockAlert ? 'text-orange-400' : 'text-green-400'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.isActive !== false
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {product.isActive !== false ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openEdit(product)}
                                className="p-2 rounded-lg hover:bg-gold-500/20 text-muted hover:text-gold-400 transition-all">
                          <FiEdit2 size={15} />
                        </button>
                        <button onClick={() => setDeleting(product)}
                                className="p-2 rounded-lg hover:bg-red-500/20 text-muted hover:text-red-400 transition-all">
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!data?.products?.length && (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center text-muted">
                      <FiPackage size={32} className="mx-auto mb-3 opacity-40" />
                      <p>Aucun produit trouvé</p>
                      <button onClick={openCreate} className="btn-gold mt-4 text-sm px-4 py-2">
                        Ajouter le premier produit
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── FORM MODAL ─── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center
                       overflow-y-auto p-4 pt-8"
            onClick={e => e.target === e.currentTarget && closeForm()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border rounded-2xl w-full max-w-2xl mb-8"
            >
              {/* Form header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="font-display text-xl font-bold text-white">
                  {editing ? '✏️ Modifier le produit' : '➕ Nouveau produit'}
                </h2>
                <button onClick={closeForm} className="p-2 rounded-lg hover:bg-white/10 text-muted hover:text-white">
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* ── Infos de base ── */}
                <section>
                  <h3 className="text-xs text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-4 h-px bg-gold-500" /> Informations de base
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-white/80 mb-1.5 block">
                        Nom du produit <span className="text-red-400">*</span>
                      </label>
                      <input type="text" required placeholder="Ex: Hijab Soie Bleu Saphir"
                             value={form.name} onChange={e => set('name', e.target.value)}
                             className="input-field" />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-white/80 mb-1.5 block">
                        Description <span className="text-red-400">*</span>
                      </label>
                      <textarea rows={4} required
                                placeholder="Décrivez le produit en détail : matière, style, occasions..."
                                value={form.description} onChange={e => set('description', e.target.value)}
                                className="input-field rounded-2xl resize-none" />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-white/80 mb-1.5 block">
                        Catégorie <span className="text-red-400">*</span>
                      </label>
                      <select required value={form.category} onChange={e => set('category', e.target.value)}
                              className="input-field">
                        <option value="">-- Sélectionner une catégorie --</option>
                        {(cats || []).map(c => (
                          <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                {/* ── Prix & Stock ── */}
                <section>
                  <h3 className="text-xs text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-4 h-px bg-gold-500" /> Prix & Stock
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white/80 mb-1.5 block">
                        Prix (FCFA) <span className="text-red-400">*</span>
                      </label>
                      <input type="number" required min="0" placeholder="15000"
                             value={form.price} onChange={e => set('price', e.target.value)}
                             className="input-field" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/80 mb-1.5 block">
                        Ancien prix (FCFA)
                      </label>
                      <input type="number" min="0" placeholder="20000"
                             value={form.oldPrice} onChange={e => set('oldPrice', e.target.value)}
                             className="input-field" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/80 mb-1.5 block">
                        Stock <span className="text-red-400">*</span>
                      </label>
                      <input type="number" required min="0" placeholder="20"
                             value={form.stock} onChange={e => set('stock', e.target.value)}
                             className="input-field" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/80 mb-1.5 block">
                        Alerte stock bas
                      </label>
                      <input type="number" min="1" placeholder="5"
                             value={form.lowStockAlert} onChange={e => set('lowStockAlert', e.target.value)}
                             className="input-field" />
                    </div>
                  </div>
                </section>

                {/* ── Détails ── */}
                <section>
                  <h3 className="text-xs text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-4 h-px bg-gold-500" /> Détails produit
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-white/80 mb-1.5 block">Matière</label>
                      <input type="text" placeholder="Soie naturelle 100%"
                             value={form.material} onChange={e => set('material', e.target.value)}
                             className="input-field" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white/80 mb-1.5 block">Dimensions</label>
                      <input type="text" placeholder="180cm × 70cm"
                             value={form.dimensions} onChange={e => set('dimensions', e.target.value)}
                             className="input-field" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium text-white/80 mb-1.5 block">
                      Tags (séparés par des virgules)
                    </label>
                    <input type="text" placeholder="soie, luxe, mariage, bleu"
                           value={form.tags} onChange={e => set('tags', e.target.value)}
                           className="input-field" />
                  </div>
                </section>

                {/* ── Couleurs ── */}
                <section>
                  <h3 className="text-xs text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-4 h-px bg-gold-500" /> Couleurs disponibles
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {COLORS_OPTIONS.map(c => (
                      <button key={c.value} type="button"
                              onClick={() => toggleColor(c.value)}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
                                         border transition-all ${
                                form.colors.includes(c.value)
                                  ? 'border-gold-500 bg-gold-500/20 text-gold-400'
                                  : 'border-border text-muted hover:border-white/30'
                              }`}>
                        <span className="w-3 h-3 rounded-full border border-white/20"
                              style={{ backgroundColor: c.hex }} />
                        {c.label}
                      </button>
                    ))}
                  </div>
                </section>

                {/* ── Images ── */}
                <section>
                  <h3 className="text-xs text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-4 h-px bg-gold-500" /> Images (URLs)
                  </h3>
                  {form.images.length > 0 && (
                    <div className="flex gap-3 mb-4 flex-wrap">
                      {form.images.map((img, i) => (
                        <div key={i} className="relative group">
                          <img src={img} alt=""
                               className="w-16 h-20 rounded-xl object-cover bg-darker border border-border" />
                          <button type="button" onClick={() => removeImage(i)}
                                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full
                                             flex items-center justify-center opacity-0 group-hover:opacity-100
                                             transition-opacity">
                            <FiX size={10} className="text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input type="url" placeholder="https://images.unsplash.com/..."
                           id="img-input"
                           className="input-field flex-1 text-sm py-2.5"
                           onKeyDown={e => {
                             if (e.key === 'Enter') {
                               e.preventDefault()
                               addImage(e.target.value.trim())
                               e.target.value = ''
                             }
                           }} />
                    <button type="button"
                            onClick={() => {
                              const input = document.getElementById('img-input')
                              addImage(input.value.trim())
                              input.value = ''
                            }}
                            className="btn-outline-gold text-sm px-4 py-2.5 whitespace-nowrap">
                      + Ajouter
                    </button>
                  </div>
                  <p className="text-xs text-muted mt-1">Appuyez sur Entrée ou cliquez + Ajouter</p>
                </section>

                {/* ── Options ── */}
                <section>
                  <h3 className="text-xs text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-4 h-px bg-gold-500" /> Options d'affichage
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { key: 'featured', label: '★ Mis en avant' },
                      { key: 'isNew',    label: '🆕 Nouveau'      },
                      { key: 'isActive', label: '✅ Actif'        },
                    ].map(({ key, label }) => (
                      <label key={key}
                             className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer
                                        transition-all text-sm ${
                               form[key]
                                 ? 'border-gold-500/50 bg-gold-500/10 text-gold-400'
                                 : 'border-border text-muted hover:border-white/20'
                             }`}>
                        <input type="checkbox" checked={!!form[key]}
                               onChange={e => set(key, e.target.checked)}
                               className="accent-gold-500 sr-only" />
                        <span className={`w-4 h-4 rounded border-2 flex items-center justify-center
                                         flex-shrink-0 ${form[key] ? 'border-gold-500 bg-gold-500' : 'border-border'}`}>
                          {form[key] && <span className="text-black text-xs">✓</span>}
                        </span>
                        {label}
                      </label>
                    ))}
                  </div>
                </section>

                {/* ── SEO ── */}
                <section>
                  <h3 className="text-xs text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-4 h-px bg-gold-500" /> SEO (optionnel)
                  </h3>
                  <div className="space-y-3">
                    <input type="text" placeholder="Meta title (60 car. max)"
                           value={form.seo.metaTitle}
                           onChange={e => set('seo', { ...form.seo, metaTitle: e.target.value })}
                           className="input-field text-sm" />
                    <textarea rows={2} placeholder="Meta description (160 car. max)"
                              value={form.seo.metaDescription}
                              onChange={e => set('seo', { ...form.seo, metaDescription: e.target.value })}
                              className="input-field rounded-2xl resize-none text-sm" />
                  </div>
                </section>

                {/* Actions */}
                <div className="flex gap-3 pt-2 border-t border-border">
                  <button type="button" onClick={closeForm}
                          className="flex-1 btn-outline-gold text-sm py-3">
                    Annuler
                  </button>
                  <button type="submit" disabled={loading}
                          className="flex-1 btn-gold flex items-center justify-center gap-2 text-sm py-3
                                     disabled:opacity-60">
                    <FiSave size={16} />
                    {loading ? 'Sauvegarde...' : editing ? 'Mettre à jour' : 'Créer le produit'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── DELETE CONFIRM ─── */}
      <AnimatePresence>
        {deleting && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                        className="card-dark border border-red-500/30 p-6 max-w-sm w-full rounded-2xl">
              <FiAlertTriangle size={32} className="text-red-400 mx-auto mb-4" />
              <h3 className="font-semibold text-white text-center mb-2">Supprimer ce produit ?</h3>
              <p className="text-muted text-sm text-center mb-6">
                « {deleting.name} » sera supprimé définitivement.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleting(null)}
                        className="flex-1 btn-outline-gold text-sm py-2.5">Annuler</button>
                <button onClick={() => deleteMut.mutate(deleting._id)}
                        disabled={deleteMut.isPending}
                        className="flex-1 bg-red-500 text-white font-semibold rounded-full py-2.5 text-sm
                                   hover:bg-red-600 transition-colors disabled:opacity-60">
                  {deleteMut.isPending ? 'Suppression...' : 'Confirmer'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
