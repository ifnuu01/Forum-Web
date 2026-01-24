import ThreadCard from '../../components/ThreadCard';
import Layout from '../../components/Layout';

export default function Home() {
    // const dispatch = useDispatch<AppDispatch>();
    // const { threads, loading, error } = useSelector(selectThreads);

    // useEffect(() => {
    //     dispatch(fetchThreads());
    // }, [dispatch]);

    // if (loading) return <div>Loading threads...</div>;
    // if (error) return <div>Error: {error}</div>;
    return (
        <Layout>
            <ThreadCard />
            <ThreadCard />
            <ThreadCard />
            <ThreadCard />
            <ThreadCard />
            <ThreadCard />
            <ThreadCard />
            <ThreadCard />
        </Layout>
    );
}