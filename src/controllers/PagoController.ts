import { Request, Response } from 'express';
import { Pago } from '../models/Pago';

export class PagoController {
    public async getAllPagos(req: Request, res: Response): Promise<void> {
        try {
            const pagos = await Pago.findAll();
            res.status(200).json({ pagos });
        } catch (error) {
            console.error('Error en getAllPagos:', error);
            res.status(500).json({ msg: "Error Interno" });
        }
    }

    public async getOnePago(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const pago = await Pago.findOne({ where: { id } });
            if (pago) {
                res.status(200).json({ pago });
            } else {
                res.status(404).json({ msg: "El Pago no existe" });
            }
        } catch (error) {
            console.error('Error en getOnePago:', error);
            res.status(500).json({ msg: "Error Interno" });
        }
    }

    public async createPago(req: Request, res: Response): Promise<void> {
        const { correspondenciaId, monto, tipoPagoId, fechaPago } = req.body;
    
        try {
            const nuevoPago = await Pago.create({ correspondenciaId, monto, tipoPagoId, fechaPago });
            res.status(201).json({ nuevoPago });
        } catch (error) {
            console.error('Error en createPago:', error);
            res.status(500).json({ msg: "Error al crear el pago" });
        }
    }
    
    public async updatePago(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { correspondenciaId, monto, tipoPagoId, fechaPago } = req.body;

        try {
            const pagoExist = await Pago.findByPk(id);
            if (!pagoExist) {
                res.status(404).json({ msg: "El Pago no existe" });
                return;
            }

            await Pago.update({ correspondenciaId, monto, tipoPagoId, fechaPago }, { where: { id } });
            const pagoActualizado = await Pago.findByPk(id);
            res.status(200).json({ pago: pagoActualizado });
        } catch (error) {
            console.error('Error en updatePago:', error);
            res.status(500).json({ msg: "Error al actualizar el pago" });
        }
    }

    public async deletePago(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const pagoExist = await Pago.findByPk(id);
            if (!pagoExist) {
                res.status(404).json({ msg: "El Pago no existe" });
                return;
            }

            await Pago.destroy({ where: { id } });
            res.status(200).json({ msg: "Pago Eliminado" });
        } catch (error) {
            console.error('Error en deletePago:', error);
            res.status(500).json({ msg: "Error al eliminar el pago" });
        }
    }
}
