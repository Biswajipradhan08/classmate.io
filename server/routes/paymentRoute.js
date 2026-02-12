const router = require('express').Router();
const cashfreeService = require('../services/cashfreeService');

// Create Order
router.post('/create-order', async (req, res) => {
    try {
        const { orderAmount, customerId, customerPhone, customerName } = req.body;

        const orderData = {
            order_amount: orderAmount,
            order_currency: 'INR',
            customer_details: {
                customer_id: customerId,
                customer_phone: customerPhone,
                customer_name: customerName
            },
            order_meta: {
                return_url: 'http://localhost:5174/payment-status?order_id={order_id}'
            }
        };

        const response = await cashfreeService.createOrder(orderData);
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Verify Payment (Webhooks or Check Status)
router.post('/verify', async (req, res) => {
    try {
        const { orderId } = req.body;
        // Logic to check order status using Cashfree API would go here
        // For now, we can just return success or implement the status check in service
        res.json({ status: 'VERIFIED', message: 'Payment verification logic to be implemented' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
