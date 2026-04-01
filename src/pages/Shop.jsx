import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiFilter } from 'react-icons/fi'
import ProductCard from '@/components/ui/ProductCard'
import FilterSidebar from '@/components/shop/FilterSidebar'
import SearchBar from '@/components/shop/SearchBar'
import Loader from '@/components/ui/Loader'
import { productService } from '@/services/productService'

const SORT_OPTIONS = [
  { value: 'newest',     label: 'Plus récents'    },
  { value: 'price_asc',  label: 'Prix croissant'  },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'popular',    label: 'Populaires'      },
]

export default function Shop() {
  const [filters, setFilters] = useState({
    search: '', category: '', color: '',
    minPrice: '', maxPrice: '', sort: 'newest', page: 1,
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn:  () => productService.getAll(filters),
    keepPreviousData: true,
  })

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }))
  }, [])

  return (
    <>
      <Helmet>
        <title>Boutique — ChezAntaBada</title>
        <meta name="description" content="Parcourez notre collection complète de foulards et hijabs haut de gamme." />
      </Helmet>

      <div className="pt-24 min-h-screen bg-cream">
        {/* Header */}
        <div className="bg-ink text-white py-16 text-center">
          <p className="font-script text-gold-400 text-xl mb-2">Notre univers</p>
          <h1 className="font-display text-5xl font-bold">La Boutique</h1>
        </div>

        <div className="container mx-auto px-4 py-10">
          {/* Top bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
            <SearchBar value={filters.search} onChange={v => updateFilter('search', v)} />
            <div className="flex items-center gap-3">
              <select
                value={filters.sort}
                onChange={e => updateFilter('sort', e.target.value)}
                className="border-2 border-gray-200 rounded-full px-4 py-2 text-sm bg-white
                           focus:outline-none focus:border-gold-500 cursor-pointer"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden flex items-center gap-2 border-2 border-gold-500 text-gold-500
                           rounded-full px-4 py-2 text-sm hover:bg-gold-500 hover:text-white transition-colors"
              >
                <FiFilter size={14} /> Filtres
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="hidden md:block w-60 flex-shrink-0">
              <FilterSidebar filters={filters} onChange={updateFilter} />
            </aside>

            {/* Mobile sidebar */}
            {sidebarOpen && (
              <div className="md:hidden fixed inset-0 z-50 bg-black/50"
                   onClick={() => setSidebarOpen(false)}>
                <div className="absolute right-0 top-0 h-full w-72 bg-cream p-4 overflow-y-auto"
                     onClick={e => e.stopPropagation()}>
                  <button onClick={() => setSidebarOpen(false)}
                          className="mb-4 text-sm text-gray-500">✕ Fermer</button>
                  <FilterSidebar filters={filters} onChange={updateFilter} />
                </div>
              </div>
            )}

            {/* Grille */}
            <div className="flex-1">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <p className="text-sm text-gray-500 mb-4">
                    {data?.total || 0} article{data?.total !== 1 ? 's' : ''} trouvé{data?.total !== 1 ? 's' : ''}
                  </p>
                  {data?.products?.length === 0 ? (
                    <div className="text-center py-20">
                      <p className="text-4xl mb-4">🔍</p>
                      <p className="text-gray-500">Aucun produit trouvé</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {(data?.products || []).map((product, i) => (
                        <motion.div
                          key={product._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {data?.totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-12">
                      {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(p => (
                        <button
                          key={p}
                          onClick={() => setFilters(f => ({ ...f, page: p }))}
                          className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                            filters.page === p
                              ? 'bg-gold-500 text-white shadow-md'
                              : 'bg-white text-ink hover:bg-gold-50 shadow-sm'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
