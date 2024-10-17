import { Request, Response } from 'express';
import { Transporte, TransporteI } from '../models/Transporte';
import { TipoVehiculo } from '../models/TipoVehiculo'; // Importar el modelo relacionado

export class TransporteController {
    public async getAllTransporte(req: Request, res: Response): Promise<void> {
        try {
            const transportes: TransporteI[] = await Transporte.findAll({
                include: [
                    {
                        model: TipoVehiculo,
                        as: 'tipoVehiculo', // Relación definida en el modelo
                    },
                ],
            });
            res.status(200).json({ transportes });
        } catch (error) {
            console.error('Error en getAllTransporte:', error);
            res.status(500).json({ msg: "Error Interno" });
        }
    }

    public async getOneTransporte(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const transporte: TransporteI | null = await Transporte.findOne({
                where: { id },
                include: [
                    {
                        model: TipoVehiculo,
                        as: 'tipoVehiculo',
                    },
                ],
            });

            if (transporte) {
                res.status(200).json({ transporte });
            } else {
                res.status(404).json({ msg: "El Transporte no existe" });
            }
        } catch (error) {
            console.error('Error en getOneTransporte:', error);
            res.status(500).json({ msg: "Error Interno" });
        }
    }

    public async createTransporte(req: Request, res: Response): Promise<void> {
        const { tipoVehiculoId, placa, capacidadKg } = req.body;

        try {
            const transporte: TransporteI = await Transporte.create({ tipoVehiculoId, placa, capacidadKg });
            res.status(201).json({ transporte });
        } catch (error) {
            console.error('Error en createTransporte:', error);
            res.status(500).json({ msg: "Error al crear el transporte" });
        }
    }

    public async updateTransporte(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { tipoVehiculoId, placa, capacidadKg } = req.body;

        try {
            const transporteExist: TransporteI | null = await Transporte.findByPk(id);
            if (!transporteExist) {
                res.status(404).json({ msg: "El Transporte no existe" });
                return;
            }

            await Transporte.update({ tipoVehiculoId, placa, capacidadKg }, { where: { id } });
            const transporteActualizado: TransporteI | null = await Transporte.findByPk(id);
            res.status(200).json({ transporte: transporteActualizado });
        } catch (error) {
            console.error('Error en updateTransporte:', error);
            res.status(500).json({ msg: "Error al actualizar el transporte" });
        }
    }

    public async deleteTransporte(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const transporteExist: TransporteI | null = await Transporte.findByPk(id);
            if (!transporteExist) {
                res.status(404).json({ msg: "El Transporte no existe" });
                return;
            }

            await Transporte.destroy({ where: { id } });
            res.status(200).json({ msg: "Transporte Eliminado" });
        } catch (error) {
            console.error('Error en deleteTransporte:', error);
            res.status(500).json({ msg: "Error al eliminar el transporte" });
        }
    }


    public async obtenerTodosTransportes(req: Request, res: Response): Promise<void> {
        try {
            const transportes: TransporteI[] = await Transporte.findAll({
                include: [
                    {
                        model: TipoVehiculo,
                        as: 'tipoVehiculo', // Relación definida en el modelo
                    },
                ],
            });
            res.status(200).json(transportes); // Cambiado para devolver el array directamente
        } catch (error) {
            console.error('Error en obtenerTodosTransportes:', error);
            res.status(500).json({ msg: "Error Interno" });
        }
    }

    public async obtenerTransportePorId(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const transporte: TransporteI | null = await Transporte.findOne({
                where: { id },
                include: [
                    {
                        model: TipoVehiculo,
                        as: 'tipoVehiculo',
                    },
                ],
            });

            if (transporte) {
                res.status(200).json(transporte); // Cambiado para devolver el objeto directamente
            } else {
                res.status(404).json({ msg: "El Transporte no existe" });
            }
        } catch (error) {
            console.error('Error en obtenerTransportePorId:', error);
            res.status(500).json({ msg: "Error Interno" });
        }
    }





}
