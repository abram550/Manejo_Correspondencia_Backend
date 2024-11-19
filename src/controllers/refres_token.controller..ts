import { Request, Response } from 'express';
import { RefreshToken } from '../models/RefreshToken';
import { User } from '../models/User';

export class RefreshTokenController {
  /**
   * Obtener todos los tokens de refresco
   * Incluye información del usuario asociado.
   */
  public async getAllRefreshToken(req: Request, res: Response): Promise<void> {
    try {
      const refreshTokens = await RefreshToken.findAll({
        include: [
          {
            model: User,
            as: 'user', // Alias definido en el modelo
            attributes: ['id', 'name', 'email'], // Solo incluye estos campos del usuario
          },
        ],
      });

      res.status(200).json({ refreshTokens });
    } catch (error) {
      console.error('Error al obtener los tokens de refresco:', error);
      res.status(500).json({ error: 'Error al obtener los tokens de refresco' });
    }
  }
}
