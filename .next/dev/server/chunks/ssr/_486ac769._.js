module.exports = [
"[project]/src/Components/LoadingBar.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const LoadingBar = ({ progress, isUploading, message = "Uploading..." })=>{
    if (!isUploading) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-sm text-neutral-600 mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: message
                            }, void 0, false, {
                                fileName: "[project]/src/Components/LoadingBar.jsx",
                                lineNumber: 10,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full bg-neutral-200 rounded-full h-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
const __TURBOPACK__default__export__ = LoadingBar;
}),
"[project]/src/Components/Shop/GenericCustomize.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$easy$2d$crop$2f$index$2e$module$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-easy-crop/index.module.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-cw.js [app-ssr] (ecmascript) <export default as RotateCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-in.js [app-ssr] (ecmascript) <export default as ZoomIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Components$2f$LoadingBar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Components/LoadingBar.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/axiosInstance.js [app-ssr] (ecmascript)");
"use client";
;
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
    const [photoData, setPhotoData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isUploading, setIsUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploadProgress, setUploadProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [productConfig, setProductConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [crop, setCrop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [rotation, setRotation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lowResWarning, setLowResWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const typeTitle = type.charAt(0).toUpperCase() + type.slice(1);
    const shapeTitle = shape.charAt(0).toUpperCase() + shape.slice(1);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        type
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        const fetchConfig = async ()=>{
            try {
                const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$axiosInstance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`frames/${type}?shape=${shape}`);
                if (res.data && res.data.length > 0) setProductConfig(res.data[0]);
            } catch (err) {
                console.error("Failed to fetch config", err);
            }
        };
        fetchConfig();
    }, [
        type,
        shape
    ]);
    const handleFileUpload = async (file)=>{
        if (!file.type.match("image.*")) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Please select a valid image");
            return;
        }
        if (file.size > MAX_UPLOAD_SIZE_BYTES) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`File too large. Max size is ${MAX_UPLOAD_SIZE_MB}MB.`);
            return;
        }
        setIsUploading(true);
        setUploadProgress(0);
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post("/api/upload-image", formData, {
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
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].warn("Low resolution image detected. Print quality might be affected.");
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
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Image uploaded!");
        } catch (error) {
            console.error(error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Upload failed.");
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
    };
    const onCropComplete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((_, croppedAreaPixels)=>setCroppedAreaPixels(croppedAreaPixels), []);
    const handleContinue = ()=>{
        if (!photoData) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Please upload an image first.");
            return;
        }
        let existingDetails = {};
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
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
                .gc-ctrl-group { display: flex; align-items: center; gap: 10px; }
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
                lineNumber: 141,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "gc-page",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: "900px",
                        margin: "0 auto",
                        padding: "0 24px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "gc-breadcrumb",
                            style: {
                                padding: "0 0 28px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Shop"
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 456,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "gc-breadcrumb-sep",
                                    children: "›"
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 457,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: typeTitle
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 458,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "gc-breadcrumb-sep",
                                    children: "›"
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 459,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: shapeTitle
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 460,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "gc-breadcrumb-sep",
                                    children: "›"
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 461,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "gc-breadcrumb-active",
                                    children: "Customise"
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 462,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 455,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "gc-header",
                            style: {
                                padding: "0 0 40px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "gc-eyebrow",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                    size: 10,
                                                    color: "#0051a2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                    lineNumber: 469,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                productConfig?.title || `${typeTitle} · ${shapeTitle} Frame`
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 468,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "gc-title",
                                            children: [
                                                "Customise Your ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                    children: shapeTitle
                                                }, void 0, false, {
                                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                    lineNumber: 473,
                                                    columnNumber: 48
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " Frame"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 472,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "gc-desc",
                                            children: pageDesc
                                        }, void 0, false, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 475,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 467,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "gc-step-indicator",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "gc-step-label",
                                            children: "Step 02 / 03"
                                        }, void 0, false, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 478,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "gc-step-dots",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "gc-dot done"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                    lineNumber: 480,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "gc-dot active"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                    lineNumber: 481,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "gc-dot pending"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                    lineNumber: 482,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 479,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 477,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 466,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "file",
                            ref: fileInputRef,
                            onChange: handleChange,
                            accept: "image/*",
                            style: {
                                display: "none"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 488,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "gc-card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "gc-card-header",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "gc-card-header-title",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "gc-card-header-icon",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                        size: 14,
                                                        color: "#60a5fa"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                        lineNumber: 495,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                    lineNumber: 494,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                photoData ? "Adjust & Crop Your Photo" : "Upload Your Photo"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 493,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "gc-card-header-badge",
                                            children: photoData ? "Drag to reposition" : `Max ${MAX_UPLOAD_SIZE_MB}MB · JPG, PNG`
                                        }, void 0, false, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 499,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 492,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "gc-card-body",
                                    children: !photoData ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `gc-upload-zone ${isDragging ? "dragging" : "idle"}`,
                                        onDragOver: handleDragOver,
                                        onDragLeave: handleDragLeave,
                                        onDrop: handleDrop,
                                        onClick: handleReplaceClick,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "gc-upload-icon-wrap",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                    size: 26,
                                                    color: isDragging ? "#0071e3" : "#737373"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                    lineNumber: 514,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                lineNumber: 513,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "gc-upload-title",
                                                        children: "Drop your photo here"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                        lineNumber: 517,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "gc-upload-sub",
                                                        children: "or click anywhere to browse your files"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                        lineNumber: 518,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                lineNumber: 516,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "gc-browse-btn",
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    handleReplaceClick();
                                                },
                                                disabled: isUploading,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                        size: 12
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                        lineNumber: 525,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Browse Files"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                lineNumber: 520,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "gc-upload-hint",
                                                children: [
                                                    "JPG · PNG · WEBP  ·  Max ",
                                                    MAX_UPLOAD_SIZE_MB,
                                                    "MB  ·  Min 1000×1000px recommended"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                lineNumber: 528,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                        lineNumber: 506,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "gc-crop-wrap",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$easy$2d$crop$2f$index$2e$module$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        image: photoData.url,
                                                        crop: crop,
                                                        zoom: zoom,
                                                        rotation: rotation,
                                                        aspect: getAspectRatio(),
                                                        cropSize: {
                                                            width: CROP_SIZE,
                                                            height: CROP_SIZE / getAspectRatio()
                                                        },
                                                        onCropChange: setCrop,
                                                        onCropComplete: onCropComplete,
                                                        onZoomChange: setZoom,
                                                        onRotationChange: setRotation,
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
                                                        lineNumber: 535,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    lowResWarning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "gc-low-res-badge",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                size: 14,
                                                                color: "#c97a00"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                lineNumber: 559,
                                                                columnNumber: 49
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            "Low resolution — print quality may be reduced"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                        lineNumber: 558,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                lineNumber: 534,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "gc-controls",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "gc-ctrl-group",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__["ZoomIn"], {
                                                                size: 14,
                                                                color: "#737373"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                lineNumber: 568,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "gc-ctrl-label",
                                                                children: "Zoom"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                lineNumber: 569,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "range",
                                                                className: "gc-slider",
                                                                min: 1,
                                                                max: 3,
                                                                step: 0.05,
                                                                value: zoom,
                                                                onChange: (e)=>setZoom(Number(e.target.value))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                lineNumber: 570,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                        lineNumber: 567,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "gc-ctrl-group",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__["RotateCw"], {
                                                                size: 14,
                                                                color: "#737373"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                lineNumber: 573,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "gc-ctrl-label",
                                                                children: "Rotate"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                lineNumber: 574,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "range",
                                                                className: "gc-slider",
                                                                min: 0,
                                                                max: 360,
                                                                step: 1,
                                                                value: rotation,
                                                                onChange: (e)=>setRotation(Number(e.target.value))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                                lineNumber: 575,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                        lineNumber: 572,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "gc-reset-btn",
                                                        onClick: ()=>{
                                                            setZoom(1);
                                                            setRotation(0);
                                                        },
                                                        children: "Reset"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                        lineNumber: 577,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                lineNumber: 566,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true)
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 504,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 491,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        !photoData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "gc-tips",
                            children: [
                                "Use a high-resolution photo (min. 1000×1000px) for best print quality",
                                "JPEG or PNG formats work best",
                                "Bright, well-lit photos produce the most vivid acrylic prints"
                            ].map((tip, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "gc-tip",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "gc-tip-dot"
                                        }, void 0, false, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 594,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        tip
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 593,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 587,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "gc-footer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: photoData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "gc-remove-btn",
                                        onClick: handlePreviewClick,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                size: 13
                                            }, void 0, false, {
                                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                lineNumber: 606,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Remove Photo"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                        lineNumber: 605,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 603,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "16px"
                                    },
                                    children: [
                                        !photoData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "gc-no-photo-hint",
                                            children: "Upload a photo to continue"
                                        }, void 0, false, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 612,
                                            columnNumber: 44
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        photoData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "gc-continue-btn",
                                            onClick: handleContinue,
                                            children: [
                                                "Save & Continue",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                                    lineNumber: 616,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                            lineNumber: 614,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                    lineNumber: 611,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 602,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                    lineNumber: 452,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                lineNumber: 451,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            isUploading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "gc-modal-overlay",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "gc-modal",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                size: 20,
                                color: "#0071e3"
                            }, void 0, false, {
                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                lineNumber: 630,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 629,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "gc-modal-title",
                            children: "Uploading your photo…"
                        }, void 0, false, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 632,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "gc-modal-sub",
                            children: "Optimising your image for crystal-clear HD acrylic printing."
                        }, void 0, false, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 633,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "gc-progress-track",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "gc-progress-bar",
                                style: {
                                    width: `${uploadProgress}%`
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                                lineNumber: 635,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 634,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "gc-progress-text",
                            children: [
                                uploadProgress,
                                "% complete"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                            lineNumber: 637,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                    lineNumber: 628,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/Components/Shop/GenericCustomize.jsx",
                lineNumber: 627,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = GenericCustomize;
}),
"[project]/src/app/shop/backlight/[shape]/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CustomizePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Components$2f$Shop$2f$GenericCustomize$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Components/Shop/GenericCustomize.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
// Valid shapes for backlight
const shapes = [
    "portrait",
    "landscape",
    "square"
];
function CustomizePage() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const shape = params.shape;
    if (!shapes.includes(shape)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: "Shape not found"
        }, void 0, false, {
            fileName: "[project]/src/app/shop/backlight/[shape]/page.js",
            lineNumber: 15,
            columnNumber: 16
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Components$2f$Shop$2f$GenericCustomize$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        type: "backlight",
        shape: shape
    }, void 0, false, {
        fileName: "[project]/src/app/shop/backlight/[shape]/page.js",
        lineNumber: 18,
        columnNumber: 12
    }, this);
}
}),
"[project]/node_modules/tslib/tslib.es6.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__addDisposableResource",
    ()=>__addDisposableResource,
    "__assign",
    ()=>__assign,
    "__asyncDelegator",
    ()=>__asyncDelegator,
    "__asyncGenerator",
    ()=>__asyncGenerator,
    "__asyncValues",
    ()=>__asyncValues,
    "__await",
    ()=>__await,
    "__awaiter",
    ()=>__awaiter,
    "__classPrivateFieldGet",
    ()=>__classPrivateFieldGet,
    "__classPrivateFieldIn",
    ()=>__classPrivateFieldIn,
    "__classPrivateFieldSet",
    ()=>__classPrivateFieldSet,
    "__createBinding",
    ()=>__createBinding,
    "__decorate",
    ()=>__decorate,
    "__disposeResources",
    ()=>__disposeResources,
    "__esDecorate",
    ()=>__esDecorate,
    "__exportStar",
    ()=>__exportStar,
    "__extends",
    ()=>__extends,
    "__generator",
    ()=>__generator,
    "__importDefault",
    ()=>__importDefault,
    "__importStar",
    ()=>__importStar,
    "__makeTemplateObject",
    ()=>__makeTemplateObject,
    "__metadata",
    ()=>__metadata,
    "__param",
    ()=>__param,
    "__propKey",
    ()=>__propKey,
    "__read",
    ()=>__read,
    "__rest",
    ()=>__rest,
    "__rewriteRelativeImportExtension",
    ()=>__rewriteRelativeImportExtension,
    "__runInitializers",
    ()=>__runInitializers,
    "__setFunctionName",
    ()=>__setFunctionName,
    "__spread",
    ()=>__spread,
    "__spreadArray",
    ()=>__spreadArray,
    "__spreadArrays",
    ()=>__spreadArrays,
    "__values",
    ()=>__values,
    "default",
    ()=>__TURBOPACK__default__export__
]);
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol, Iterator */ var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
        if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
        return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for(var i = decorators.length - 1; i >= 0; i--){
        var context = {};
        for(var p in contextIn)context[p] = p === "access" ? {} : contextIn[p];
        for(var p in contextIn.access)context.access[p] = contextIn.access[p];
        context.addInitializer = function(f) {
            if (done) throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
        };
        var result = (0, decorators[i])(kind === "accessor" ? {
            get: descriptor.get,
            set: descriptor.set
        } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        } else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
;
function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for(var i = 0; i < initializers.length; i++){
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
}
;
function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
}
;
function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
        configurable: true,
        value: prefix ? "".concat(prefix, " ", name) : name
    });
}
;
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var __createBinding = Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
};
function __exportStar(m, o) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function awaitReturn(f) {
        return function(v) {
            return Promise.resolve(v).then(f, reject);
        };
    }
    function verb(n, f) {
        if (g[n]) {
            i[n] = function(v) {
                return new Promise(function(a, b) {
                    q.push([
                        n,
                        v,
                        a,
                        b
                    ]) > 1 || resume(n, v);
                });
            };
            if (f) i[n] = f(i[n]);
        }
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: false
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    //TURBOPACK unreachable
    ;
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
;
var __setModuleDefault = Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
};
var ownKeys = function(o) {
    ownKeys = Object.getOwnPropertyNames || function(o) {
        var ar = [];
        for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
        return ar;
    };
    return ownKeys(o);
};
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
    }
    __setModuleDefault(result, mod);
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() {
            try {
                inner.call(this);
            } catch (e) {
                return Promise.reject(e);
            }
        };
        env.stack.push({
            value: value,
            dispose: dispose,
            async: async
        });
    } else if (async) {
        env.stack.push({
            async: true
        });
    }
    return value;
}
var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    var r, s = 0;
    function next() {
        while(r = env.stack.pop()){
            try {
                if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                if (r.dispose) {
                    var result = r.dispose.call(r.value);
                    if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
                        fail(e);
                        return next();
                    });
                } else s |= 1;
            } catch (e) {
                fail(e);
            }
        }
        if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
        if (env.hasError) throw env.error;
    }
    return next();
}
function __rewriteRelativeImportExtension(path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
        });
    }
    return path;
}
const __TURBOPACK__default__export__ = {
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __esDecorate,
    __runInitializers,
    __propKey,
    __setFunctionName,
    __metadata,
    __awaiter,
    __generator,
    __createBinding,
    __exportStar,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __classPrivateFieldIn,
    __addDisposableResource,
    __disposeResources,
    __rewriteRelativeImportExtension
};
}),
"[project]/node_modules/normalize-wheel/src/UserAgent_DEPRECATED.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule UserAgent_DEPRECATED
 */ /**
 *  Provides entirely client-side User Agent and OS detection. You should prefer
 *  the non-deprecated UserAgent module when possible, which exposes our
 *  authoritative server-side PHP-based detection to the client.
 *
 *  Usage is straightforward:
 *
 *    if (UserAgent_DEPRECATED.ie()) {
 *      //  IE
 *    }
 *
 *  You can also do version checks:
 *
 *    if (UserAgent_DEPRECATED.ie() >= 7) {
 *      //  IE7 or better
 *    }
 *
 *  The browser functions will return NaN if the browser does not match, so
 *  you can also do version compares the other way:
 *
 *    if (UserAgent_DEPRECATED.ie() < 7) {
 *      //  IE6 or worse
 *    }
 *
 *  Note that the version is a float and may include a minor version number,
 *  so you should always use range operators to perform comparisons, not
 *  strict equality.
 *
 *  **Note:** You should **strongly** prefer capability detection to browser
 *  version detection where it's reasonable:
 *
 *    http://www.quirksmode.org/js/support.html
 *
 *  Further, we have a large number of mature wrapper functions and classes
 *  which abstract away many browser irregularities. Check the documentation,
 *  grep for things, or ask on javascript@lists.facebook.com before writing yet
 *  another copy of "event || window.event".
 *
 */ var _populated = false;
