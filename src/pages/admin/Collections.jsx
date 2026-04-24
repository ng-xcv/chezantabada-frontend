import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiLayers, FiAlertTriangle, FiUpload } from 'react-icons/fi'
import { collectionService } from '@/services/collectionService'
import toast from 'react-hot-toast'
import Loader from '@/components/ui/Loader'

const TAG_OPTIONS = ['', 'Bestseller', 'Nouveau', 'Limité']
const EMPTY = { name: '', description: '', image: '', tag: '', order: 0, isActive: true }

export default function AdminCollections() {
  const qc = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [editing,  setEditing]  = useState(null)
  const [form,     setForm]     = useState(EMPTY)
  const [deleting, setDeleting] = useState(null)
  const [uploading, setUploading] = useState(false)

  const { data: cols, isLoading } = useQuery({
    queryKey: ['admin-collections'],
    queryFn:  collectionService.getAll,
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const closeForm = () => { setShowForm(false); setEditing(null); setForm(EMPTY) }

  const createMut = useMutation({
    mutationFn: collectionService.create,
    onSuccess:  () => { qc.invalidateQueries(['admin-collections', 'collections']); toast.success('Collection créée ✅'); closeForm() },
    onError:    (e) => toast.error(e.response?.data?.message || 'Erreur création'),
  })

  const updateMut = useMutation({
    mutationFn: ({ id, data }) => collectionService.update(id, data),
    onSuccess:  () => { qc.invalidateQueries(['admin-collections', 'collections']); toast.success('Collection mise à jour ✅'); closeForm() },
    onError:    (e) => toast.error(e.response?.data?.message || 'Erreur mise à jour'),
  })

  const deleteMut = useMutation({
    mutationFn: collectionService.delete,
    onSuccess:  () => { qc.invalidateQueries(['admin-collections', 'collections']); toast.success('Collection supprimée'); setDeleting(null) },
    onError:    () => toast.error('Erreur suppression'),
  })

  const openEdit = (c) => {
    setEditing(c._id)
    setForm({
      name:        c.name,
      description: c.description || '',
      image:       c.image || '',
      tag:         c.tag || '',
      order:       c.order || 0,
      isActive:    c.isActive !== false,
    })
    setShowForm(true)
  }

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await collectionService.uploadImage(file)
      set('image', url)
      toast.success('Image uploadée')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur upload')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return toast.error('Le nom est requis')
    const payload = { ...form, order: Number(form.order) }
    if (editing) updateMut.mutate({ id: editing, data: payload })
    else         createMut.mutate(payload)
  }

  const loading = createMut.isPending || updateMut.isPending

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Collections</h1>
          <p className="text-muted text-sm mt-1">{(cols || []).length} collection{cols?.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => { setEditing(null); setForm(EMPTY); setShowForm(true) }}
                className="btn-gold flex items-center gap-2 text-sm">
          <FiPlus /> Nouvelle collection
        </button>
      </div>

      {/* Grid */}
      {isLoading ? <Loader /> : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {(cols || []).map((col, i) => (
            <motion.div key={col._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className={`card-dark border p-0 overflow-hidden group ${
                          col.isActive !== false ? 'border-border' : 'border-red-500/20 opacity-60'
                        }`}>
              <div className="relative">
                {col.image ? (
                  <img src={col.image} alt={col.name}
                       className="w-full h-40 object-cover bg-darker" />
                ) : (
                  <div className="w-full h-40 bg-darker flex items-center justify-center">
                    <FiLayers size={32} className="text-muted opacity-30" />
                  </div>
                )}
                {col.tag && (
                  <span className="absolute top-3 right-3 bg-gold-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
                    {col.tag}
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white truncate">{col.name}</h3>
                    {col.description && (
                      <p className="text-xs text-muted line-clamp-2 mt-1">{col.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        col.isActive !== false
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {col.isActive !== false ? 'Active' : 'Inactive'}
                      </span>
                      {col.order > 0 && (
                        <span className="text-xs text-muted">Ordre: {col.order}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button onClick={() => openEdit(col)}
                            className="p-2 rounded-lg hover:bg-gold-500/20 text-muted hover:text-gold-400 transition-all">
                      <FiEdit2 size={14} />
                    </button>
                    <button onClick={() => setDeleting(col)}
                            className="p-2 rounded-lg hover:bg-red-500/20 text-muted hover:text-red-400 transition-all">
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {!cols?.length && (
            <div className="col-span-3 card-dark border border-border p-16 text-center">
              <FiLayers size={32} className="mx-auto mb-3 text-muted opacity-40" />
              <p className="text-muted">Aucune collection</p>
              <button onClick={() => setShowForm(true)} className="btn-gold mt-4 text-sm px-4 py-2">
                Créer la première collection
              </button>
            </div>
          )}
        </div>
      )}

      {/* ─── FORM MODAL ─── */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center
                                 justify-center p-4"
                      onClick={e => e.target === e.currentTarget && closeForm()}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-card border border-border rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card z-10">
                <h2 className="font-display text-lg font-bold text-white">
                  {editing ? 'Modifier la collection' : 'Nouvelle collection'}
                </h2>
                <button onClick={closeForm} className="p-1.5 rounded-lg hover:bg-white/10 text-muted hover:text-white">
                  <FiX size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div>
                  <label className="text-sm font-medium text-white/80 mb-1.5 block">
                    Nom <span className="text-red-400">*</span>
                  </label>
                  <input type="text" required placeholder="Ex: Hijab Soie"
                         value={form.name} onChange={e => set('name', e.target.value)}
                         className="input-field" />
                </div>

                <div>
                  <label className="text-sm font-medium text-white/80 mb-1.5 block">Sous-titre</label>
                  <textarea rows={2} placeholder="Ex: Luxe & légèreté"
                            value={form.description} onChange={e => set('description', e.target.value)}
                            className="input-field rounded-2xl resize-none text-sm" />
                </div>

                <div>
                  <label className="text-sm font-medium text-white/80 mb-1.5 block">Image</label>
                  <div className="flex gap-2">
                    <input type="url" placeholder="https://... ou upload"
                           value={form.image} onChange={e => set('image', e.target.value)}
                           className="input-field text-sm flex-1" />
                    <label className="btn-outline-gold flex items-center gap-2 text-sm cursor-pointer px-4 whitespace-nowrap">
                      <FiUpload size={14} />
                      {uploading ? '...' : 'Upload'}
                      <input type="file" accept="image/*" onChange={handleUpload}
                             disabled={uploading} className="sr-only" />
                    </label>
                  </div>
                  {form.image && (
                    <img src={form.image} alt=""
                         className="mt-2 w-full h-32 object-cover rounded-xl bg-darker" />
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-white/80 mb-1.5 block">Badge</label>
                  <select value={form.tag} onChange={e => set('tag', e.target.value)}
                          className="input-field text-sm">
                    {TAG_OPTIONS.map(t => (
                      <option key={t} value={t}>{t || '— Aucun —'}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-white/80 mb-1.5 block">Ordre d'affichage</label>
                    <input type="number" min="0" placeholder="0"
                           value={form.order} onChange={e => set('order', e.target.value)}
                           className="input-field text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white/80 mb-1.5 block">Statut</label>
                    <label className={`flex items-center gap-2 px-4 py-3 rounded-full border cursor-pointer
                                      transition-all text-sm ${
                      form.isActive
                        ? 'border-green-500/50 bg-green-500/10 text-green-400'
                        : 'border-border text-muted'
                    }`}>
                      <input type="checkbox" checked={form.isActive}
                             onChange={e => set('isActive', e.target.checked)}
                             className="sr-only" />
                      <span className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        form.isActive ? 'border-green-500 bg-green-500' : 'border-border'
                      }`}>
                        {form.isActive && <span className="text-black text-xs">✓</span>}
                      </span>
                      Active
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-2 border-t border-border">
                  <button type="button" onClick={closeForm}
                          className="flex-1 btn-outline-gold text-sm py-2.5">Annuler</button>
                  <button type="submit" disabled={loading}
                          className="flex-1 btn-gold flex items-center justify-center gap-2 text-sm py-2.5 disabled:opacity-60">
                    <FiSave size={14} />
                    {loading ? 'Sauvegarde...' : editing ? 'Mettre à jour' : 'Créer'}
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
                        className="card-dark border border-red-500/30 p-6 max-w-sm w-full rounded-2xl text-center">
              <FiAlertTriangle size={32} className="text-red-400 mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Supprimer cette collection ?</h3>
              <p className="text-muted text-sm mb-6">« {deleting.name} » sera supprimée.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleting(null)}
                        className="flex-1 btn-outline-gold text-sm py-2.5">Annuler</button>
                <button onClick={() => deleteMut.mutate(deleting._id)}
                        disabled={deleteMut.isPending}
                        className="flex-1 bg-red-500 text-white font-semibold rounded-full py-2.5 text-sm
                                   hover:bg-red-600 transition-colors disabled:opacity-60">
                  {deleteMut.isPending ? '...' : 'Supprimer'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
