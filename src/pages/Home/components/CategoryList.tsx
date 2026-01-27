import CategoryItem from './CategoryItem'

interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
}

export default function CategoryList({ categories, selectedCategory, onCategoryClick }: CategoryListProps) {
  return (
    <div className="flex flex-col gap-3 mb-8 px-2">
      <h3 className="text-center text-sm font-bold text-white uppercase tracking-wider">Kategori Populer</h3>
      <div
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="flex gap-2.5 overflow-scroll">
        {/* Tombol Semua */}
        <button
          onClick={() => onCategoryClick('')}
          className={`px-5 py-1.5 rounded-full text-sm font-medium border transition-all ${selectedCategory === ''
            ? 'bg-white text-primary border-white shadow-lg'
            : 'border-[#474B4F] text-gray-400 hover:text-white'
          }`}
        >
          Semua
        </button>

        {/* Daftar Kategori Dinamis */}
        {categories.map((category) => (
          <CategoryItem
            key={category}
            category={category}
            isSelected={selectedCategory === category}
            onClick={onCategoryClick}
          />
        ))}
      </div>
    </div>
  )
}