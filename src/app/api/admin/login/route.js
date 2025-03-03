import { AdminModel } from "@/models/admin-model";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import connectMongo from "../../../../../db/connectMongo";

const MAX_AGE = 60 * 60 * 24 * 3; // 3 days

export async function POST(request) {
  try {
    await connectMongo();

    const { username, password } = await request.json();

    const admin = await AdminModel.findOne({ username });

    if (!admin || !(await admin.correctPassword(password, admin.password))) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // Create token
    const token = sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: MAX_AGE });

    // Create the response
    const response = NextResponse.json({ message: "Logged in successfully" }, { status: 200 });

    // Set the cookie using Next.js Response
    response.cookies.set({
      name: "adminToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: MAX_AGE,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 });
  }
}
