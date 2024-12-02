'use client';
import { useEffect, useReducer, useState } from 'react';
import Script from 'next/script';
import requests from '@/lib/requests';
import { useSearchParams } from 'next/navigation';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

function Payment() {
  const query = useSearchParams();
  const oid = query.get("oid");
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [amount, setAmount] = useState(Buffer.from(query.get("amount") || "", "base64").toString());
 const [currency, setCurrency] = useState('INR');
 const [address, setAddress] = useState("");
 const [city, setCity] = useState("");
 const [pincode, setPincode] = useState<number>(0);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null | Error>(null);;
 const [razorpayOrderId, setRazorpayOrderId] = useState<string | null>(Buffer.from(useSearchParams().get("_roid") || "", "base64").toString());

//  const createOrderId = async () => {
//   try {
//    const response = await requests.post('', {
//     method: 'POST',
//     headers: {
//      'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//      amount: parseFloat(amount) * 100,
//     }),
//    });

//    if (!response.ok) {
//     throw new Error('Network response was not ok');
//    }

//    const data = await response.json();
//    return data.orderId;
//   } catch (error) {
//    console.error('There was a problem with your fetch operation:', error);
//   }
//  };
const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
  //  const orderId: string = await createOrderId();
  if(!razorpayOrderId || !amount || !oid) throw Error("Unable to get a valid razorpay order id");
   const options = {
    key: process.env.key_id,
    amount: parseFloat(amount) * 100,
    currency: currency,
    name: 'Food Order',
    description: 'Food order for vaikuth restro',
    order_id: razorpayOrderId,
    handler: async function (response: any) {
     const data = {
      orderId: oid,
      paymentId: response.razorpay_payment_id,
      razorpayOrderId: response.razorpay_order_id,
      signature: response.razorpay_signature,
      deliveryDetails: {
        name,
        email,
        addressLine1: address,
        city,
        pincode
      }
     };

     const result = await requests.post<{message: string, result: any}>('/orders/razorpay-callback', data);
     if (result) alert(result.message);
    },
    prefill: {
     name: name,
     email: email,
    },
    theme: {
     color: '#3399cc',
    },
   };
   const paymentObject = new (window as any).Razorpay(options); // ts compiler does not know about razorpay atm
   paymentObject.on('payment.failed', function (response: any) {
    alert(response.error.description);
   });
   paymentObject.open();
  } catch (error) {
   console.log(error);
  }
 };

 
 return (
  <>
   <Script
    id="razorpay-checkout-js"
    src="https://checkout.razorpay.com/v1/checkout.js"
   />

   <section className="min-h-[94vh] flex flex-col gap-6 h-14 mx-5 sm:mx-10 2xl:mx-auto 2xl:w-[1400px] items-center pt-36 ">
    <form
     className="flex flex-col gap-6 w-full sm:w-80"
     onSubmit={processPayment}
    >
     <div className="space-y-1">
     <TextInput label='Name' value={name} defaultValue={name} onChange={(e) => setName(e.target.value)}/>
     </div>
     <div className="space-y-1">
     <TextInput label='Email' value={email} defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
     </div>

     <div className="space-y-1">
      <TextInput label='Address' value={address} defaultValue={address} onChange={(e) => setAddress(e.target.value)}/>
     </div>

     <div className="space-y-1">
      <TextInput label='city' value={city} defaultValue={city} onChange={(e) => setCity(e.target.value)}/>
     </div>

     <div className="space-y-1">
      <TextInput label='Pincode' value={pincode?.toString()} defaultValue={pincode} onChange={(e) => setPincode(Number(e.target.value))}/>
     </div>

     <Button variant='primary' label="Pay Now" type="submit">Pay</Button>
    </form>
   </section>
  </>
 );
}

export default Payment;