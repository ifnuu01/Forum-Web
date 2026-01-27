export default function HomeSkeleton() {
  return (
    <section className="w-full border-b-2 border-secondary px-8 pt-3 pb-2 animate-pulse">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="order-2 md:order-1">
          <div className="flex flex-col gap-2 md:items-center md:flex-row">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="h-6 bg-gray-300 rounded w-3/4 mt-2"></div>
        </div>
        <div className="px-4 w-fit rounded-full border-2 border-white order-1 mb-2">
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>
      </div>

      {/* body */}
      <div className="mt-2">
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>

      {/* footer */}
      <div className="flex items-center gap-4 mt-2 mb-1">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-6"></div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-6"></div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-6"></div>
        </div>
      </div>
    </section>
  )
}