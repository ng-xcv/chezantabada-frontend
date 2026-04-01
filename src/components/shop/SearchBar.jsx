import { FiSearch, FiX } from 'react-icons/fi'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1 max-w-sm">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Rechercher un foulard..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full pl-11 pr-10 py-2.5 border-2 border-gray-200 rounded-full
                   focus:border-gold-500 focus:outline-none text-sm bg-white"
      />
      {value && (
        <button onClick={() => onChange('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          <FiX size={16} />
        </button>
      )}
    </div>
  )
}
