'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Loader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingStage, setLoadingStage] = useState('Initializing...');
  const [isCompiling, setIsCompiling] = useState(false);
  const pathname = usePathname();

  // Check if Next.js is compiling (development mode)
  const checkCompilationStatus = () => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      // Check for Next.js compilation indicators
      const routerState = document.querySelector('[data-nextjs-router-state]')?.getAttribute('data-nextjs-router-state');
      const hasNextInUrl = window.location.search.includes('_next') || window.location.search.includes('__next');
      const hasNextInPath = window.location.pathname.includes('_next') || window.location.pathname.includes('__next');
      
      console.log('Loader: Checking compilation status:', { routerState, hasNextInUrl, hasNextInPath });
      
      if (routerState === 'loading' || routerState === 'compiling' || routerState === 'updating' || routerState === 'stale' || hasNextInUrl || hasNextInPath) {
        console.log('Loader: Compilation detected!');
        setIsCompiling(true);
        setIsLoading(true);
        setLoadingStage(`Next.js is ${routerState || 'compiling'}...`);
        return true;
      }
    }
    return false;
  };

  // Force show loader during compilation
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const forceShowLoader = () => {
        console.log('Loader: Force showing loader for compilation');
        setIsLoading(true);
        setIsCompiling(true);
        setLoadingStage('Next.js is compiling...');
        setLoadingProgress(0);
      };

      // Check immediately
      if (checkCompilationStatus()) {
        forceShowLoader();
      }

      // Set up interval to check for compilation
      const compilationCheckInterval = setInterval(() => {
        if (checkCompilationStatus()) {
          forceShowLoader();
        }
      }, 50); // Check more frequently

      // Also listen for URL changes that might indicate compilation
      const handleUrlChange = () => {
        if (window.location.search.includes('_next') || window.location.pathname.includes('_next')) {
          console.log('Loader: URL change detected, showing compilation loader');
          forceShowLoader();
        }
      };

      window.addEventListener('popstate', handleUrlChange);
      window.addEventListener('pushstate', handleUrlChange);
      window.addEventListener('replacestate', handleUrlChange);

      return () => {
        clearInterval(compilationCheckInterval);
        window.removeEventListener('popstate', handleUrlChange);
        window.removeEventListener('pushstate', handleUrlChange);
        window.removeEventListener('replacestate', handleUrlChange);
      };
    }
  }, []);

  useEffect(() => {
    console.log(`Loader: Route changed to ${pathname}`);
    
    // Reset loader state when route changes
    setIsLoading(true);
    setLoadingProgress(0);
    setLoadedCount(0);
    setTotalCount(0);
    setLoadingStage('Initializing...');
    setIsCompiling(false);

    const loadAllMedia = async () => {
      // Function to get all media elements
      const getAllMedia = () => {
        // Next.js Image components render as img tags with specific classes
        const nextImages = document.querySelectorAll('img[data-nimg], img[data-nextjs-image]');
        const regularImages = document.querySelectorAll('img:not([data-nimg]):not([data-nextjs-image])');
        const videos = document.querySelectorAll('video');
        const iframes = document.querySelectorAll('iframe');
        const audio = document.querySelectorAll('audio');
        
        // Also check for elements with background images
        const elementsWithBgImages = document.querySelectorAll('*');
        const bgImageElements = Array.from(elementsWithBgImages).filter(el => {
          const style = window.getComputedStyle(el);
          const bgImage = style.backgroundImage;
          return bgImage && bgImage !== 'none' && bgImage !== 'initial' && bgImage !== 'inherit';
        });
        
        console.log(`Found ${nextImages.length} Next.js Image components`);
        console.log(`Found ${regularImages.length} regular img tags`);
        console.log(`Found ${bgImageElements.length} elements with background images`);
        
        return [...nextImages, ...regularImages, ...videos, ...iframes, ...audio, ...bgImageElements];
      };

      // Initial check
      let allMedia = getAllMedia();
      let totalMedia = allMedia.length;
      
      console.log(`Loader: Initial check - Found ${totalMedia} media items to load`);
      
      setTotalCount(totalMedia);
      setLoadingProgress(0);
      setLoadedCount(0);
      setLoadingStage(`Found ${totalMedia} media items to load...`);

      // If no media found initially, wait a bit and check again
      if (totalMedia === 0) {
        setLoadingStage('Scanning for media content...');
        
        // Multiple checks for dynamic content
        let checkCount = 0;
        const maxChecks = pathname.includes('/') && pathname.split('/').length > 2 ? 5 : 3;
        
        const checkForMedia = () => {
          checkCount++;
          allMedia = getAllMedia();
          totalMedia = allMedia.length;
          
          console.log(`Loader: Check ${checkCount} - Found ${totalMedia} media items`);
          
          if (totalMedia > 0) {
            setTotalCount(totalMedia);
            setLoadingStage(`Found ${totalMedia} media items to load...`);
            processMediaLoading(allMedia, totalMedia);
          } else if (checkCount < maxChecks) {
            setLoadingStage(`Scanning for media content... (${checkCount}/${maxChecks})`);
            setTimeout(checkForMedia, 300);
          } else {
            setLoadingStage('Preparing content...');
            // Simulate progress for pages with no media
            let simulatedProgress = 0;
            const progressInterval = setInterval(() => {
              simulatedProgress += 10;
              setLoadingProgress(simulatedProgress);
              if (simulatedProgress >= 100) {
                clearInterval(progressInterval);
                setTimeout(() => {
                  setIsLoading(false);
                }, 500);
              }
            }, 150);
          }
        };
        
        setTimeout(checkForMedia, 300);
        return;
      }
      
      processMediaLoading(allMedia, totalMedia);
    };

    const processMediaLoading = async (allMedia, totalMedia) => {
      console.log(`Loader: Starting to process ${totalMedia} media items`);
      
      const mediaPromises = allMedia.map((element, index) => {
        return new Promise((resolve) => {
          const updateProgress = () => {
            setLoadedCount((prevCount) => {
              const newCount = prevCount + 1;
              const newProgress = (newCount / totalMedia) * 100;
              console.log(`Loader: Progress ${newCount}/${totalMedia} (${Math.round(newProgress)}%)`);
              setLoadingProgress(Math.min(newProgress, 100));
              setLoadingStage(`Loaded ${newCount} of ${totalMedia} items...`);
              return newCount;
            });
          };

          // For background image elements, mark as loaded immediately
          if (element.tagName !== 'IMG' && element.tagName !== 'VIDEO' && element.tagName !== 'IFRAME' && element.tagName !== 'AUDIO') {
            updateProgress();
            resolve();
            return;
          }

          if (element.tagName === 'IMG') {
            // Check if this is a Next.js Image component
            const isNextImage = element.hasAttribute('data-nimg') || element.hasAttribute('data-nextjs-image');
            
            if (element.complete) {
              console.log(`Loader: Image already complete: ${element.src} (${isNextImage ? 'Next.js Image' : 'Regular img'})`);
              updateProgress();
              resolve();
            } else {
              console.log(`Loader: Waiting for image to load: ${element.src} (${isNextImage ? 'Next.js Image' : 'Regular img'})`);
              element.onload = () => {
                console.log(`Loader: Image loaded: ${element.src} (${isNextImage ? 'Next.js Image' : 'Regular img'})`);
                updateProgress();
                resolve();
              };
              element.onerror = () => {
                console.log(`Loader: Image failed to load: ${element.src} (${isNextImage ? 'Next.js Image' : 'Regular img'})`);
                updateProgress();
                resolve();
              };
            }
          } else if (element.tagName === 'VIDEO') {
            if (element.readyState >= 2) {
              updateProgress();
              resolve();
            } else {
              element.onloadeddata = () => {
                updateProgress();
                resolve();
              };
              element.onerror = () => {
                updateProgress();
                resolve();
              };
            }
          } else if (element.tagName === 'IFRAME') {
            element.onload = () => {
              updateProgress();
              resolve();
            };
            element.onerror = () => {
              updateProgress();
              resolve();
            };
          } else if (element.tagName === 'AUDIO') {
            element.oncanplay = () => {
              updateProgress();
              resolve();
            };
            element.onerror = () => {
              updateProgress();
              resolve();
            };
          }
        });
      });

      // Add a timeout to prevent infinite loading
      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => {
          console.log('Loader timeout reached, showing content anyway');
          resolve();
        }, 8000); // 8 second timeout
      });

      await Promise.race([Promise.all(mediaPromises), timeoutPromise]);
      
      // Ensure progress reaches 100%
      setLoadingProgress(100);
      setLoadedCount(totalMedia);
      
      // Final stage
      setLoadingStage('Finalizing...');
      
      // Add a small delay for smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    // Check compilation status first
    if (checkCompilationStatus()) {
      // If compiling, wait for compilation to complete
      const checkCompilationComplete = () => {
        if (!checkCompilationStatus()) {
          setIsCompiling(false);
          setLoadingStage('Compilation complete, loading content...');
          // Continue with normal loading process
          setTimeout(() => {
            loadAllMedia();
          }, 500);
        } else {
          setTimeout(checkCompilationComplete, 100);
        }
      };
      
      setTimeout(checkCompilationComplete, 100);
      return;
    }

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      console.log(`Loader: Starting on route ${pathname}`);
      
      // Check for hot reload in development
      if (process.env.NODE_ENV === 'development') {
        if (typeof window !== 'undefined') {
          const isHotReloading = window.location.search.includes('_next') || 
                                document.querySelector('[data-nextjs-router-state]')?.getAttribute('data-nextjs-router-state') === 'loading';
          
          if (isHotReloading) {
            setLoadingStage('Hot reloading...');
            setTimeout(() => {
              loadAllMedia();
            }, 300);
            return;
          }
        }
      }
      
      // For nested routes, wait a bit longer to ensure content is rendered
      const delay = pathname.includes('/') && pathname.split('/').length > 2 ? 300 : 100;
      setTimeout(() => {
        loadAllMedia();
      }, delay);
    }, 100);
  }, [pathname]); // Re-run when route changes

  // Listen for Next.js compilation events globally
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      const handleNextJsEvent = (event) => {
        console.log('Loader: Next.js event detected:', event.type);
        if (event.type === 'beforeunload' || 
            event.type === 'load' ||
            window.location.search.includes('_next')) {
          setTimeout(() => {
            setIsCompiling(true);
            setIsLoading(true);
            setLoadingStage('Next.js is updating...');
          }, 0);
        }
      };

      window.addEventListener('beforeunload', handleNextJsEvent);
      window.addEventListener('load', handleNextJsEvent);
      
      // Check for Next.js router state changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && 
              mutation.attributeName === 'data-nextjs-router-state') {
            const state = mutation.target.getAttribute('data-nextjs-router-state');
            console.log('Loader: Router state changed to:', state);
            if (state === 'loading' || state === 'compiling' || state === 'updating') {
              setTimeout(() => {
                setIsCompiling(true);
                setIsLoading(true);
                setLoadingStage(`Next.js is ${state}...`);
              }, 0);
            }
          }
        });
      });

      // Observe the document for Next.js router state changes
      const routerElement = document.querySelector('[data-nextjs-router-state]');
      if (routerElement) {
        observer.observe(routerElement, { attributes: true });
      }

      // Also observe the document body for any router state elements
      const bodyObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            const routerElement = document.querySelector('[data-nextjs-router-state]');
            if (routerElement && !routerElement.hasAttribute('data-loader-observed')) {
              routerElement.setAttribute('data-loader-observed', 'true');
              observer.observe(routerElement, { attributes: true });
            }
          }
        });
      });

      bodyObserver.observe(document.body, { childList: true, subtree: true });

      // Monitor for any compilation indicators in the DOM
      const compilationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            // Check if any new elements indicate compilation
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node;
                if (element.getAttribute && (
                  element.getAttribute('data-nextjs-router-state') === 'loading' ||
                  element.getAttribute('data-nextjs-router-state') === 'compiling' ||
                  element.getAttribute('data-nextjs-router-state') === 'updating' ||
                  element.classList.contains('nextjs-loading') ||
                  element.classList.contains('nextjs-compiling')
                )) {
                  console.log('Loader: Compilation indicator found in DOM');
                  setTimeout(() => {
                    setIsCompiling(true);
                    setIsLoading(true);
                    setLoadingStage('Next.js is compiling...');
                  }, 0);
                }
              }
            });
          }
        });
      });

      compilationObserver.observe(document.documentElement, { childList: true, subtree: true });

      return () => {
        window.removeEventListener('beforeunload', handleNextJsEvent);
        window.removeEventListener('load', handleNextJsEvent);
        observer.disconnect();
        bodyObserver.disconnect();
        compilationObserver.disconnect();
      };
    }
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-gray-800">
        <div className="text-center loader-slide-in">
          <div className="relative">
            {/* Logo or brand name */}
            <div className="text-white text-2xl font-bold mb-8 loader-pulse">
              Loading
            </div>
            
            {/* Spinning loader */}
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            
            {/* Progress bar */}
            <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            
            {/* Loading text */}
            <div className="text-white text-lg font-semibold mb-2">
              {isCompiling ? 'Compiling...' : 'Loading Portfolio...'}
            </div>
            
            {/* Current route */}
            <div className="text-blue-400 text-xs mb-2">
              Route: {pathname}
            </div>
            
            {/* Loading stage */}
            <div className="text-blue-300 text-sm mb-2">
              {loadingStage}
            </div>
            
            {/* Development mode indicator */}
            {process.env.NODE_ENV === 'development' && (
              <div className="text-yellow-400 text-xs mb-2">
                Development Mode
              </div>
            )}
            
            {/* Progress percentage */}
            <div className="text-blue-200 text-sm">
              {Math.round(loadingProgress)}% ({loadedCount}/{totalCount})
            </div>
            
            {/* Animated dots */}
            <div className="flex justify-center mt-4 space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default Loader; 