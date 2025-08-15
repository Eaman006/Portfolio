'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';

// Create context for loader state
const LoaderContext = createContext();

// Custom hook to use loader
export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};

const Loader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingStage, setLoadingStage] = useState('Initializing...');
  const [isCompiling, setIsCompiling] = useState(false);
  const [isLinkLoading, setIsLinkLoading] = useState(false);
  const pathname = usePathname();

  // Function to trigger loader for link clicks
  const triggerLinkLoader = () => {
    setIsLinkLoading(true);
    setIsLoading(true);
    setLoadedCount(0);
    setTotalCount(0);
    setLoadingStage('Loading...');
    
    // Simulate progress for 5 seconds
    setTimeout(() => {
      setIsLinkLoading(false);
      setIsLoading(false);
    }, 5000);
  };

  // Context value
  const contextValue = {
    triggerLinkLoader,
    isLinkLoading
  };

  // Check if Next.js is compiling (development mode)
  const checkCompilationStatus = () => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      // Check for Next.js compilation indicators
      const routerState = document.querySelector('[data-nextjs-router-state]')?.getAttribute('data-nextjs-router-state');
      const hasNextInUrl = window.location.search.includes('_next') || window.location.search.includes('__next');
      const hasNextInPath = window.location.pathname.includes('_next') || window.location.pathname.includes('__next');
      
    
      
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
    
    
    // Reset loader state when route changes
    setIsLoading(true);
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
    // Create a counter to track loaded items
    let loadedItems = 0;
    
    // Function to update progress with throttling and batching
    const updateProgress = () => {
      loadedItems++;
      const newProgress = (loadedItems / totalMedia) * 100;
      const roundedProgress = Math.min(Math.round(newProgress), 100);
      
      // Batch state updates
      requestAnimationFrame(() => {
        setLoadedCount(loadedItems);
          setLoadingStage(`Loaded ${loadedItems} of ${totalMedia} items...`);
      });
      
      console.log(`Loader: Progress ${loadedItems}/${totalMedia} (${roundedProgress}%)`);
    };
    
    const mediaPromises = allMedia.map((element) => {
      return new Promise((resolve) => {

          // For background image elements, mark as loaded immediately
          if (element.tagName !== 'IMG' && element.tagName !== 'VIDEO' && element.tagName !== 'IFRAME' && element.tagName !== 'AUDIO') {
            // Use setTimeout to avoid blocking the main thread
            setTimeout(() => {
              updateProgress();
              resolve();
            }, 0);
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
      
      // Ensure progress reaches 100% with a smooth transition
      const finalizeLoading = () => {
          setLoadedCount(totalMedia);
        setLoadingStage('Finalizing...');
        
        // Add a small delay for smooth transition
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      };
      
      // Ensure the UI has time to update before finalizing
      requestAnimationFrame(() => {
        setTimeout(finalizeLoading, 100);
      });
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
      <LoaderContext.Provider value={contextValue}>
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="text-center animate-fade-in">
            <div className="relative">
              {/* Modern animated logo/brand */}
              <div className="mb-8">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  Portfolio
                </div>
              </div>
              
              {/* Modern animated loader */}
              <div className="relative w-24 h-24 mx-auto mb-8">
                {/* Outer ring */}
                <div className="absolute inset-0 border-4 border-transparent border-t-blue-400 rounded-full animate-spin"></div>
                {/* Middle ring */}
                <div className="absolute inset-2 border-4 border-transparent border-t-purple-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                {/* Inner ring */}
                <div className="absolute inset-4 border-4 border-transparent border-t-pink-400 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
                {/* Center dot */}
                <div className="absolute inset-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
              </div>
              
              {/* Loading status */}
              <div className="space-y-2 mb-6">
                <div className="text-white text-lg font-medium">
                  {isLinkLoading ? 'Navigating...' : 'Loading...'}
                </div>
              </div>
              
              {/* Modern animated dots */}
              <div className="flex justify-center mt-6 space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
          
          {/* Add custom CSS for animations */}
          <style jsx>{`
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
            
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            .animate-shimmer {
              animation: shimmer 2s infinite;
            }
            
            .animate-fade-in {
              animation: fade-in 0.6s ease-out;
            }
          `}</style>
        </div>
      </LoaderContext.Provider>
    );
  }

  return (
    <LoaderContext.Provider value={contextValue}>
      {children}
    </LoaderContext.Provider>
  );
};

export default Loader; 