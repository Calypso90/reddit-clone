import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request, response) {
  try {
    const cookieStore = cookies();
    const { username, password } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const userExist = await prisma.user.findFirst({ where: { username } });

    if (userExist) {
      return NextResponse.json({
        success: false,
        error: "User already exists. Please login.",
      });
    } else if (!username) {
      return NextResponse.json({
        success: false,
        error: "Please provide a username.",
      });
    } else if (!password) {
      return NextResponse.json({
        success: false,
        error: "Please provide a password.",
      });
    }
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    delete user.password;

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    cookieStore.set("token", token);

    return NextResponse.json({ success: true, user, token });
  } catch (error) {}
  return NextResponse.json({ success: false, error: error.message });
}
