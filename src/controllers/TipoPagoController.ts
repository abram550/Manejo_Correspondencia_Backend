import { Request, Response } from 'express';
import { TipoPago } from '../models/TipoPago';

export class TipoPagoController {
    // Obtener todos los tipos de pago
    public async getAllTipoPago(req: Request, res: Response): Promise<void> {
        try {
            const tiposPago = await TipoPago.findAll();
            res.status(200).json({ tiposPago });
        } catch (error) {
            console.error('Error en getAllTipoPago:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }

    // Obtener un tipo de pago por su ID
    public async getOneTipoPago(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const tipoPago = await TipoPago.findByPk(id);
            if (tipoPago) {
                res.status(200).json({ tipoPago });
            } else {
                res.status(404).json({ msg: "El tipo de pago no existe" });
            }
        } catch (error) {
            console.error('Error en getOneTipoPago:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }

    // Crear un nuevo tipo de pago
    public async createTipoPago(req: Request, res: Response): Promise<void> {
        const { nombre } = req.body;

        try {
            const nuevoTipoPago = await TipoPago.create({ nombre });
            res.status(201).json({ tipoPago: nuevoTipoPago });
        } catch (error) {
            console.error('Error en createTipoPago:', error);
            res.status(500).json({ msg: "Error al crear el tipo de pago" });
        }
    }

    // Actualizar un tipo de pago existente
    public async updateTipoPago(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nombre } = req.body;

        try {
            const tipoPagoExistente = await TipoPago.findByPk(id);
            if (!tipoPagoExistente) {
                res.status(404).json({ msg: "El tipo de pago no existe" });
                return;
            }

            await TipoPago.update({ nombre }, { where: { id } });
            const tipoPagoActualizado = await TipoPago.findByPk(id);
            res.status(200).json({ tipoPago: tipoPagoActualizado });
        } catch (error) {
            console.error('Error en updateTipoPago:', error);
            res.status(500).json({ msg: "Error al actualizar el tipo de pago" });
        }
    }

    // Eliminar un tipo de pago
    public async deleteTipoPago(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const tipoPagoExistente = await TipoPago.findByPk(id);
            if (!tipoPagoExistente) {
                res.status(404).json({ msg: "El tipo de pago no existe" });
                return;
            }

            await TipoPago.destroy({ where: { id } });
            res.status(200).json({ msg: "Tipo de pago eliminado" });
        } catch (error) {
            console.error('Error en deleteTipoPago:', error);
            res.status(500).json({ msg: "Error al eliminar el tipo de pago" });
        }
    }

// Métodos adaptados para manejar tipos de pago
public async obtenerTodosTiposPago(req: Request, res: Response): Promise<void> {
    try {
        const tiposPago = await TipoPago.findAll();
        res.status(200).json(tiposPago); // Cambiado para devolver el array directamente
    } catch (error) {
        console.error('Error en obtenerTodosTiposPago:', error);
        res.status(500).json({ msg: "Error interno" });
    }
}

// Obtener un tipo de pago por su ID
public async obtenerTipoPagoPorId(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
        const tipoPago = await TipoPago.findByPk(id);
        if (tipoPago) {
            res.status(200).json(tipoPago); // Cambiado para devolver el objeto directamente
        } else {
            res.status(404).json({ msg: "El tipo de pago no existe" });
        }
    } catch (error) {
        console.error('Error en obtenerTipoPagoPorId:', error);
        res.status(500).json({ msg: "Error interno" });
    }
}



}
