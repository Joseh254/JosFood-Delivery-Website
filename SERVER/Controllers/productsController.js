import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createProduct(request,response){
    try {
        const {productName, productPrice,productDescription,productImage}=request.body;
        const product = await prisma.products.create({
            data:{
                productName,
                productPrice,
                productDescription,
                productDescription,
                productImage
            }
        })

        response.status(201).json({success:true,message:"product eas created succesfuly"})
    } catch (error) {
       console.log(error.message); 
       return response.status(500).json({success:false, message:"an error occured in the server"})
    }
}

export async function GetAllProducts(request,response){
    response.send("getting all  products")
}

export async function GetOneProduct(request,response){
    response.send("getting one product")
}

export async function UpdateProduct(request,response){
    response.send("updating a product")
}

export async function deleteProduct(request,response){
    response.send("deleting a product")
}