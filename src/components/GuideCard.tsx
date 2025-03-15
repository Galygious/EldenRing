import React from 'react';
import Link from 'next/link';
import { GuideMetadata } from '@/lib/guides';

interface GuideCardProps {
  guide: GuideMetadata;
}

const GuideCard: React.FC<GuideCardProps> = ({ guide }) => {
  return (
    <Link 
      href={`/guide/${encodeURIComponent(guide.slug)}`}
      className="block hover:-translate-y-1 transition-transform duration-200"
    >
      <div className="elden-card h-full">
        <div className="flex flex-col h-full">
          <h2 className="font-display text-xl text-elden-gold mb-2">
            {guide.order}. {guide.title}
          </h2>
          <div className="text-sm text-elden-light/70 mb-3 space-y-1">
            {guide.levelRange && (
              <p>
                <span className="text-elden-gold">Level:</span> {guide.levelRange}
              </p>
            )}
            {guide.upgradeRange && (
              <p>
                <span className="text-elden-gold">Upgrades:</span> {guide.upgradeRange}
              </p>
            )}
          </div>
          <div className="mt-auto pt-4">
            <span className="elden-button text-sm inline-block">View Guide</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GuideCard; 