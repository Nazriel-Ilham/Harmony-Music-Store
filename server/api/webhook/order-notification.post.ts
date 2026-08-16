import { Resend } from "resend";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = await serverSupabaseClient(event);

  // 1. Simpan data pesanan ke database Supabase
  const { data: newOrder, error: dbError } = await client
    .from("orders")
    .insert({
      user_id: body.userId || body.user_id,
      shipping_name: body.shippingName,
      shipping_phone: body.shippingPhone,
      shipping_address: body.shippingAddress,
      total_price: body.totalPrice,
      payment_method: body.paymentMethod || "QRIS",
    })
    .select()
    .single();

  if (dbError) {
    console.error("❌ Gagal menyimpan ke Supabase:", dbError);
    throw createError({ statusCode: 500, statusMessage: dbError.message });
  }

  // 2. Kirim email notifikasi langsung via Resend
  const resend = new Resend(process.env.RESEND_API_KEY);
  const adminEmail = process.env.ADMIN_EMAIL || "nazrielilhampambudi@gmail.com";

  try {
    const { data, error: emailError } = await resend.emails.send({
      from: "Harmony Music Store <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `🔔 Pesanan Baru Masuk! - ID #${String(newOrder.id).substring(0, 8)}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>Ada Pesanan Baru Masuk! 🛒</h2>
          <p><strong>ID Pesanan:</strong> #${newOrder.id}</p>
          <p><strong>Nama Pembeli:</strong> ${body.shippingName}</p>
          <p><strong>No. WhatsApp:</strong> ${body.shippingPhone}</p>
          <p><strong>Alamat:</strong> ${body.shippingAddress}</p>
          <p><strong>Total Pembayaran:</strong> Rp ${Number(body.totalPrice).toLocaleString("id-ID")}</p>
        </div>
      `,
    });

    if (emailError) {
      console.error("❌ Resend Error:", emailError);
    } else {
      console.log("✅ Email sukses terkirim! ID:", data?.id);
    }
  } catch (err) {
    console.error("❌ Error kirim email:", err);
  }

  return { success: true, order: newOrder };
});
