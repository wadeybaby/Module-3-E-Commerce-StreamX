import { pool } from '../config/config.js'; // Ensure database connection is imported

const paymentsModel = {
    // Method to simulate payment processing (replace with actual payment gateway logic)
    async processDebitCardPayment(userId, paymentMethod) {
        try {
            // Simulate payment success (replace with real payment gateway logic)
            const paymentSuccessful = true;

            if (paymentSuccessful) {
                await this.recordPayment(userId, paymentMethod);
                return { status: 'success', message: 'Payment processed successfully' };
            }
            return { status: 'failed', message: 'Payment failed' };
        } catch (error) {
            console.error('Error processing payment:', error);
            return { status: 'failed', message: 'Error processing payment' };
        }
    },

    // Method to record the payment in the database
    async recordPayment(userId,  paymentMethod) {
        try {
            // Insert payment details into the payments table
            const query = `
                INSERT INTO payments (user_id, payment_method)
                VALUES (?, ?)
            `;
            await pool.execute(query, [userId, paymentMethod]);
        } catch (error) {
            console.error('Error recording payment:', error);
        }
    },

    // Method to get payment details by paymentId
    async getPaymentById(paymentId) {
        try {
            const query = `SELECT * FROM payments WHERE payment_id = ?`;
            const [rows] = await pool.execute(query, [paymentId]);
            return rows[0] || null; // Return the payment or null if not found
        } catch (error) {
            console.error('Error fetching payment:', error);
            return null; // Return null in case of error
        }
    }
};

export default paymentsModel;
