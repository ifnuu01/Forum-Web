import CommentCard from './CommentCard'
import { Link } from 'react-router'

export default function ReplyHistory() {
    return (
        <section className="px-8 mt-4 border-b-2 border-secondary pb-4">
            {/* header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className='order-2 md:order-1'>
                    <div className="flex flex-col md:flex-row gap-2 md:items-center">
                        <h1>Dibuat oleh
                            <strong className="pl-1">Dimas</strong>
                        </h1>
                        <p className="text-white/50">1 hari yang lalu</p>
                    </div>
                    <div>
                        <Link to="/detail-thread" className="text-xl font-bold">Lorem ipsum dolar sit amet</Link>
                    </div>
                </div>
                <div className="px-4 w-fit rounded-full border-2 border-white order-1 mb-2 md:mb-0">
                    <span>Curhatan</span>
                </div>
            </div>

            {/* body */}
            <div className="mt-2">
                <p>Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, qui....</p>
            </div>

            <CommentCard />
            <CommentCard />
            <CommentCard />
        </section>
    )
}
