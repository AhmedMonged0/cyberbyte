// Product images data
export const productImages = {
  laptops: {
    'alienware-x17-r2': {
      main: '/images/products/alienware-x17-r2.jpg',
      gallery: [
        '/images/products/alienware-x17-r2.jpg',
        '/images/products/alienware-x17-r2-2.jpg',
        '/images/products/alienware-x17-r2-3.jpg',
        '/images/products/alienware-x17-r2-4.jpg'
      ]
    },
    'asus-rog-strix-g15': {
      main: '/images/products/asus-rog-strix-g15.jpg',
      gallery: [
        '/images/products/asus-rog-strix-g15.jpg',
        '/images/products/asus-rog-strix-g15-2.jpg',
        '/images/products/asus-rog-strix-g15-3.jpg'
      ]
    },
    'macbook-pro-16': {
      main: '/images/products/macbook-pro-16.jpg',
      gallery: [
        '/images/products/macbook-pro-16.jpg',
        '/images/products/macbook-pro-16-2.jpg',
        '/images/products/macbook-pro-16-3.jpg'
      ]
    },
    'razer-blade-15': {
      main: '/images/products/razer-blade-15.jpg',
      gallery: [
        '/images/products/razer-blade-15.jpg',
        '/images/products/razer-blade-15-2.jpg'
      ]
    },
    'msi-ge76-raider': {
      main: '/images/products/msi-ge76-raider.jpg',
      gallery: [
        '/images/products/msi-ge76-raider.jpg',
        '/images/products/msi-ge76-raider-2.jpg'
      ]
    },
    'dell-xps-15': {
      main: '/images/products/dell-xps-15.jpg',
      gallery: [
        '/images/products/dell-xps-15.jpg',
        '/images/products/dell-xps-15-2.jpg'
      ]
    }
  },
  accessories: {
    'corsair-k95-rgb': {
      main: '/images/products/corsair-k95-rgb.jpg',
      gallery: [
        '/images/products/corsair-k95-rgb.jpg',
        '/images/products/corsair-k95-rgb-2.jpg'
      ]
    },
    'logitech-mx-master-3s': {
      main: '/images/products/logitech-mx-master-3s.jpg',
      gallery: [
        '/images/products/logitech-mx-master-3s.jpg',
        '/images/products/logitech-mx-master-3s-2.jpg'
      ]
    }
  },
  components: {
    'intel-core-i9-13900k': {
      main: '/images/products/intel-core-i9-13900k.jpg',
      gallery: [
        '/images/products/intel-core-i9-13900k.jpg',
        '/images/products/intel-core-i9-13900k-2.jpg'
      ]
    },
    'nvidia-rtx-4090': {
      main: '/images/products/nvidia-rtx-4090.jpg',
      gallery: [
        '/images/products/nvidia-rtx-4090.jpg',
        '/images/products/nvidia-rtx-4090-2.jpg'
      ]
    }
  }
};

// Function to get product image
export const getProductImage = (category: string, productId: string) => {
  const categoryImages = productImages[category as keyof typeof productImages];
  if (!categoryImages) return null;
  
  const productImage = categoryImages[productId as keyof typeof categoryImages];
  return productImage || null;
};

// Function to get fallback image
export const getFallbackImage = (category: string) => {
  const fallbackImages = {
    laptops: '/images/products/laptop-placeholder.jpg',
    accessories: '/images/products/accessory-placeholder.jpg',
    components: '/images/products/component-placeholder.jpg'
  };
  
  return fallbackImages[category as keyof typeof fallbackImages] || '/images/products/default-placeholder.jpg';
};
