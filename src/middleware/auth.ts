import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RefreshToken } from '../models/RefreshToken';
import { User } from '../models/User';
import { UserType } from '../models/UserType'; // Importa el modelo UserType
import { UserUserType } from '../models/UserUserType'; // Importa el modelo UserUserType
import { Permission } from '../models/Permission';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  const currentMethod = req.method;

  if (!token) {
    res.status(401).json({ error: 'Acceso denegado' });
    return;
  }

  try {
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET || 'secret') as jwt.JwtPayload;
    const isAuthorized = await permissionResource(jwtPayload.id, currentMethod);
    if (!isAuthorized) {
      res.status(401).json({ error: 'Acceso denegado' });
      return;
    }
    next();
  } catch (error) {
    try {
      const decoded = jwt.decode(token) as jwt.JwtPayload;
      if (!decoded || !decoded.id) {
        throw new Error('Token inválido');
      }

      const isAuthorized = await permissionResource(decoded.id, currentMethod);
      if (!isAuthorized) {
        res.status(401).json({ error: 'Acceso denegado' });
        return;
      }

      const refreshTokenRecord = await RefreshToken.findOne({
        where: { user_id: decoded.id },
        order: [['created_at', 'DESC']]
      });

      if (!refreshTokenRecord || !refreshTokenRecord.is_valid || refreshTokenRecord.expires_at < new Date()) {
        if (refreshTokenRecord) {
          refreshTokenRecord.is_valid = false;
          await refreshTokenRecord.save();
        }
        res.status(401).json({ error: 'Refresh token inválido o expirado' });
        return;
      }

      const user: User | null = await User.findOne({ 
        where: { 
          id: decoded.id,
          is_active: true 
        } 
      });

      if (!user) {
        res.status(401).json({ error: 'Usuario no encontrado' });
        return;
      }

      const newToken = user.generateToken();
      res.setHeader('Authorization', `Bearer ${newToken}`);
      next();
    } catch (refreshError) {
      res.status(401).json({ error: 'Token inválido' });
    }
  }
};

export const permissionResource = async (userId: number, resourceMethod: string) => {
  try {
    // Comprobar si el usuario tiene algún tipo de usuario asignado
    const userWithRolesAndResources = await UserUserType.findAll({
      where: { userId, status: true }, // Asegurarse de que el UserType esté activo
      include: [
        {
          model: UserType,
          required: true,
          include: [
            {
              model: Permission,
              where: { name: resourceMethod },
              required: true,
            }
          ]
        }
      ]
    });

    if (userWithRolesAndResources.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log('Error checking permissions:', error);
    return false;
  }
};
