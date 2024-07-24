import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createCart(request, response) {
  const {userid,productid}= request.body
 try {
  
  const ExistingcartProduct = await prisma.cart.findFirst({
where:{userid,productid}
  })
  if (ExistingcartProduct){
    return response.status(400).json({success:false, message:"Product already in cart"})
  }
  const cartProduct = await prisma.cart.create({
    data:{
      userid,
      productid,
    }
  });
  response.status(201).json({success:true, data: cartProduct})
 } catch (error) {
  console.log(error.message);
  return response.status(400).json({success:false,message:"An error occured when adding item to cart"})
 }
}




export async function getCart(req, res) {
  const { id } = req.params; 

  try {
  
    const cartItems = await prisma.cart.findMany({
      where: { userid: id },
      include: { product: true }
    });

    
    res.status(200).json({ success: true, cartProduct: cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error.message);
    res.status(500).json({ success: false, message: "An error occurred while fetching the cart" });
  }
}





export async function removeCart(request, response) {
  const { id } = request.params;

  try {
    await prisma.cart.delete({
      where:{id: id}
    })
    response.status(204).json({success:true, message:"product removed from cart"})
  } catch (error) {
    console.log(error.message);
    return response.status(404).json({success:false, message:" cart Product not found"})
  }
}

