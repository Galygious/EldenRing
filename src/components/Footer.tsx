import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-elden-darker border-t border-elden-gold/30 py-8 mt-12">
      <div className="elden-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-elden-light text-sm">
              Elden Ring Guided Playthrough &copy; {new Date().getFullYear()}
            </p>
            <p className="text-elden-light/60 text-xs mt-1">
              This is a fan-made guide. Elden Ring is property of FromSoftware and Bandai Namco.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="/guides" className="elden-link text-sm">
              All Guides
            </Link>
            <Link href="/endings" className="elden-link text-sm">
              Endings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 