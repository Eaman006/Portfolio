# Website Loader Documentation

## Overview
This loader component ensures that all images and media content are fully loaded before displaying the website content to users.

## Features

### 🎯 **Comprehensive Media Detection**
- **Images**: Tracks all `<img>` elements
- **Videos**: Monitors `<video>` elements
- **Iframes**: Watches `<iframe>` elements  
- **Audio**: Tracks `<audio>` elements

### 📊 **Progress Tracking**
- Real-time progress bar showing loading percentage
- Visual feedback with animated elements
- Progress percentage display

### ⏱️ **Smart Timeout**
- 8-second maximum loading time
- Prevents infinite loading states
- Graceful fallback to show content

### 🎨 **Beautiful UI**
- Gradient background with professional styling
- Animated spinning loader
- Bouncing dots animation
- Smooth transitions and animations

## How It Works

1. **Detection Phase**: Scans the DOM for all media elements
2. **Loading Phase**: Tracks each element's loading state
3. **Progress Update**: Updates progress bar in real-time
4. **Completion**: Shows content once all media is loaded or timeout reached

## Implementation

The loader is implemented in `app/Components/Loader.js` and integrated into the main layout at `app/layout.js`.

### Key Features:
- **Client-side rendering** with `'use client'` directive
- **React hooks** for state management
- **Promise-based** media loading detection
- **Tailwind CSS** for styling
- **Custom CSS animations** for enhanced UX

## Customization

### Changing Loader Style
Edit the JSX in `Loader.js` to modify:
- Colors and gradients
- Animation timing
- Text content
- Layout structure

### Adjusting Timeout
Modify the timeout value in the `timeoutPromise`:
```javascript
setTimeout(() => {
  resolve();
}, 8000); // Change this value (in milliseconds)
```

### Adding More Media Types
Extend the media detection by adding more element types:
```javascript
const allMedia = [...images, ...videos, ...iframes, ...audio, ...newMediaType];
```

## Browser Compatibility
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers
- ✅ Progressive enhancement (works without JavaScript)

## Performance Notes
- Minimal performance impact
- Efficient DOM querying
- Memory-safe promise handling
- Automatic cleanup on component unmount 