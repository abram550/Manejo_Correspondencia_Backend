import { Request, Response } from 'express';
import { Empleado, EmpleadoI } from '../models/Empleado';
import { TipoEmpleado } from '../models/TipoEmpleado'; // Importar el modelo TipoEmpleado

export class EmpleadoController {
    public async getAllEmpleados(req: Request, res: Response): Promise<void> {
        try {
            const empleados: EmpleadoI[] = await Empleado.findAll({
                include: {
                    model: TipoEmpleado,
                    as: 'tipoEmpleado', // Alias de la relación
                },
            });
            res.status(200).json({ empleados });
        } catch (error) {
            console.error('Error en getAllEmpleados:', error);
            res.status(500).json({ msg: "Error Interno" });
        }
    }

    public async getOneEmpleado(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const empleado: EmpleadoI | null = await Empleado.findOne({
                where: { id },
                include: {
                    model: TipoEmpleado,
                    as: 'tipoEmpleado', // Alias de la relación
                },
            });
            if (empleado) {
                res.status(200).json({ empleado });
            } else {
                res.status(404).json({ msg: "El Empleado no existe" });
            }
        } catch (error) {
            console.error('Error en getOneEmpleado:', error);
            res.status(500).json({ msg: "Error Interno" });
        }
    }

    public async createEmpleado(req: Request, res: Response): Promise<void> {
        const { nombre, correo, telefono, tipoEmpleadoId } = req.body; // Asegúrate de que se incluya tipoEmpleadoId

        try {
            const nuevoEmpleado: EmpleadoI = await Empleado.create({ nombre, correo, telefono, tipoEmpleadoId });
            res.status(201).json({ nuevoEmpleado });
        } catch (error) {
            console.error('Error en createEmpleado:', error);
            res.status(500).json({ msg: "Error al crear el empleado" });
        }
    }

    public async updateEmpleado(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nombre, correo, telefono, tipoEmpleadoId } = req.body; // Asegúrate de que se incluya tipoEmpleadoId

        try {
            const empleadoExist: EmpleadoI | null = await Empleado.findByPk(id);
            if (!empleadoExist) {
                res.status(404).json({ msg: "El Empleado no existe" });
                return;
            }

            await Empleado.update({ nombre, correo, telefono, tipoEmpleadoId }, { where: { id } });
            const empleadoActualizado: EmpleadoI | null = await Empleado.findByPk(id);
            res.status(200).json({ empleado: empleadoActualizado });
        } catch (error) {
            console.error('Error en updateEmpleado:', error);
            res.status(500).json({ msg: "Error al actualizar el empleado" });
        }
    }

    public async deleteEmpleado(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const empleadoExist: EmpleadoI | null = await Empleado.findByPk(id);
            if (!empleadoExist) {
                res.status(404).json({ msg: "El Empleado no existe" });
                return;
            }

            await Empleado.destroy({ where: { id } });
            res.status(200).json({ msg: "Empleado Eliminado" });
        } catch (error) {
            console.error('Error en deleteEmpleado:', error);
            res.status(500).json({ msg: "Error al eliminar el empleado" });
        }
    }

    public async obtenerTodosEmpleados(req: Request, res: Response): Promise<void> {
        try {
            // Obtiene todos los empleados de la base de datos, incluyendo el tipo de empleado
            const empleados: EmpleadoI[] = await Empleado.findAll({
                include: {
                    model: TipoEmpleado,
                    as: 'tipoEmpleado', // Alias de la relación
                },
            });
            
            // Responde con el array directamente
            res.status(200).json(empleados); // Cambiado para devolver un array directamente
        } catch (error) {
            console.error('Error en obtenerTodosEmpleados:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }
    
    public async obtenerEmpleadoPorId(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
    
        try {
            // Busca un empleado por ID, incluyendo el tipo de empleado
            const empleado: EmpleadoI | null = await Empleado.findOne({
                where: { id },
                include: {
                    model: TipoEmpleado,
                    as: 'tipoEmpleado', // Alias de la relación
                },
            });
            
            if (empleado) {
                // Responde con el objeto directamente
                res.status(200).json(empleado); // Cambiado para devolver el objeto directamente
            } else {
                res.status(404).json({ msg: "El Empleado no existe" });
            }
        } catch (error) {
            console.error('Error en obtenerEmpleadoPorId:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }
    


}