// Browsers
var _ie, _firefox, _opera, _webkit, _chrome;
// Actual IE browser for compatibility mode
var _ie_real_version;
// Platforms
var _osx, _windows, _linux, _android;
// Architectures
var _win64;
// Devices
var _iphone, _ipad, _native;
var _mobile;
function _populate() {
    if (_populated) {
        return;
    }
    _populated = true;
    // To work around buggy JS libraries that can't handle multi-digit
    // version numbers, Opera 10's user agent string claims it's Opera
    // 9, then later includes a Version/X.Y field:
    //
    // Opera/9.80 (foo) Presto/2.2.15 Version/10.10
    var uas = navigator.userAgent;
    var agent = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(uas);
    var os = /(Mac OS X)|(Windows)|(Linux)/.exec(uas);
    _iphone = /\b(iPhone|iP[ao]d)/.exec(uas);
    _ipad = /\b(iP[ao]d)/.exec(uas);
    _android = /Android/i.exec(uas);
    _native = /FBAN\/\w+;/i.exec(uas);
    _mobile = /Mobile/i.exec(uas);
    // Note that the IE team blog would have you believe you should be checking
    // for 'Win64; x64'.  But MSDN then reveals that you can actually be coming
    // from either x64 or ia64;  so ultimately, you should just check for Win64
    // as in indicator of whether you're in 64-bit IE.  32-bit IE on 64-bit
    // Windows will send 'WOW64' instead.
    _win64 = !!/Win64/.exec(uas);
    if (agent) {
        _ie = agent[1] ? parseFloat(agent[1]) : agent[5] ? parseFloat(agent[5]) : NaN;
        // IE compatibility mode
        if (_ie && document && document.documentMode) {
            _ie = document.documentMode;
        }
        // grab the "true" ie version from the trident token if available
        var trident = /(?:Trident\/(\d+.\d+))/.exec(uas);
        _ie_real_version = trident ? parseFloat(trident[1]) + 4 : _ie;
        _firefox = agent[2] ? parseFloat(agent[2]) : NaN;
        _opera = agent[3] ? parseFloat(agent[3]) : NaN;
        _webkit = agent[4] ? parseFloat(agent[4]) : NaN;
        if (_webkit) {
            // We do not add the regexp to the above test, because it will always
            // match 'safari' only since 'AppleWebKit' appears before 'Chrome' in
            // the userAgent string.
            agent = /(?:Chrome\/(\d+\.\d+))/.exec(uas);
            _chrome = agent && agent[1] ? parseFloat(agent[1]) : NaN;
        } else {
            _chrome = NaN;
        }
    } else {
        _ie = _firefox = _opera = _chrome = _webkit = NaN;
    }
    if (os) {
        if (os[1]) {
            // Detect OS X version.  If no version number matches, set _osx to true.
            // Version examples:  10, 10_6_1, 10.7
            // Parses version number as a float, taking only first two sets of
            // digits.  If only one set of digits is found, returns just the major
            // version number.
            var ver = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);
            _osx = ver ? parseFloat(ver[1].replace('_', '.')) : true;
        } else {
            _osx = false;
        }
        _windows = !!os[2];
        _linux = !!os[3];
    } else {
        _osx = _windows = _linux = false;
    }
}
var UserAgent_DEPRECATED = {
    /**
   *  Check if the UA is Internet Explorer.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */ ie: function() {
        return _populate() || _ie;
    },
    /**
   * Check if we're in Internet Explorer compatibility mode.
   *
   * @return bool true if in compatibility mode, false if
   * not compatibility mode or not ie
   */ ieCompatibilityMode: function() {
        return _populate() || _ie_real_version > _ie;
    },
    /**
   * Whether the browser is 64-bit IE.  Really, this is kind of weak sauce;  we
   * only need this because Skype can't handle 64-bit IE yet.  We need to remove
   * this when we don't need it -- tracked by #601957.
   */ ie64: function() {
        return UserAgent_DEPRECATED.ie() && _win64;
    },
    /**
   *  Check if the UA is Firefox.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */ firefox: function() {
        return _populate() || _firefox;
    },
    /**
   *  Check if the UA is Opera.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */ opera: function() {
        return _populate() || _opera;
    },
    /**
   *  Check if the UA is WebKit.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */ webkit: function() {
        return _populate() || _webkit;
    },
    /**
   *  For Push
   *  WILL BE REMOVED VERY SOON. Use UserAgent_DEPRECATED.webkit
   */ safari: function() {
        return UserAgent_DEPRECATED.webkit();
    },
    /**
   *  Check if the UA is a Chrome browser.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */ chrome: function() {
        return _populate() || _chrome;
    },
    /**
   *  Check if the user is running Windows.
   *
   *  @return bool `true' if the user's OS is Windows.
   */ windows: function() {
        return _populate() || _windows;
    },
    /**
   *  Check if the user is running Mac OS X.
   *
   *  @return float|bool   Returns a float if a version number is detected,
   *                       otherwise true/false.
   */ osx: function() {
        return _populate() || _osx;
    },
    /**
   * Check if the user is running Linux.
   *
   * @return bool `true' if the user's OS is some flavor of Linux.
   */ linux: function() {
        return _populate() || _linux;
    },
    /**
   * Check if the user is running on an iPhone or iPod platform.
   *
   * @return bool `true' if the user is running some flavor of the
   *    iPhone OS.
   */ iphone: function() {
        return _populate() || _iphone;
    },
    mobile: function() {
        return _populate() || _iphone || _ipad || _android || _mobile;
    },
    nativeApp: function() {
        // webviews inside of the native apps
        return _populate() || _native;
    },
    android: function() {
        return _populate() || _android;
    },
    ipad: function() {
        return _populate() || _ipad;
    }
};
module.exports = UserAgent_DEPRECATED;
}),
"[project]/node_modules/normalize-wheel/src/ExecutionEnvironment.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ExecutionEnvironment
 */ /*jslint evil: true */ var canUseDOM = !!(("TURBOPACK compile-time value", "undefined") !== 'undefined' && window.document && window.document.createElement);
