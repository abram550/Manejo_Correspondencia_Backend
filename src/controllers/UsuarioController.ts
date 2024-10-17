import { Request, Response } from 'express';
import { Usuario, UsuarioI } from '../models/Usuario';
import { TipoUsuario } from '../models/TipoUsuario'; // Importar el modelo TipoUsuario

export class UsuarioController {
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hola, método test para Usuario');
        } catch (error) {
            res.status(500).json({ msg: "Error interno" });
        }
    }

    public async getAllUsuarios(req: Request, res: Response): Promise<void> {
        try {
            const usuarios: UsuarioI[] = await Usuario.findAll({
                include: {
                    model: TipoUsuario,
                    as: 'tipoUsuario',
                    attributes: ['descripcion'] // Mostrar solo la descripción
                },
                attributes: { exclude: ['tipoUsuarioId'] } // Excluir el id del tipo de usuario
            });
            res.status(200).json({ usuarios });
        } catch (error) {
            console.error('Error en getAllUsuarios:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }

    public async getOneUsuario(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;

        try {
            const usuario: UsuarioI | null = await Usuario.findOne({
                where: { id: parseInt(idParam) },
                include: {
                    model: TipoUsuario,
                    as: 'tipoUsuario',
                    attributes: ['descripcion']
                },
                attributes: { exclude: ['tipoUsuarioId'] }
            });

            if (usuario) {
                res.status(200).json({ usuario });
            } else {
                res.status(404).json({ msg: "El Usuario no existe" });
            }
        } catch (error) {
            console.error('Error en getOneUsuario:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }

    public async createUsuario(req: Request, res: Response): Promise<void> {
        const { nombre, direccion, correo, telefono, tipoUsuarioId } = req.body;

        try {
            const usuario: UsuarioI = await Usuario.create({ 
                nombre, 
                direccion, 
                correo, 
                telefono, 
                tipoUsuarioId 
            });

            res.status(201).json({ usuario });
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            res.status(500).json({ msg: "Error al crear el usuario" });
        }
    }

    public async updateUsuario(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        const { nombre, direccion, correo, telefono, tipoUsuarioId } = req.body;

        try {
            const usuarioExist: UsuarioI | null = await Usuario.findByPk(pk);

            if (!usuarioExist) {
                res.status(404).json({ msg: "El Usuario no existe" });
            } else {
                await Usuario.update({ nombre, direccion, correo, telefono, tipoUsuarioId }, { where: { id: pk } });
                const usuario: UsuarioI | null = await Usuario.findByPk(pk);
                res.status(200).json({ usuario });
            }
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ msg: "Error al actualizar el usuario" });
        }
    }

    public async deleteUsuario(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;

        try {
            const usuarioExist: UsuarioI | null = await Usuario.findByPk(pk);
            if (!usuarioExist) {
                res.status(404).json({ msg: "El Usuario no existe" });
            } else {
                await Usuario.destroy({ where: { id: pk } });
                res.status(200).json({ msg: "Usuario Eliminado" });
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            res.status(500).json({ msg: "Error al eliminar el usuario" });
        }
    }

    public async obtenerTodosUsuarios(req: Request, res: Response): Promise<void> { 
        try {
            const usuarios: UsuarioI[] = await Usuario.findAll({
                include: {
                    model: TipoUsuario,
                    as: 'tipoUsuario',
                    attributes: ['descripcion'] // Mostrar solo la descripción
                },
                attributes: { exclude: ['tipoUsuarioId'] } // Excluir el id del tipo de usuario
            });
    
            res.status(200).json(usuarios); // Devuelve el array directamente
        } catch (error) {
            console.error('Error en obtenerTodosUsuarios:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }
    
    public async obtenerUsuarioPorId(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;
    
        try {
            const usuario: UsuarioI | null = await Usuario.findOne({
                where: { id: parseInt(idParam) },
                include: {
                    model: TipoUsuario,
                    as: 'tipoUsuario',
                    attributes: ['descripcion']
                },
                attributes: { exclude: ['tipoUsuarioId'] }
            });
    
            if (usuario) {
                res.status(200).json(usuario); // Devuelve el objeto directamente
            } else {
                res.status(404).json({ msg: "El Usuario no existe" });
            }
        } catch (error) {
            console.error('Error en obtenerUsuarioPorId:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }
    





}
