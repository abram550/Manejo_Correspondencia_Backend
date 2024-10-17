import { Request, Response } from 'express';
import { Sucursal, SucursalI } from '../models/Sucursal';

export class SucursalController {
    public async getAllSucursales(req: Request, res: Response): Promise<void> {
        try {
            const sucursales: SucursalI[] = await Sucursal.findAll();
            res.status(200).json({ sucursales });
        } catch (error) {
            console.error('Error en getAllSucursales:', error);
            res.status(500).json({ msg: "Error Interno" });
        }
    }

    public async getOneSucursal(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const sucursal: SucursalI | null = await Sucursal.findOne({ where: { id } });
            if (sucursal) {
                res.status(200).json({ sucursal });
            } else {
                res.status(404).json({ msg: "La Sucursal no existe" });
            }
        } catch (error) {
            console.error('Error en getOneSucursal:', error);
            res.status(500).json({ msg: "Error Interno" });
        }
    }

    public async createSucursal(req: Request, res: Response): Promise<void> {
        const { nombre, direccion, ciudad, telefono } = req.body;

        try {
            const nuevaSucursal: SucursalI = await Sucursal.create({ nombre, direccion, ciudad, telefono });
            res.status(201).json({ nuevaSucursal });
        } catch (error) {
            console.error('Error en createSucursal:', error);
            res.status(500).json({ msg: "Error al crear la sucursal" });
        }
    }

    public async updateSucursal(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nombre, direccion, ciudad, telefono } = req.body;

        try {
            const sucursalExist: SucursalI | null = await Sucursal.findByPk(id);
            if (!sucursalExist) {
                res.status(404).json({ msg: "La Sucursal no existe" });
                return;
            }

            await Sucursal.update({ nombre, direccion, ciudad, telefono }, { where: { id } });
            const sucursalActualizada: SucursalI | null = await Sucursal.findByPk(id);
            res.status(200).json({ sucursal: sucursalActualizada });
        } catch (error) {
            console.error('Error en updateSucursal:', error);
            res.status(500).json({ msg: "Error al actualizar la sucursal" });
        }
    }

    public async deleteSucursal(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const sucursalExist: SucursalI | null = await Sucursal.findByPk(id);
            if (!sucursalExist) {
                res.status(404).json({ msg: "La Sucursal no existe" });
                return;
            }

            await Sucursal.destroy({ where: { id } });
            res.status(200).json({ msg: "Sucursal Eliminada" });
        } catch (error) {
            console.error('Error en deleteSucursal:', error);
            res.status(500).json({ msg: "Error al eliminar la sucursal" });
        }
    }


    public async obtenerTodasSucursales(req: Request, res: Response): Promise<void> {
        try {
            // Obtiene todas las sucursales de la base de datos
            const sucursales: SucursalI[] = await Sucursal.findAll();
            
            // Responde con el array directamente
            res.status(200).json(sucursales); // Cambiado para devolver un array directamente
        } catch (error) {
            console.error('Error en obtenerTodasSucursales:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }
    
    public async obtenerSucursalPorId(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
    
        try {
            const sucursal: SucursalI | null = await Sucursal.findOne({ where: { id: parseInt(id) } });
    
            if (sucursal) {
                res.status(200).json(sucursal); // Cambiado para devolver el objeto directamente
            } else {
                res.status(404).json({ msg: "La Sucursal no existe" });
            }
        } catch (error) {
            console.error('Error en obtenerSucursalPorId:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }
    


}
