const categories = [
  { emoji: "🏖️", label: "Beach & Sun" },
  { emoji: "🏙️", label: "City Breaks" },
  { emoji: "✈️", label: "Long Haul" },
  { emoji: "🏔️", label: "Adventure" },
  { emoji: "💕", label: "Romantic" },
  { emoji: "👨‍👩‍👧", label: "Family" },
];

export function CategoryPills() {
  return (
    <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
      {categories.map((c) => (
        <button
          key={c.label}
          className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
        >
          <span className="text-lg">{c.emoji}</span>
          {c.label}
        </button>
      ))}
    </div>
  );
}
