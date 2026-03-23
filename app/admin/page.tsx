"use client";
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../lib/firebase';
import { collection, doc, getDoc, getDocs, setDoc, addDoc, deleteDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth';

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('business-info');
  const [toast, setToast] = useState<{msg: string, type: string} | null>(null);

  // Login States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Business States
  const [bizEmail, setBizEmail] = useState('');
  const [bizPhone, setBizPhone] = useState('');
  const [bizLocation, setBizLocation] = useState('');

  // Category States
  const [categories, setCategories] = useState<any[]>([]);
  const [catName, setCatName] = useState('');

  // Product States
  const [products, setProducts] = useState<any[]>([]);
  const [prodTitle, setProdTitle] = useState('');
  const [prodCategory, setProdCategory] = useState('');
  const [prodShortDesc, setProdShortDesc] = useState('');
  const [prodRichDesc, setProdRichDesc] = useState('');
  const [prodImageFile, setProdImageFile] = useState<File | null>(null);
  // Edit States
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        loadBusinessData();
        loadCategories();
        loadProducts();
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setLoginError('');
    } catch (err) {
      setLoginError("Access Denied: Inaccurate credentials.");
    }
  };

  const handleLogout = () => signOut(auth);

  /* Business Data Logic */
  const loadBusinessData = async () => {
    const docRef = doc(db, 'config', 'business_data');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setBizEmail(data.email || '');
      setBizPhone(data.phone || '');
      setBizLocation(data.location || '');
    }
  };

  const saveBusinessData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'config', 'business_data'), { email: bizEmail, phone: bizPhone, location: bizLocation });
      showToast("Business Data saved successfully", "success");
    } catch (err) {
      showToast("Error saving business data", "error");
    }
  };

  /* Category Logic */
  const loadCategories = async () => {
    const snapshot = await getDocs(collection(db, 'categories'));
    setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const saveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategoryId) {
        await updateDoc(doc(db, 'categories', editingCategoryId), { name: catName });
        showToast("Category Updated", "success");
        setEditingCategoryId(null);
      } else {
        await addDoc(collection(db, 'categories'), { name: catName });
        showToast("Category Added", "success");
      }
      setCatName('');
      loadCategories();
    } catch (err) {
      showToast("Error saving category", "error");
    }
  };

  const deleteCategory = async (id: string) => {
    await deleteDoc(doc(db, 'categories', id));
    loadCategories();
  };

  /* Product Logic */
  const loadProducts = async () => {
    const snapshot = await getDocs(collection(db, 'products'));
    setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodImageFile && !editingProductId) { showToast("Please select an image first", "error"); return; }
    
    setUploadingImage(true);
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const presetName = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !presetName) {
      showToast("Cloudinary environment variables are missing!", "error");
      setUploadingImage(false);
      return;
    }

    let imageUrl = existingImageUrl;

    try {
      if (prodImageFile) {
        const formData = new FormData();
        formData.append('file', prodImageFile);
        formData.append('upload_preset', presetName);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, { method: 'POST', body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error?.message || "Cloudinary upload failed");
        imageUrl = data.secure_url;
      }

      const productData = {
        title: prodTitle,
        category: prodCategory,
        shortDesc: prodShortDesc,
        richDesc: prodRichDesc,
        imageUrl,
        timestamp: serverTimestamp()
      };

      if (editingProductId) {
        await updateDoc(doc(db, 'products', editingProductId), productData);
        showToast("Product Updated", "success");
        setEditingProductId(null);
      } else {
        await addDoc(collection(db, 'products'), productData);
        showToast("Product Saved Successfully", "success");
      }

      // Clear Form
      setProdTitle(''); setProdShortDesc(''); setProdRichDesc(''); setProdImageFile(null); setExistingImageUrl(null);
      loadProducts();
    } catch (err) {
      showToast("Failed to save product", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  const editProduct = (prod: any) => {
    setEditingProductId(prod.id);
    setProdTitle(prod.title || '');
    setProdCategory(prod.category || '');
    setProdShortDesc(prod.shortDesc || '');
    setProdRichDesc(prod.richDesc || '');
    setExistingImageUrl(prod.imageUrl || null);
    setActiveTab('products'); // Direct jump is handy but already there
  };

  const destroyProduct = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
    loadProducts();
  };

  if (loading) return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0b1120', color: 'white' }}>Loading Admin Panel...</div>;

  if (!user) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#0b1120', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
        <div style={{ width: '400px', padding: '3rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--accent)' }}>Admin Login</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Email</label>
                  <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }}/>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Password</label>
                  <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }}/>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Sign In</button>
            </form>
            {loginError && <p style={{ marginTop: '1rem', color: '#ef4444', fontSize: '0.9rem', textAlign: 'center' }}>{loginError}</p>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#0b1120', color: 'white', minHeight: '100vh', paddingBottom: '3rem' }}>
      <div style={{ background: 'var(--primary)', padding: '1rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/assets/logo.png" style={{ height: '40px', borderRadius: '50%' }} alt="Logo" />
              <span style={{ fontWeight: 800, color: 'var(--accent)' }}>VEEJAY ADMIN</span>
          </div>
          <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: 'var(--accent)', borderColor: 'var(--accent)' }} onClick={handleLogout}>Log Out</button>
      </div>

      <div style={{ display: 'flex', maxWidth: '1200px', margin: '3rem auto', gap: '2rem' }}>
        {/* Sidebar */}
        <div style={{ width: '250px', background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }}>
            <div onClick={() => setActiveTab('business-info')} style={{ padding: '1rem 2rem', cursor: 'pointer', transition: '0.3s', ...(activeTab === 'business-info' ? { background: 'rgba(197, 160, 89, 0.1)', color: 'var(--accent)', borderLeft: '3px solid var(--accent)' } : { color: '#94a3b8' })}}>
              <i className="fas fa-building"></i> &nbsp; Business Info
            </div>
            <div onClick={() => setActiveTab('categories')} style={{ padding: '1rem 2rem', cursor: 'pointer', transition: '0.3s', ...(activeTab === 'categories' ? { background: 'rgba(197, 160, 89, 0.1)', color: 'var(--accent)', borderLeft: '3px solid var(--accent)' } : { color: '#94a3b8' })}}>
              <i className="fas fa-tags"></i> &nbsp; Categories
            </div>
            <div onClick={() => setActiveTab('products')} style={{ padding: '1rem 2rem', cursor: 'pointer', transition: '0.3s', ...(activeTab === 'products' ? { background: 'rgba(197, 160, 89, 0.1)', color: 'var(--accent)', borderLeft: '3px solid var(--accent)' } : { color: '#94a3b8' })}}>
              <i className="fas fa-box-open"></i> &nbsp; Products
            </div>
        </div>

        {/* Main View */}
        <div style={{ flex: 1 }}>
          
          {activeTab === 'business-info' && (
            <div>
              <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>Update Business Information</h2>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <form onSubmit={saveBusinessData} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>Business Email ID</label>
                        <input type="email" value={bizEmail} onChange={e => setBizEmail(e.target.value)} required style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }}/>
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>Phone Number</label>
                        <input type="text" value={bizPhone} onChange={e => setBizPhone(e.target.value)} required style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }}/>
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>Address / Location</label>
                        <textarea value={bizLocation} onChange={e => setBizLocation(e.target.value)} rows={3} required style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }}></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Save Changes</button>
                  </form>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div>
              <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>Categories Manager</h2>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <form onSubmit={saveCategory} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>New Category Name</label>
                        <input type="text" value={catName} onChange={e => setCatName(e.target.value)} placeholder="e.g., Silk Sarees" required style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }}/>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Add Category</button>
                  </form>
                  <hr style={{ opacity: 0.1, margin: '2rem 0' }} />
                  <h3>Active Categories</h3>
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {categories.map(cat => (
                      <div key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                        <span>{cat.name}</span>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: 'var(--accent)', borderColor: 'var(--accent)' }} onClick={() => { setCatName(cat.name); setEditingCategoryId(cat.id); }}>Edit</button>
                          <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#ef4444', borderColor: '#ef4444' }} onClick={() => deleteCategory(cat.id)}>Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>Products Manager</h2>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <form onSubmit={saveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <h3 style={{ margin: 0 }}>{editingProductId ? 'Update Product' : 'Add New Product'}</h3>
                         {editingProductId && <button type="button" className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => { setEditingProductId(null); setProdTitle(''); setProdShortDesc(''); setProdRichDesc(''); setProdImageFile(null); }}>Cancel Edit</button>}
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>Product Title</label>
                        <input type="text" value={prodTitle} onChange={e => setProdTitle(e.target.value)} required style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }}/>
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>Category</label>
                        <select value={prodCategory} onChange={e => setProdCategory(e.target.value)} required style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }}>
                            <option value="">Select Category</option>
                            {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>Short Description (Card view)</label>
                        <textarea value={prodShortDesc} onChange={e => setProdShortDesc(e.target.value)} rows={2} required style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }}></textarea>
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>Rich Description (Full Page view / Details)</label>
                        <textarea value={prodRichDesc} onChange={e => setProdRichDesc(e.target.value)} rows={6} placeholder="Leave empty for fallback layout" style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }}></textarea>
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>Product Image {editingProductId && existingImageUrl && '(Leave empty to preserve existing)'}</label>
                        <input type="file" accept="image/*" onChange={e => setProdImageFile(e.target.files ? e.target.files[0] : null)} required={!editingProductId} style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }}/>
                      </div>
                      
                      <button type="submit" className="btn btn-primary" disabled={uploadingImage} style={{ alignSelf: 'flex-start' }}>
                        {uploadingImage ? 'Saving...' : editingProductId ? 'Update Product' : 'Save Product'}
                      </button>
                  </form>
                  <hr style={{ opacity: 0.1, margin: '2rem 0' }} />
                  <h3>Active Products</h3>
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {products.map(prod => (
                      <div key={prod.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                        <div>
                          <strong>{prod.title}</strong> <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>({prod.category})</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: 'var(--accent)', borderColor: 'var(--accent)' }} onClick={() => editProduct(prod)}>Edit</button>
                          <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#ef4444', borderColor: '#ef4444' }} onClick={() => destroyProduct(prod.id)}>Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', padding: '1rem 2rem', borderRadius: '4px', color: 'white', background: toast.type === 'success' ? '#10b981' : '#ef4444', zIndex: 10000 }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
