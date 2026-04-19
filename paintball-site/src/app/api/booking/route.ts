import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .insert([{
      name:          body.name,
      phone:         body.phone,
      email:         body.email,
      package_id:    body.package_id,
      package_name:  body.package_name,
      package_price: body.package_price,
      date:          body.date,
      time:          body.time,
      group_size:    body.group_size,
      total_price:   body.total_price,
      notes:         body.notes || null,
      status:        "pending",
    }])
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ booking: data });
}