/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */ var ExecutionEnvironment = {
    canUseDOM: canUseDOM,
    canUseWorkers: typeof Worker !== 'undefined',
    canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
    canUseViewport: canUseDOM && !!window.screen,
    isInWorker: !canUseDOM // For now, this is true - might change in the future.
};
module.exports = ExecutionEnvironment;
}),
"[project]/node_modules/normalize-wheel/src/isEventSupported.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule isEventSupported
 */ var ExecutionEnvironment = __turbopack_context__.r("[project]/node_modules/normalize-wheel/src/ExecutionEnvironment.js [app-ssr] (ecmascript)");
var useHasFeature;
if (ExecutionEnvironment.canUseDOM) {
    useHasFeature = document.implementation && document.implementation.hasFeature && // always returns true in newer browsers as per the standard.
    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
    document.implementation.hasFeature('', '') !== true;
}
/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */ function isEventSupported(eventNameSuffix, capture) {
    if (!ExecutionEnvironment.canUseDOM || capture && !('addEventListener' in document)) {
        return false;
    }
    var eventName = 'on' + eventNameSuffix;
    var isSupported = eventName in document;
    if (!isSupported) {
        var element = document.createElement('div');
        element.setAttribute(eventName, 'return;');
        isSupported = typeof element[eventName] === 'function';
    }
    if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
        // This is the only way to test support for the `wheel` event in IE9+.
        isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
    }
    return isSupported;
}
module.exports = isEventSupported;
}),
"[project]/node_modules/normalize-wheel/src/normalizeWheel.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule normalizeWheel
 * @typechecks
 */ var UserAgent_DEPRECATED = __turbopack_context__.r("[project]/node_modules/normalize-wheel/src/UserAgent_DEPRECATED.js [app-ssr] (ecmascript)");
