import { Request, Response } from 'express';
import { Correspondencia, CorrespondenciaI } from '../models/Correspondencia';
import { Usuario } from '../models/Usuario';
import { Empleado } from '../models/Empleado';
import { TipoCorrespondencia } from '../models/TipoCorrespondencia';
import { EstadoCorrespondencia } from '../models/EstadoCorrespondencia';
import { Sucursal } from '../models/Sucursal';
import { Transporte } from '../models/Transporte';





export class CorrespondenciaController {
    // Obtener todas las correspondencias
    public async getAllCorrespondencia(req: Request, res: Response): Promise<void> {
        try {
            const correspondencias: CorrespondenciaI[] = await Correspondencia.findAll({
                include: [
                    { model: Usuario, as: "remitente" },
                    { model: Usuario, as: "destinatario" },
                    { model: Empleado, as: "empleado" },
                    { model: TipoCorrespondencia, as: "tipoCorrespondencia" },
                    { model: EstadoCorrespondencia, as: "estadoCorrespondencia" },
                    { model: Sucursal, as: "sucursalOrigen" },
                    { model: Sucursal, as: "sucursalDestino" },
                    { model: Transporte, as: "transporte" }
                ]
            });
            res.status(200).json({ correspondencias });
        } catch (error) {
            console.error('Error en getAllCorrespondencia:', error);
            res.status(500).json({ msg: "Error Interno" });
        }
    }

    // Obtener una correspondencia por ID
    public async getOneCorrespondencia(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const correspondencia: CorrespondenciaI | null = await Correspondencia.findOne({
                where: { id },
                include: [
                    { model: Usuario, as: "remitente" },
                    { model: Usuario, as: "destinatario" },
                    { model: Empleado, as: "empleado" },
                    { model: TipoCorrespondencia, as: "tipoCorrespondencia" },
                    { model: EstadoCorrespondencia, as: "estadoCorrespondencia" },
                    { model: Sucursal, as: "sucursalOrigen" },
                    { model: Sucursal, as: "sucursalDestino" },
                    { model: Transporte, as: "transporte" }
                ]
            });
            if (correspondencia) {
                res.status(200).json({ correspondencia });
            } else {
                res.status(404).json({ msg: "La Correspondencia no existe" });
            }
        } catch (error) {
            console.error('Error en getOneCorrespondencia:', error);
            res.status(500).json({ msg: "Error Interno" });
        }
    }

    // Crear una nueva correspondencia
    public async createCorrespondencia(req: Request, res: Response): Promise<void> {
        const { remitenteId, destinatarioId, empleadoId, tipoCorrespondenciaId, estadoCorrespondenciaId, sucursalOrigenId, sucursalDestinoId, transporteId, fechaEnvio, fechaEntrega, descripcion } = req.body;

        try {
            const nuevaCorrespondencia: CorrespondenciaI = await Correspondencia.create({ 
                remitenteId, 
                destinatarioId, 
                empleadoId, 
                tipoCorrespondenciaId, 
                estadoCorrespondenciaId, 
                sucursalOrigenId, 
                sucursalDestinoId, 
                transporteId, 
                fechaEnvio, 
                fechaEntrega, 
                descripcion 
            });
            res.status(201).json({ nuevaCorrespondencia });
        } catch (error) {
            console.error('Error en createCorrespondencia:', error);
            res.status(500).json({ msg: "Error al crear la correspondencia" });
        }
    }

    // Actualizar una correspondencia
    public async updateCorrespondencia(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { remitenteId, destinatarioId, empleadoId, tipoCorrespondenciaId, estadoCorrespondenciaId, sucursalOrigenId, sucursalDestinoId, transporteId, fechaEnvio, fechaEntrega, descripcion } = req.body;

        try {
            const correspondenciaExist: CorrespondenciaI | null = await Correspondencia.findByPk(id);
            if (!correspondenciaExist) {
                res.status(404).json({ msg: "La Correspondencia no existe" });
                return;
            }

            await Correspondencia.update({ 
                remitenteId, 
                destinatarioId, 
                empleadoId, 
                tipoCorrespondenciaId, 
                estadoCorrespondenciaId, 
                sucursalOrigenId, 
                sucursalDestinoId, 
                transporteId, 
                fechaEnvio, 
                fechaEntrega, 
                descripcion 
            }, { where: { id } });
            const correspondenciaActualizada: CorrespondenciaI | null = await Correspondencia.findByPk(id);
            res.status(200).json({ correspondencia: correspondenciaActualizada });
        } catch (error) {
            console.error('Error en updateCorrespondencia:', error);
            res.status(500).json({ msg: "Error al actualizar la correspondencia" });
        }
    }

    // Eliminar una correspondencia
    public async deleteCorrespondencia(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const correspondenciaExist: CorrespondenciaI | null = await Correspondencia.findByPk(id);
            if (!correspondenciaExist) {
                res.status(404).json({ msg: "La Correspondencia no existe" });
                return;
            }

            await Correspondencia.destroy({ where: { id } });
            res.status(200).json({ msg: "Correspondencia Eliminada" });
        } catch (error) {
            console.error('Error en deleteCorrespondencia:', error);
            res.status(500).json({ msg: "Error al eliminar la correspondencia" });
        }
    }
}
