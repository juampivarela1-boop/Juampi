# Hero Image Setup

## Current State
The hero section uses a gradient background as a placeholder.

## To Add Your Own Hero Image

1. Add your hero image to the `/public` folder:
   - Name it `hero.jpg` (or `hero.png`, `hero.webp`)
   - Recommended size: 1920x1080 or higher
   - Image should show modern architecture or an inspiring space

2. Uncomment the Image component in `components/sections/Hero.tsx`:

```tsx
// Replace the gradient placeholder with:
<Image 
  src="/hero.jpg" 
  alt="Arquitectura Moderna" 
  fill 
  className="object-cover"
  priority
/>
```

3. The dark overlay is already in place for text legibility

## Alternative: Use Unsplash
You can also use a URL from Unsplash for testing:
- Search: https://unsplash.com/s/photos/modern-architecture
- Use the direct image URL in the src attribute

## Current Design
- Height: 70vh on desktop, 55vh on mobile
- Dark gradient overlay from left (60% opacity) to right (transparent)
- Text aligned to the left
- Editorial/magazine style layout
