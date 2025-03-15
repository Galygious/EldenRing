import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGuidesBySlug, getPreviousAndNextGuides, getAllGuideMetadata } from '@/lib/guides';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface GuidePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const guides = getAllGuideMetadata();
  
  return guides.map(guide => ({
    slug: guide.slug,
  }));
}

export function generateMetadata({ params }: GuidePageProps) {
  const guide = getGuidesBySlug(params.slug);
  
  if (!guide) {
    return {
      title: 'Guide Not Found | Elden Ring Guided Playthrough',
    };
  }
  
  return {
    title: `${guide.title} | Elden Ring Guided Playthrough`,
    description: `Complete guide for ${guide.title} in Elden Ring. Level range: ${guide.levelRange}, Weapon upgrades: ${guide.upgradeRange}.`,
  };
}

export default function GuidePage({ params }: GuidePageProps) {
  const guide = getGuidesBySlug(params.slug);
  
  if (!guide) {
    notFound();
  }
  
  const { previous, next } = getPreviousAndNextGuides(guide.id);
  
  return (
    <div>
      <div className="mb-8">
        <Link href="/guides" className="elden-link text-sm mb-4 inline-block">
          ← Back to All Guides
        </Link>
        <h1 className="text-3xl md:text-4xl font-display text-elden-gold mb-2">
          {guide.order}. {guide.title}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-elden-light/70 mb-6">
          {guide.levelRange && (
            <div>
              <span className="text-elden-gold">Level:</span> {guide.levelRange}
            </div>
          )}
          {guide.upgradeRange && (
            <div>
              <span className="text-elden-gold">Upgrades:</span> {guide.upgradeRange}
            </div>
          )}
        </div>
      </div>
      
      <div className="elden-card mb-8">
        <MarkdownRenderer content={guide.content} />
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
        {previous && (
          <Link 
            href={`/guide/${encodeURIComponent(previous.slug)}`}
            className="elden-button flex-1 text-center"
          >
            ← {previous.title}
          </Link>
        )}
        
        {next && (
          <Link 
            href={`/guide/${encodeURIComponent(next.slug)}`}
            className="elden-button flex-1 text-center"
          >
            {next.title} →
          </Link>
        )}
      </div>
    </div>
  );
} 