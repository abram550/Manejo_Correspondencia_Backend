import { Request, Response } from 'express';
import { TipoEmpleado, TipoEmpleadoI } from '../models/TipoEmpleado';

export class TipoEmpleadoController {
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hola, método test para TipoEmpleado');
        } catch (error) {
            res.status(500).json({ msg: "Error interno" });
        }
    }

    public async getAllTipoEmpleados(req: Request, res: Response): Promise<void> {
        try {
            const tiposEmpleado: TipoEmpleadoI[] = await TipoEmpleado.findAll();
            res.status(200).json({ tiposEmpleado });
        } catch (error) {
            console.error('Error en getAllTipoEmpleados:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }

    public async getOneTipoEmpleado(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;

        try {
            const tipoEmpleado: TipoEmpleadoI | null = await TipoEmpleado.findOne({ where: { id: parseInt(idParam) } });

            if (tipoEmpleado) {
                res.status(200).json({ tipoEmpleado });
            } else {
                res.status(404).json({ msg: "El Tipo de Empleado no existe" });
            }
        } catch (error) {
            console.error('Error en getOneTipoEmpleado:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }

    public async createTipoEmpleado(req: Request, res: Response): Promise<void> {
        const { puesto } = req.body;

        try {
            const tipoEmpleado: TipoEmpleadoI = await TipoEmpleado.create({ puesto });
            res.status(201).json({ tipoEmpleado });
        } catch (error) {
            console.error('Error al crear el tipo de empleado:', error);
            res.status(500).json({ msg: "Error al crear el tipo de empleado" });
        }
    }

    public async updateTipoEmpleado(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        const { puesto } = req.body;

        try {
            const tipoEmpleadoExist: TipoEmpleadoI | null = await TipoEmpleado.findByPk(pk);

            if (!tipoEmpleadoExist) {
                res.status(404).json({ msg: "El Tipo de Empleado no existe" });
            } else {
                await TipoEmpleado.update({ puesto }, { where: { id: pk } });
                const tipoEmpleado: TipoEmpleadoI | null = await TipoEmpleado.findByPk(pk);
                res.status(200).json({ tipoEmpleado });
            }
        } catch (error) {
            console.error('Error al actualizar el tipo de empleado:', error);
            res.status(500).json({ msg: "Error al actualizar el tipo de empleado" });
        }
    }

    public async deleteTipoEmpleado(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;

        try {
            const tipoEmpleadoExist: TipoEmpleadoI | null = await TipoEmpleado.findByPk(pk);
            if (!tipoEmpleadoExist) {
                res.status(404).json({ msg: "El Tipo de Empleado no existe" });
            } else {
                await TipoEmpleado.destroy({ where: { id: pk } });
                res.status(200).json({ msg: "Tipo de Empleado Eliminado" });
            }
        } catch (error) {
            console.error('Error al eliminar el tipo de empleado:', error);
            res.status(500).json({ msg: "Error al eliminar el tipo de empleado" });
        }
    }



    public async obtenerTodosTiposEmpleados(req: Request, res: Response): Promise<void> { 
        try {
            // Obtiene todos los tipos de empleados de la base de datos
            const tiposEmpleado: TipoEmpleadoI[] = await TipoEmpleado.findAll();
            
            // Responde con el array directamente
            res.status(200).json(tiposEmpleado); // Cambiado para devolver un array directamente
        } catch (error) {
            console.error('Error en obtenerTodosTiposEmpleados:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }
    
    public async obtenerTipoEmpleadoPorId(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;
    
        try {
            const tipoEmpleado: TipoEmpleadoI | null = await TipoEmpleado.findOne({ where: { id: parseInt(idParam) } });
    
            if (tipoEmpleado) {
                res.status(200).json(tipoEmpleado); // Cambiado para devolver el objeto directamente
            } else {
                res.status(404).json({ msg: "El Tipo de Empleado no existe" });
            }
        } catch (error) {
            console.error('Error en obtenerTipoEmpleadoPorId:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }
    





    
}
