import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from '../pages/Home'
import DetailThreadPage from '../pages/DetailThread'
import LeaderboardPage from '../pages/Leaderboard'
import ProfilePage from '../pages/Profile'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/detail-thread/:id' element={<DetailThreadPage />} />
        <Route path='/papan-peringkat' element={<LeaderboardPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}
