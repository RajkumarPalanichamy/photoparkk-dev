"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cropper from "react-easy-crop";
import { Upload, X, RotateCw, ZoomIn, ArrowRight, AlertTriangle } from "lucide-react";
import LoadingBar from "../LoadingBar";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const MAX_UPLOAD_SIZE_MB = 10;

const GenericCustomize = ({ type, shape }) => {
    // type: "acrylic", "canvas", "backlight"
    // shape: "portrait", "landscape", "square", "love", "hexagon", "round"
    const [photoData, setPhotoData] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [productConfig, setProductConfig] = useState(null);
    const fileInputRef = useRef(null);
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

    React.useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await axiosInstance.get(`frames/${type}?shape=${shape}`);
                if (res.data && res.data.length > 0) {
                    setProductConfig(res.data[0]);
                }
            } catch (err) {
                console.error("Failed to fetch config", err);
            }
        };
        fetchConfig();
    }, [type, shape]);

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
                    <div className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full mb-4">
                        <Sparkles className="w-5 h-5" />
                        <span className="font-semibold">{productConfig?.title || `${typeTitle} ${shapeTitle} Frame`}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-3">
                        {productConfig ? `Customize ${productConfig.title}` : `Customize Your ${typeTitle} ${shapeTitle}`}
                    </h1>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        {productConfig?.content || `Upload your favorite photo and see it come to life in a beautiful ${typeTitle.toLowerCase()} frame`}
                    </p>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleChange}
                    accept="image/*"
                    className="hidden"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Upload Section */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200 order-2 lg:order-1">
                        <div className="bg-primary px-6 py-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Image className="w-6 h-6" />
                                Upload Your Photo
                            </h2>
                        </div>
                        {/* Same Upload UI as AcrylicCustomize */}
                        <div className="p-6">
                            {!photoData ? (
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${isDragging
                                        ? "border-primary bg-primary-light scale-[1.02]"
                                        : "border-neutral-300 hover:border-primary hover:bg-neutral-50"
                                        }`}
                                >
                                    <div className="flex flex-col items-center justify-center space-y-6">
                                        <div
                                            className={`p-4 rounded-full transition-all ${isDragging
                                                ? "bg-primary-light scale-110"
                                                : "bg-neutral-100"
                                                }`}
                                        >
                                            <Image
                                                className={`w-12 h-12 transition-colors ${isDragging ? "text-primary" : "text-neutral-500"
                                                    }`}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold text-neutral-700 mb-2">
                                                Drag and drop your photo here
                                            </p>
                                            <p className="text-sm text-neutral-500 mb-4">or</p>
                                            <button
                                                onClick={handleReplaceClick}
                                                disabled={isUploading}
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                                            >
                                                <Upload className="w-5 h-5" />
                                                Browse Files
                                            </button>
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
                                    onClick={handlePreviewClick}
                                    disabled={!photoData}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${photoData
                                        ? "bg-white text-primary hover:bg-neutral-50 shadow-lg hover:shadow-xl transform hover:scale-105"
                                        : "bg-white/20 text-white/50 cursor-not-allowed"
                                        }`}
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
