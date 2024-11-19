import { Request, Response } from 'express';
import { UserType, UserTypeI } from '../models/UserType';

export class UserTypeController {
    // Test method to verify if the controller is working
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hello, test method for UserType');
        } catch (error) {
            res.status(500).json({ msg: "Internal server error" });
        }
    }

    // Retrieve all user types
    public async getAllUserTypes(req: Request, res: Response): Promise<void> {
        try {
            const userTypes: UserTypeI[] = await UserType.findAll();
            res.status(200).json({ userTypes });
        } catch (error) {
            console.error('Error in getAllUserTypes:', error);
            res.status(500).json({ msg: "Internal server error" });
        }
    }

    // Retrieve a single user type by ID
    public async getOneUserType(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;

        try {
            const userType: UserTypeI | null = await UserType.findOne({ where: { id: parseInt(idParam) } });

            if (userType) {
                res.status(200).json({ userType });
            } else {
                res.status(404).json({ msg: "The User Type does not exist" });
            }
        } catch (error) {
            console.error('Error in getOneUserType:', error);
            res.status(500).json({ msg: "Internal server error" });
        }
    }

    // Create a new user type
    public async createUserType(req: Request, res: Response): Promise<void> {
        const { description } = req.body;

        try {
            const userType: UserTypeI = await UserType.create({ description });
            res.status(201).json({ userType });
        } catch (error) {
            console.error('Error in createUserType:', error);
            res.status(500).json({ msg: "Error creating user type" });
        }
    }

    // Update an existing user type
    public async updateUserType(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        const { description } = req.body;

        try {
            const existingUserType: UserTypeI | null = await UserType.findByPk(pk);

            if (!existingUserType) {
                res.status(404).json({ msg: "The User Type does not exist" });
            } else {
                await UserType.update({ description }, { where: { id: pk } });
                const userType: UserTypeI | null = await UserType.findByPk(pk);
                res.status(200).json({ userType });
            }
        } catch (error) {
            console.error('Error in updateUserType:', error);
            res.status(500).json({ msg: "Error updating user type" });
        }
    }

    // Delete a user type
    public async deleteUserType(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;

        try {
            const existingUserType: UserTypeI | null = await UserType.findByPk(pk);
            if (!existingUserType) {
                res.status(404).json({ msg: "The User Type does not exist" });
            } else {
                await UserType.destroy({ where: { id: pk } });
                res.status(200).json({ msg: "User Type Deleted" });
            }
        } catch (error) {
            console.error('Error in deleteUserType:', error);
            res.status(500).json({ msg: "Error deleting user type" });
        }
    }
}
