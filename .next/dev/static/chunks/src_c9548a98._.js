(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/Components/LoadingBar.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const LoadingBar = ({ progress, isUploading, message = "Uploading..." })=>{
    if (!isUploading) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-sm text-neutral-600 mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: message
                            }, void 0, false, {
                                fileName: "[project]/src/Components/LoadingBar.jsx",
                                lineNumber: 10,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    progress,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/Components/LoadingBar.jsx",
                                lineNumber: 11,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/Components/LoadingBar.jsx",
                        lineNumber: 9,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full bg-neutral-200 rounded-full h-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-primary-light0 h-2 rounded-full transition-all duration-300 ease-out",
                            style: {
                                width: `${progress}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/Components/LoadingBar.jsx",
                            lineNumber: 14,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/Components/LoadingBar.jsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/Components/LoadingBar.jsx",
                lineNumber: 8,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center text-neutral-500 text-sm",
                children: "Please wait while your image is being uploaded..."
            }, void 0, false, {
                fileName: "[project]/src/Components/LoadingBar.jsx",
                lineNumber: 20,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/Components/LoadingBar.jsx",
        lineNumber: 7,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = LoadingBar;
const __TURBOPACK__default__export__ = LoadingBar;
var _c;
__turbopack_context__.k.register(_c, "LoadingBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/Components/Shop/GenericCustomize.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$easy$2d$crop$2f$index$2e$module$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-easy-crop/index.module.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-cw.js [app-client] (ecmascript) <export default as RotateCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-in.js [app-client] (ecmascript) <export default as ZoomIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flip$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlipHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flip-horizontal.js [app-client] (ecmascript) <export default as FlipHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlipVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flip-vertical.js [app-client] (ecmascript) <export default as FlipVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scissors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scissors$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scissors.js [app-client] (ecmascript) <export default as Scissors>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Components$2f$LoadingBar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Components/LoadingBar.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/axiosInstance.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024;
const MAX_UPLOAD_SIZE_MB = 10;
const CROP_SIZE = 280;
const GenericCustomize = ({ type, shape })=>{
    _s();
    const [photoData, setPhotoData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isUploading, setIsUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploadProgress, setUploadProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [productConfig, setProductConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [crop, setCrop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [rotation, setRotation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [aspectRatio, setAspectRatio] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [flip, setFlip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        horizontal: false,
        vertical: false
    });
    const [croppedAreaPixels, setCroppedAreaPixels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lowResWarning, setLowResWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const typeTitle = type.charAt(0).toUpperCase() + type.slice(1);
    const shapeTitle = shape.charAt(0).toUpperCase() + shape.slice(1);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GenericCustomize.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const storedData = sessionStorage.getItem(`${type}_custom_data`);
                if (storedData) {
                    try {
                        const parsed = JSON.parse(storedData);
                        if (parsed.photoData) {
                            setPhotoData(parsed.photoData);
                            if (parsed.configuration?.crop) {
                                const c = parsed.configuration.crop;
                                setCrop(c.crop || {
                                    x: 0,
                                    y: 0
                                });
                                setZoom(c.zoom || 1);
                                setRotation(c.rotation || 0);
                                if (c.aspectRatio) setAspectRatio(c.aspectRatio);
                                if (c.flip) setFlip(c.flip);
                            }
                        }
                    } catch (e) {}
                }
            }
        }
    }["GenericCustomize.useEffect"], [
        type
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GenericCustomize.useEffect": ()=>{
            setAspectRatio(getAspectRatio());
        }
    }["GenericCustomize.useEffect"], [
        shape
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "GenericCustomize.useEffect": ()=>{
            const fetchConfig = {
                "GenericCustomize.useEffect.fetchConfig": async ()=>{
                    try {
                        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`frames/${type}?shape=${shape}`);
                        if (res.data && res.data.length > 0) setProductConfig(res.data[0]);
                    } catch (err) {
                        console.error("Failed to fetch config", err);
                    }
                }
            }["GenericCustomize.useEffect.fetchConfig"];
            fetchConfig();
        }
    }["GenericCustomize.useEffect"], [
        type,
        shape
    ]);
    const handleFileUpload = async (file)=>{
        if (!file.type.match("image.*")) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please select a valid image");
            return;
        }
        if (file.size > MAX_UPLOAD_SIZE_BYTES) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`File too large. Max size is ${MAX_UPLOAD_SIZE_MB}MB.`);
            return;
        }
        setIsUploading(true);
        setUploadProgress(0);
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/api/upload-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (progressEvent)=>{
                    const percent = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                    setUploadProgress(percent);
                }
            });
            const imageUrl = res.data.imageUrl;
            const img = new Image();
            img.onload = ()=>{
                if (img.width < 1000 || img.height < 1000) {
                    setLowResWarning(true);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].warn("Low resolution image detected. Print quality might be affected.");
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
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Image uploaded!");
        } catch (error) {
            console.error(error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Upload failed.");
        } finally{
            setIsUploading(false);
        }
    };
    const handleChange = (e)=>{
        if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
    };
    const handleDragOver = (e)=>{
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = (e)=>{
        e.preventDefault();
        setIsDragging(false);
    };
    const handleDrop = (e)=>{
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
    };
    const handleReplaceClick = ()=>fileInputRef.current.click();
    const handlePreviewClick = ()=>{
        setPhotoData(null);
        setCrop({
            x: 0,
            y: 0
        });
        setZoom(1);
        setRotation(0);
        setAspectRatio(getAspectRatio());
        setFlip({
            horizontal: false,
            vertical: false
        });
    };
    const onCropComplete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GenericCustomize.useCallback[onCropComplete]": (_, croppedAreaPixels)=>setCroppedAreaPixels(croppedAreaPixels)
    }["GenericCustomize.useCallback[onCropComplete]"], []);
    const handleContinue = ()=>{
        if (!photoData) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please upload an image first.");
            return;
        }
        let existingDetails = {};
        if ("TURBOPACK compile-time truthy", 1) {
            const stored = sessionStorage.getItem(`${type}_custom_data`);
            if (stored) existingDetails = JSON.parse(stored);
        }
        const orderData = {
            ...existingDetails,
            type,
            shape,
            photoData,
            configuration: {
                ...existingDetails.configuration || {},
                crop: {
                    crop,
                    zoom,
                    rotation,
                    aspectRatio,
                    flip,
                    croppedAreaPixels
                }
            }
        };
        sessionStorage.setItem(`${type}_custom_data`, JSON.stringify(orderData));
        router.push(`/shop/${type}/${shape.toLowerCase()}/size`);
    };
    const getAspectRatio = ()=>{
        switch(shape){
            case "portrait":
                return 3 / 4;
            case "landscape":
                return 4 / 3;
            default:
                return 1;
        }
    };
    const pageTitle = productConfig ? `Customize ${productConfig.title}` : `Customize Your ${shapeTitle} Frame`;
    const pageDesc = productConfig?.content || `Upload your favourite photo and see it come to life in a beautiful ${typeTitle.toLowerCase()} ${shapeTitle} frame.`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
                /* Site palette: primary #0071e3 | secondary #1d1d1f | primary-light #e6f2ff */

                .gc-page {
                    min-height: 100vh;
                    background: #ffffff;
                    padding-top: 90px;
                    padding-bottom: 80px;
                    font-family: 'Poppins', sans-serif;
                }

                /* ── Breadcrumb ── */
                .gc-breadcrumb {
                    max-width: 900px; margin: 0 auto;
                    padding: 0 24px 28px;
                    display: flex; align-items: center; gap: 8px;
                    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
                    color: #a3a3a3;
                }
                .gc-breadcrumb-sep { color: #d4d4d4; }
                .gc-breadcrumb-active { color: #0071e3; font-weight: 600; }

                /* ── Header ── */
                .gc-header {
                    max-width: 900px; margin: 0 auto;
                    padding: 0 24px 40px;
                    border-bottom: 1px solid #e5e5e5;
                    margin-bottom: 40px;
                    display: flex; align-items: flex-start; justify-content: space-between; gap: 24px;
                    flex-wrap: wrap;
                }
                .gc-eyebrow {
                    display: inline-flex; align-items: center; gap: 8px;
                    background: #e6f2ff; border: 1px solid #bfdbfe;
                    padding: 5px 14px; border-radius: 4px;
                    font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
                    color: #0051a2; font-weight: 600;
                    margin-bottom: 14px;
                }
                .gc-title {
                    font-family: 'Poppins', sans-serif;
                    font-size: clamp(1.6rem, 3.5vw, 2.2rem);
                    font-weight: 700; color: #1d1d1f;
                    line-height: 1.2; letter-spacing: -0.4px;
                    margin-bottom: 10px;
                }
                .gc-title em { font-style: normal; font-weight: 800; color: #0071e3; }
                .gc-desc {
                    font-size: 13px; color: #737373; line-height: 1.75;
                    font-weight: 300; max-width: 480px;
                }
                .gc-step-indicator {
                    display: flex; flex-direction: column; align-items: flex-end; gap: 6px;
                    flex-shrink: 0;
                }
                .gc-step-label {
                    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
                    color: #a3a3a3; font-weight: 500;
                }
                .gc-step-dots { display: flex; gap: 6px; align-items: center; }
                .gc-dot { width: 6px; height: 6px; border-radius: 50%; }
                .gc-dot.done { background: #0071e3; }
                .gc-dot.active { width: 20px; border-radius: 3px; background: #1d1d1f; }
                .gc-dot.pending { background: #e5e5e5; }

                /* ── Main Card ── */
                .gc-main { max-width: 900px; margin: 0 auto; padding: 0 24px; }
                .gc-card {
                    background: #fff;
                    border: 1px solid #e5e5e5;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
                }

                /* ── Card Header ── */
                .gc-card-header {
                    padding: 20px 28px;
                    background: linear-gradient(135deg, #1d1d1f 0%, #2d2d2f 100%);
                    display: flex; align-items: center; justify-content: space-between;
                }
                .gc-card-header-title {
                    font-family: 'Poppins', sans-serif;
                    font-size: 15px; font-weight: 600; color: #f5f5f7;
                    display: flex; align-items: center; gap: 10px;
                    letter-spacing: 0.1px;
                }
                .gc-card-header-icon {
                    width: 32px; height: 32px; border-radius: 50%;
                    background: rgba(0,113,227,0.2);
                    border: 1px solid rgba(0,113,227,0.4);
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }
                .gc-card-header-badge {
                    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
                    color: rgba(245,245,247,0.55); font-family: 'Poppins', sans-serif;
                    font-weight: 500;
                }

                /* ── Upload Zone ── */
                .gc-card-body { padding: 28px; }
                .gc-upload-zone {
                    border: 1.5px dashed;
                    border-radius: 12px;
                    padding: 56px 24px;
                    text-align: center;
                    transition: all 0.3s;
                    cursor: pointer;
                    display: flex; flex-direction: column; align-items: center; gap: 20px;
                }
                .gc-upload-zone.idle {
                    border-color: #e5e5e5;
                    background: #fafafa;
                }
                .gc-upload-zone.idle:hover {
                    border-color: #0071e3;
                    background: #e6f2ff;
                }
                .gc-upload-zone.dragging {
                    border-color: #0071e3;
                    background: #e6f2ff;
                    transform: scale(1.01);
                }
                .gc-upload-icon-wrap {
                    width: 64px; height: 64px; border-radius: 50%;
                    background: #f5f5f7; border: 1px solid #e5e5e5;
                    display: flex; align-items: center; justify-content: center;
                    transition: all 0.3s;
                }
                .gc-upload-zone.dragging .gc-upload-icon-wrap,
                .gc-upload-zone.idle:hover .gc-upload-icon-wrap {
                    background: #e6f2ff; border-color: #0071e3;
                }
                .gc-upload-title {
                    font-family: 'Poppins', sans-serif;
                    font-size: 17px; font-weight: 600; color: #1d1d1f;
                    margin-bottom: 6px;
                }
                .gc-upload-sub { font-size: 12px; color: #737373; font-weight: 300; }
                .gc-upload-hint {
                    font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
                    color: #a3a3a3; font-weight: 500;
                }
                .gc-browse-btn {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 12px 28px;
                    background: #0071e3;
                    color: #fff;
                    font-size: 11px; font-weight: 600; letter-spacing: 2px;
                    text-transform: uppercase;
                    border: none; border-radius: 6px; cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 4px 16px rgba(0,113,227,0.35);
                }
                .gc-browse-btn:hover {
                    background: #0077ed;
                    box-shadow: 0 8px 24px rgba(0,113,227,0.45);
                    transform: translateY(-1px);
                }
                .gc-browse-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

                /* ── Crop Area ── */
                .gc-crop-wrap {
                    position: relative;
                    height: 420px;
                    border-radius: 12px 12px 0 0;
                    overflow: hidden;
                    background: #1a1a2e;
                }

                /* ── Crop Controls ── */
                .gc-controls {
                    background: #fff;
                    border: 1px solid #e5e5e5;
                    border-top: none;
                    border-radius: 0 0 12px 12px;
                    padding: 14px 24px;
                    display: flex; align-items: center; gap: 24px;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .gc-ctrl-row {
                    display: flex; align-items: center; gap: 24px; width: 100%;
                    justify-content: center;
                }
                .gc-ctrl-row:not(:last-child) { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #f0f0f0; }
                .gc-ctrl-group { display: flex; align-items: center; gap: 10px; }
                .gc-aspect-btn {
                    font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
                    padding: 6px 14px; border-radius: 6px; border: 1px solid #e5e5e5;
                    background: #fff; color: #737373; font-weight: 600; cursor: pointer;
                    transition: all 0.2s;
                }
                .gc-aspect-btn.active {
                    background: #0071e3; color: #fff; border-color: #0071e3;
                }
                .gc-aspect-btn:hover:not(.active) {
                    border-color: #0071e3; color: #0071e3; background: #f0f7ff;
                }
                .gc-flip-btn {
                    padding: 8px; border-radius: 6px; border: 1px solid #e5e5e5;
                    background: #fff; color: #737373; cursor: pointer; transition: all 0.2s;
                    display: flex; align-items: center; justify-content: center;
                }
                .gc-flip-btn.active {
                    background: #e6f2ff; color: #0071e3; border-color: #0071e3;
                }
                .gc-flip-btn:hover { border-color: #0071e3; color: #0071e3; }
                .gc-ctrl-label {
                    font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
                    color: #737373; font-weight: 600; white-space: nowrap;
                }
                .gc-slider {
                    -webkit-appearance: none;
                    width: 140px; height: 3px;
                    background: linear-gradient(90deg, #0071e3, #60a5fa);
                    border-radius: 2px; outline: none; cursor: pointer;
                }
                .gc-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 14px; height: 14px; border-radius: 50%;
                    background: #1d1d1f; border: 2px solid #0071e3;
                    cursor: pointer;
                }
                .gc-reset-btn {
                    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
                    color: #0071e3; font-weight: 600;
                    background: #e6f2ff; border: 1px solid #bfdbfe;
                    border-radius: 4px; cursor: pointer;
                    padding: 6px 14px; transition: all 0.2s;
                }
                .gc-reset-btn:hover { background: #0071e3; color: #fff; }

                /* ── Low Res Warning ── */
                .gc-low-res-badge {
                    position: absolute; top: 16px; left: 16px; z-index: 20;
                    background: rgba(255,255,255,0.96); backdrop-filter: blur(12px);
                    border: 1px solid rgba(255,170,0,0.3);
                    color: #a05e00; padding: 8px 16px;
                    border-radius: 8px; font-size: 12px; font-weight: 600;
                    display: flex; align-items: center; gap: 8px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                }

                /* ── Footer ── */
                .gc-footer {
                    margin-top: 28px; padding-top: 24px;
                    border-top: 1px solid #f5f5f5;
                    display: flex; align-items: center; justify-content: space-between;
                    gap: 16px; flex-wrap: wrap;
                }
                .gc-remove-btn {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 10px 20px;
                    background: #fff; border: 1px solid #e5e5e5;
                    border-radius: 6px; cursor: pointer;
                    font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase;
                    font-weight: 600; color: #737373;
                    transition: all 0.25s;
                }
                .gc-remove-btn:hover {
                    border-color: #0071e3; color: #0071e3;
                    background: #e6f2ff;
                }
                .gc-continue-btn {
                    display: inline-flex; align-items: center; gap: 10px;
                    padding: 14px 36px;
                    background: #0071e3;
                    color: #fff;
                    font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
                    border: none; border-radius: 6px; cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 4px 20px rgba(0,113,227,0.35);
                }
                .gc-continue-btn:hover {
                    background: #0077ed;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 28px rgba(0,113,227,0.45);
                }
                .gc-no-photo-hint {
                    font-size: 12px; color: #a3a3a3; letter-spacing: 0.5px; font-style: italic;
                    font-family: 'Poppins', sans-serif;
                }

                /* ── Tips Row ── */
                .gc-tips {
                    margin-top: 24px; padding: 18px 22px;
                    background: #e6f2ff; border: 1px solid #bfdbfe;
                    border-radius: 10px;
                    display: flex; gap: 28px; flex-wrap: wrap; align-items: center;
                }
                .gc-tip {
                    display: flex; align-items: center; gap: 8px;
                    font-size: 11px; color: #0051a2; font-weight: 400;
                }
                .gc-tip-dot {
                    width: 4px; height: 4px; border-radius: 50%;
                    background: #0071e3; flex-shrink: 0;
                }

                /* ── Upload Modal ── */
                .gc-modal-overlay {
                    position: fixed; inset: 0;
                    background: rgba(10,15,30,0.7);
                    backdrop-filter: blur(12px);
                    display: flex; align-items: center; justify-content: center;
                    z-index: 50;
                }
                .gc-modal {
                    background: #fff; border-radius: 20px;
                    padding: 40px; width: 360px; text-align: center;
                    box-shadow: 0 32px 80px rgba(0,0,0,0.2);
                    border: 1px solid #e5e5e5;
                }
                .gc-modal-title {
                    font-family: 'Poppins', sans-serif;
                    font-size: 19px; font-weight: 700; color: #1d1d1f;
                    margin-bottom: 8px;
                }
                .gc-modal-sub {
                    font-size: 12px; color: #737373; font-weight: 300; margin-bottom: 28px; line-height: 1.7;
                }
                .gc-progress-track {
                    height: 3px; background: #f5f5f5; border-radius: 2px; overflow: hidden; margin-bottom: 10px;
                }
                .gc-progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, #0071e3, #60a5fa);
                    border-radius: 2px; transition: width 0.3s;
                }
                .gc-progress-text {
                    font-size: 11px; color: #a3a3a3; letter-spacing: 1px; font-weight: 500;
                }
            `
            }, void 0, false, {
                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                lineNumber: 159,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "gc-page",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: "900px",
                        margin: "0 auto",
                        padding: "0 24px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "gc-breadcrumb",
                            style: {
                                padding: "0 0 28px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Shop"
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 500,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "gc-breadcrumb-sep",
                                    children: "›"
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 501,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: typeTitle
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 502,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "gc-breadcrumb-sep",
                                    children: "›"
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 503,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: shapeTitle
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 504,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "gc-breadcrumb-sep",
                                    children: "›"
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 505,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "gc-breadcrumb-active",
                                    children: "Customise"
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 506,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 499,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "gc-header",
                            style: {
                                padding: "0 0 40px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "gc-eyebrow",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                    size: 10,
                                                    color: "#0051a2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                    lineNumber: 513,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                productConfig?.title || `${typeTitle} · ${shapeTitle} Frame`
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 512,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "gc-title",
                                            children: [
                                                "Customise Your ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                    children: shapeTitle
                                                }, void 0, false, {
                                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                    lineNumber: 517,
                                                    columnNumber: 48
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " Frame"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 516,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "gc-desc",
                                            children: pageDesc
                                        }, void 0, false, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 519,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 511,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "gc-step-indicator",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "gc-step-label",
                                            children: "Step 02 / 03"
                                        }, void 0, false, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 522,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "gc-step-dots",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "gc-dot done"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                    lineNumber: 524,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "gc-dot active"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                    lineNumber: 525,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "gc-dot pending"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                    lineNumber: 526,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 523,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 521,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 510,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "file",
                            ref: fileInputRef,
                            onChange: handleChange,
                            accept: "image/*",
                            style: {
                                display: "none"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 532,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "gc-card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "gc-card-header",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "gc-card-header-title",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "gc-card-header-icon",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                        size: 14,
                                                        color: "#60a5fa"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                        lineNumber: 539,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                    lineNumber: 538,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                photoData ? "Adjust & Crop Your Photo" : "Upload Your Photo"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 537,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "gc-card-header-badge",
                                            children: photoData ? "Drag to reposition" : `Max ${MAX_UPLOAD_SIZE_MB}MB · JPG, PNG`
                                        }, void 0, false, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 543,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 536,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "gc-card-body",
                                    children: !photoData ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `gc-upload-zone ${isDragging ? "dragging" : "idle"}`,
                                        onDragOver: handleDragOver,
                                        onDragLeave: handleDragLeave,
                                        onDrop: handleDrop,
                                        onClick: handleReplaceClick,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "gc-upload-icon-wrap",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                    size: 26,
                                                    color: isDragging ? "#0071e3" : "#737373"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                    lineNumber: 558,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                lineNumber: 557,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "gc-upload-title",
                                                        children: "Drop your photo here"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                        lineNumber: 561,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "gc-upload-sub",
                                                        children: "or click anywhere to browse your files"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                        lineNumber: 562,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                lineNumber: 560,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "gc-browse-btn",
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    handleReplaceClick();
                                                },
                                                disabled: isUploading,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                        size: 12
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                        lineNumber: 569,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Browse Files"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                lineNumber: 564,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "gc-upload-hint",
                                                children: [
                                                    "JPG · PNG · WEBP  ·  Max ",
                                                    MAX_UPLOAD_SIZE_MB,
                                                    "MB  ·  Min 1000×1000px recommended"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                lineNumber: 572,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                        lineNumber: 550,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "gc-crop-wrap",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$easy$2d$crop$2f$index$2e$module$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        image: photoData.url,
                                                        crop: crop,
                                                        zoom: zoom,
                                                        rotation: rotation,
                                                        aspect: aspectRatio,
                                                        cropSize: {
                                                            width: CROP_SIZE,
                                                            height: CROP_SIZE / aspectRatio
                                                        },
                                                        onCropChange: setCrop,
                                                        onCropComplete: onCropComplete,
                                                        onZoomChange: setZoom,
                                                        onRotationChange: setRotation,
                                                        transform: [
                                                            `scaleX(${flip.horizontal ? -1 : 1})`,
                                                            `scaleY(${flip.vertical ? -1 : 1})`
                                                        ].join(' '),
                                                        showGrid: false,
                                                        style: {
                                                            containerStyle: {
                                                                background: "#1a1a2e"
                                                            },
                                                            cropAreaStyle: {
                                                                border: "2px solid #0071e3",
                                                                boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)",
                                                                borderRadius: shape === "round" ? "50%" : "4px"
                                                            }
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                        lineNumber: 579,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    lowResWarning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "gc-low-res-badge",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                size: 14,
                                                                color: "#c97a00"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                lineNumber: 607,
                                                                columnNumber: 49
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            "Low resolution — print quality may be reduced"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                        lineNumber: 606,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                lineNumber: 578,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "gc-controls",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "gc-ctrl-row",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "gc-ctrl-group",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__["ZoomIn"], {
                                                                        size: 14,
                                                                        color: "#737373"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                        lineNumber: 617,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "gc-ctrl-label",
                                                                        children: "Zoom"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                        lineNumber: 618,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "range",
                                                                        className: "gc-slider",
                                                                        min: 1,
                                                                        max: 3,
                                                                        step: 0.05,
                                                                        value: zoom,
                                                                        onChange: (e)=>setZoom(Number(e.target.value))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                        lineNumber: 619,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                lineNumber: 616,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "gc-ctrl-group",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__["RotateCw"], {
                                                                        size: 14,
                                                                        color: "#737373"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                        lineNumber: 622,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "gc-ctrl-label",
                                                                        children: "Rotate"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                        lineNumber: 623,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "range",
                                                                        className: "gc-slider",
                                                                        min: 0,
                                                                        max: 360,
                                                                        step: 1,
                                                                        value: rotation,
                                                                        onChange: (e)=>setRotation(Number(e.target.value))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                        lineNumber: 624,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                lineNumber: 621,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                        lineNumber: 615,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "gc-ctrl-row",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "gc-ctrl-group",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scissors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scissors$3e$__["Scissors"], {
                                                                        size: 14,
                                                                        color: "#737373"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                        lineNumber: 630,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "gc-ctrl-label",
                                                                        children: "Crop Ratio"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                        lineNumber: 631,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex gap-2",
                                                                        children: [
                                                                            {
                                                                                label: "1:1",
                                                                                val: 1
                                                                            },
                                                                            {
                                                                                label: "4:5",
                                                                                val: 4 / 5
                                                                            },
                                                                            {
                                                                                label: "16:9",
                                                                                val: 16 / 9
                                                                            },
                                                                            {
                                                                                label: "Auto",
                                                                                val: getAspectRatio()
                                                                            }
                                                                        ].map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: `gc-aspect-btn ${Math.abs(aspectRatio - r.val) < 0.01 ? 'active' : ''}`,
                                                                                onClick: ()=>setAspectRatio(r.val),
                                                                                children: r.label
                                                                            }, r.label, false, {
                                                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                                lineNumber: 639,
                                                                                columnNumber: 57
                                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                        lineNumber: 632,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                lineNumber: 629,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "gc-ctrl-group",
                                                                style: {
                                                                    marginLeft: '12px',
                                                                    paddingLeft: '24px',
                                                                    borderLeft: '1px solid #f0f0f0'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        className: `gc-flip-btn ${flip.horizontal ? 'active' : ''}`,
                                                                        onClick: ()=>setFlip((f)=>({
                                                                                    ...f,
                                                                                    horizontal: !f.horizontal
                                                                                })),
                                                                        title: "Flip Horizontal",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flip$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlipHorizontal$3e$__["FlipHorizontal"], {
                                                                            size: 14
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                            lineNumber: 657,
                                                                            columnNumber: 53
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                        lineNumber: 651,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        className: `gc-flip-btn ${flip.vertical ? 'active' : ''}`,
                                                                        onClick: ()=>setFlip((f)=>({
                                                                                    ...f,
                                                                                    vertical: !f.vertical
                                                                                })),
                                                                        title: "Flip Vertical",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlipVertical$3e$__["FlipVertical"], {
                                                                            size: 14
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                            lineNumber: 665,
                                                                            columnNumber: 53
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                        lineNumber: 659,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                lineNumber: 650,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                className: "gc-reset-btn",
                                                                style: {
                                                                    marginLeft: 'auto'
                                                                },
                                                                onClick: ()=>{
                                                                    setZoom(1);
                                                                    setRotation(0);
                                                                    setAspectRatio(getAspectRatio());
                                                                    setFlip({
                                                                        horizontal: false,
                                                                        vertical: false
                                                                    });
                                                                },
                                                                children: "Reset"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                lineNumber: 669,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                        lineNumber: 628,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                lineNumber: 614,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true)
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 548,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 535,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        !photoData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "gc-tips",
                            children: [
                                "Use a high-resolution photo (min. 1000×1000px) for best print quality",
                                "JPEG or PNG formats work best",
                                "Bright, well-lit photos produce the most vivid acrylic prints"
                            ].map((tip, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "gc-tip",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "gc-tip-dot"
                                        }, void 0, false, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 687,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        tip
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 686,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 680,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "gc-footer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: photoData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "gc-remove-btn",
                                        onClick: handlePreviewClick,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                lineNumber: 699,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Remove Photo"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                        lineNumber: 698,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 696,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "16px"
                                    },
                                    children: [
                                        !photoData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "gc-no-photo-hint",
                                            children: "Upload a photo to continue"
                                        }, void 0, false, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 705,
                                            columnNumber: 44
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        photoData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "gc-continue-btn",
                                            onClick: handleContinue,
                                            children: [
                                                "Save & Continue",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                    lineNumber: 709,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 707,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 704,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 695,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                    lineNumber: 496,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                lineNumber: 495,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            isUploading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "gc-modal-overlay",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "gc-modal",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: "48px",
                                height: "48px",
                                borderRadius: "50%",
                                background: "#e6f2ff",
                                border: "1px solid #bfdbfe",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 20px"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                size: 20,
                                color: "#0071e3"
                            }, void 0, false, {
                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                lineNumber: 723,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 722,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "gc-modal-title",
                            children: "Uploading your photo…"
                        }, void 0, false, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 725,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "gc-modal-sub",
                            children: "Optimising your image for crystal-clear HD acrylic printing."
                        }, void 0, false, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 726,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "gc-progress-track",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "gc-progress-bar",
                                style: {
                                    width: `${uploadProgress}%`
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                lineNumber: 728,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 727,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "gc-progress-text",
                            children: [
                                uploadProgress,
                                "% complete"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 730,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                    lineNumber: 721,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                lineNumber: 720,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(GenericCustomize, "gDx0WXF1dv67VfqeI6PND1XshFI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = GenericCustomize;
const __TURBOPACK__default__export__ = GenericCustomize;
var _c;
__turbopack_context__.k.register(_c, "GenericCustomize");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/shop/acrylic/[shape]/edit/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditorPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Components$2f$Shop$2f$GenericCustomize$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Components/Shop/GenericCustomize.jsx [app-client] (ecmascript)"); // This is now the Editor
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function EditorPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    // Default to 'portrait' if shape not found, though folder structure ensures valid shape usually
    const shape = params.shape || 'portrait';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Components$2f$Shop$2f$GenericCustomize$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        type: "acrylic",
        shape: shape
    }, void 0, false, {
        fileName: "[project]/src/app/shop/acrylic/[shape]/edit/page.js",
        lineNumber: 11,
        columnNumber: 12
    }, this);
}
_s(EditorPage, "+jVsTcECDRo3yq2d7EQxlN9Ixog=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = EditorPage;
var _c;
__turbopack_context__.k.register(_c, "EditorPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_c9548a98._.js.map