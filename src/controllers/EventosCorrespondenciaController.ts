import { Request, Response } from 'express';
import { EventosCorrespondencia } from '../models/EventosCorrespondencia';

export class EventosCorrespondenciaController {
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hola, método test para EventosCorrespondencia');
        } catch (error) {
            res.status(500).json({ msg: "Error interno" });
        }
    }

    public async getAllEventos(req: Request, res: Response): Promise<void> {
        try {
            const eventos = await EventosCorrespondencia.findAll();
            res.status(200).json({ eventos });
        } catch (error) {
            console.error('Error en getAllEventos:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }

    public async getOneEvento(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;

        try {
            const evento = await EventosCorrespondencia.findOne({ where: { id: idParam } });

            if (evento) {
                res.status(200).json({ evento });
            } else {
                res.status(404).json({ msg: "El Evento no existe" });
            }
        } catch (error) {
            res.status(500).json({ msg: "Error interno" });
        }
    }

    public async createEvento(req: Request, res: Response): Promise<void> {
        const { correspondenciaId, sucursalId, empleadoId, estadoCorrespondenciaId, fechaEvento, descripcion } = req.body;

        try {
            const evento = await EventosCorrespondencia.create({
                correspondenciaId,
                sucursalId,
                empleadoId,
                estadoCorrespondenciaId,
                fechaEvento,
                descripcion,
            });
            res.status(201).json({ evento });
        } catch (error) {
            res.status(500).json({ msg: "Error al crear el evento" });
        }
    }

    public async updateEvento(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        const { correspondenciaId, sucursalId, empleadoId, estadoCorrespondenciaId, fechaEvento, descripcion } = req.body;

        try {
            const eventoExist = await EventosCorrespondencia.findByPk(pk);

            if (!eventoExist) {
                res.status(404).json({ msg: "El Evento no existe" });
            } else {
                await EventosCorrespondencia.update({
                    correspondenciaId,
                    sucursalId,
                    empleadoId,
                    estadoCorrespondenciaId,
                    fechaEvento,
                    descripcion,
                }, { where: { id: pk } });

                const eventoActualizado = await EventosCorrespondencia.findByPk(pk);
                res.status(200).json({ evento: eventoActualizado });
            }
        } catch (error) {
            res.status(500).json({ msg: "Error al actualizar el evento" });
        }
    }

    public async deleteEvento(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;

        try {
            const eventoExist = await EventosCorrespondencia.findByPk(pk);
            if (!eventoExist) {
                res.status(404).json({ msg: "El Evento no existe" });
            } else {
                await EventosCorrespondencia.destroy({ where: { id: pk } });
                res.status(200).json({ msg: "Evento Eliminado" });
            }
        } catch (error) {
            res.status(500).json({ msg: "Error al eliminar el evento" });
        }
    }
}
