import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'

const COLORS = [
  { value: 'noir',   label: 'Noir',   hex: '#111' },
  { value: 'blanc',  label: 'Blanc',  hex: '#f8f8f8' },
  { value: 'or',     label: 'Doré',   hex: '#C9A84C' },
  { value: 'rose',   label: 'Rose',   hex: '#f9a8d4' },
  { value: 'bleu',   label: 'Bleu',   hex: '#93c5fd' },
  { value: 'vert',   label: 'Vert',   hex: '#86efac' },
  { value: 'rouge',  label: 'Rouge',  hex: '#fca5a5' },
  { value: 'beige',  label: 'Beige',  hex: '#e8d5b7' },
]

export default function FilterSidebar({ filters, onChange }) {
  const { data: cats } = useQuery({
    queryKey: ['categories'],
    queryFn: productService.getCategories,
  })

  return (
    <div className="space-y-6">
      {/* Catégories */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-display font-semibold mb-3">Catégorie</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="cat" value=""
                   checked={!filters.category}
                   onChange={() => onChange('category', '')}
                   className="accent-gold-500" />
            <span className="text-sm">Toutes</span>
          </label>
          {(cats || []).map(cat => (
            <label key={cat._id} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="cat" value={cat._id}
                     checked={filters.category === cat._id}
                     onChange={() => onChange('category', cat._id)}
                     className="accent-gold-500" />
              <span className="text-sm">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Couleurs */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-display font-semibold mb-3">Couleur</h3>
        <div className="flex flex-wrap gap-2">
          {COLORS.map(c => (
            <button
              key={c.value}
              onClick={() => onChange('color', filters.color === c.value ? '' : c.value)}
              title={c.label}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                filters.color === c.value ? 'border-gold-500 scale-110' : 'border-transparent hover:border-gray-300'
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      {/* Prix */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-display font-semibold mb-3">Prix (FCFA)</h3>
        <div className="flex gap-2">
          <input
            type="number" placeholder="Min"
            value={filters.minPrice}
            onChange={e => onChange('minPrice', e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm
                       focus:border-gold-500 focus:outline-none"
          />
          <input
            type="number" placeholder="Max"
            value={filters.maxPrice}
            onChange={e => onChange('maxPrice', e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm
                       focus:border-gold-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Reset */}
      {(filters.category || filters.color || filters.minPrice || filters.maxPrice) && (
        <button
          onClick={() => {
            onChange('category', '')
            onChange('color', '')
            onChange('minPrice', '')
            onChange('maxPrice', '')
          }}
          className="w-full text-sm text-gray-500 hover:text-red-500 transition-colors py-2"
        >
          Effacer les filtres ×
        </button>
      )}
    </div>
  )
}
