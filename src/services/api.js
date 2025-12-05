const API_URL = import.meta.env.VITE_API_URL;

// All backend routes start with /api
export const api = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, message: error.message };
    }
  },

  // Get product by barcode
  getProductByBarcode: async (barcode) => {
    try {
      const response = await fetch(`${API_URL}/api/products/barcode/${barcode}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, message: error.message };
    }
  },

  // Search products
  searchProducts: async (query) => {
    try {
      const response = await fetch(`${API_URL}/api/products/search/${query}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, message: error.message };
    }
  },

  // Get product detail
  getProduct: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/products/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, message: error.message };
    }
  },

  // Add to history
  addToHistory: async (productId) => {
    try {
      const response = await fetch(`${API_URL}/api/history`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, message: error.message };
    }
  },

  // Get history
  getHistory: async () => {
    try {
      const response = await fetch(`${API_URL}/api/history`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, message: error.message };
    }
  },

  // Clear all history
  clearHistory: async () => {
    try {
      const response = await fetch(`${API_URL}/api/history/clear`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
};
