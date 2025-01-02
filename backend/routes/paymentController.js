import express from 'express';

const router = express.Router();

router.post('/processPayment', (req, res) => {
  const { paymentMethod, paymentDetails } = req.body;

  if (paymentMethod === 'UPI' && !paymentDetails.upiId) {
    return res.status(400).send('Please provide your UPI ID');
  }
  if (paymentMethod === 'Card' && (!paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvv)) {
    return res.status(400).send('Please provide all card details');
  }
  if (paymentMethod === 'NetBanking' && !paymentDetails.bankName) {
    return res.status(400).send('Please provide your bank name');
  }

  // Simulate payment processing
  const paymentSuccess = true;

  if (paymentSuccess) {
    return res.status(200).send('Payment successful');
  } else {
    return res.status(500).send('Payment failed');
  }
});

export default router;
