import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function createCart(request, response) {
  response.send("creating cart");
}

export function removeCart(request, response) {
  response.send("removing cart");
}
