import { ArrowLeft, UserRound } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router'
export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  const navMessage = [
    {
      path: '/',
      title: 'Untuk Mu'
    },
    {
      path: '/detail-thread/:id',
      title: 'Detail Thread'
    },
    {
      path: '/papan-peringkat',
      title: 'Papan Peringkat'
    },
    {
      path: '/profile',
      title: 'Profil'
    }
  ]

  const getCurrentTitle = () => {
    const current = navMessage.find(item => {
      if (item.path === location.pathname) return true
      if (item.path.includes(':id')) {
        const basePath = item.path.split('/:')[0]
        return location.pathname.startsWith(basePath)
      }
      return false
    })
    return current?.title || 'Untuk Mu'
  }

  return (
    <div className="fixed right-0 left-0 py-2 z-50 bg-primary md:bg-white">
      <nav className="w-full md:w-140 mx-auto flex items-center justify-center relative">
        {/* Title di tengah */}
        {!isHome && (
          <button
            onClick={() => navigate(-1)}
            className=" text-xl absolute left-4 top-1/2 -translate-y-1/2 text-white bg-primary p-2 rounded-full cursor-pointer hover:scale-110 transition-transform duration-200">
            <ArrowLeft />
          </button>
        )}
        <div className="text-xl font-semibold text-white bg-primary p-2 px-4 rounded-full mx-auto">
          {getCurrentTitle()}
        </div>
        <Link to="/profile" className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-primary p-2 rounded-full cursor-pointer hover:scale-110 transition-transform duration-200">
          <UserRound />
        </Link>
      </nav>
    </div>
  )
}