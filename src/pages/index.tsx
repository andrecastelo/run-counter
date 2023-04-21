import React from 'react';
import Head from 'next/head';
import { Timer } from '@/components';

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Run Counter</title>
        <meta name="description" content="Simple run counter" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Timer />
      </main>
    </React.Fragment>
  );
}
