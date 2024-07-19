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

        response.status(201).json({success:true,message:"product was created succesfuly"})
    } catch (error) {
       console.log(error.message); 
       return response.status(500).json({success:false, message:"an error occured in the server"})
    }
}

export async function GetAllProducts(request,response){
   try {
    const product = await prisma.products.findMany()
    response.status(200).json({success:true, data: product})
   } catch (error) {
    console.log(error.message);
    return response.status(500).json({success:false, message:"No products"})
   }
}

export async function GetOneProduct(request, response) {
    try {
      const {id} = request.params;
      const product = await prisma.products.findFirst({
        where: { productName: id } 
      });
  
      if (product) {
        return response.status(200).json({ success: true, data: product });
      } else {
        return response.status(404).json({ success: false, message: "Product not found" });
      }
    } catch (error) {
      console.log(error.message);
      return response.status(500).json({ success: false, message: "An error occurred while fetching the product" });
    }
  }
  

export async function UpdateProduct(request,response){
  const {productName, productPrice,productDescription,productImage}=request.body;
  try {
    const {id} = request.params;

    let updateProduct;
    if(productName){
      updateProduct = await prisma.products.update({
        where:{id:id},
        data:{productName:productName}
      })


      
      if(productPrice){
        updateProduct = await prisma.products.update({
          where:{id:id},
          data:{
            productPrice:productPrice
          }
        })


      if(productDescription){
        updateProduct= await prisma.products.update({
          where:{id:id},
          data:{productDescription:productDescription}
        })

        if(productImage){
          updateProduct = await prisma.products.update({
            where:{id:id},
            data:{
              productImage:productImage
            }
          })
        }

        }
      }
      response.status(200).json({success:true,message:"product updated"})
    }
  } catch (error) {
    console.log(error.message);
    return response.status(404).json({success:false, message:"product not found"})
    
  }

}


export async function deleteProduct(request,response){
    try {
        const {id} = request.params
    await prisma.products.delete({
        where:{id:id}
    })
    response.status(200).json({success:true, message:"product deleted succesfully"})
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({success:false, message:"Product was not found"})
    }
}