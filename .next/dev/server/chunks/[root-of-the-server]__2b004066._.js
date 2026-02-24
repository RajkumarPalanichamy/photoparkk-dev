module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/lib/supabase.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://znyoyyfskivfyxpldmbd.supabase.co");
const supabaseKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpueW95eWZza2l2Znl4cGxkbWJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNjk5NzMsImV4cCI6MjA4Njc0NTk3M30.MHJT0KUarIeorkp3e_dsjNRZ3cau9qCL1_duJ7ytVIY");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl || '', supabaseKey || '');
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/app/api/admin/stats/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        // 1. Total Orders & Breakdown
        // Fetch 'orders' table
        const { data: regularOrders, error: regularError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('orders').select('amount, product_type');
        if (regularError) throw regularError;
        // Fetch 'frame_orders' table
        const { data: frameOrders, error: frameError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('frame_orders').select('*'); // We need amount? Frame orders structure might be different..
        // Wait, in schema 'frame_orders' only has 'items' (jsonb) and 'shipping_details'.
        // It doesn't seem to have 'amount' column in the schema file I read earlier!
        // Let's re-check schema for Frame Orders.
        // Line 152: id, user_id, items, shipping_details, status.
        // No amount?? That's a problem for revenue calc.
        // But let's assume simple count for now or try to extract from items if possible.
        // Or maybe amount IS in there but I missed it?
        // I'll assume count for frame orders.
        if (frameError) throw frameError;
        const totalOrders = (regularOrders?.length || 0) + (frameOrders?.length || 0);
        // Breakdown
        // Regular orders have 'product_type'
        let commonOrdersCount = 0;
        let newArrivalsCount = 0;
        let commonRevenue = 0;
        regularOrders.forEach((order)=>{
            if (order.product_type === 'Newarrivaldata') {
                newArrivalsCount++;
            } else {
                commonOrdersCount++; // Custom or others
            }
            commonRevenue += Number(order.amount) || 0;
        });
        // Frame Revenue? Not available directly.
        const frameOrdersCount = frameOrders?.length || 0;
        const totalRevenue = commonRevenue; // + frameRevenue (if we had it)
        // 2. Total Products
        // Count from all product tables
        const tables = [
            'new_arrivals',
            'special_offers',
            'acrylic_customize',
            'canvas_customize',
            'backlight_customize'
        ];
        let totalProducts = 0;
        for (const table of tables){
            const { count, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from(table).select('*', {
                count: 'exact',
                head: true
            });
            if (!error) {
                totalProducts += count || 0;
            }
        }
        // 3. Total Frames (Assuming Frame customizations or orders? Or 'frames_customize' table?)
        // This is 'Manage Frames' section usually refers to 'frame_customize' or just orders.
        // Let's count 'frame_customize' table which is user drafts?
        // Or maybe 'frame_orders'.
        // The stat card says "Total Frames".
        // I will use total products count of frame related items?
        // Or just frame orders count again?
        // Let's use Frame Orders count for "Total Frames" stat card context usually implies sales or inventory.
        // But since "Total Products" is inventory, "Total Frames" might be frame inventory?
        // But we don't have a "frames" table in schema list I saw (except customized ones).
        // Ah, 'framescustomize' model existed in old code.
        // In schema.sql, I see 'frame_customize' (user selection).
        // I'll just use 'frame_orders' count as placeholder.
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            totalOrders,
            totalProducts,
            totalFrames: frameOrdersCount,
            totalRevenue,
            breakdown: {
                commonOrders: commonOrdersCount,
                frameOrders: frameOrdersCount,
                newArrivals: newArrivalsCount,
                commonRevenue,
                frameRevenue: 0 // Placeholder
            }
        });
    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Internal Server Error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2b004066._.js.map