var isEventSupported = __turbopack_context__.r("[project]/node_modules/normalize-wheel/src/isEventSupported.js [app-ssr] (ecmascript)");
// Reasonable defaults
var PIXEL_STEP = 10;
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;
/**
 * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
 * complicated, thus this doc is long and (hopefully) detailed enough to answer
 * your questions.
 *
 * If you need to react to the mouse wheel in a predictable way, this code is
 * like your bestest friend. * hugs *
 *
 * As of today, there are 4 DOM event types you can listen to:
 *
 *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
 *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
 *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
 *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
 *
 * So what to do?  The is the best:
 *
 *   normalizeWheel.getEventType();
 *
 * In your event callback, use this code to get sane interpretation of the
 * deltas.  This code will return an object with properties:
 *
 *   spinX   -- normalized spin speed (use for zoom) - x plane
 *   spinY   -- " - y plane
 *   pixelX  -- normalized distance (to pixels) - x plane
 *   pixelY  -- " - y plane
 *
 * Wheel values are provided by the browser assuming you are using the wheel to
 * scroll a web page by a number of lines or pixels (or pages).  Values can vary
 * significantly on different platforms and browsers, forgetting that you can
 * scroll at different speeds.  Some devices (like trackpads) emit more events
 * at smaller increments with fine granularity, and some emit massive jumps with
 * linear speed or acceleration.
 *
 * This code does its best to normalize the deltas for you:
 *
 *   - spin is trying to normalize how far the wheel was spun (or trackpad
 *     dragged).  This is super useful for zoom support where you want to
 *     throw away the chunky scroll steps on the PC and make those equal to
 *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
 *     resolve a single slow step on a wheel to 1.
 *
 *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
 *     get the crazy differences between browsers, but at least it'll be in
 *     pixels!
 *
 *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
 *     should translate to positive value zooming IN, negative zooming OUT.
 *     This matches the newer 'wheel' event.
 *
 * Why are there spinX, spinY (or pixels)?
 *
 *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
 *     with a mouse.  It results in side-scrolling in the browser by default.
 *
 *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
 *
 *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
 *     probably is by browsers in conjunction with fancy 3D controllers .. but
 *     you know.
 *
 * Implementation info:
 *
 * Examples of 'wheel' event if you scroll slowly (down) by one step with an
 * average mouse:
 *
 *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
 *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
 *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
 *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
 *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
 *
 * On the trackpad:
 *
 *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
 *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
 *
 * On other/older browsers.. it's more complicated as there can be multiple and
 * also missing delta values.
 *
 * The 'wheel' event is more standard:
 *
 * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
 *
 * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
 * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
 * backward compatibility with older events.  Those other values help us
 * better normalize spin speed.  Example of what the browsers provide:
 *
 *                          | event.wheelDelta | event.detail
 *        ------------------+------------------+--------------
 *          Safari v5/OS X  |       -120       |       0
 *          Safari v5/Win7  |       -120       |       0
 *         Chrome v17/OS X  |       -120       |       0
 *         Chrome v17/Win7  |       -120       |       0
 *                IE9/Win7  |       -120       |   undefined
 *         Firefox v4/OS X  |     undefined    |       1
 *         Firefox v4/Win7  |     undefined    |       3
 *
 */ function normalizeWheel(/*object*/ event) /*object*/ {
    var sX = 0, sY = 0, pX = 0, pY = 0; // pixelX, pixelY
    // Legacy
    if ('detail' in event) {
        sY = event.detail;
    }
    if ('wheelDelta' in event) {
        sY = -event.wheelDelta / 120;
    }
    if ('wheelDeltaY' in event) {
        sY = -event.wheelDeltaY / 120;
    }
    if ('wheelDeltaX' in event) {
        sX = -event.wheelDeltaX / 120;
    }
    // side scrolling on FF with DOMMouseScroll
    if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
    }
    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;
    if ('deltaY' in event) {
        pY = event.deltaY;
    }
    if ('deltaX' in event) {
        pX = event.deltaX;
    }
    if ((pX || pY) && event.deltaMode) {
        if (event.deltaMode == 1) {
            pX *= LINE_HEIGHT;
            pY *= LINE_HEIGHT;
        } else {
            pX *= PAGE_HEIGHT;
            pY *= PAGE_HEIGHT;
        }
    }
    // Fall-back if spin cannot be determined
    if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
    }
    if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
    }
    return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
    };
}
/**
 * The best combination if you prefer spinX + spinY normalization.  It favors
 * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
 * 'wheel' event, making spin speed determination impossible.
 */ normalizeWheel.getEventType = function() /*string*/ {
    return UserAgent_DEPRECATED.firefox() ? 'DOMMouseScroll' : isEventSupported('wheel') ? 'wheel' : 'mousewheel';
};
module.exports = normalizeWheel;
}),
"[project]/node_modules/normalize-wheel/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/normalize-wheel/src/normalizeWheel.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/react-easy-crop/index.module.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Cropper,
    "getInitialCropFromCroppedAreaPercentages",
    ()=>getInitialCropFromCroppedAreaPercentages,
    "getInitialCropFromCroppedAreaPixels",
    ()=>getInitialCropFromCroppedAreaPixels
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$normalize$2d$wheel$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/normalize-wheel/index.js [app-ssr] (ecmascript)");
;
;
;
/**
 * Compute the dimension of the crop area based on media size,
 * aspect ratio and optionally rotation
 */ function getCropSize(mediaWidth, mediaHeight, containerWidth, containerHeight, aspect, rotation) {
    if (rotation === void 0) {
        rotation = 0;
    }
    var _a = rotateSize(mediaWidth, mediaHeight, rotation), width = _a.width, height = _a.height;
    var fittingWidth = Math.min(width, containerWidth);
    var fittingHeight = Math.min(height, containerHeight);
    if (fittingWidth > fittingHeight * aspect) {
        return {
            width: fittingHeight * aspect,
            height: fittingHeight
        };
    }
    return {
        width: fittingWidth,
        height: fittingWidth / aspect
    };
}
/**
 * Compute media zoom.
 * We fit the media into the container with "max-width: 100%; max-height: 100%;"
 */ function getMediaZoom(mediaSize) {
    // Take the axis with more pixels to improve accuracy
    return mediaSize.width > mediaSize.height ? mediaSize.width / mediaSize.naturalWidth : mediaSize.height / mediaSize.naturalHeight;
}
/**
 * Ensure a new media position stays in the crop area.
 */ function restrictPosition(position, mediaSize, cropSize, zoom, rotation) {
    if (rotation === void 0) {
        rotation = 0;
    }
    var _a = rotateSize(mediaSize.width, mediaSize.height, rotation), width = _a.width, height = _a.height;
    return {
        x: restrictPositionCoord(position.x, width, cropSize.width, zoom),
        y: restrictPositionCoord(position.y, height, cropSize.height, zoom)
    };
}
function restrictPositionCoord(position, mediaSize, cropSize, zoom) {
    var maxPosition = mediaSize * zoom / 2 - cropSize / 2;
    return clamp(position, -maxPosition, maxPosition);
}
function getDistanceBetweenPoints(pointA, pointB) {
    return Math.sqrt(Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.x - pointB.x, 2));
}
function getRotationBetweenPoints(pointA, pointB) {
    return Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x) * 180 / Math.PI;
}
/**
 * Compute the output cropped area of the media in percentages and pixels.
 * x/y are the top-left coordinates on the src media
 */ function computeCroppedArea(crop, mediaSize, cropSize, aspect, zoom, rotation, restrictPosition) {
    if (rotation === void 0) {
        rotation = 0;
    }
    if (restrictPosition === void 0) {
        restrictPosition = true;
    }
    // if the media is rotated by the user, we cannot limit the position anymore
    // as it might need to be negative.
    var limitAreaFn = restrictPosition ? limitArea : noOp;
    var mediaBBoxSize = rotateSize(mediaSize.width, mediaSize.height, rotation);
    var mediaNaturalBBoxSize = rotateSize(mediaSize.naturalWidth, mediaSize.naturalHeight, rotation);
    // calculate the crop area in percentages
    // in the rotated space
    var croppedAreaPercentages = {
        x: limitAreaFn(100, ((mediaBBoxSize.width - cropSize.width / zoom) / 2 - crop.x / zoom) / mediaBBoxSize.width * 100),
        y: limitAreaFn(100, ((mediaBBoxSize.height - cropSize.height / zoom) / 2 - crop.y / zoom) / mediaBBoxSize.height * 100),
        width: limitAreaFn(100, cropSize.width / mediaBBoxSize.width * 100 / zoom),
        height: limitAreaFn(100, cropSize.height / mediaBBoxSize.height * 100 / zoom)
    };
    // we compute the pixels size naively
    var widthInPixels = Math.round(limitAreaFn(mediaNaturalBBoxSize.width, croppedAreaPercentages.width * mediaNaturalBBoxSize.width / 100));
    var heightInPixels = Math.round(limitAreaFn(mediaNaturalBBoxSize.height, croppedAreaPercentages.height * mediaNaturalBBoxSize.height / 100));
    var isImgWiderThanHigh = mediaNaturalBBoxSize.width >= mediaNaturalBBoxSize.height * aspect;
    // then we ensure the width and height exactly match the aspect (to avoid rounding approximations)
    // if the media is wider than high, when zoom is 0, the crop height will be equals to image height
    // thus we want to compute the width from the height and aspect for accuracy.
    // Otherwise, we compute the height from width and aspect.
    var sizePixels = isImgWiderThanHigh ? {
        width: Math.round(heightInPixels * aspect),
        height: heightInPixels
    } : {
        width: widthInPixels,
        height: Math.round(widthInPixels / aspect)
    };
    var croppedAreaPixels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__assign"])({}, sizePixels), {
        x: Math.round(limitAreaFn(mediaNaturalBBoxSize.width - sizePixels.width, croppedAreaPercentages.x * mediaNaturalBBoxSize.width / 100)),
        y: Math.round(limitAreaFn(mediaNaturalBBoxSize.height - sizePixels.height, croppedAreaPercentages.y * mediaNaturalBBoxSize.height / 100))
    });
    return {
        croppedAreaPercentages: croppedAreaPercentages,
        croppedAreaPixels: croppedAreaPixels
    };
}
/**
 * Ensure the returned value is between 0 and max
 */ function limitArea(max, value) {
    return Math.min(max, Math.max(0, value));
}
function noOp(_max, value) {
    return value;
}
/**
 * Compute crop and zoom from the croppedAreaPercentages.
 */ function getInitialCropFromCroppedAreaPercentages(croppedAreaPercentages, mediaSize, rotation, cropSize, minZoom, maxZoom) {
    var mediaBBoxSize = rotateSize(mediaSize.width, mediaSize.height, rotation);
    // This is the inverse process of computeCroppedArea
    var zoom = clamp(cropSize.width / mediaBBoxSize.width * (100 / croppedAreaPercentages.width), minZoom, maxZoom);
    var crop = {
        x: zoom * mediaBBoxSize.width / 2 - cropSize.width / 2 - mediaBBoxSize.width * zoom * (croppedAreaPercentages.x / 100),
        y: zoom * mediaBBoxSize.height / 2 - cropSize.height / 2 - mediaBBoxSize.height * zoom * (croppedAreaPercentages.y / 100)
    };
    return {
        crop: crop,
        zoom: zoom
    };
}
/**
 * Compute zoom from the croppedAreaPixels
 */ function getZoomFromCroppedAreaPixels(croppedAreaPixels, mediaSize, cropSize) {
    var mediaZoom = getMediaZoom(mediaSize);
    return cropSize.height > cropSize.width ? cropSize.height / (croppedAreaPixels.height * mediaZoom) : cropSize.width / (croppedAreaPixels.width * mediaZoom);
}
/**
 * Compute crop and zoom from the croppedAreaPixels
 */ function getInitialCropFromCroppedAreaPixels(croppedAreaPixels, mediaSize, rotation, cropSize, minZoom, maxZoom) {
    if (rotation === void 0) {
        rotation = 0;
    }
    var mediaNaturalBBoxSize = rotateSize(mediaSize.naturalWidth, mediaSize.naturalHeight, rotation);
    var zoom = clamp(getZoomFromCroppedAreaPixels(croppedAreaPixels, mediaSize, cropSize), minZoom, maxZoom);
    var cropZoom = cropSize.height > cropSize.width ? cropSize.height / croppedAreaPixels.height : cropSize.width / croppedAreaPixels.width;
    var crop = {
        x: ((mediaNaturalBBoxSize.width - croppedAreaPixels.width) / 2 - croppedAreaPixels.x) * cropZoom,
        y: ((mediaNaturalBBoxSize.height - croppedAreaPixels.height) / 2 - croppedAreaPixels.y) * cropZoom
    };
    return {
        crop: crop,
        zoom: zoom
    };
}
/**
 * Return the point that is the center of point a and b
 */ function getCenter(a, b) {
    return {
        x: (b.x + a.x) / 2,
        y: (b.y + a.y) / 2
    };
}
function getRadianAngle(degreeValue) {
    return degreeValue * Math.PI / 180;
}
/**
 * Returns the new bounding area of a rotated rectangle.
 */ function rotateSize(width, height, rotation) {
    var rotRad = getRadianAngle(rotation);
    return {
        width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
    };
}
/**
 * Clamp value between min and max
 */ function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
