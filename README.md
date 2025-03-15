# Elden Ring Guided Playthrough

A beautiful, interactive web guide for playing through Elden Ring from start to finish. This project takes markdown-formatted guides and presents them in an elegant, easy-to-navigate website.

## Features

- Complete step-by-step guides for all areas of Elden Ring
- Beautiful dark theme inspired by the game's aesthetic
- Responsive design for all devices
- Easy navigation between guides
- Information about level ranges and weapon upgrade recommendations

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd elden-ring-guide
npm install
# or
yarn install
```

3. Copy the markdown guide files to the data directory:

```bash
node copy-guides.js
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

Then, you can start the production server:

```bash
npm run start
# or
yarn start
```

## Deployment

This is a Next.js application that can be deployed to various platforms:

- [Vercel](https://vercel.com/) (recommended for Next.js apps)
- [Netlify](https://www.netlify.com/)
- Any static hosting service (after running `npm run build`)

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - React components
- `src/data/` - Markdown guide files
- `src/lib/` - Utility functions
- `src/styles/` - Global styles and Tailwind configuration
- `public/` - Static assets

## License

This is a fan-made guide. Elden Ring is property of FromSoftware and Bandai Namco. 