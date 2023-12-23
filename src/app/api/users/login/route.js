import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request, response) {
  try {
    const cookieStore = cookies();
    const { username, password } = await request.json();

    const user = await prisma.user.findFirst({ where: { username } });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User not found. Please register.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json({
        success: false,
        error: "Username and/or password was incorrect. Please try again.",
      });
    }
    delete user.password;

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    cookieStore.set("token", token);

    return NextResponse.json({ success: true, user, token });
  } catch (error) {}
  return NextResponse.json({ success: false, error: error.message });
}
