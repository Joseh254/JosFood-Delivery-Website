import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export async function createuser(request, response) {
  try {
    const { firstName, lastName, email, password, role } = request.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await prisma.users.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      },
    });

    response
      .status(201)
      .json({ success: true, message: "Sign up was successful" });
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: "An error occurred in the server" });
  }
}

export async function loginUser(request, response) {
  const { email, password, firstName } = request.body;
  try {
    const user = await prisma.users.findFirst({
      where: { email: email, firstName: firstName },
    });

    if (user) {
      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (passwordMatch) {
        const payload = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "100h",
        });

        response
          .cookie("access_token", token)
          .json({ success: true, message: "You are loged in", data: payload });
      } else {
        return response
          .status(401)
          .json({ success: false, message: "Wrong email or password" });
      }
    } else {
      return response
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error.message);
    return response
      .status(500)
      .json({ success: false, message: "User not Found" });
  }
}

export async function getAllUsers(request, response) {
  try {
    const users = await prisma.users.findMany();

    if (users) {
      return response.status(200).json({ success: true, data: users });
    } else {
      return response
        .status(400)
        .json({ success: false, message: "Users not found" });
    }
  } catch (error) {
    console.log(error.message);
    return response
      .status(400)
      .json({ success: false, message: "An error occurred" });
  }
}

export async function deleteUser(request, response) {
  const { id } = request.params;
  try {
    await prisma.users.delete({
      where: { id: id },
    });
    return response
      .status(200)
      .json({ success: true, message: "user deleted" });
  } catch (error) {
    console.log(error.message);
    return response
      .status(404)
      .json({ success: false, message: "user not found" });
  }
}

export async function getSingleuser(request, response) {
  const { id } = request.params;
  try {
    const user = await prisma.users.findFirst({
      where: { id: id },
    });
    if (user) {
      response.status(200).json({ success: true, data: user });
    }
    return response
      .status(404)
      .json({ success: false, message: "user not found" });
  } catch (error) {
    console.log(error.message);
    return response
      .status(404)
      .json({ success: false, message: "user not found" });
  }
}


export async function ToggleAdmin(request,response){
 const {role}=request.body;
 try {
  const { id } = request.params;
  let toggleuser;
  if (role) {
    toggleuser = await prisma.users.update({
      where: { id: id },
      data: { role: role },
    });

  }
return response.status(200).json({success:true,message:"Toggle succesful"})
 } catch (error) {
  console.log(error.message);
  return response.status(400).json({success:false, message:"failed to update user"})
 }
}