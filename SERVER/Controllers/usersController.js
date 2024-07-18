import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export async function createuser(request, response) {
  try {
    const { firstName, lastName, email, password } = request.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await prisma.users.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    response
      .status(201)
      .json({ success: true, message: "Sign up was successful" });
  } catch (error) {
    response
      .status(500)
      .json({ success: false, message: "An error occurred in the server" });
  }
}

export async function loginUser(request, response) {
  const { email, password, firstName } = request.body;
  try {
    const user = await prisma.users.findFirst({
      where: { email:email, firstName: firstName },
    });

    if (user) {
      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (passwordMatch) {
        const payload = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "100h",
        });

        response.cookie("access_token", token);

        response
          .status(200)
          .json({ success: true, message: "Logged in successfully" });
      } else {
        response
          .status(401)
          .json({ success: false, message: "Wrong email or password" });
      }
    } else {
      response.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    response.status(500).json({ success: false, message: error.message });
  }
}

export async function getAllUsers(request, response) {
    try {
      const users = await prisma.users.findMany();
  
      if (users) {
        return response.status(200).json({ success: true, data: users });
      } else {
        return response.status(400).json({ success: false, message: "Users not found" });
      }
    } catch (error) {
      console.log(error.message);
      return response.status(400).json({ success: false, message: "An error occurred" });
    }
  }

  export async function deleteUser(request,response){
    const {id} = request.params
    try {
        await prisma.users.delete({
            where:{id:id}
        })
        return response.status(200).json({success:true,message:"user deleted"})
    } catch (error) {
        console.log(error.message);
        response.status(404).json({success:false,message:"user not found"})
        
    }
  }
  
