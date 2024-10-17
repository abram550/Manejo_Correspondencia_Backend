import { Request, Response } from 'express';
import { TipoUsuario, TipoUsuarioI } from '../models/TipoUsuario';

export class TipoUsuarioController {
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hola, método test para TipoUsuario');
        } catch (error) {
            res.status(500).json({ msg: "Error interno" });
        }
    }

    public async getAllTipoUsuarios(req: Request, res: Response): Promise<void> {
        try {
            const tiposUsuario: TipoUsuarioI[] = await TipoUsuario.findAll();
            res.status(200).json({ tiposUsuario });
        } catch (error) {
            console.error('Error en getAllTipoUsuarios:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }

    public async getOneTipoUsuario(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;

        try {
            const tipoUsuario: TipoUsuarioI | null = await TipoUsuario.findOne({ where: { id: parseInt(idParam) } });

            if (tipoUsuario) {
                res.status(200).json({ tipoUsuario });
            } else {
                res.status(404).json({ msg: "El Tipo de Usuario no existe" });
            }
        } catch (error) {
            console.error('Error en getOneTipoUsuario:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }

    public async createTipoUsuario(req: Request, res: Response): Promise<void> {
        const { descripcion } = req.body;

        try {
            const tipoUsuario: TipoUsuarioI = await TipoUsuario.create({ descripcion });
            res.status(201).json({ tipoUsuario });
        } catch (error) {
            console.error('Error al crear el tipo de usuario:', error);
            res.status(500).json({ msg: "Error al crear el tipo de usuario" });
        }
    }

    public async updateTipoUsuario(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        const { descripcion } = req.body;

        try {
            const tipoUsuarioExist: TipoUsuarioI | null = await TipoUsuario.findByPk(pk);

            if (!tipoUsuarioExist) {
                res.status(404).json({ msg: "El Tipo de Usuario no existe" });
            } else {
                await TipoUsuario.update({ descripcion }, { where: { id: pk } });
                const tipoUsuario: TipoUsuarioI | null = await TipoUsuario.findByPk(pk);
                res.status(200).json({ tipoUsuario });
            }
        } catch (error) {
            console.error('Error al actualizar el tipo de usuario:', error);
            res.status(500).json({ msg: "Error al actualizar el tipo de usuario" });
        }
    }

    public async deleteTipoUsuario(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;

        try {
            const tipoUsuarioExist: TipoUsuarioI | null = await TipoUsuario.findByPk(pk);
            if (!tipoUsuarioExist) {
                res.status(404).json({ msg: "El Tipo de Usuario no existe" });
            } else {
                await TipoUsuario.destroy({ where: { id: pk } });
                res.status(200).json({ msg: "Tipo de Usuario Eliminado" });
            }
        } catch (error) {
            console.error('Error al eliminar el tipo de usuario:', error);
            res.status(500).json({ msg: "Error al eliminar el tipo de usuario" });
        }
    }





    public async obtenerTiposUsuario(req: Request, res: Response): Promise<void> { 
        try {
            // Obtiene todos los tipos de usuario de la base de datos
            const tiposUsuario: TipoUsuarioI[] = await TipoUsuario.findAll();
            
            // Responde con el array directamente
            res.status(200).json(tiposUsuario); // Cambiado para devolver un array directo
        } catch (error) {
            console.error('Error en obtenerTiposUsuario:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }
    
    public async obtenerTipoUsuarioPorId(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;
    
        try {
            const tipoUsuario: TipoUsuarioI | null = await TipoUsuario.findOne({ where: { id: parseInt(idParam) } });
    
            if (tipoUsuario) {
                res.status(200).json(tipoUsuario); // Cambiado para devolver el objeto directamente
            } else {
                res.status(404).json({ msg: "El Tipo de Usuario no existe" });
            }
        } catch (error) {
            console.error('Error en obtenerTipoUsuarioPorId:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }
    

}
