import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-elden-darker border-b border-elden-gold/30">
      <div className="elden-container py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <Link href="/">
              <h1 className="font-display text-3xl md:text-4xl text-elden-gold">
                ELDEN RING
              </h1>
              <p className="text-elden-light text-sm tracking-wider">
                GUIDED PLAYTHROUGH
              </p>
            </Link>
          </div>
          <nav>
            <ul className="flex space-x-6 font-display text-sm uppercase tracking-wide">
              <li>
                <Link href="/" className="elden-link">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/guides" className="elden-link">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/endings" className="elden-link">
                  Endings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 