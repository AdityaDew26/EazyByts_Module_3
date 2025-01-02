import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Payment = ({ open, onClose, onPaymentSuccess }) => {
  const handleToken = (token) => {
    // Send token to backend for processing payment
    axios
      .post('http://localhost:5000/api/payment', {
        token,
        amount: 1000, // Replace with actual amount
      })
      .then((response) => {
        onPaymentSuccess('Stripe', response.data); // Call the success handler
        onClose(); // Close the payment modal
      })
      .catch((error) => {
        console.error('Payment error:', error);
        alert('Payment failed, please try again');
        onClose(); // Close the modal on failure
      });
  };

  return (
    open && (
      <div className="payment-modal">
        <StripeCheckout
          stripeKey="your-public-key-here"
          token={handleToken}
          amount={1000} // Replace with actual amount based on booking
          name="Event Booking"
          currency="USD"
        />
      </div>
    )
  );
};

export default Payment;