/**
 * Combine multiple class names into a single string.
 */ function classNames() {
    var args = [];
    for(var _i = 0; _i < arguments.length; _i++){
        args[_i] = arguments[_i];
    }
    return args.filter(function(value) {
        if (typeof value === 'string' && value.length > 0) {
            return true;
        }
        return false;
    }).join(' ').trim();
}
var css_248z = ".reactEasyCrop_Container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden;\n  user-select: none;\n  touch-action: none;\n  cursor: move;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.reactEasyCrop_Image,\n.reactEasyCrop_Video {\n  will-change: transform; /* this improves performances and prevent painting issues on iOS Chrome */\n}\n\n.reactEasyCrop_Contain {\n  max-width: 100%;\n  max-height: 100%;\n  margin: auto;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.reactEasyCrop_Cover_Horizontal {\n  width: 100%;\n  height: auto;\n}\n.reactEasyCrop_Cover_Vertical {\n  width: auto;\n  height: 100%;\n}\n\n.reactEasyCrop_CropArea {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  box-sizing: border-box;\n  box-shadow: 0 0 0 9999em;\n  color: rgba(0, 0, 0, 0.5);\n  overflow: hidden;\n}\n\n.reactEasyCrop_CropAreaRound {\n  border-radius: 50%;\n}\n\n.reactEasyCrop_CropAreaGrid::before {\n  content: ' ';\n  box-sizing: border-box;\n  position: absolute;\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  top: 0;\n  bottom: 0;\n  left: 33.33%;\n  right: 33.33%;\n  border-top: 0;\n  border-bottom: 0;\n}\n\n.reactEasyCrop_CropAreaGrid::after {\n  content: ' ';\n  box-sizing: border-box;\n  position: absolute;\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  top: 33.33%;\n  bottom: 33.33%;\n  left: 0;\n  right: 0;\n  border-left: 0;\n  border-right: 0;\n}\n";
var MIN_ZOOM = 1;
var MAX_ZOOM = 3;
var KEYBOARD_STEP = 1;
var Cropper = /** @class */ function(_super) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__extends"])(Cropper, _super);
    function Cropper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cropperRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRef"]();
        _this.imageRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRef"]();
        _this.videoRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRef"]();
        _this.containerPosition = {
            x: 0,
            y: 0
        };
        _this.containerRef = null;
        _this.styleRef = null;
        _this.containerRect = null;
        _this.mediaSize = {
            width: 0,
            height: 0,
            naturalWidth: 0,
            naturalHeight: 0
        };
        _this.dragStartPosition = {
            x: 0,
            y: 0
        };
        _this.dragStartCrop = {
            x: 0,
            y: 0
        };
        _this.gestureZoomStart = 0;
        _this.gestureRotationStart = 0;
        _this.isTouching = false;
        _this.lastPinchDistance = 0;
        _this.lastPinchRotation = 0;
        _this.rafDragTimeout = null;
        _this.rafPinchTimeout = null;
        _this.wheelTimer = null;
        _this.currentDoc = typeof document !== 'undefined' ? document : null;
        _this.currentWindow = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        _this.resizeObserver = null;
        _this.previousCropSize = null;
        _this.isInitialized = false;
        _this.state = {
            cropSize: null,
            hasWheelJustStarted: false,
            mediaObjectFit: undefined
        };
        _this.initResizeObserver = function() {
            if (typeof window.ResizeObserver === 'undefined' || !_this.containerRef) {
                return;
            }
            var isFirstResize = true;
            _this.resizeObserver = new window.ResizeObserver(function(entries) {
                if (isFirstResize) {
                    isFirstResize = false; // observe() is called on mount, we don't want to trigger a recompute on mount
                    return;
                }
                _this.computeSizes();
            });
            _this.resizeObserver.observe(_this.containerRef);
        };
        // this is to prevent Safari on iOS >= 10 to zoom the page
        _this.preventZoomSafari = function(e) {
            return e.preventDefault();
        };
        _this.cleanEvents = function() {
            if (!_this.currentDoc) return;
            _this.currentDoc.removeEventListener('mousemove', _this.onMouseMove);
            _this.currentDoc.removeEventListener('mouseup', _this.onDragStopped);
            _this.currentDoc.removeEventListener('touchmove', _this.onTouchMove);
            _this.currentDoc.removeEventListener('touchend', _this.onDragStopped);
            _this.currentDoc.removeEventListener('gesturechange', _this.onGestureChange);
            _this.currentDoc.removeEventListener('gestureend', _this.onGestureEnd);
            _this.currentDoc.removeEventListener('scroll', _this.onScroll);
        };
        _this.clearScrollEvent = function() {
            if (_this.containerRef) _this.containerRef.removeEventListener('wheel', _this.onWheel);
            if (_this.wheelTimer) {
                clearTimeout(_this.wheelTimer);
            }
        };
        _this.onMediaLoad = function() {
            var cropSize = _this.computeSizes();
            if (cropSize) {
                _this.previousCropSize = cropSize;
                _this.emitCropData();
                _this.setInitialCrop(cropSize);
                _this.isInitialized = true;
            }
            if (_this.props.onMediaLoaded) {
                _this.props.onMediaLoaded(_this.mediaSize);
            }
        };
        _this.setInitialCrop = function(cropSize) {
            if (_this.props.initialCroppedAreaPercentages) {
                var _a = getInitialCropFromCroppedAreaPercentages(_this.props.initialCroppedAreaPercentages, _this.mediaSize, _this.props.rotation, cropSize, _this.props.minZoom, _this.props.maxZoom), crop = _a.crop, zoom = _a.zoom;
                _this.props.onCropChange(crop);
                _this.props.onZoomChange && _this.props.onZoomChange(zoom);
            } else if (_this.props.initialCroppedAreaPixels) {
                var _b = getInitialCropFromCroppedAreaPixels(_this.props.initialCroppedAreaPixels, _this.mediaSize, _this.props.rotation, cropSize, _this.props.minZoom, _this.props.maxZoom), crop = _b.crop, zoom = _b.zoom;
                _this.props.onCropChange(crop);
                _this.props.onZoomChange && _this.props.onZoomChange(zoom);
            }
        };
        _this.computeSizes = function() {
            var _a, _b, _c, _d, _e, _f;
            var mediaRef = _this.imageRef.current || _this.videoRef.current;
            if (mediaRef && _this.containerRef) {
                _this.containerRect = _this.containerRef.getBoundingClientRect();
                _this.saveContainerPosition();
                var containerAspect = _this.containerRect.width / _this.containerRect.height;
                var naturalWidth = ((_a = _this.imageRef.current) === null || _a === void 0 ? void 0 : _a.naturalWidth) || ((_b = _this.videoRef.current) === null || _b === void 0 ? void 0 : _b.videoWidth) || 0;
                var naturalHeight = ((_c = _this.imageRef.current) === null || _c === void 0 ? void 0 : _c.naturalHeight) || ((_d = _this.videoRef.current) === null || _d === void 0 ? void 0 : _d.videoHeight) || 0;
                var isMediaScaledDown = mediaRef.offsetWidth < naturalWidth || mediaRef.offsetHeight < naturalHeight;
                var mediaAspect = naturalWidth / naturalHeight;
                // We do not rely on the offsetWidth/offsetHeight if the media is scaled down
                // as the values they report are rounded. That will result in precision losses
                // when calculating zoom. We use the fact that the media is positionned relative
                // to the container. That allows us to use the container's dimensions
                // and natural aspect ratio of the media to calculate accurate media size.
                // However, for this to work, the container should not be rotated
                var renderedMediaSize = void 0;
                if (isMediaScaledDown) {
                    switch(_this.state.mediaObjectFit){
                        default:
                        case 'contain':
                            renderedMediaSize = containerAspect > mediaAspect ? {
                                width: _this.containerRect.height * mediaAspect,
                                height: _this.containerRect.height
                            } : {
                                width: _this.containerRect.width,
                                height: _this.containerRect.width / mediaAspect
                            };
                            break;
                        case 'horizontal-cover':
                            renderedMediaSize = {
                                width: _this.containerRect.width,
                                height: _this.containerRect.width / mediaAspect
                            };
                            break;
                        case 'vertical-cover':
                            renderedMediaSize = {
                                width: _this.containerRect.height * mediaAspect,
                                height: _this.containerRect.height
                            };
                            break;
                    }
                } else {
                    renderedMediaSize = {
                        width: mediaRef.offsetWidth,
                        height: mediaRef.offsetHeight
                    };
                }
                _this.mediaSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__assign"])({}, renderedMediaSize), {
                    naturalWidth: naturalWidth,
                    naturalHeight: naturalHeight
                });
                // set media size in the parent
                if (_this.props.setMediaSize) {
                    _this.props.setMediaSize(_this.mediaSize);
                }
                var cropSize = _this.props.cropSize ? _this.props.cropSize : getCropSize(_this.mediaSize.width, _this.mediaSize.height, _this.containerRect.width, _this.containerRect.height, _this.props.aspect, _this.props.rotation);
                if (((_e = _this.state.cropSize) === null || _e === void 0 ? void 0 : _e.height) !== cropSize.height || ((_f = _this.state.cropSize) === null || _f === void 0 ? void 0 : _f.width) !== cropSize.width) {
                    _this.props.onCropSizeChange && _this.props.onCropSizeChange(cropSize);
                }
                _this.setState({
                    cropSize: cropSize
                }, _this.recomputeCropPosition);
                // pass crop size to parent
                if (_this.props.setCropSize) {
                    _this.props.setCropSize(cropSize);
                }
                return cropSize;
            }
        };
        _this.saveContainerPosition = function() {
            if (_this.containerRef) {
                var bounds = _this.containerRef.getBoundingClientRect();
                _this.containerPosition = {
                    x: bounds.left,
                    y: bounds.top
                };
            }
        };
        _this.onMouseDown = function(e) {
            if (!_this.currentDoc) return;
            e.preventDefault();
            _this.currentDoc.addEventListener('mousemove', _this.onMouseMove);
            _this.currentDoc.addEventListener('mouseup', _this.onDragStopped);
            _this.saveContainerPosition();
            _this.onDragStart(Cropper.getMousePoint(e));
        };
        _this.onMouseMove = function(e) {
            return _this.onDrag(Cropper.getMousePoint(e));
        };
        _this.onScroll = function(e) {
            if (!_this.currentDoc) return;
            e.preventDefault();
            _this.saveContainerPosition();
        };
        _this.onTouchStart = function(e) {
            if (!_this.currentDoc) return;
            _this.isTouching = true;
            if (_this.props.onTouchRequest && !_this.props.onTouchRequest(e)) {
                return;
            }
            _this.currentDoc.addEventListener('touchmove', _this.onTouchMove, {
                passive: false
            }); // iOS 11 now defaults to passive: true
            _this.currentDoc.addEventListener('touchend', _this.onDragStopped);
            _this.saveContainerPosition();
            if (e.touches.length === 2) {
                _this.onPinchStart(e);
            } else if (e.touches.length === 1) {
                _this.onDragStart(Cropper.getTouchPoint(e.touches[0]));
            }
        };
        _this.onTouchMove = function(e) {
            // Prevent whole page from scrolling on iOS.
            e.preventDefault();
            if (e.touches.length === 2) {
                _this.onPinchMove(e);
            } else if (e.touches.length === 1) {
                _this.onDrag(Cropper.getTouchPoint(e.touches[0]));
            }
        };
        _this.onGestureStart = function(e) {
            if (!_this.currentDoc) return;
            e.preventDefault();
            _this.currentDoc.addEventListener('gesturechange', _this.onGestureChange);
            _this.currentDoc.addEventListener('gestureend', _this.onGestureEnd);
            _this.gestureZoomStart = _this.props.zoom;
            _this.gestureRotationStart = _this.props.rotation;
        };
        _this.onGestureChange = function(e) {
            e.preventDefault();
            if (_this.isTouching) {
                // this is to avoid conflict between gesture and touch events
                return;
            }
            var point = Cropper.getMousePoint(e);
            var newZoom = _this.gestureZoomStart - 1 + e.scale;
            _this.setNewZoom(newZoom, point, {
                shouldUpdatePosition: true
            });
            if (_this.props.onRotationChange) {
                var newRotation = _this.gestureRotationStart + e.rotation;
                _this.props.onRotationChange(newRotation);
            }
        };
        _this.onGestureEnd = function(e) {
            _this.cleanEvents();
        };
        _this.onDragStart = function(_a) {
            var _b, _c;
            var x = _a.x, y = _a.y;
            _this.dragStartPosition = {
                x: x,
                y: y
            };
            _this.dragStartCrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__assign"])({}, _this.props.crop);
            (_c = (_b = _this.props).onInteractionStart) === null || _c === void 0 ? void 0 : _c.call(_b);
        };
        _this.onDrag = function(_a) {
            var x = _a.x, y = _a.y;
            if (!_this.currentWindow) return;
            if (_this.rafDragTimeout) _this.currentWindow.cancelAnimationFrame(_this.rafDragTimeout);
            _this.rafDragTimeout = _this.currentWindow.requestAnimationFrame(function() {
                if (!_this.state.cropSize) return;
                if (x === undefined || y === undefined) return;
                var offsetX = x - _this.dragStartPosition.x;
                var offsetY = y - _this.dragStartPosition.y;
                var requestedPosition = {
                    x: _this.dragStartCrop.x + offsetX,
                    y: _this.dragStartCrop.y + offsetY
                };
                var newPosition = _this.props.restrictPosition ? restrictPosition(requestedPosition, _this.mediaSize, _this.state.cropSize, _this.props.zoom, _this.props.rotation) : requestedPosition;
                _this.props.onCropChange(newPosition);
            });
        };
        _this.onDragStopped = function() {
            var _a, _b;
            _this.isTouching = false;
            _this.cleanEvents();
            _this.emitCropData();
            (_b = (_a = _this.props).onInteractionEnd) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        _this.onWheel = function(e) {
            if (!_this.currentWindow) return;
            if (_this.props.onWheelRequest && !_this.props.onWheelRequest(e)) {
                return;
            }
            e.preventDefault();
            var point = Cropper.getMousePoint(e);
            var pixelY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$normalize$2d$wheel$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(e).pixelY;
            var newZoom = _this.props.zoom - pixelY * _this.props.zoomSpeed / 200;
            _this.setNewZoom(newZoom, point, {
                shouldUpdatePosition: true
            });
            if (!_this.state.hasWheelJustStarted) {
                _this.setState({
                    hasWheelJustStarted: true
                }, function() {
                    var _a, _b;
                    return (_b = (_a = _this.props).onInteractionStart) === null || _b === void 0 ? void 0 : _b.call(_a);
                });
            }
            if (_this.wheelTimer) {
                clearTimeout(_this.wheelTimer);
            }
            _this.wheelTimer = _this.currentWindow.setTimeout(function() {
                return _this.setState({
                    hasWheelJustStarted: false
                }, function() {
                    var _a, _b;
                    return (_b = (_a = _this.props).onInteractionEnd) === null || _b === void 0 ? void 0 : _b.call(_a);
                });
            }, 250);
        };
        _this.getPointOnContainer = function(_a, containerTopLeft) {
            var x = _a.x, y = _a.y;
            if (!_this.containerRect) {
                throw new Error('The Cropper is not mounted');
            }
            return {
                x: _this.containerRect.width / 2 - (x - containerTopLeft.x),
                y: _this.containerRect.height / 2 - (y - containerTopLeft.y)
            };
        };
        _this.getPointOnMedia = function(_a) {
            var x = _a.x, y = _a.y;
            var _b = _this.props, crop = _b.crop, zoom = _b.zoom;
            return {
                x: (x + crop.x) / zoom,
                y: (y + crop.y) / zoom
            };
        };
        _this.setNewZoom = function(zoom, point, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.shouldUpdatePosition, shouldUpdatePosition = _c === void 0 ? true : _c;
            if (!_this.state.cropSize || !_this.props.onZoomChange) return;
            var newZoom = clamp(zoom, _this.props.minZoom, _this.props.maxZoom);
            if (shouldUpdatePosition) {
                var zoomPoint = _this.getPointOnContainer(point, _this.containerPosition);
                var zoomTarget = _this.getPointOnMedia(zoomPoint);
                var requestedPosition = {
                    x: zoomTarget.x * newZoom - zoomPoint.x,
                    y: zoomTarget.y * newZoom - zoomPoint.y
                };
                var newPosition = _this.props.restrictPosition ? restrictPosition(requestedPosition, _this.mediaSize, _this.state.cropSize, newZoom, _this.props.rotation) : requestedPosition;
                _this.props.onCropChange(newPosition);
            }
            _this.props.onZoomChange(newZoom);
        };
        _this.getCropData = function() {
            if (!_this.state.cropSize) {
                return null;
            }
            // this is to ensure the crop is correctly restricted after a zoom back (https://github.com/ValentinH/react-easy-crop/issues/6)
            var restrictedPosition = _this.props.restrictPosition ? restrictPosition(_this.props.crop, _this.mediaSize, _this.state.cropSize, _this.props.zoom, _this.props.rotation) : _this.props.crop;
            return computeCroppedArea(restrictedPosition, _this.mediaSize, _this.state.cropSize, _this.getAspect(), _this.props.zoom, _this.props.rotation, _this.props.restrictPosition);
        };
        _this.emitCropData = function() {
            var cropData = _this.getCropData();
            if (!cropData) return;
            var croppedAreaPercentages = cropData.croppedAreaPercentages, croppedAreaPixels = cropData.croppedAreaPixels;
            if (_this.props.onCropComplete) {
                _this.props.onCropComplete(croppedAreaPercentages, croppedAreaPixels);
            }
            if (_this.props.onCropAreaChange) {
                _this.props.onCropAreaChange(croppedAreaPercentages, croppedAreaPixels);
            }
        };
        _this.emitCropAreaChange = function() {
            var cropData = _this.getCropData();
            if (!cropData) return;
            var croppedAreaPercentages = cropData.croppedAreaPercentages, croppedAreaPixels = cropData.croppedAreaPixels;
            if (_this.props.onCropAreaChange) {
                _this.props.onCropAreaChange(croppedAreaPercentages, croppedAreaPixels);
            }
        };
        _this.recomputeCropPosition = function() {
            var _a, _b;
            if (!_this.state.cropSize) return;
            var adjustedCrop = _this.props.crop;
            // Only scale if we're initialized and this is a legitimate resize
            if (_this.isInitialized && ((_a = _this.previousCropSize) === null || _a === void 0 ? void 0 : _a.width) && ((_b = _this.previousCropSize) === null || _b === void 0 ? void 0 : _b.height)) {
                var sizeChanged = Math.abs(_this.previousCropSize.width - _this.state.cropSize.width) > 1e-6 || Math.abs(_this.previousCropSize.height - _this.state.cropSize.height) > 1e-6;
                if (sizeChanged) {
                    var scaleX = _this.state.cropSize.width / _this.previousCropSize.width;
                    var scaleY = _this.state.cropSize.height / _this.previousCropSize.height;
                    adjustedCrop = {
                        x: _this.props.crop.x * scaleX,
                        y: _this.props.crop.y * scaleY
                    };
                }
            }
            var newPosition = _this.props.restrictPosition ? restrictPosition(adjustedCrop, _this.mediaSize, _this.state.cropSize, _this.props.zoom, _this.props.rotation) : adjustedCrop;
            _this.previousCropSize = _this.state.cropSize;
            _this.props.onCropChange(newPosition);
            _this.emitCropData();
        };
        _this.onKeyDown = function(event) {
            var _a, _b;
            var _c = _this.props, crop = _c.crop, onCropChange = _c.onCropChange, keyboardStep = _c.keyboardStep, zoom = _c.zoom, rotation = _c.rotation;
            var step = keyboardStep;
            if (!_this.state.cropSize) return;
            // if the shift key is pressed, reduce the step to allow finer control
            if (event.shiftKey) {
                step *= 0.2;
            }
            var newCrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__assign"])({}, crop);
            switch(event.key){
                case 'ArrowUp':
                    newCrop.y -= step;
                    event.preventDefault();
                    break;
                case 'ArrowDown':
                    newCrop.y += step;
                    event.preventDefault();
                    break;
                case 'ArrowLeft':
                    newCrop.x -= step;
                    event.preventDefault();
                    break;
                case 'ArrowRight':
                    newCrop.x += step;
                    event.preventDefault();
                    break;
                default:
                    return;
            }
            if (_this.props.restrictPosition) {
                newCrop = restrictPosition(newCrop, _this.mediaSize, _this.state.cropSize, zoom, rotation);
            }
            if (!event.repeat) {
                (_b = (_a = _this.props).onInteractionStart) === null || _b === void 0 ? void 0 : _b.call(_a);
            }
            onCropChange(newCrop);
        };
        _this.onKeyUp = function(event) {
            var _a, _b;
            switch(event.key){
                case 'ArrowUp':
                case 'ArrowDown':
                case 'ArrowLeft':
                case 'ArrowRight':
                    event.preventDefault();
                    break;
                default:
                    return;
            }
            _this.emitCropData();
            (_b = (_a = _this.props).onInteractionEnd) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        return _this;
    }
    Cropper.prototype.componentDidMount = function() {
        if (!this.currentDoc || !this.currentWindow) return;
        if (this.containerRef) {
            if (this.containerRef.ownerDocument) {
                this.currentDoc = this.containerRef.ownerDocument;
            }
            if (this.currentDoc.defaultView) {
                this.currentWindow = this.currentDoc.defaultView;
            }
            this.initResizeObserver();
            // only add window resize listener if ResizeObserver is not supported. Otherwise, it would be redundant
            if (typeof window.ResizeObserver === 'undefined') {
                this.currentWindow.addEventListener('resize', this.computeSizes);
            }
            this.props.zoomWithScroll && this.containerRef.addEventListener('wheel', this.onWheel, {
                passive: false
            });
            this.containerRef.addEventListener('gesturestart', this.onGestureStart);
        }
        this.currentDoc.addEventListener('scroll', this.onScroll);
        if (!this.props.disableAutomaticStylesInjection) {
            this.styleRef = this.currentDoc.createElement('style');
            this.styleRef.setAttribute('type', 'text/css');
            if (this.props.nonce) {
                this.styleRef.setAttribute('nonce', this.props.nonce);
            }
            this.styleRef.innerHTML = css_248z;
            this.currentDoc.head.appendChild(this.styleRef);
        }
        // when rendered via SSR, the image can already be loaded and its onLoad callback will never be called
        if (this.imageRef.current && this.imageRef.current.complete) {
            this.onMediaLoad();
        }
        // set image and video refs in the parent if the callbacks exist
        if (this.props.setImageRef) {
            this.props.setImageRef(this.imageRef);
        }
        if (this.props.setVideoRef) {
            this.props.setVideoRef(this.videoRef);
        }
        if (this.props.setCropperRef) {
            this.props.setCropperRef(this.cropperRef);
        }
    };
    Cropper.prototype.componentWillUnmount = function() {
        var _a, _b;
        if (!this.currentDoc || !this.currentWindow) return;
        if (typeof window.ResizeObserver === 'undefined') {
            this.currentWindow.removeEventListener('resize', this.computeSizes);
        }
        (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        if (this.containerRef) {
            this.containerRef.removeEventListener('gesturestart', this.preventZoomSafari);
        }
        if (this.styleRef) {
            (_b = this.styleRef.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(this.styleRef);
        }
        this.cleanEvents();
        this.props.zoomWithScroll && this.clearScrollEvent();
    };
    Cropper.prototype.componentDidUpdate = function(prevProps) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (prevProps.rotation !== this.props.rotation) {
            this.computeSizes();
            this.recomputeCropPosition();
        } else if (prevProps.aspect !== this.props.aspect) {
            this.computeSizes();
        } else if (prevProps.objectFit !== this.props.objectFit) {
            this.computeSizes();
        } else if (prevProps.zoom !== this.props.zoom) {
            this.recomputeCropPosition();
        } else if (((_a = prevProps.cropSize) === null || _a === void 0 ? void 0 : _a.height) !== ((_b = this.props.cropSize) === null || _b === void 0 ? void 0 : _b.height) || ((_c = prevProps.cropSize) === null || _c === void 0 ? void 0 : _c.width) !== ((_d = this.props.cropSize) === null || _d === void 0 ? void 0 : _d.width)) {
            this.computeSizes();
        } else if (((_e = prevProps.crop) === null || _e === void 0 ? void 0 : _e.x) !== ((_f = this.props.crop) === null || _f === void 0 ? void 0 : _f.x) || ((_g = prevProps.crop) === null || _g === void 0 ? void 0 : _g.y) !== ((_h = this.props.crop) === null || _h === void 0 ? void 0 : _h.y)) {
            this.emitCropAreaChange();
        }
        if (prevProps.zoomWithScroll !== this.props.zoomWithScroll && this.containerRef) {
            this.props.zoomWithScroll ? this.containerRef.addEventListener('wheel', this.onWheel, {
                passive: false
            }) : this.clearScrollEvent();
        }
        if (prevProps.video !== this.props.video) {
            (_j = this.videoRef.current) === null || _j === void 0 ? void 0 : _j.load();
        }
        var objectFit = this.getObjectFit();
        if (objectFit !== this.state.mediaObjectFit) {
            this.setState({
                mediaObjectFit: objectFit
            }, this.computeSizes);
        }
    };
    Cropper.prototype.getAspect = function() {
        var _a = this.props, cropSize = _a.cropSize, aspect = _a.aspect;
        if (cropSize) {
            return cropSize.width / cropSize.height;
        }
        return aspect;
    };
    Cropper.prototype.getObjectFit = function() {
        var _a, _b, _c, _d;
        if (this.props.objectFit === 'cover') {
            var mediaRef = this.imageRef.current || this.videoRef.current;
            if (mediaRef && this.containerRef) {
                this.containerRect = this.containerRef.getBoundingClientRect();
                var containerAspect = this.containerRect.width / this.containerRect.height;
                var naturalWidth = ((_a = this.imageRef.current) === null || _a === void 0 ? void 0 : _a.naturalWidth) || ((_b = this.videoRef.current) === null || _b === void 0 ? void 0 : _b.videoWidth) || 0;
                var naturalHeight = ((_c = this.imageRef.current) === null || _c === void 0 ? void 0 : _c.naturalHeight) || ((_d = this.videoRef.current) === null || _d === void 0 ? void 0 : _d.videoHeight) || 0;
                var mediaAspect = naturalWidth / naturalHeight;
                return mediaAspect < containerAspect ? 'horizontal-cover' : 'vertical-cover';
            }
            return 'horizontal-cover';
        }
        return this.props.objectFit;
    };
    Cropper.prototype.onPinchStart = function(e) {
        var pointA = Cropper.getTouchPoint(e.touches[0]);
        var pointB = Cropper.getTouchPoint(e.touches[1]);
        this.lastPinchDistance = getDistanceBetweenPoints(pointA, pointB);
        this.lastPinchRotation = getRotationBetweenPoints(pointA, pointB);
        this.onDragStart(getCenter(pointA, pointB));
    };
    Cropper.prototype.onPinchMove = function(e) {
        var _this = this;
        if (!this.currentDoc || !this.currentWindow) return;
        var pointA = Cropper.getTouchPoint(e.touches[0]);
        var pointB = Cropper.getTouchPoint(e.touches[1]);
        var center = getCenter(pointA, pointB);
        this.onDrag(center);
        if (this.rafPinchTimeout) this.currentWindow.cancelAnimationFrame(this.rafPinchTimeout);
        this.rafPinchTimeout = this.currentWindow.requestAnimationFrame(function() {
            var distance = getDistanceBetweenPoints(pointA, pointB);
            var newZoom = _this.props.zoom * (distance / _this.lastPinchDistance);
            _this.setNewZoom(newZoom, center, {
                shouldUpdatePosition: false
            });
            _this.lastPinchDistance = distance;
            var rotation = getRotationBetweenPoints(pointA, pointB);
            var newRotation = _this.props.rotation + (rotation - _this.lastPinchRotation);
            _this.props.onRotationChange && _this.props.onRotationChange(newRotation);
            _this.lastPinchRotation = rotation;
        });
    };
    Cropper.prototype.render = function() {
        var _this = this;
        var _a;
        var _b = this.props, image = _b.image, video = _b.video, mediaProps = _b.mediaProps, cropperProps = _b.cropperProps, transform = _b.transform, _c = _b.crop, x = _c.x, y = _c.y, rotation = _b.rotation, zoom = _b.zoom, cropShape = _b.cropShape, showGrid = _b.showGrid, roundCropAreaPixels = _b.roundCropAreaPixels, _d = _b.style, containerStyle = _d.containerStyle, cropAreaStyle = _d.cropAreaStyle, mediaStyle = _d.mediaStyle, _e = _b.classes, containerClassName = _e.containerClassName, cropAreaClassName = _e.cropAreaClassName, mediaClassName = _e.mediaClassName;
        var objectFit = (_a = this.state.mediaObjectFit) !== null && _a !== void 0 ? _a : this.getObjectFit();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("div", {
            onMouseDown: this.onMouseDown,
            onTouchStart: this.onTouchStart,
            ref: function ref(el) {
                return _this.containerRef = el;
            },
            "data-testid": "container",
            style: containerStyle,
            className: classNames('reactEasyCrop_Container', containerClassName)
        }, image ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("img", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__assign"])({
            alt: "",
            className: classNames('reactEasyCrop_Image', objectFit === 'contain' && 'reactEasyCrop_Contain', objectFit === 'horizontal-cover' && 'reactEasyCrop_Cover_Horizontal', objectFit === 'vertical-cover' && 'reactEasyCrop_Cover_Vertical', mediaClassName)
        }, mediaProps, {
            src: image,
            ref: this.imageRef,
            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__assign"])({}, mediaStyle), {
                transform: transform || "translate(".concat(x, "px, ").concat(y, "px) rotate(").concat(rotation, "deg) scale(").concat(zoom, ")")
            }),
            onLoad: this.onMediaLoad
        })) : video && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("video", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__assign"])({
            autoPlay: true,
            playsInline: true,
            loop: true,
            muted: true,
            className: classNames('reactEasyCrop_Video', objectFit === 'contain' && 'reactEasyCrop_Contain', objectFit === 'horizontal-cover' && 'reactEasyCrop_Cover_Horizontal', objectFit === 'vertical-cover' && 'reactEasyCrop_Cover_Vertical', mediaClassName)
        }, mediaProps, {
            ref: this.videoRef,
            onLoadedMetadata: this.onMediaLoad,
            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__assign"])({}, mediaStyle), {
                transform: transform || "translate(".concat(x, "px, ").concat(y, "px) rotate(").concat(rotation, "deg) scale(").concat(zoom, ")")
            }),
            controls: false
        }), (Array.isArray(video) ? video : [
            {
                src: video
            }
        ]).map(function(item) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("source", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__assign"])({
                key: item.src
            }, item));
        })), this.state.cropSize && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("div", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__assign"])({
            ref: this.cropperRef,
            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__assign"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__assign"])({}, cropAreaStyle), {
                width: roundCropAreaPixels ? Math.round(this.state.cropSize.width) : this.state.cropSize.width,
                height: roundCropAreaPixels ? Math.round(this.state.cropSize.height) : this.state.cropSize.height
            }),
            tabIndex: 0,
            onKeyDown: this.onKeyDown,
            onKeyUp: this.onKeyUp,
            "data-testid": "cropper",
            className: classNames('reactEasyCrop_CropArea', cropShape === 'round' && 'reactEasyCrop_CropAreaRound', showGrid && 'reactEasyCrop_CropAreaGrid', cropAreaClassName)
        }, cropperProps)));
    };
    Cropper.defaultProps = {
        zoom: 1,
        rotation: 0,
        aspect: 4 / 3,
        maxZoom: MAX_ZOOM,
        minZoom: MIN_ZOOM,
        cropShape: 'rect',
        objectFit: 'contain',
        showGrid: true,
        style: {},
        classes: {},
        mediaProps: {},
        cropperProps: {},
        zoomSpeed: 1,
        restrictPosition: true,
        zoomWithScroll: true,
        keyboardStep: KEYBOARD_STEP
    };
    Cropper.getMousePoint = function(e) {
        return {
            x: Number(e.clientX),
            y: Number(e.clientY)
        };
    };
    Cropper.getTouchPoint = function(touch) {
        return {
            x: Number(touch.clientX),
            y: Number(touch.clientY)
        };
    };
    return Cropper;
}(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"]);
;
 //# sourceMappingURL=index.module.mjs.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Upload
]);
/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 3v12",
            key: "1x0j5s"
        }
    ],
    [
        "path",
        {
            d: "m17 8-5-5-5 5",
            key: "7q97r8"
        }
    ],
    [
        "path",
        {
            d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
            key: "ih7n3h"
        }
    ]
];
const Upload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("upload", __iconNode);
;
 //# sourceMappingURL=upload.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript) <export default as Upload>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Upload",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/rotate-cw.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>RotateCw
]);
/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",
            key: "1p45f6"
        }
    ],
    [
        "path",
        {
            d: "M21 3v5h-5",
            key: "1q7to0"
        }
    ]
];
const RotateCw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("rotate-cw", __iconNode);
;
 //# sourceMappingURL=rotate-cw.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/rotate-cw.js [app-ssr] (ecmascript) <export default as RotateCw>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RotateCw",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-cw.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/zoom-in.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ZoomIn
]);
/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "11",
            cy: "11",
            r: "8",
            key: "4ej97u"
        }
    ],
    [
        "line",
        {
            x1: "21",
            x2: "16.65",
            y1: "21",
            y2: "16.65",
            key: "13gj7c"
        }
    ],
    [
        "line",
        {
            x1: "11",
            x2: "11",
            y1: "8",
            y2: "14",
            key: "1vmskp"
        }
    ],
    [
        "line",
        {
            x1: "8",
            x2: "14",
            y1: "11",
            y2: "11",
            key: "durymu"
        }
    ]
];
const ZoomIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("zoom-in", __iconNode);
;
 //# sourceMappingURL=zoom-in.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/zoom-in.js [app-ssr] (ecmascript) <export default as ZoomIn>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ZoomIn",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-in.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ArrowRight
]);
/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M5 12h14",
            key: "1ays0h"
        }
    ],
    [
        "path",
        {
            d: "m12 5 7 7-7 7",
            key: "xquz4c"
        }
    ]
];
const ArrowRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("arrow-right", __iconNode);
;
 //# sourceMappingURL=arrow-right.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>TriangleAlert
]);
/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
            key: "wmoenq"
        }
    ],
    [
        "path",
        {
            d: "M12 9v4",
            key: "juzpu7"
        }
    ],
    [
        "path",
        {
            d: "M12 17h.01",
            key: "p32p05"
        }
    ]
];
const TriangleAlert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("triangle-alert", __iconNode);
;
 //# sourceMappingURL=triangle-alert.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertTriangle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Sparkles
]);
/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
            key: "1s2grr"
        }
    ],
    [
        "path",
        {
            d: "M20 2v4",
            key: "1rf3ol"
        }
    ],
    [
        "path",
        {
            d: "M22 4h-4",
            key: "gwowj6"
        }
    ],
    [
        "circle",
        {
            cx: "4",
            cy: "20",
            r: "2",
            key: "6kqj1y"
        }
    ]
];
const Sparkles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("sparkles", __iconNode);
;
 //# sourceMappingURL=sparkles.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sparkles",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=_486ac769._.js.map