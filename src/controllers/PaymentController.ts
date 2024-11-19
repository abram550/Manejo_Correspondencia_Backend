import { Request, Response } from 'express';
import { Payment } from '../models/Payment';

/**
 * Controller for managing payment operations
 */
export class PaymentController {
    /**
     * Retrieve all payments
     * @param req - Express request object
     * @param res - Express response object
     */
    public async getAllPayments(req: Request, res: Response): Promise<void> {
        try {
            const payments = await Payment.findAll(); // Fetch all payments from the database
            res.status(200).json({ payments }); // Respond with a success status and the payments
        } catch (error) {
            console.error('Error in getAllPayments:', error); // Log the error
            res.status(500).json({ msg: "Internal Error" }); // Respond with an internal server error message
        }
    }

    /**
     * Retrieve a single payment by its ID
     * @param req - Express request object
     * @param res - Express response object
     */
    public async getOnePayment(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // Extract the payment ID from the request parameters

        try {
            const payment = await Payment.findOne({ where: { id } }); // Fetch the payment with the specified ID
            if (payment) {
                res.status(200).json({ payment }); // Respond with the found payment
            } else {
                res.status(404).json({ msg: "The payment does not exist" }); // Respond with a not found message
            }
        } catch (error) {
            console.error('Error in getOnePayment:', error); // Log the error
            res.status(500).json({ msg: "Internal Error" }); // Respond with an internal server error message
        }
    }

    /**
     * Create a new payment
     * @param req - Express request object
     * @param res - Express response object
     */
    public async createPayment(req: Request, res: Response): Promise<void> {
        const { correspondenceId, amount, paymentTypeId, paymentDate } = req.body; // Extract payment details from the request body

        try {
            const newPayment = await Payment.create({ correspondenceId, amount, paymentTypeId, paymentDate }); // Create a new payment in the database
            res.status(201).json({ newPayment }); // Respond with a created status and the new payment
        } catch (error) {
            console.error('Error in createPayment:', error); // Log the error
            res.status(500).json({ msg: "Error creating payment" }); // Respond with an error message
        }
    }

    /**
     * Update an existing payment
     * @param req - Express request object
     * @param res - Express response object
     */
    public async updatePayment(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // Extract the payment ID from the request parameters
        const { correspondenceId, amount, paymentTypeId, paymentDate } = req.body; // Extract updated payment details from the request body

        try {
            const paymentExists = await Payment.findByPk(id); // Check if the payment exists
            if (!paymentExists) {
                res.status(404).json({ msg: "The payment does not exist" }); // Respond with a not found message
                return; // Exit the method
            }

            await Payment.update({ correspondenceId, amount, paymentTypeId, paymentDate }, { where: { id } }); // Update the payment details in the database
            const updatedPayment = await Payment.findByPk(id); // Retrieve the updated payment
            res.status(200).json({ payment: updatedPayment }); // Respond with the updated payment
        } catch (error) {
            console.error('Error in updatePayment:', error); // Log the error
            res.status(500).json({ msg: "Error updating payment" }); // Respond with an error message
        }
    }

    /**
     * Delete a payment by its ID
     * @param req - Express request object
     * @param res - Express response object
     */
    public async deletePayment(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // Extract the payment ID from the request parameters

        try {
            const paymentExists = await Payment.findByPk(id); // Check if the payment exists
            if (!paymentExists) {
                res.status(404).json({ msg: "The payment does not exist" }); // Respond with a not found message
                return; // Exit the method
            }

            await Payment.destroy({ where: { id } }); // Delete the payment from the database
            res.status(200).json({ msg: "Payment Deleted" }); // Respond with a success message
        } catch (error) {
            console.error('Error in deletePayment:', error); // Log the error
            res.status(500).json({ msg: "Error deleting payment" }); // Respond with an error message
        }
    }
}
