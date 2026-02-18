"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cropper from "react-easy-crop";
import { Upload, X, RotateCw, ZoomIn, ArrowRight, AlertTriangle } from "lucide-react";
import LoadingBar from "../LoadingBar";
import { toast } from "react-toastify";

const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const MAX_UPLOAD_SIZE_MB = 10;

const GenericCustomize = ({ type, shape }) => {
    const router = useRouter();
    const fileInputRef = useRef(null);

    // State
    const [photoData, setPhotoData] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // Crop State
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [lowResWarning, setLowResWarning] = useState(false);

    // Labels
    const shapeTitle = shape.charAt(0).toUpperCase() + shape.slice(1);

    // Initialize from existing session if available
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedData = sessionStorage.getItem(`${type}_custom_data`);
            if (storedData) {
                try {
                    const parsed = JSON.parse(storedData);
                    if (parsed.photoData) {
                        setPhotoData(parsed.photoData);
                        if (parsed.configuration?.crop) {
                            const c = parsed.configuration.crop;
                            setCrop(c.crop || { x: 0, y: 0 });
                            setZoom(c.zoom || 1);
                            setRotation(c.rotation || 0);
                        }
                    }
                } catch (e) {
                    // ignore error
                }
            }
        }
    }, [type]);

    const handleFileUpload = async (file) => {
        if (!file.type.match("image.*")) {
            toast.error("Please select a valid image");
            return;
        }

        if (file.size > MAX_UPLOAD_SIZE_BYTES) {
            toast.error(`File too large. Max size is ${MAX_UPLOAD_SIZE_MB}MB.`);
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axios.post("/api/upload-image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percent);
                },
            });

            const imageUrl = res.data.imageUrl;

            const img = new Image();
            img.onload = () => {
                if (img.width < 1000 || img.height < 1000) {
                    setLowResWarning(true);
                    toast.warn("Low resolution image detected. Print quality might be affected.");
                } else {
                    setLowResWarning(false);
                }
            };
            img.src = imageUrl;

            setPhotoData({
                url: imageUrl,
                name: file.name,
                size: file.size,
                type: file.type,
                width: img.width,
                height: img.height
            });
            toast.success("Image uploaded!");
        } catch (error) {
            console.error(error);
            toast.error("Upload failed.");
        } finally {
            setIsUploading(false);
        }
    };

    const onCropComplete = useCallback((navigatedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleContinue = () => {
        if (!photoData) {
            toast.error("Please upload an image first.");
            return;
        }

        // Save temporary state
        let existingDetails = {};
        if (typeof window !== "undefined") {
            const stored = sessionStorage.getItem(`${type}_custom_data`);
            if (stored) existingDetails = JSON.parse(stored);
        }

        const orderData = {
            ...existingDetails,
            type,
            shape,
            photoData,
            configuration: {
                ...(existingDetails.configuration || {}),
                crop: { crop, zoom, rotation, croppedAreaPixels }
            }
        };

        sessionStorage.setItem(`${type}_custom_data`, JSON.stringify(orderData));
        router.push(`/shop/${type}/${shape.toLowerCase()}/size`);
    };

    const getAspectRatio = () => {
        switch (shape) {
            case "portrait": return 3 / 4;
            case "landscape": return 4 / 3;
            case "square":
            case "round":
            case "hexagon":
            case "love": return 1;
            default: return 1;
        }
    };

    const getCropShapeProps = () => {
        if (shape === 'round') return { cropShape: 'round' };
        return { cropShape: 'rect' };
    };

    const getCropAreaStyle = () => {
        if (shape === 'love') {
            return { clipPath: 'url(#love-clip)' };
        }
        if (shape === 'hexagon') {
            return { clipPath: 'url(#hexagon-clip)' };
        }
        return {};
    };

    return (
        <div className="bg-neutral-50 min-h-screen pt-[100px] pb-12 font-[Poppins]">
            <div className="max-w-5xl mx-auto px-4 lg:px-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest mb-2 block">Step 1 of 2</span>
                    <h1 className="text-3xl font-bold text-secondary">Customize Your {shapeTitle} Frame</h1>
                    <p className="text-neutral-500 mt-2">Upload and adjust your photo to fit the frame perfectly.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-neutral-100 p-8">

                    {/* Editor Container */}
                    <div className="relative w-full aspect-square md:aspect-[16/9] lg:aspect-[2/1] min-h-[500px] bg-neutral-100 rounded-2xl overflow-hidden border-2 border-dashed border-neutral-200">
                        {!photoData ? (
                            <div
                                className={`absolute inset-0 flex flex-col items-center justify-center transition-all ${isDragging ? 'bg-primary/5 border-primary' : ''}`}
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setIsDragging(false);
                                    if (e.dataTransfer.files[0]) handleFileUpload(e.dataTransfer.files[0]);
                                }}
                            >
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 ring-8 ring-neutral-50">
                                    <Upload className="w-10 h-10 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-secondary mb-2">Upload Photo</h3>
                                <p className="text-neutral-400 mb-8 text-center max-w-sm">Drag & drop your image here, or browse files. We accept JPG, PNG & WebP.</p>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-10 py-4 bg-secondary text-white rounded-xl font-semibold hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                                >
                                    Browse Files
                                </button>
                                <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])} />
                            </div>
                        ) : (
                            <div className="relative w-full h-full bg-neutral-900">
                                <Cropper
                                    image={photoData.url}
                                    crop={crop}
                                    zoom={zoom}
                                    rotation={rotation}
                                    aspect={getAspectRatio()}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                    onRotationChange={setRotation}
                                    {...getCropShapeProps()}
                                    classes={{ containerClassName: "w-full h-full" }}
                                    style={{
                                        containerStyle: {},
                                        mediaStyle: {},
                                        // Ensure the internal crop area allows our child to be visible and doesn't obscure it
                                        cropAreaStyle: (shape === 'hexagon' || shape === 'love') ? { color: 'rgba(0, 0, 0, 0.5)', overflow: 'visible' } : {}
                                    }}
                                    // Explicitly hide grid for custom shapes
                                    showGrid={!(shape === 'love' || shape === 'hexagon' || shape === 'round')}
                                >
                                    {/* INVERTED MASK */}
                                    {shape === 'hexagon' && (
                                        <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                                            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none" style={{ display: 'block' }}>
                                                <path
                                                    d="M0 0 H100 V100 H0 Z M50 2 L98 26.5 V73.5 L50 98 L2 73.5 V26.5 Z"
                                                    fill="currentColor"
                                                    fillRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                    {shape === 'love' && (
                                        <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                                            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none" style={{ display: 'block' }}>
                                                <path
                                                    d="M0 0 H100 V100 H0 Z M50 90 C50 90 90 65 90 40 C90 20 75 10 60 10 C50 10 45 20 45 20 C45 20 40 10 30 10 C15 10 0 20 0 40 C0 65 40 90 40 90 L50 90"
                                                    fill="currentColor"
                                                    fillRule="evenodd"
                                                    transform="translate(5,0) scale(0.9)"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </Cropper>



                                {lowResWarning && (
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur text-error px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 z-20 shadow-xl border border-error/20 animate-pulse">
                                        <AlertTriangle className="w-5 h-5" />
                                        Low Resolution Image
                                    </div>
                                )}

                                {/* Controls Overlay */}
                                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/20 z-20 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-[90%] sm:w-auto max-w-xl">
                                    <div className="flex items-center gap-4 w-full sm:w-48">
                                        <ZoomIn className="w-5 h-5 text-neutral-400" />
                                        <div className="flex-1">
                                            <input
                                                type="range"
                                                min={1}
                                                max={3}
                                                step={0.1}
                                                value={zoom}
                                                onChange={(e) => setZoom(Number(e.target.value))}
                                                className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 w-full sm:w-48">
                                        <RotateCw className="w-5 h-5 text-neutral-400" />
                                        <div className="flex-1">
                                            <input
                                                type="range"
                                                min={0}
                                                max={360}
                                                step={1}
                                                value={rotation}
                                                onChange={(e) => setRotation(Number(e.target.value))}
                                                className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                            />
                                        </div>
                                    </div>
                                    <button onClick={() => { setZoom(1); setRotation(0); }} className="text-sm font-semibold text-primary hover:text-primary-dark whitespace-nowrap px-2">
                                        Reset
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-neutral-100 pt-8">
                        <div>
                            {photoData && (
                                <button
                                    onClick={() => setPhotoData(null)}
                                    className="text-neutral-400 hover:text-error transition-colors text-sm font-medium flex items-center gap-2"
                                >
                                    <X className="w-4 h-4" /> Remove Photo
                                </button>
                            )}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto text-center">
                            {!photoData && <p className="text-neutral-400 text-sm py-3 px-4">Upload a photo to continue</p>}
                            {photoData && (
                                <button
                                    onClick={handleContinue}
                                    className="px-10 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3 w-full sm:w-auto"
                                >
                                    Save & Continue <ArrowRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {isUploading && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl w-96 shadow-2xl text-center">
                        <h4 className="text-xl font-bold text-secondary mb-2">Uploading...</h4>
                        <p className="text-sm text-neutral-500 mb-6">Optimizing your image for high-definition print.</p>
                        <LoadingBar progress={uploadProgress} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenericCustomize;
