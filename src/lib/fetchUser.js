import { cookies } from "next/headers.js";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma.js";

export async function fetchUser() {
  try {
    const cookieStore = cookies();
    const userCookie = cookieStore.get("token");

    if (!userCookie) {
      return {};
    }
    const { userId } = jwt.verify(userCookie.value, process.env.JWT_SECRET);

    const user = await prisma.user.findFirst({ where: { id: userId } });
    delete user.password;
    return user;
  } catch (error) {
    console.log(error);
    return {};
  }
}
