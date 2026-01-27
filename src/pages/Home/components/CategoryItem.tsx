interface CategoryItemProps {
    category: string;
    isSelected: boolean;
    onClick: (category: string) => void;
}

export default function CategoryItem({ category, isSelected, onClick }: CategoryItemProps) {
  return (
    <button
      onClick={() => onClick(isSelected ? '' : category)}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border whitespace-nowrap ${isSelected
        ? 'bg-white text-primary border-white shadow-lg scale-105'
        : 'border-[#474B4F] text-gray-400 hover:text-white hover:border-white'
      }`}
    >
            #{category}
    </button>
  )
}