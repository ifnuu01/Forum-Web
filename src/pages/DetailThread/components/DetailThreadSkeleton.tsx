export default function DetailThreadSkeleton() {
  return (
    <>
      <section className="w-full border-b-2 border-secondary px-8 pt-3 pb-2 animate-pulse">
        {/* header */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-20 mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-16"></div>
          </div>
        </div>

        {/* body */}
        <div className="mt-2">
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
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
        </div>
      </section>
      {/* commentar */}
      {Array.from({ length: 3 }).map((_, index) => (
        <section key={index} className="w-full border-b-2 border-secondary px-8 pt-3 pb-2 animate-pulse">
          {/* header */}
          <div className="flex items-center gap-2 ">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <div className="h-4 bg-gray-300 rounded w-20 mb-1"></div>
              <div className="h-3 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
          {/* Body */}
          <div className="mt-2 ml-12 flex flex-col">
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </section>
      ))}
    </>
  )
}