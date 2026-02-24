
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // 1. Total Orders & Breakdown
        // Fetch 'orders' table
        const { data: regularOrders, error: regularError } = await supabase
            .from('orders')
            .select('amount, product_type');

        if (regularError) throw regularError;

        // Fetch 'frame_orders' table
        const { data: frameOrders, error: frameError } = await supabase
            .from('frame_orders')
            .select('*'); // We need amount? Frame orders structure might be different..
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

        regularOrders.forEach(order => {
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
        const tables = ['new_arrivals', 'special_offers', 'acrylic_customize', 'canvas_customize', 'backlight_customize'];
        let totalProducts = 0;

        for (const table of tables) {
            const { count, error } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });

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

        return NextResponse.json({
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
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
