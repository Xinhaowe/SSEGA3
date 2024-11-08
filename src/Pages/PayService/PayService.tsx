import React, { useState } from 'react'
import { CardElement,useElements,useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'




const PayService = () => {
    const [success,setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        if (!stripe || !elements) {
          // Stripe.js has not loaded yet, return or handle accordingly.
          console.error("Stripe or Elements not loaded.");
          return;
        }
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
        // CardElement is null, which means it's not loaded properly
          console.error("CardElement not found.");
          return;
        }
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card", // Specify the type of payment method
          card: cardElement,
        });
      
      if (!error) {
        try {
          const { id } = paymentMethod;
          const response = await axios.post("http://localhost:4000/payment", {
            amount: 8000,
            id,
          });
      
          if (response.data.success) {
            console.log("Successful payment");
            setSuccess(true);
          }
      
        } catch (error) {
          console.log("Error", error);
        }
      } else {
        console.log(error.message);
      }
    }
      
  return (
    <div className="flex flex-col items-center bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md">
      {success ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4 text-green-600">Payment Successful!</h2>
          <button onClick={() => window.location.href = '/'} className="mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
            Go to Home Page
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <CardElement />
          </div>
          <button
            type="submit"
            disabled={!stripe || loading}
            className={`w-full py-3 text-white font-semibold rounded ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
          
        </form>
      )}
    </div>
  )
}

export default PayService
