import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function validate(request, response, next) {
  const { firstName, lastName, email, password } = request.body;

  if (!firstName) {
    return response
      .status(400)
      .json({ success: false, message: "first name is required" });
  }

  if (!lastName) {
    return response
      .status(400)
      .json({ success: false, message: "last name is required" });
  }

  if (!email) {
    return response
      .status(400)
      .json({ success: false, message: "email is required" });
  }

  if (!password) {
    return response
      .status(400)
      .json({ success: false, message: "password is required" });
  }
  const userWithEmail = await prisma.jostech_users.findFirst({
    where: { email: email },
  });
  if (userWithEmail)
    return response
      .status(400)
      .json({ success: false, message: "Email already taken" });
  next();
}
