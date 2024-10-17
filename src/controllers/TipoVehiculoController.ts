import { Request, Response } from 'express';
import { TipoVehiculo, TipoVehiculoI } from '../models/TipoVehiculo';

export class TipoVehiculoController {
    // Método de prueba
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hola, método test para TipoVehiculo');
        } catch (error) {
            res.status(500).json({ msg: "Error interno" });
        }
    }

    // Obtener todos los tipos de vehículos
    public async getAllTipoVehiculos(req: Request, res: Response): Promise<void> {
        try {
            const tiposVehiculo: TipoVehiculoI[] = await TipoVehiculo.findAll();
            res.status(200).json({ tiposVehiculo });
        } catch (error) {
            console.error('Error en getAllTipoVehiculos:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }

    // Obtener un solo tipo de vehículo por ID
    public async getOneTipoVehiculo(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const tipoVehiculo: TipoVehiculoI | null = await TipoVehiculo.findOne({ where: { id } });

            if (tipoVehiculo) {
                res.status(200).json({ tipoVehiculo });
            } else {
                res.status(404).json({ msg: "El Tipo de Vehículo no existe" });
            }
        } catch (error) {
            console.error('Error en getOneTipoVehiculo:', error);
            res.status(500).json({ msg: "Error interno" });
        }
    }

    // Crear un nuevo tipo de vehículo
    public async createTipoVehiculo(req: Request, res: Response): Promise<void> {
        const { descripcion } = req.body;

        try {
            const tipoVehiculo: TipoVehiculoI = await TipoVehiculo.create({ descripcion });
            res.status(201).json({ tipoVehiculo });
        } catch (error) {
            console.error('Error en createTipoVehiculo:', error);
            res.status(500).json({ msg: "Error al crear el tipo de vehículo" });
        }
    }

    // Actualizar un tipo de vehículo existente
    public async updateTipoVehiculo(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { descripcion } = req.body;

        try {
            const tipoVehiculoExist: TipoVehiculoI | null = await TipoVehiculo.findByPk(id);

            if (!tipoVehiculoExist) {
                res.status(404).json({ msg: "El Tipo de Vehículo no existe" });
                return;
            }

            await TipoVehiculo.update({ descripcion }, { where: { id } });
            const tipoVehiculoActualizado: TipoVehiculoI | null = await TipoVehiculo.findByPk(id);
            res.status(200).json({ tipoVehiculo: tipoVehiculoActualizado });
        } catch (error) {
            console.error('Error en updateTipoVehiculo:', error);
            res.status(500).json({ msg: "Error al actualizar el tipo de vehículo" });
        }
    }

    // Eliminar un tipo de vehículo
    public async deleteTipoVehiculo(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const tipoVehiculoExist: TipoVehiculoI | null = await TipoVehiculo.findByPk(id);
            if (!tipoVehiculoExist) {
                res.status(404).json({ msg: "El Tipo de Vehículo no existe" });
                return;
            }

            await TipoVehiculo.destroy({ where: { id } });
            res.status(200).json({ msg: "Tipo de Vehículo Eliminado" });
        } catch (error) {
            console.error('Error en deleteTipoVehiculo:', error);
            res.status(500).json({ msg: "Error al eliminar el tipo de vehículo" });
        }
    }



// Obtener todos los tipos de vehículos
public async obtenerTodosTiposVehiculos(req: Request, res: Response): Promise<void> {
    try {
        // Obtiene todos los tipos de vehículos de la base de datos
        const tiposVehiculo: TipoVehiculoI[] = await TipoVehiculo.findAll();
        
        // Responde con el array directamente
        res.status(200).json(tiposVehiculo); // Cambiado para devolver un array directamente
    } catch (error) {
        console.error('Error en obtenerTodosTiposVehiculos:', error);
        res.status(500).json({ msg: "Error interno" });
    }
}

// Obtener un solo tipo de vehículo por ID
public async obtenerTipoVehiculoPorId(req: Request, res: Response): Promise<void> {
    const { id: idParam } = req.params;

    try {
        const tipoVehiculo: TipoVehiculoI | null = await TipoVehiculo.findOne({ where: { id: parseInt(idParam) } });

        if (tipoVehiculo) {
            res.status(200).json(tipoVehiculo); // Cambiado para devolver el objeto directamente
        } else {
            res.status(404).json({ msg: "El Tipo de Vehículo no existe" });
        }
    } catch (error) {
        console.error('Error en obtenerTipoVehiculoPorId:', error);
        res.status(500).json({ msg: "Error interno" });
    }
}



}
