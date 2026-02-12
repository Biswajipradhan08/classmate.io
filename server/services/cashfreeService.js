const axios = require('axios');

const CASHFREE_BASE_URL = process.env.CASHFREE_ENV === 'production'
    ? 'https://api.cashfree.com/pg'
    : 'https://sandbox.cashfree.com/pg';

const headers = {
    'x-client-id': process.env.CASHFREE_APP_ID,
    'x-client-secret': process.env.CASHFREE_SECRET_KEY,
    'x-api-version': '2022-09-01',
    'Content-Type': 'application/json'
};

exports.createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${CASHFREE_BASE_URL}/orders`, orderData, { headers });
        return response.data;
    } catch (error) {
        console.error('Cashfree Create Order Error:', error.response?.data || error.message);
        throw error;
    }
};

exports.verifyPayment = async (orderId) => {
    try {
        const response = await axios.get(`${CASHFREE_BASE_URL}/orders/${orderId}`, { headers });
        return response.data;
    } catch (error) {
        console.error('Cashfree Verify Order Error:', error.response?.data || error.message);
        throw error;
    }
};
