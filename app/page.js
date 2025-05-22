'use client';

import dynamic from 'next/dynamic';

const FlowBuilderUI = dynamic(() => import('./FlowBuilderUI'), {
  ssr: false,
});

export default function Home() {
  return <FlowBuilderUI />;
}
