import React from 'react';
import Link from 'next/link';
import { getAllGuideMetadata } from '@/lib/guides';
import GuideCard from '@/components/GuideCard';

export default function Home() {
  const guides = getAllGuideMetadata();
  const featuredGuides = guides.slice(0, 6); // Show first 6 guides on homepage
  const firstGuide = guides.length > 0 ? guides[0] : null;
  
  return (
    <div>
      <section className="mb-12">
        <div className="elden-card mb-8">
          <h1 className="text-4xl md:text-5xl font-display text-elden-gold mb-4">
            ELDEN RING GUIDED PLAYTHROUGH
          </h1>
          <p className="text-elden-light text-lg mb-6">
            A complete, step-by-step guide to playing through Elden Ring from start to finish.
            Follow this guide to discover all major locations, defeat challenging bosses, and complete important questlines.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/guides" className="elden-button">
              View All Guides
            </Link>
            {firstGuide && (
              <Link href={`/guide/${encodeURIComponent(firstGuide.slug)}`} className="elden-button">
                Start Your Journey
              </Link>
            )}
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl md:text-3xl font-display text-elden-gold mb-6">
          Getting Started
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
        
        {guides.length > 6 && (
          <div className="mt-8 text-center">
            <Link href="/guides" className="elden-button">
              View All {guides.length} Guides
            </Link>
          </div>
        )}
      </section>
    </div>
  );
} 