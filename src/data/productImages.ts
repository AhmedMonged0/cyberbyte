// Product images data
export const productImages = {
  laptops: {
    'alienware-x17-r2': {
      main: '/images/products/laptops/alienware-x17-r2.jpg',
      gallery: [
        '/images/products/laptops/alienware-x17-r2.jpg',
        '/images/products/laptops/alienware-x17-r2-2.jpg',
        '/images/products/laptops/alienware-x17-r2-3.jpg',
        '/images/products/laptops/alienware-x17-r2-4.jpg'
      ]
    },
    'asus-rog-strix-g15': {
      main: '/images/products/laptops/asus-rog-strix-g15.jpg',
      gallery: [
        '/images/products/laptops/asus-rog-strix-g15.jpg',
        '/images/products/laptops/asus-rog-strix-g15-2.jpg',
        '/images/products/laptops/asus-rog-strix-g15-3.jpg'
      ]
    },
    'macbook-pro-16': {
      main: '/images/products/laptops/macbook-pro-16.jpg',
      gallery: [
        '/images/products/laptops/macbook-pro-16.jpg',
        '/images/products/laptops/macbook-pro-16-2.jpg',
        '/images/products/laptops/macbook-pro-16-3.jpg'
      ]
    },
    'razer-blade-15': {
      main: '/images/products/laptops/razer-blade-15.jpg',
      gallery: [
        '/images/products/laptops/razer-blade-15.jpg',
        '/images/products/laptops/razer-blade-15-2.jpg'
      ]
    },
    'msi-ge76-raider': {
      main: '/images/products/laptops/msi-ge76-raider.jpg',
      gallery: [
        '/images/products/laptops/msi-ge76-raider.jpg',
        '/images/products/laptops/msi-ge76-raider-2.jpg'
      ]
    },
    'dell-xps-15': {
      main: '/images/products/laptops/dell-xps-15.jpg',
      gallery: [
        '/images/products/laptops/dell-xps-15.jpg',
        '/images/products/laptops/dell-xps-15-2.jpg'
      ]
    }
  },
  accessories: {
    'corsair-k95-rgb': {
      main: '/images/products/accessories/corsair-k95-rgb.jpg',
      gallery: [
        '/images/products/accessories/corsair-k95-rgb.jpg',
        '/images/products/accessories/corsair-k95-rgb-2.jpg'
      ]
    },
    'logitech-mx-master-3s': {
      main: '/images/products/accessories/logitech-mx-master-3s.jpg',
      gallery: [
        '/images/products/accessories/logitech-mx-master-3s.jpg',
        '/images/products/accessories/logitech-mx-master-3s-2.jpg'
      ]
    }
  },
  components: {
    'intel-core-i9-13900k': {
      main: '/images/products/components/intel-core-i9-13900k.jpg',
      gallery: [
        '/images/products/components/intel-core-i9-13900k.jpg',
        '/images/products/components/intel-core-i9-13900k-2.jpg'
      ]
    },
    'nvidia-rtx-4090': {
      main: '/images/products/components/nvidia-rtx-4090.jpg',
      gallery: [
        '/images/products/components/nvidia-rtx-4090.jpg',
        '/images/products/components/nvidia-rtx-4090-2.jpg'
      ]
    }
  }
};

// Type for product image data
export type ProductImageData = {
  main: string;
  gallery: string[];
};

// Function to get product image
export const getProductImage = (category: string, productId: string): ProductImageData | null => {
  const categoryImages = productImages[category as keyof typeof productImages];
  if (!categoryImages) return null;
  
  const productImage = categoryImages[productId as keyof typeof categoryImages];
  return productImage || null;
};

// Function to get fallback image
export const getFallbackImage = (category: string) => {
  const fallbackImages = {
    laptops: '/images/products/placeholders/laptop-placeholder.jpg',
    accessories: '/images/products/placeholders/accessory-placeholder.jpg',
    components: '/images/products/placeholders/component-placeholder.jpg'
  };
  
  return fallbackImages[category as keyof typeof fallbackImages] || '/images/products/placeholders/default-placeholder.jpg';
};
