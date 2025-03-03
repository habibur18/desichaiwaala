import { AdminModel } from "@/models/admin-model";
import { NextResponse } from "next/server";
import connectMongo from "../../../../../db/connectMongo";

export async function POST(request) {
  try {
    await connectMongo();

    const { username, password } = await request.json();

    // Check if username already exists
    const existingAdmin = await AdminModel.findOne({ username });
    if (existingAdmin) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 });
    }

    // Create new admin
    const newAdmin = new AdminModel({ username, password });
    await newAdmin.save();

    return NextResponse.json({ message: "Admin created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Admin creation error:", error);
    return NextResponse.json({ error: "An error occurred during admin creation" }, { status: 500 });
  }
}
