import paymentsModel from '../model/paymentsModal.js';


export const processPaymentController = async (req, res) => {
    // try {
        const userId = req.user.userId; // Ensure userId exists
        console.log(userId);
        
        const paymentMethod ='Debit Card' // Get payment details from the request body

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        if ( !paymentMethod) {
            return res.status(400).json({ success: false, message: 'Payment ID and payment method are required' });
        }

        // Call the model to process the payment
        const paymentResult = await paymentsModel.processDebitCardPayment(userId, paymentMethod);

        if (paymentResult.status === 'success') {
            res.json({ success: true, message: 'Payment successful!' });
        } else {
            res.status(402).json({ success: false, message: 'Payment failed' });
        }
    // } catch (error) {
    //     console.error('Error processing payment:', error);
    //     res.status(500).json({ success: false, message: 'Failed to process payment' });
    // }
};

export const getPaymentByIdController = async (req, res) => {
    try {
        const paymentId = req.params.id;

        if (!paymentId) {
            return res.status(400).json({ message: 'Payment ID is required' });
        }

        const payment = await paymentsModel.getPaymentById(paymentId);

        if (payment) {
            res.status(200).json(payment);
        } else {
            res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        console.error('Error fetching payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
