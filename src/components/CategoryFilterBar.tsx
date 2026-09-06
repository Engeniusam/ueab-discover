import { Search, Bus, CheckCircle2 } from 'lucide-react';

interface CategoryFilterBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchAttractions: string;
  onSearchAttractionsChange: (val: string) => void;
  matatuVerifiedOnly: boolean;
  onToggleMatatuVerified: () => void;
  totalCount: number;
}

export default function CategoryFilterBar({
  selectedCategory,
  onSelectCategory,
  searchAttractions,
  onSearchAttractionsChange,
  matatuVerifiedOnly,
  onToggleMatatuVerified,
  totalCount,
}: CategoryFilterBarProps) {
  const categories = [
    { id: 'all', label: `All Spots (${totalCount})` },
    { id: 'waterfalls', label: 'Waterfalls' },
    { id: 'hiking', label: 'Hiking' },
    { id: 'parks', label: 'Parks & Grounds' },
    { id: 'wildlife', label: 'Wildlife & Wetlands' },
    { id: 'cultural', label: 'Cultural' },
  ];

  return (
    <section className="max-w-[1280px] mx-auto px-4 lg:px-8 py-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-2xs ${
                  isActive
                    ? 'bg-[#006948] text-white shadow-sm'
                    : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Right Search and Matatu Verified Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative flex-1 md:w-56">
            <Search className="w-3.5 h-3.5 text-[#6d7a72] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="category-search-attractions"
              type="text"
              placeholder="Search attractions..."
              value={searchAttractions}
              onChange={(e) => onSearchAttractionsChange(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs sm:text-sm rounded-full bg-[#eaedff] border border-transparent focus:border-[#006948]/40 focus:bg-white focus:outline-none transition-all placeholder:text-[#6d7a72]"
            />
          </div>

          {/* Matatu Verified Toggle */}
          <button
            id="toggle-matatu-verified"
            onClick={onToggleMatatuVerified}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              matatuVerifiedOnly
                ? 'bg-[#adedd3] border-[#006948] text-[#006948] shadow-xs'
                : 'bg-[#eaedff] border-transparent text-[#131b2e] hover:bg-[#dae2fd]'
            }`}
          >
            <Bus className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Matatu verified</span>
            {matatuVerifiedOnly && <CheckCircle2 className="w-3 h-3 text-[#006948]" />}
          </button>
        </div>
      </div>
    </section>
  );
}
