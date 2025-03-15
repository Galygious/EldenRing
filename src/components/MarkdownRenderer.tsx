import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // First, check if content is empty
  if (!content || content.trim() === '') {
    return (
      <div className="text-center py-8">
        <p className="text-elden-light text-lg">This guide is coming soon!</p>
      </div>
    );
  }
  
  // Handle different heading formats (# or ##)
  const headerPattern = /(^#+ .*?\n\n\*\*Level:\*\* .*?\n\n---)/m;
  const headerMatch = content.match(headerPattern);
  
  let cleanedContent = content;
  
  if (headerMatch && headerMatch[0]) {
    // Remove the header section
    cleanedContent = content.replace(headerMatch[0], '');
  } else {
    // Try alternative patterns
    // Look for the first section header using a more expansive pattern
    const sectionHeaderMatch = content.match(/\n## (?:\*\*|Buy|Obtain|Find|Get|Talk|Complete|Activate|Meet|Visit|Head|Loot|Kill|Defeat|Trigger|Return|Travel|Go)/);
    
    if (sectionHeaderMatch && sectionHeaderMatch.index) {
      // Remove everything before the first section header
      cleanedContent = content.substring(sectionHeaderMatch.index + 1);
    } else {
      // Try with # header pattern instead of ##
      const hashHeaderMatch = content.match(/\n# (?:\*\*|Buy|Obtain|Find|Get|Talk|Complete|Activate|Meet|Visit|Head|Loot|Kill|Defeat|Trigger|Return|Travel|Go)/);
      
      if (hashHeaderMatch && hashHeaderMatch.index) {
        cleanedContent = content.substring(hashHeaderMatch.index + 1);
      } else {
        // Last resort - look for dividers
        const parts = content.split('---');
        if (parts.length > 2) {
          // Skip the first section with the header and level info
          cleanedContent = parts.slice(2).join('---');
          // Add back the divider at the beginning if needed
          if (!cleanedContent.startsWith('---')) {
            cleanedContent = '---' + cleanedContent;
          }
        }
      }
    }
  }
  
  // Clean up any remaining anchor tags in headings
  cleanedContent = cleanedContent
    .replace(/<a name="(.*?)"><\/a>(\d+)\.\s*(.*?)(?=\n)/g, '## $2. $3')
    // Also handle additional HTML tags that might be causing issues
    .replace(/<\/?[^>]+(>|$)/g, '');
  
  return (
    <div className="markdown-body prose prose-invert prose-gold max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 
              className="text-3xl md:text-4xl font-display text-elden-gold mb-6 border-b border-elden-gold/30 pb-2" 
              {...props} 
            />
          ),
          h2: ({ node, ...props }) => (
            <h2 
              className="text-2xl md:text-3xl font-display text-elden-gold mb-4 mt-10" 
              {...props} 
            />
          ),
          h3: ({ node, ...props }) => (
            <h3 
              className="text-xl md:text-2xl font-display text-elden-gold mt-8 mb-3" 
              {...props} 
            />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-4 text-elden-light leading-relaxed" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="elden-link" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 mb-6 text-elden-light" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 mb-6 text-elden-light" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="mb-2" {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr className="border-t border-elden-gold/30 my-8" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-bold text-elden-gold" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                // @ts-ignore
                style={atomDark}
                language={match[1]}
                PreTag="div"
                className="rounded-md my-6"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code
                className="bg-elden-darker px-1 py-0.5 rounded text-elden-gold font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          blockquote: ({ node, ...props }) => (
            <blockquote 
              className="border-l-4 border-elden-gold/50 pl-4 italic my-6 text-elden-light/80" 
              {...props} 
            />
          ),
        }}
      >
        {cleanedContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer; 