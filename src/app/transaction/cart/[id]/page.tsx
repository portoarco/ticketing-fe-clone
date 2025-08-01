// import { IParams } from "@/app/types/types";
import CartCard from "@/components/CartCard";
import { apiCall } from "@/helper/apiCall";

async function getCartData(params: string): Promise<any | null> {
  try {
    const res = await apiCall.get(`/transaction/cart/${params}`);

    console.log(res.data);

    if (res) {
      return res.data.data;
    }

    return null;
  } catch (error) {
    console.log(error);
  }
}

// export default async function CartPage({ params }: IParams) {
//   const transactionId = params.id;

//   const transactionData = await getCartData(transactionId);

//   return (
//     <>
//       <div className="flex items-center justify-center h-[100vh]">
//         <CartCard />
//       </div>
//     </>
//   );
// }
