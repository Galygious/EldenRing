import React from 'react';
import { getAllGuideMetadata } from '@/lib/guides';
import GuideCard from '@/components/GuideCard';

export const metadata = {
  title: 'All Guides | Elden Ring Guided Playthrough',
  description: 'Browse all guides for Elden Ring from start to finish.',
};

export default function GuidesPage() {
  const guides = getAllGuideMetadata();
  
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-display text-elden-gold mb-8">
        All Guides
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>
    </div>
  );
} 