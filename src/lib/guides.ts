import fs from 'fs';
import path from 'path';

export interface GuideMetadata {
  id: string;
  title: string;
  slug: string;
  levelRange: string;
  upgradeRange: string;
  order: number;
}

export interface Guide extends GuideMetadata {
  content: string;
}

const guidesDirectory = path.join(process.cwd(), 'src/data');

/**
 * Convert a string to a URL-safe slug
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars (including &)
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export function getAllGuideIds(): string[] {
  const fileNames = fs.readdirSync(guidesDirectory);
  return fileNames.map(fileName => fileName.replace(/\.md$/, ''));
}

export function getAllGuideMetadata(): GuideMetadata[] {
  const fileNames = fs.readdirSync(guidesDirectory);
  
  const allGuidesData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');
      
      // Read markdown file as string
      const fullPath = path.join(guidesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Extract metadata from the file - updated regex to match actual format
      const titleMatch = fileContents.match(/<a name="(.*?)"><\/a>(\d+)\.\s*(.*?)(?=\n)/);
      
      // More flexible level pattern to handle "60+" and various formats
      const levelMatch = fileContents.match(/\*\*Level:\*\* ([^|\n]*?)(?:\s*\||$)/m);
      const upgradeMatch = fileContents.match(/\*\*Upgrades:\*\* (.*?)(?:\n|$)/m);
      
      const order = parseInt(id.split('-')[0]);
      
      // Clean the title by removing any leading numbers that might be part of the filename already
      let title;
      if (titleMatch) {
        title = titleMatch[3]; // This captures the actual title text after the number
      } else {
        // Extract title from filename, removing the numeric prefix
        title = fileName.replace(/^\d+-|\.\w+$/g, '');
      }
      
      // Create a URL-safe slug
      let slug;
      if (titleMatch && titleMatch[1]) {
        // Use anchor name if available
        slug = slugify(titleMatch[1]);
      } else {
        // Otherwise, create slug from the filename
        slug = slugify(id.toLowerCase().replace(/^\d+-/, ''));
      }
      
      const levelRange = levelMatch ? levelMatch[1].trim() : '';
      const upgradeRange = upgradeMatch ? upgradeMatch[1].trim() : '';
      
      return {
        id,
        title,
        slug,
        levelRange,
        upgradeRange,
        order
      };
    })
    .sort((a, b) => a.order - b.order);
    
  return allGuidesData;
}

export function getGuideData(id: string): Guide {
  const fullPath = path.join(guidesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Extract metadata - updated regex to match actual format
  const titleMatch = fileContents.match(/<a name="(.*?)"><\/a>(\d+)\.\s*(.*?)(?=\n)/);
  
  // More flexible level pattern to handle "60+" and various formats
  const levelMatch = fileContents.match(/\*\*Level:\*\* ([^|\n]*?)(?:\s*\||$)/m);
  const upgradeMatch = fileContents.match(/\*\*Upgrades:\*\* (.*?)(?:\n|$)/m);
  
  const order = parseInt(id.split('-')[0]);
  
  // Clean the title by removing any leading numbers that might be part of the filename already
  let title;
  if (titleMatch) {
    title = titleMatch[3]; // This captures the actual title text after the number
  } else {
    // Extract title from filename, removing the numeric prefix
    title = id.replace(/^\d+-/, '');
  }
  
  // Create a URL-safe slug
  let slug;
  if (titleMatch && titleMatch[1]) {
    // Use anchor name if available
    slug = slugify(titleMatch[1]);
  } else {
    // Otherwise, create slug from the filename
    slug = slugify(id.toLowerCase().replace(/^\d+-/, ''));
  }
  
  const levelRange = levelMatch ? levelMatch[1].trim() : '';
  const upgradeRange = upgradeMatch ? upgradeMatch[1].trim() : '';
  
  return {
    id,
    title,
    slug,
    levelRange,
    upgradeRange,
    order,
    content: fileContents,
  };
}

export function getGuidesBySlug(slug: string): Guide | null {
  const guides = getAllGuideMetadata();
  const guide = guides.find(g => g.slug === slug);
  
  if (!guide) return null;
  
  return getGuideData(guide.id);
}

export function getPreviousAndNextGuides(currentId: string): { 
  previous: GuideMetadata | null; 
  next: GuideMetadata | null; 
} {
  const guides = getAllGuideMetadata();
  const currentIndex = guides.findIndex(guide => guide.id === currentId);
  
  if (currentIndex === -1) {
    return { previous: null, next: null };
  }
  
  const previous = currentIndex > 0 ? guides[currentIndex - 1] : null;
  const next = currentIndex < guides.length - 1 ? guides[currentIndex + 1] : null;
  
  return { previous, next };
} 