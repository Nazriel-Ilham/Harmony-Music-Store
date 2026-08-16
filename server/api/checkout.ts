import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // 1. Ambil userId dari body
  const {
    userId,
    shippingName,
    shippingPhone,
    shippingAddress,
    totalPrice,
    items,
  } = body;

  // Pastikan userId ada
  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "User ID tidak ditemukan. Harap login terlebih dahulu.",
    });
  }

  // Initialise Supabase Client (Gunakan Service Role Key atau Client biasa)
  const config = useRuntimeConfig();
  const supabase = createClient(
    config.public.supabase.url,
    config.supabaseServiceKey || config.public.supabase.key,
  );

  // 2. Insert ke tabel orders DENGAN user_id
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: userId, // <-- PERBAIKAN UTAMA: Pastikan user_id diisi dari payload
      shipping_name: shippingName,
      shipping_phone: shippingPhone,
      shipping_address: shippingAddress,
      total_price: totalPrice,
      status: "Pending",
    })
    .select()
    .single();

  if (orderError) {
    throw createError({
      statusCode: 500,
      statusMessage: orderError.message,
    });
  }

  // 3. Insert ke tabel order_items
  if (items && items.length > 0) {
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Gagal simpan order_items:", itemsError.message);
    }
  }

  return { success: true, orderId: order.id };
});
