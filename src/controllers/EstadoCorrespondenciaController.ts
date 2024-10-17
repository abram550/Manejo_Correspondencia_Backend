import { Request, Response } from 'express';
import { EstadoCorrespondencia, EstadoCorrespondenciaI } from '../models/EstadoCorrespondencia';

export class EstadoCorrespondenciaController {
    public async getAllEstados(req: Request, res: Response): Promise<void> {
        try {
            const estados: EstadoCorrespondenciaI[] = await EstadoCorrespondencia.findAll();
            res.status(200).json({ estados });
        } catch (error) {
            console.error('Error en getAllEstados:', error);
            res.status(500).json({ msg: "Error Interno" });
        }
    }

    public async getOneEstado(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const estado: EstadoCorrespondenciaI | null = await EstadoCorrespondencia.findOne({ where: { id: parseInt(id) } });
            if (estado) {
                res.status(200).json({ estado });
            } else {
                res.status(404).json({ msg: "El Estado no existe" });
            }
        } catch (error) {
            console.error('Error en getOneEstado:', error);
            res.status(500).json({ msg: "Error Interno" });
        }
    }

    public async createEstado(req: Request, res: Response): Promise<void> {
        const { estado } = req.body;

        try {
            const nuevoEstado: EstadoCorrespondenciaI = await EstadoCorrespondencia.create({ estado });
            res.status(201).json({ nuevoEstado });
        } catch (error) {
            console.error('Error en createEstado:', error);
            res.status(500).json({ msg: "Error al crear el estado" });
        }
    }

    public async updateEstado(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { estado } = req.body;

        try {
            const estadoExist: EstadoCorrespondenciaI | null = await EstadoCorrespondencia.findByPk(id);
            if (!estadoExist) {
                res.status(404).json({ msg: "El Estado no existe" });
                return;
            }

            await EstadoCorrespondencia.update({ estado }, { where: { id } });
            const estadoActualizado: EstadoCorrespondenciaI | null = await EstadoCorrespondencia.findByPk(id);
            res.status(200).json({ estado: estadoActualizado });
        } catch (error) {
            console.error('Error en updateEstado:', error);
            res.status(500).json({ msg: "Error al actualizar el estado" });
        }
    }

    public async deleteEstado(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const estadoExist: EstadoCorrespondenciaI | null = await EstadoCorrespondencia.findByPk(id);
            if (!estadoExist) {
                res.status(404).json({ msg: "El Estado no existe" });
                return;
            }

            await EstadoCorrespondencia.destroy({ where: { id } });
            res.status(200).json({ msg: "Estado Eliminado" });
        } catch (error) {
            console.error('Error en deleteEstado:', error);
            res.status(500).json({ msg: "Error al eliminar el estado" });
        }
    }

    public async obtenerTodosEstados(req: Request, res: Response): Promise<void> {
        try {
            // Obtiene todos los estados de correspondencia de la base de datos
            const estados: EstadoCorrespondenciaI[] = await EstadoCorrespondencia.findAll();
            
            // Responde con el array directamente
            res.status(200).json(estados); // Cambiado para devolver un array directamente
        } catch (error) {
            console.error('Error en obtenerTodosEstados:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }

    // Método para obtener un estado de correspondencia por ID
    public async obtenerEstadoPorId(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;

        try {
            const estado: EstadoCorrespondenciaI | null = await EstadoCorrespondencia.findOne({ where: { id: parseInt(idParam) } });

            if (estado) {
                res.status(200).json(estado); // Cambiado para devolver el objeto directamente
            } else {
                res.status(404).json({ msg: "El Estado no existe" });
            }
        } catch (error) {
            console.error('Error en obtenerEstadoPorId:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }



}
