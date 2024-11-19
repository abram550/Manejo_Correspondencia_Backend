// Importing necessary modules from express and models
import { Request, Response } from 'express';
import { Route, RouteI } from '../models/Route'; // Importing Route model
import { Branch } from '../models/Branch'; // Importing Branch model

// Route Controller class to manage routes
export class RouteController {
    // Method to get all routes
    public async getAllRoutes(req: Request, res: Response): Promise<void> {
        try {
            // Fetch all routes with related branches
            const routes: RouteI[] = await Route.findAll({
                include: [
                    { model: Branch, as: 'originBranch' }, 
                    { model: Branch, as: 'destinationBranch' }
                ]
            });
            // Send response with routes
            res.status(200).json({ routes });
        } catch (error) {
            console.error('Error in getAllRoutes:', error);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }

    // Method to get a specific route by ID
    public async getOneRoute(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // Extracting id from request parameters

        try {
            // Fetch route by ID with related branches
            const route: RouteI | null = await Route.findOne({
                where: { id },
                include: [
                    { model: Branch, as: 'originBranch' }, 
                    { model: Branch, as: 'destinationBranch' }
                ]
            });

            // Check if the route exists
            if (route) {
                res.status(200).json({ route });
            } else {
                res.status(404).json({ msg: "The route does not exist" });
            }
        } catch (error) {
            console.error('Error in getOneRoute:', error);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }

    // Method to create a new route
    public async createRoute(req: Request, res: Response): Promise<void> {
        const { originBranchId, destinationBranchId, distanceKm, estimatedTimeHours } = req.body; // Extracting route details from request body

        try {
            // Create new route
            const newRoute: RouteI = await Route.create({
                originBranchId, 
                destinationBranchId, 
                distanceKm, 
                estimatedTimeHours
            });
            res.status(201).json({ newRoute }); // Send response with the new route
        } catch (error) {
            console.error('Error in createRoute:', error);
            res.status(500).json({ msg: "Error creating the route" });
        }
    }

    // Method to update an existing route
    public async updateRoute(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // Extracting id from request parameters
        const { originBranchId, destinationBranchId, distanceKm, estimatedTimeHours } = req.body; // Extracting updated details from request body

        try {
            // Check if the route exists
            const existingRoute: RouteI | null = await Route.findByPk(id);
            if (!existingRoute) {
                res.status(404).json({ msg: "The route does not exist" });
                return;
            }

            // Update route details
            await Route.update({
                originBranchId, 
                destinationBranchId, 
                distanceKm, 
                estimatedTimeHours
            }, { where: { id } });

            // Fetch updated route data
            const updatedRoute: RouteI | null = await Route.findByPk(id);
            res.status(200).json({ route: updatedRoute }); // Send response with updated route
        } catch (error) {
            console.error('Error in updateRoute:', error);
            res.status(500).json({ msg: "Error updating the route" });
        }
    }

    // Method to delete a route
    public async deleteRoute(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // Extracting id from request parameters

        try {
            // Check if the route exists
            const existingRoute: RouteI | null = await Route.findByPk(id);
            if (!existingRoute) {
                res.status(404).json({ msg: "The route does not exist" });
                return;
            }

            // Delete the route
            await Route.destroy({ where: { id } });
            res.status(200).json({ msg: "Route Deleted" }); // Send success message
        } catch (error) {
            console.error('Error in deleteRoute:', error);
            res.status(500).json({ msg: "Error deleting the route" });
        }
    }
}