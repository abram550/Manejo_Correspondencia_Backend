import { Request, Response } from 'express';
import { PaymentType } from '../models/PaymentType';

export class PaymentTypeController {
    // Retrieve all payment types
    public async getAllPaymentTypes(req: Request, res: Response): Promise<void> {
        try {
            const paymentTypes = await PaymentType.findAll();
            res.status(200).json({ paymentTypes });
        } catch (error) {
            console.error('Error in getAllPaymentTypes:', error);
            res.status(500).json({ msg: "Internal server error" });
        }
    }

    // Retrieve a payment type by its ID
    public async getOnePaymentType(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const paymentType = await PaymentType.findByPk(id);
            if (paymentType) {
                res.status(200).json({ paymentType });
            } else {
                res.status(404).json({ msg: "The payment type does not exist" });
            }
        } catch (error) {
            console.error('Error in getOnePaymentType:', error);
            res.status(500).json({ msg: "Internal server error" });
        }
    }

    // Create a new payment type
    public async createPaymentType(req: Request, res: Response): Promise<void> {
        const { name } = req.body;

        try {
            const newPaymentType = await PaymentType.create({ name });
            res.status(201).json({ paymentType: newPaymentType });
        } catch (error) {
            console.error('Error in createPaymentType:', error);
            res.status(500).json({ msg: "Error creating payment type" });
        }
    }

    // Update an existing payment type
    public async updatePaymentType(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { name } = req.body;

        try {
            const existingPaymentType = await PaymentType.findByPk(id);
            if (!existingPaymentType) {
                res.status(404).json({ msg: "The payment type does not exist" });
                return;
            }

            await PaymentType.update({ name }, { where: { id } });
            const updatedPaymentType = await PaymentType.findByPk(id);
            res.status(200).json({ paymentType: updatedPaymentType });
        } catch (error) {
            console.error('Error in updatePaymentType:', error);
            res.status(500).json({ msg: "Error updating payment type" });
        }
    }

    // Delete a payment type
    public async deletePaymentType(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const existingPaymentType = await PaymentType.findByPk(id);
            if (!existingPaymentType) {
                res.status(404).json({ msg: "The payment type does not exist" });
                return;
            }

            await PaymentType.destroy({ where: { id } });
            res.status(200).json({ msg: "Payment type deleted" });
        } catch (error) {
            console.error('Error in deletePaymentType:', error);
            res.status(500).json({ msg: "Error deleting payment type" });
        }
    }
}
