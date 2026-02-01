import React from 'react';
import Layout from '../../components/Layout';
import ListLeaderboard from './components/ListLeaderboard';
import { Helmet } from 'react-helmet';

export default function LeaderboardPage() {
  return (
    <Layout>
      <Helmet>
        <title>Forum Web - Leaderboard</title>
        <meta name="description" content="Lihat daftar pengguna terbaik dan teraktif di forum kami." />
      </Helmet>
      <ListLeaderboard />
    </Layout>
  );
}
