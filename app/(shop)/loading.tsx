export default function Loading() {
  return (
    <div className="space-y-12">
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-tea-forest via-emerald-800 to-tea-forest text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative p-10 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="w-32 h-8 bg-white/20 rounded-full animate-pulse"></div>
              <div className="w-80 h-16 bg-white/20 rounded animate-pulse"></div>
              <div className="w-96 h-6 bg-white/20 rounded animate-pulse"></div>
              <div className="flex gap-4">
                <div className="w-32 h-12 bg-white/20 rounded-2xl animate-pulse"></div>
                <div className="w-32 h-12 bg-white/20 rounded-2xl animate-pulse"></div>
              </div>
            </div>
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-white/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Grid Skeleton */}
      <section>
        <div className="text-center mb-8">
          <div className="w-64 h-8 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
          <div className="w-48 h-4 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="border bg-gray-100 rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
