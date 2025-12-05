import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    barcode: '',
    category: '',
    serving_size: '',
    nutrition: {
      calories: '',
      protein: '',
      fat: '',
      carbs: '',
      fiber: '',
      sugar: '',
      sodium: ''
    },
    ingredients: '',
    allergens: '',
    additives: ''
  });

  useEffect(() => {
    checkAuth();
    fetchProducts();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("nutrition.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        nutrition: { ...prev.nutrition, [key]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      barcode: '',
      category: '',
      serving_size: '',
      nutrition: {
        calories: '',
        protein: '',
        fat: '',
        carbs: '',
        fiber: '',
        sugar: '',
        sodium: ''
      },
      ingredients: '',
      allergens: '',
      additives: ''
    });
    setShowForm(false);
    setEditMode(false);
    setCurrentProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    const payload = {
      ...formData,
      ingredients: formData.ingredients.split(',').map(i => i.trim()).filter(i => i),
      allergens: formData.allergens.split(',').map(a => a.trim()).filter(a => a),
      additives: formData.additives.split(',').map(a => a.trim()).filter(a => a)
    };

    const url = editMode
      ? `${API_URL}/api/admin/products/${currentProduct.id}`
      : `${API_URL}/api/admin/products`;

    const method = editMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        alert(editMode ? "Produk berhasil diupdate!" : "Produk berhasil ditambahkan!");
        resetForm();
        fetchProducts();
      } else {
        alert("Gagal menyimpan produk");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    }
  };

  // FIXED handleEdit()
  const handleEdit = (product) => {
    const nutrition = product.nutrition || {
      calories: '',
      protein: '',
      fat: '',
      carbs: '',
      fiber: '',
      sugar: '',
      sodium: ''
    };

    setFormData({
      name: product.name || '',
      brand: product.brand || '',
      barcode: product.barcode || '',
      category: product.category || '',
      serving_size: product.serving_size || '',
      nutrition,
      ingredients: product.ingredients?.join(', ') || '',
      allergens: product.allergens?.join(', ') || '',
      additives: product.additives?.join(', ') || '',
    });

    setCurrentProduct(product);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;

    const token = localStorage.getItem("adminToken");

    try {
      const response = await fetch(`${API_URL}/api/admin/products/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        alert("Produk berhasil dihapus!");
        fetchProducts();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menghapus produk");
    }
  };

return (
  <div className="min-h-screen bg-gray-100 p-10 text-3xl font-bold text-center">
    ADMIN DASHBOARD WORKING 🎉
  </div>
);

}

export default AdminDashboard;


