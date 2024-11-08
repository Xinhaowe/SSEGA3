import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import PayService from './PayService'

const stripePromise = loadStripe("pk_test_51QHcqzLBWb2EqV2oLE4rDWwVNEYHipLh0gLJyv8m3jD9M2Xnxbh7HycfUGoNvhf16B6jniDtpXtszxEp5APjrL4B00gkHkb4ay")

const StripeContainer = () => {
  return (
    <div className="stripe-container">
      <Elements stripe={stripePromise}>
        <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4">
          <PayService />
        </div>
        
      </Elements>
    </div>
  )
}

export default StripeContainer
