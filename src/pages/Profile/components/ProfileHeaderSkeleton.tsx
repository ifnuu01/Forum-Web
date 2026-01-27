export default function ProfileHeaderSkeleton() {
  return (
    <section className="flex items-center justify-between px-8 py-4 animate-pulse">
      <div>
        <div className="h-6 w-40 bg-white/20 rounded mb-2"></div>
        <div className="h-4 w-60 bg-white/20 rounded"></div>
      </div>
      <div className="w-20 h-20 bg-white/20 rounded-full"></div>
    </section>
  )
}
