'use client';

import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Loader2, Plus, Edit, Trash2, X, Save } from "lucide-react";
import { toast } from "react-toastify";

const DEFAULT_FIELDS = ['title', 'content', 'image', 'thickness', 'stock', 'sizes'];
const DEFAULT_JSON_FIELDS = ['sizes'];

const ProductManager = ({
    apiEndpoint,
    title,
    allowedFields = DEFAULT_FIELDS,
    jsonFields = DEFAULT_JSON_FIELDS,
    canAdd = true,
    canDelete = true
}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Initial State builder
    const getInitialState = () => {
        const state = {};
        allowedFields.forEach(f => {
            state[f] = "";
        });
        // Set defaults
        if (state.stock !== undefined) state.stock = "In Stock";
        if (state.thickness !== undefined) state.thickness = "5mm";
        return state;
    };

    const [formData, setFormData] = useState(getInitialState());

    // Store JSON strings for json fields
    const [jsonInputs, setJsonInputs] = useState({});

    useEffect(() => {
        fetchProducts();
    }, [apiEndpoint]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(apiEndpoint);
            setProducts(res.data);
        } catch (error) {
            toast.error("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        const newData = {};
        const newJson = {};

        allowedFields.forEach(f => {
            if (jsonFields.includes(f)) {
                newData[f] = product[f] || []; // Keep object/array
                newJson[f] = JSON.stringify(product[f] || [], null, 2);
            } else {
                newData[f] = product[f] || "";
            }
        });

        setFormData(newData);
        setJsonInputs(newJson);
        setShowModal(true);
    };

    const handleAdd = () => {
        if (!canAdd) return;
        setEditingProduct(null);
        setFormData(getInitialState());

        const newJson = {};
        jsonFields.forEach(f => {
            if (f === 'sizes') newJson[f] = '[\n  {"label": "12x8", "price": 999}\n]';
            else if (f === 'thickness') newJson[f] = '["3mm", "5mm"]';
            else newJson[f] = '[]';
        });
        setJsonInputs(newJson);

        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!canDelete) return;
        if (!confirm("Delete this product?")) return;
        try {
            await axiosInstance.delete(`${apiEndpoint}/${id}`);
            toast.success("Deleted successfully");
            fetchProducts();
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };

            // Parse JSON fields
            for (const f of jsonFields) {
                if (allowedFields.includes(f)) {
                    try {
                        payload[f] = JSON.parse(jsonInputs[f]);
                    } catch (e) {
                        toast.error(`Invalid JSON for ${f}`);
                        return;
                    }
                }
            }

            // Clean payload to only allowed fields
            const cleanPayload = {};
            allowedFields.forEach(key => {
                if (payload[key] !== undefined) {
                    // Convert empty strings for numeric fields to null to avoid database errors
                    if (payload[key] === "" && ['price', 'quantity', 'rating'].includes(key)) {
                        cleanPayload[key] = null;
                    } else {
                        cleanPayload[key] = payload[key];
                    }
                }
            });

            if (editingProduct) {
                await axiosInstance.put(`${apiEndpoint}/${editingProduct.id}`, cleanPayload);
                toast.success("Updated successfully");
            } else {
                await axiosInstance.post(apiEndpoint, cleanPayload);
                toast.success("Created successfully");
            }
            setShowModal(false);
            fetchProducts();
        } catch (error) {
            console.error(error);
            const errMsg = error.response?.data?.message || error.response?.data?.error || "Operation failed";
            const detail = error.response?.data?.details || "";
            toast.error(`${errMsg} ${detail ? ': ' + detail : ''}`);
        }
    };

    // Check if field exists
    const has = (f) => allowedFields.includes(f);
    const isJson = (f) => jsonFields.includes(f);

    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
                {canAdd && (
                    <button
                        onClick={handleAdd}
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-500/20"
                    >
                        <Plus className="w-5 h-5" /> Add Product
                    </button>
                )}
            </div>

            {loading ? (
                <Loader2 className="animate-spin mx-auto text-neutral-400" />
            ) : products.length === 0 ? (
                <div className="text-center text-neutral-500 py-8">No products found</div>
            ) : (
                <div className="overflow-x-auto relative z-10">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            <tr>
                                <th className="p-4 rounded-l-xl">Visual</th>
                                <th className="p-4">Specifications</th>
                                {has('sizes') && <th className="p-4">Base Price</th>}
                                {has('price') && <th className="p-4">Price</th>}
                                {has('stock') && <th className="p-4">Availability</th>}
                                {has('shape') && <th className="p-4">Geometry</th>}
                                <th className="p-4 rounded-r-xl text-right">Management</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {products.map(p => (
                                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                    <td className="p-4">
                                        <div className="w-14 h-14 bg-slate-100 rounded-xl overflow-hidden shadow-inner border border-slate-200">
                                            {p.image && <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <p className="font-bold text-slate-900">{p.title}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">Ref: {p.id.slice(0, 8).toUpperCase()}</p>
                                    </td>
                                    {has('sizes') && (
                                        <td className="p-4 font-black text-slate-900">
                                            {p.sizes && Array.isArray(p.sizes) && p.sizes.length > 0
                                                ? `₹${p.sizes[0].price || 0}`
                                                : 'N/A'}
                                        </td>
                                    )}
                                    {has('price') && (
                                        <td className="p-4 font-black text-slate-900">
                                            {p.price ? `₹${p.price}` : 'N/A'}
                                        </td>
                                    )}
                                    {has('stock') && (
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter shadow-sm border ${p.stock === 'In Stock' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                                {p.stock}
                                            </span>
                                        </td>
                                    )}
                                    {has('shape') && (<td className="p-4 text-slate-600 font-bold">{p.shape}</td>)}
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-1">
                                            <button onClick={() => handleEdit(p)} className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit className="w-4 h-4" /></button>
                                            {canDelete && (
                                                <button onClick={() => handleDelete(p.id)} className="p-2.5 text-red-400 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
                        <form onSubmit={handleSubmit} className="flex flex-col h-full">
                            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center flex-shrink-0">
                                <h3 className="font-black text-xl text-slate-900">{editingProduct ? "Revise Portfolio Item" : "New Portfolio Addition"}</h3>
                                <button type="button" onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
                            </div>

                            <div className="p-8 space-y-6 overflow-y-auto flex-grow">
                                {has('title') && (
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Item Designation</label>
                                        <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full border border-slate-200 rounded-xl p-3 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all font-bold text-slate-900" />
                                    </div>
                                )}

                                {has('content') && (
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Client-Facing Brief</label>
                                        <textarea required value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} className="w-full border border-slate-200 rounded-xl p-3 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none h-32 transition-all font-medium text-slate-700" />
                                    </div>
                                )}

                                {has('description') && (
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Description</label>
                                        <textarea required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full border border-slate-200 rounded-xl p-3 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none h-32 transition-all font-medium text-slate-700" />
                                    </div>
                                )}

                                {has('image') && (
                                    <div className="space-y-3">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Asset URL or Upload</label>
                                        <div className="flex gap-3">
                                            <input
                                                required
                                                type="text"
                                                value={formData.image}
                                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                                                className="flex-1 border border-slate-200 rounded-xl p-3 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-sm font-mono"
                                                placeholder="https://..."
                                            />
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={async (e) => {
                                                        const file = e.target.files[0];
                                                        if (!file) return;

                                                        const upFormData = new FormData();
                                                        upFormData.append("image", file);

                                                        toast.info("Uploading asset...");
                                                        try {
                                                            const res = await axiosInstance.post("upload-image", upFormData, {
                                                                headers: { "Content-Type": "multipart/form-data" },
                                                            });
                                                            setFormData({ ...formData, image: res.data.imageUrl });
                                                            toast.success("Asset integrated!");
                                                        } catch (err) {
                                                            console.error(err);
                                                            const errMsg = err.response?.data?.message || "Upload failed";
                                                            toast.error(errMsg);
                                                        }
                                                    }}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                <button type="button" className="px-6 py-3 bg-slate-900 text-white hover:bg-black rounded-xl text-xs font-black transition-all">
                                                    CHOOSE
                                                </button>
                                            </div>
                                        </div>
                                        {formData.image && (
                                            <div className="mt-4 w-40 h-40 border-2 border-slate-100 rounded-2xl overflow-hidden bg-slate-50 shadow-inner group">
                                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-6">
                                    {has('thickness') && (
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Dimensions (JSON)</label>
                                            {isJson('thickness') ? (
                                                <input type="text" value={jsonInputs.thickness} onChange={e => setJsonInputs({ ...jsonInputs, thickness: e.target.value })} className="w-full border border-slate-200 rounded-xl p-3 focus:ring-4 focus:ring-blue-500/10 font-mono text-xs" />
                                            ) : (
                                                <input type="text" value={formData.thickness} onChange={e => setFormData({ ...formData, thickness: e.target.value })} className="w-full border border-slate-200 rounded-xl p-3 focus:ring-4 focus:ring-blue-500/10 outline-none font-bold" />
                                            )}
                                        </div>
                                    )}
                                    {has('shape') && (
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Architectural Shape</label>
                                            <input type="text" value={formData.shape} onChange={e => setFormData({ ...formData, shape: e.target.value })} className="w-full border border-slate-200 rounded-xl p-3 focus:ring-4 focus:ring-blue-500/10 outline-none font-bold" />
                                        </div>
                                    )}
                                    {has('stock') && (
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Project Availability</label>
                                            <select value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} className="w-full border border-slate-200 rounded-xl p-3 focus:ring-4 focus:ring-blue-500/10 outline-none font-bold appearance-none bg-white">
                                                <option value="In Stock">In Stock</option>
                                                <option value="Out of Stock">Out of Stock</option>
                                            </select>
                                        </div>
                                    )}
                                    {has('price') && (
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Price (Optional)</label>
                                            <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full border border-slate-200 rounded-xl p-3 focus:ring-4 focus:ring-blue-500/10 outline-none font-bold" />
                                        </div>
                                    )}
                                </div>

                                {has('sizes') && isJson('sizes') && (
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Pricing Matrix (JSON Config)</label>
                                        <textarea
                                            value={jsonInputs.sizes}
                                            onChange={e => setJsonInputs({ ...jsonInputs, sizes: e.target.value })}
                                            className="w-full border border-slate-200 rounded-xl p-4 font-mono text-xs h-40 bg-slate-50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="px-8 py-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 flex-shrink-0">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 text-slate-600 font-bold hover:text-slate-900 transition-colors">Discard</button>
                                <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2 font-black shadow-lg shadow-blue-500/20 transition-all">
                                    <Save className="w-5 h-5" /> PERSIST DATA
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManager;
