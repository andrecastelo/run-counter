import React from 'react';
import Head from 'next/head';
import { Timer } from '@/components';
import { SessionProvider } from '@/components/Session';

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Run Counter</title>
      </Head>
      <main>
        <SessionProvider>
          <Timer />
        </SessionProvider>
      </main>
    </React.Fragment>
  );
}
