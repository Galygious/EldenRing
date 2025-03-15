import React from 'react';
import { getGuidesBySlug } from '@/lib/guides';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export const metadata = {
  title: 'Endings | Elden Ring Guided Playthrough',
  description: 'Complete guide to all possible endings in Elden Ring and how to achieve them.',
};

export default function EndingsPage() {
  // Get the endings guide (assuming it's the last one with id "28-Endings")
  const endingsGuide = getGuidesBySlug('endings');
  
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-display text-elden-gold mb-8">
        Elden Ring Endings
      </h1>
      
      <div className="elden-card">
        {endingsGuide ? (
          <MarkdownRenderer content={endingsGuide.content} />
        ) : (
          <div className="text-elden-light">
            <p>Endings guide content is not available.</p>
            <p className="mt-4">
              Elden Ring has multiple endings that depend on which questlines you complete throughout your journey.
              Check back later for a complete guide on how to achieve each ending.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 