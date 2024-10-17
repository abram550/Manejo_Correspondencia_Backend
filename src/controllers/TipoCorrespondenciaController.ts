import { Request, Response } from 'express';
import { TipoCorrespondencia, TipoCorrespondenciaI } from '../models/TipoCorrespondencia';

export class TipoCorrespondenciaController {
    // Obtener todos los tipos de correspondencia
    public async getAllTipoCorrespondencia(req: Request, res: Response): Promise<void> {
        try {
            const tipos: TipoCorrespondenciaI[] = await TipoCorrespondencia.findAll();
            res.status(200).json({ tipos });
        } catch (error) {
            console.error('Error en getAllTipoCorrespondencia:', error);
            res.status(500).json({ msg: "Error Interno" });
        }
    }

    // Obtener un solo tipo de correspondencia por ID
    public async getOneTipoCorrespondencia(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const tipo: TipoCorrespondenciaI | null = await TipoCorrespondencia.findOne({ where: { id } });
            if (tipo) {
                res.status(200).json({ tipo });
            } else {
                res.status(404).json({ msg: "El Tipo de Correspondencia no existe" });
            }
        } catch (error) {
            console.error('Error en getOneTipoCorrespondencia:', error);
            res.status(500).json({ msg: "Error Interno" });
        }
    }

    // Crear un nuevo tipo de correspondencia
    public async createTipoCorrespondencia(req: Request, res: Response): Promise<void> {
        const { tipo } = req.body;

        try {
            const nuevoTipo: TipoCorrespondenciaI = await TipoCorrespondencia.create({ tipo });
            res.status(201).json({ nuevoTipo });
        } catch (error) {
            console.error('Error en createTipoCorrespondencia:', error);
            res.status(500).json({ msg: "Error al crear el tipo de correspondencia" });
        }
    }

    // Actualizar un tipo de correspondencia por ID
    public async updateTipoCorrespondencia(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { tipo } = req.body;

        try {
            const tipoExist: TipoCorrespondenciaI | null = await TipoCorrespondencia.findByPk(id);
            if (!tipoExist) {
                res.status(404).json({ msg: "El Tipo de Correspondencia no existe" });
                return;
            }

            await TipoCorrespondencia.update({ tipo }, { where: { id } });
            const tipoActualizado: TipoCorrespondenciaI | null = await TipoCorrespondencia.findByPk(id);
            res.status(200).json({ tipo: tipoActualizado });
        } catch (error) {
            console.error('Error en updateTipoCorrespondencia:', error);
            res.status(500).json({ msg: "Error al actualizar el tipo de correspondencia" });
        }
    }

    // Eliminar un tipo de correspondencia por ID
    public async deleteTipoCorrespondencia(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const tipoExist: TipoCorrespondenciaI | null = await TipoCorrespondencia.findByPk(id);
            if (!tipoExist) {
                res.status(404).json({ msg: "El Tipo de Correspondencia no existe" });
                return;
            }

            await TipoCorrespondencia.destroy({ where: { id } });
            res.status(200).json({ msg: "Tipo de Correspondencia Eliminado" });
        } catch (error) {
            console.error('Error en deleteTipoCorrespondencia:', error);
            res.status(500).json({ msg: "Error al eliminar el tipo de correspondencia" });
        }
    }

    public async obtenerTodosTiposCorrespondencia(req: Request, res: Response): Promise<void> {
        try {
            const tiposCorrespondencia: TipoCorrespondenciaI[] = await TipoCorrespondencia.findAll();
            res.status(200).json(tiposCorrespondencia); // Cambiado para devolver un array directamente
        } catch (error) {
            console.error('Error en obtenerTodosTiposCorrespondencia:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }

    // Obtener un solo tipo de correspondencia por ID
    public async obtenerTipoCorrespondenciaPorId(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const tipoCorrespondencia: TipoCorrespondenciaI | null = await TipoCorrespondencia.findOne({ where: { id: parseInt(id) } });
            if (tipoCorrespondencia) {
                res.status(200).json(tipoCorrespondencia); // Cambiado para devolver el objeto directamente
            } else {
                res.status(404).json({ msg: "El Tipo de Correspondencia no existe" });
            }
        } catch (error) {
            console.error('Error en obtenerTipoCorrespondenciaPorId:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }




}
