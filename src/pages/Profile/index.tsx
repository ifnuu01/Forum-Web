import Layout from '../../components/Layout'
import ProfileHeader from './components/ProfileHeader'
import MyThreadCard from './components/MyThreadCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOwnProfile, selectUser } from '../../features/user/userSlice'
import { useEffect } from 'react'
import type { AppDispatch } from '../../store/store'
import { selectThreads } from '../../features/threads/threadsSlice'

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>()
  const { ownUser } = useSelector(selectUser)
  const { threads } = useSelector(selectThreads)

  useEffect(() => {
    dispatch(fetchOwnProfile())
  }, [dispatch])

  const filterMyThreads = threads.filter(thread => thread.ownerId === ownUser?.id)

  return (
    <Layout>
      {/* header */}
      <ProfileHeader />

      {/* menu */}
      <section className="flex items-center justify-around mt-4">
        <button
          className="w-full border-b-2 pb-2 cursor-pointer border-secondary font-bold">
                    Forum Ku
        </button>
      </section>
      {ownUser && filterMyThreads.map(thread => (
        <MyThreadCard key={thread.id}
          id={thread.id}
          title={thread.title}
          body={thread.body}
          createdAt={thread.createdAt}
          name={ownUser.name}
          avatar={ownUser.avatar}
          upVotesBy={thread.upVotesBy}
          downVotesBy={thread.downVotesBy}
          totalComments={thread.totalComments}
        />
      ))}
    </Layout>
  )
}