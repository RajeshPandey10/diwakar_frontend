// AOS wrapper to handle SSR/client differences

// Simple wrapper around the aos library to avoid issues
let AOS = {
  init: () => {},
  refresh: () => {},
};

// Only import the actual library on the client side
if (typeof window !== 'undefined') {
  try {
    // Dynamic import to avoid SSR issues
    import('aos').then(module => {
      AOS = module.default || module;
    });
  } catch (error) {
    console.error('Failed to load AOS library:', error);
  }
}

export default AOS;
