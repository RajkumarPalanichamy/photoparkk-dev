"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cropper from "react-easy-crop";
import { Upload, X, RotateCw, ZoomIn, ArrowRight, AlertTriangle, Sparkles, Image } from "lucide-react";
import LoadingBar from "../LoadingBar";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const MAX_UPLOAD_SIZE_MB = 10;
const CROP_SIZE = 280;

const GenericCustomize = ({ type, shape }) => {
    // type: "acrylic", "canvas", "backlight"
    // shape: "portrait", "landscape", "square", "love", "hexagon", "round"
    const [photoData, setPhotoData] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [productConfig, setProductConfig] = useState(null);

    // Crop State
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [lowResWarning, setLowResWarning] = useState(false);

    const fileInputRef = useRef(null);
    const router = useRouter();

    // Labels
    const typeTitle = type.charAt(0).toUpperCase() + type.slice(1);
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
                setPhotoData({
                    url: imageUrl,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    width: img.width,
                    height: img.height
                });
            };
            img.src = imageUrl;

            toast.success("Image uploaded!");
        } catch (error) {
            console.error(error);
            toast.error("Upload failed.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    };

    const handleReplaceClick = () => {
        fileInputRef.current.click();
    };

    const handlePreviewClick = () => {
        setPhotoData(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
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
        // We handle custom masks manually, so we tell Cropper to treat everything as 'rect'
        // 'round' is supported natively but we can also standardise on the mask system for consistency if we want.
        // For now, let's let Cropper handle round if it can, but for consistency with the mask system:
        return { cropShape: 'rect' }; // We will visually mask it ourselves
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

                <div className="max-w-4xl mx-auto">
                    {/* Upload Section */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200">
                        <div className="bg-primary px-6 py-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Upload className="w-6 h-6" />
                                Upload Your Photo
                            </h2>
                        </div>

                        <div className="p-6 relative min-h-[400px]">
                            {/* SVG Definitions Removed in favor of inline explicit paths handled by JS */}

                            {!photoData ? (
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 h-full flex flex-col justify-center ${isDragging
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
                                            <Upload
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
                                    </div>
                                </div>
                            ) : (
                                <div className="relative h-[400px] w-full bg-neutral-900 rounded-lg overflow-hidden">
                                    <Cropper
                                        image={photoData.url}
                                        crop={crop}
                                        zoom={zoom}
                                        rotation={rotation}
                                        aspect={getAspectRatio()}
                                        cropSize={{ width: CROP_SIZE, height: CROP_SIZE / getAspectRatio() }}
                                        onCropChange={setCrop}
                                        onCropComplete={onCropComplete}
                                        onZoomChange={setZoom}
                                        onRotationChange={setRotation}
                                        showGrid={false}
                                        style={{
                                            containerStyle: { background: '#1a1a1a' },
                                            cropAreaStyle: {
                                                boxShadow: 'none', // Remove default dimmer
                                                border: 'none',    // Remove default border
                                                color: 'transparent' // Hide default dimmed overlay interaction
                                                // We don't use clipPath here anymore
                                            },
                                            mediaStyle: {}
                                        }}
                                    />

                                    {/* CUSTOM SHAPE MASK OVERLAY */}
                                    <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
                                        {/* 
                                            SVG Mask Logic:
                                            We create an SVG that covers the whole area.
                                            We must position it ABSOLUTE so it doesn't take up space in the flex container 
                                            and push the centered 'hole' div to the side.
                                         */}
                                        <svg className="absolute inset-0" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                                            <defs>
                                                <mask id="shape-mask" x="0" y="0" width="100%" height="100%" maskUnits="userSpaceOnUse">
                                                    {/* 1. Everything visible (White) */}
                                                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                                                    {/* Note: We rely on the CSS box-shadow trick for the visual blackout now, 
                                                        so this SVG mask might be redundant if we use the 'box-shadow' method fully.
                                                        But let's keep the structure clean. 
                                                        actually, if we use the box-shadow method on the child div, we don't strictly need this parent SVG 
                                                        unless we want to mask out the image itself (which we can't do easily over the canvas).
                                                        
                                                        The box-shadow method (below) creates the visual 'dimmed' overlay.
                                                    */}
                                                </mask>
                                            </defs>
                                        </svg>

                                        {/* 
                                            CSS SHAPE-OUTSIDE / BOX-SHADOW APPROACH
                                            This div is centered by the parent flex container.
                                         */}
                                        <div
                                            style={{
                                                width: CROP_SIZE,
                                                height: CROP_SIZE / getAspectRatio(),
                                                boxShadow: '0 0 0 9999px rgba(0,0,0,0.6)', // Increased spread to ensure coverage
                                                borderRadius: shape === 'round' ? '50%' : '0%', // Use CSS radius for round to be smoother
                                            }}
                                            className="relative"
                                        >
                                            <svg className="absolute inset-0 overflow-visible" width="100%" height="100%" viewBox="0 0 1 1">
                                                {/* 
                                                    This SVG is exactly the size of the crop area.
                                                    We draw a path that is a HUGE rectangle (hole's outside) MINUS the internal shape.
                                                    This ensures the 'ears' of non-rectangular shapes (like the corners of the hexagon) 
                                                    are covered by the overlay if the box-shadow doesn't catch them (box shadow is rect/rounded).
                                                */}
                                                <path
                                                    d={
                                                        shape === 'love'
                                                            ? "M -10 -10 H 10 V 10 H -10 Z M 0.5 0.9 C 0.5 0.9 0.9 0.65 0.9 0.4 C 0.9 0.2 0.75 0.1 0.6 0.1 C 0.5 0.1 0.45 0.2 0.45 0.2 C 0.45 0.2 0.4 0.1 0.3 0.1 C 0.15 0.1 0 0.2 0 0.4 C 0 0.65 0.4 0.9 0.4 0.9 L 0.5 0.9 Z" // Rect Clockwise, Heart Counter-Clockwise
                                                            : shape === 'hexagon'
                                                                ? "M -10 -10 H 10 V 10 H -10 Z M 0.5 0 L 0.933 0.25 V 0.75 L 0.5 1 L 0.067 0.75 V 0.25 Z"
                                                                : shape === 'round'
                                                                    ? "M -10 -10 H 10 V 10 H -10 Z M 0.5 0.5 m -0.5 0 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0"
                                                                    : "M -10 -10 H 10 V 10 H -10 Z M 0 0 H 1 V 1 H 0 Z" // Square hole
                                                    }
                                                    fill="rgba(0,0,0,0.6)"
                                                    fillRule="evenodd"
                                                    transform="scale(1)"
                                                // The path coordinates for the shape are 0..1 (viewBox 0 0 1 1).
                                                // The huge rect is -10..10 (relative to 1x1).
                                                />
                                            </svg>

                                            {/* Visual Border for the shape */}
                                            <svg className="absolute inset-0 overflow-visible pointer-events-none" width="100%" height="100%" viewBox="0 0 1 1">
                                                <path
                                                    d={
                                                        shape === 'love'
                                                            ? "M 0.5 0.9 C 0.5 0.9 0.9 0.65 0.9 0.4 C 0.9 0.2 0.75 0.1 0.6 0.1 C 0.5 0.1 0.45 0.2 0.45 0.2 C 0.45 0.2 0.4 0.1 0.3 0.1 C 0.15 0.1 0 0.2 0 0.4 C 0 0.65 0.4 0.9 0.4 0.9 L 0.5 0.9 Z"
                                                            : shape === 'hexagon'
                                                                ? "M 0.5 0 L 0.933 0.25 V 0.75 L 0.5 1 L 0.067 0.75 V 0.25 Z"
                                                                : shape === 'round'
                                                                    ? "M 0.5 0.5 m -0.5 0 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0"
                                                                    : "M 0 0 H 1 V 1 H 0 Z"
                                                    }
                                                    fill="none"
                                                    stroke="white"
                                                    strokeWidth="0.015"
                                                    vectorEffect="non-scaling-stroke"
                                                    className="drop-shadow-md"
                                                />
                                            </svg>
                                        </div>
                                    </div>

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
