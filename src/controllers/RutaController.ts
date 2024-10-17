import { Request, Response } from 'express';
import { Ruta, RutaI } from '../models/Ruta';
import { Sucursal } from '../models/Sucursal'; // Asegúrate de importar el modelo Sucursal

export class RutaController {
    public async getAllRutas(req: Request, res: Response): Promise<void> {
        try {
            const rutas: RutaI[] = await Ruta.findAll({
                include: [
                    { model: Sucursal, as: 'sucursalOrigen' }, 
                    { model: Sucursal, as: 'sucursalDestino' }
                ]
            });
            res.status(200).json({ rutas });
        } catch (error) {
            console.error('Error en getAllRutas:', error);
            res.status(500).json({ msg: "Error Interno" });
        }
    }

    public async getOneRuta(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const ruta: RutaI | null = await Ruta.findOne({
                where: { id },
                include: [
                    { model: Sucursal, as: 'sucursalOrigen' }, 
                    { model: Sucursal, as: 'sucursalDestino' }
                ]
            });

            if (ruta) {
                res.status(200).json({ ruta });
            } else {
                res.status(404).json({ msg: "La Ruta no existe" });
            }
        } catch (error) {
            console.error('Error en getOneRuta:', error);
            res.status(500).json({ msg: "Error Interno" });
        }
    }

    public async createRuta(req: Request, res: Response): Promise<void> {
        const { sucursalOrigenId, sucursalDestinoId, distanciaKm, tiempoEstimadoHoras } = req.body;

        try {
            const nuevaRuta: RutaI = await Ruta.create({
                sucursalOrigenId, 
                sucursalDestinoId, 
                distanciaKm, 
                tiempoEstimadoHoras
            });
            res.status(201).json({ nuevaRuta });
        } catch (error) {
            console.error('Error en createRuta:', error);
            res.status(500).json({ msg: "Error al crear la ruta" });
        }
    }

    public async updateRuta(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { sucursalOrigenId, sucursalDestinoId, distanciaKm, tiempoEstimadoHoras } = req.body;

        try {
            const rutaExist: RutaI | null = await Ruta.findByPk(id);
            if (!rutaExist) {
                res.status(404).json({ msg: "La Ruta no existe" });
                return;
            }

            await Ruta.update({
                sucursalOrigenId, 
                sucursalDestinoId, 
                distanciaKm, 
                tiempoEstimadoHoras
            }, { where: { id } });

            const rutaActualizada: RutaI | null = await Ruta.findByPk(id);
            res.status(200).json({ ruta: rutaActualizada });
        } catch (error) {
            console.error('Error en updateRuta:', error);
            res.status(500).json({ msg: "Error al actualizar la ruta" });
        }
    }

    public async deleteRuta(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const rutaExist: RutaI | null = await Ruta.findByPk(id);
            if (!rutaExist) {
                res.status(404).json({ msg: "La Ruta no existe" });
                return;
            }

            await Ruta.destroy({ where: { id } });
            res.status(200).json({ msg: "Ruta Eliminada" });
        } catch (error) {
            console.error('Error en deleteRuta:', error);
            res.status(500).json({ msg: "Error al eliminar la ruta" });
        }
    }
}
