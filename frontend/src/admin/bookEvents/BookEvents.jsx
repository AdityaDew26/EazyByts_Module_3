import React, { useState,useRef } from 'react';
import {
  TextField, Button, MenuItem, Stack, Typography,
  Collapse, Paper, Box, Snackbar, Alert
} from '@mui/material';
import API from '../../api/EventApi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const BookEvents = ({ eventId, eventName, ticketPrice }) => {
  const billRef = useRef(null);
  const [form, setForm] = useState({
    customerName: '',
    peopleCount: 1,
    paymentMethod: 'Card',
  });
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [amount, setAmount] = useState(0);
  const [paymentInfo, setPaymentInfo] = useState({});
  const [bill, setBill] = useState(null);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity = 'success') => {
    setSnack({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnack({ ...snack, open: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'peopleCount' ? Number(value) : value,
    }));
  };

  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShowPayment = (e) => {
    e.preventDefault();
    const totalAmount = ticketPrice * form.peopleCount;
    setAmount(totalAmount);
    setShowPaymentForm(true);
  };

  const handleSubmitPayment = async () => {
    try {
      const res = await API.patch(`/events/${eventId}/booking`, form);
      if (res && res.data) {
        setBill({
          ...res.data.bill,
          eventName,
          customerName: form.customerName,
          peopleCount: form.peopleCount,
          method: form.paymentMethod,
        });
        setShowPaymentForm(false);
        showSnackbar('✅ Booking successful!');
      } else {
        showSnackbar('⚠️ Booking succeeded, but no response received', 'warning');
      }
    } catch (err) {
      console.error('Booking Error:', err);
      showSnackbar(err.response?.data?.message || '❌ Booking failed', 'error');
    }
  };

  const handleDownload = () => {
    const text = `
Event Bill Receipt
--------------------------
Event: ${bill.eventName}
Name: ${bill.customerName}
People: ${bill.peopleCount}
Payment Method: ${bill.method}
Amount Paid: ₹${bill.amount}
Date: ${new Date(bill.date).toLocaleString()}
    `;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${bill.customerName}_EventBill.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAsPDF = async () => {
  const canvas = await html2canvas(billRef.current);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF();
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${bill.customerName}_EventBill.pdf`);
};

const downloadAsPNG = async () => {
  const canvas = await html2canvas(billRef.current);
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = `${bill.customerName}_EventBill.png`;
  link.click();
};
  return (
    <>
      <Stack component="form" spacing={2} mt={4} onSubmit={handleShowPayment}>
        <Typography variant="h6">Book Event: {eventName}</Typography>

        <TextField
          label="Your Name"
          name="customerName"
          value={form.customerName}
          onChange={handleChange}
          required
        />

        <TextField
          label="No. of People"
          name="peopleCount"
          type="number"
          value={form.peopleCount}
          onChange={handleChange}
          required
          inputProps={{ min: 1 }}
        />

        <TextField
          select
          label="Payment Method"
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
        >
          {['Card', 'UPI', 'Cash', 'Netbanking'].map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </TextField>

        <Typography>Total Bill: ₹{ticketPrice * form.peopleCount}</Typography>

        <Button type="submit" variant="contained">
          Proceed to Pay
        </Button>

        <Collapse in={showPaymentForm}>
          <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>Payment Details</Typography>

            {form.paymentMethod === 'Card' && (
              <>
                <TextField
                  label="Card Number"
                  name="cardNumber"
                  onChange={handlePaymentInfoChange}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  label="Card Holder Name"
                  name="cardHolder"
                  onChange={handlePaymentInfoChange}
                  fullWidth
                  margin="dense"
                />
              </>
            )}

            {form.paymentMethod === 'UPI' && (
              <TextField
                label="UPI ID"
                name="upiId"
                onChange={handlePaymentInfoChange}
                fullWidth
                margin="dense"
              />
            )}

            {form.paymentMethod === 'Netbanking' && (
              <TextField
                label="Bank Name"
                name="bankName"
                onChange={handlePaymentInfoChange}
                fullWidth
                margin="dense"
              />
            )}

            <Button variant="contained" color="success" sx={{ mt: 2 }} onClick={handleSubmitPayment}>
              Confirm Payment ₹{amount}
            </Button>
          </Paper>
        </Collapse>

      {bill && (
  <Paper ref={billRef} elevation={3} sx={{ p: 3, mt: 3 }}>
    <Typography variant="h6" gutterBottom>🧾 Payment Bill</Typography>
    <Typography><strong>Event:</strong> {bill.eventName}</Typography>
    <Typography><strong>Name:</strong> {bill.customerName}</Typography>
    <Typography><strong>People:</strong> {bill.peopleCount}</Typography>
    <Typography><strong>Method:</strong> {bill.method}</Typography>
    <Typography><strong>Amount Paid:</strong> ₹{bill.amount}</Typography>
    <Typography><strong>Date:</strong> {new Date(bill.date).toLocaleString()}</Typography>
    <Box mt={2} display="flex" gap={2}>
      <Button variant="outlined" onClick={handleDownload}>⬇️ Download TXT</Button>
      <Button variant="outlined" onClick={downloadAsPDF}>📄 PDF</Button>
      <Button variant="outlined" onClick={downloadAsPNG}>🖼️ PNG</Button>
    </Box>
  </Paper>
)}
      </Stack>

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BookEvents;
