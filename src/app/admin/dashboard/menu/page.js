"use client";

import { Edit, ImageIcon, Loader2, LogOut, Save, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
    id: null,
    menuType: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  // router
const router = useRouter();

  // Fetch menu items on load
  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/menu");
      if (!res.ok) throw new Error("Failed to fetch menu items");
      const data = await res.json();
      setMenuItems(data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching menu items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(formData);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));

      // Create image preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      image: null,
      id: null,
    });
    setImagePreview(null);
    setIsEditing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const showSuccessMessage = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate form
      if (!formData.title || !formData.description || !formData.price) {
        throw new Error("Please fill all required fields");
      }

      if (!formData.id && !formData.image) {
        throw new Error("Please upload an image");
      }

      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("price", formData.price);
      form.append("menuType", formData.menuType);

      if (formData.image) {
        form.append("image", formData.image);
      }

      if (formData.id) {
        form.append("id", formData.id);
      }

      const method = formData.id ? "PATCH" : "POST";
      const res = await fetch("/api/menu", { method, body: form });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save menu item");
      }

      await fetchMenuItems();
      resetForm();
      showSuccessMessage(formData.id ? "Menu item updated successfully" : "Menu item added successfully");
      window.location.reload();
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;

    setLoading(true);
    try {
      const res = await fetch("/api/menu", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete menu item");
      }

      await fetchMenuItems();
      showSuccessMessage("Menu item deleted successfully");
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      price: item.price,
      image: null,
      id: item._id,
      menuType: item.menuType,
    });
    setImagePreview(item.image);
    setIsEditing(true);

    // Scroll to form
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
         credentials: "include",
      });
      if (res.ok) {
         router.push("/admin/login");
      } else {
        throw new Error("Logout failed");
      }
    } catch (err) {
      setError("Failed to logout. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button onClick={handleLogout} disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 flex items-center">
          {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : <LogOut className="h-5 w-5 mr-2" />}
          Logout
        </button>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Menu Management</h1>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 flex items-center">
            <div className="text-red-500 mr-3">
              <X className="h-5 w-5" />
            </div>
            <div className="text-red-700">{error}</div>
            <button className="ml-auto text-red-500 hover:text-red-700" onClick={() => setError(null)}>
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 flex items-center">
            <div className="text-green-500 mr-3">
              <Save className="h-5 w-5" />
            </div>
            <div className="text-green-700">{success}</div>
          </div>
        )}

        {/* Menu Form */}
        <div ref={formRef} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Menu Item" : "Add New Menu Item"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input type="text" name="title" placeholder="e.g., Margherita Pizza" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input type="number" name="price" placeholder="9.99" value={formData.price} onChange={handleChange} step="0.01" min="0" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea name="description" placeholder="Describe your menu item..." value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Menu Type <span className="text-red-500">*</span>
              </label>
              <select name="menuType" value={formData.menuType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select menu type</option>
                <option value="Samosa">Samosa</option>
                <option value="Chai">Chai</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image {!isEditing && <span className="text-red-500">*</span>}</label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative border border-gray-300 rounded-md px-4 py-2 bg-white">
                    <input type="file" name="image" onChange={handleFileChange} ref={fileInputRef} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                    <div className="flex items-center">
                      <ImageIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-500">{formData.image ? formData.image.name : isEditing ? "Change image (optional)" : "Upload image"}</span>
                    </div>
                  </div>
                </div>

                {imagePreview && (
                  <div className="relative h-20 w-20 rounded-md overflow-hidden border border-gray-300">
                    <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData((prev) => ({ ...prev, image: null }));
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-md"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              {isEditing && (
                <button type="button" onClick={handleCancel} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
              )}
              <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {isEditing ? "Update Item" : "Add Item"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Menu Items List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Menu Items</h2>
            <span className="text-sm text-gray-500">
              {menuItems.length} {menuItems.length === 1 ? "item" : "items"}
            </span>
          </div>

          {loading && menuItems.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
            </div>
          ) : menuItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No menu items found. Add your first item above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <div key={item._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48 w-full bg-gray-100">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg">{item.title}</h3>
                      <span className="font-bold text-green-600">${Number.parseFloat(item.price).toFixed(2)}</span>
                    </div>
                    <p className="text-gray-600 mt-2 text-sm line-clamp-2">{item.description}</p>
                    <div className="flex justify-end mt-4 space-x-2">
                      <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full" title="Edit">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full" title="Delete">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
