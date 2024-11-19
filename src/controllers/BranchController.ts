// Importing necessary modules from express and models
import { Request, Response } from 'express';
import { Branch, BranchI } from '../models/Branch'; // Importing Branch model

// Branch Controller class to manage branches
export class BranchController {
    // Method to get all branches
    public async getAllBranches(req: Request, res: Response): Promise<void> {
        try {
            // Fetch all branches from the database
            const branches: BranchI[] = await Branch.findAll();
            // Send response with the branches
            res.status(200).json({ branches });
        } catch (error) {
            console.error('Error in getAllBranches:', error);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }

    // Method to get a specific branch by ID
    public async getOneBranch(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // Extracting id from request parameters

        try {
            // Fetch branch by ID
            const branch: BranchI | null = await Branch.findOne({ where: { id } });
            // Check if the branch exists
            if (branch) {
                res.status(200).json({ branch });
            } else {
                res.status(404).json({ msg: "The branch does not exist" });
            }
        } catch (error) {
            console.error('Error in getOneBranch:', error);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }

    // Method to create a new branch
    public async createBranch(req: Request, res: Response): Promise<void> {
        const { name, address, city, phone } = req.body; // Extracting branch details from request body

        try {
            // Create new branch
            const newBranch: BranchI = await Branch.create({ name, address, city, phone });
            res.status(201).json({ newBranch }); // Send response with the new branch
        } catch (error) {
            console.error('Error in createBranch:', error);
            res.status(500).json({ msg: "Error creating the branch" });
        }
    }

    // Method to update an existing branch
    public async updateBranch(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // Extracting id from request parameters
        const { name, address, city, phone } = req.body; // Extracting updated details from request body

        try {
            // Check if the branch exists
            const existingBranch: BranchI | null = await Branch.findByPk(id);
            if (!existingBranch) {
                res.status(404).json({ msg: "The branch does not exist" });
                return;
            }

            // Update branch details
            await Branch.update({ name, address, city, phone }, { where: { id } });
            // Fetch updated branch data
            const updatedBranch: BranchI | null = await Branch.findByPk(id);
            res.status(200).json({ branch: updatedBranch }); // Send response with updated branch
        } catch (error) {
            console.error('Error in updateBranch:', error);
            res.status(500).json({ msg: "Error updating the branch" });
        }
    }

    // Method to delete a branch
    public async deleteBranch(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // Extracting id from request parameters

        try {
            // Check if the branch exists
            const existingBranch: BranchI | null = await Branch.findByPk(id);
            if (!existingBranch) {
                res.status(404).json({ msg: "The branch does not exist" });
                return;
            }

            // Delete the branch
            await Branch.destroy({ where: { id } });
            res.status(200).json({ msg: "Branch Deleted" }); // Send success message
        } catch (error) {
            console.error('Error in deleteBranch:', error);
            res.status(500).json({ msg: "Error deleting the branch" });
        }
    }

    // Method to get all branches (alternative method)
    public async fetchAllBranches(req: Request, res: Response): Promise<void> {
        try {
            // Fetch all branches from the database
            const branches: BranchI[] = await Branch.findAll();
            // Send response with branches directly
            res.status(200).json(branches); // Changed to return an array directly
        } catch (error) {
            console.error('Error in fetchAllBranches:', error);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }

    // Method to get a branch by ID (alternative method)
    public async fetchBranchById(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // Extracting id from request parameters

        try {
            // Fetch branch by ID
            const branch: BranchI | null = await Branch.findOne({ where: { id: parseInt(id) } });
            // Check if the branch exists
            if (branch) {
                res.status(200).json(branch); // Changed to return the object directly
            } else {
                res.status(404).json({ msg: "The branch does not exist" });
            }
        } catch (error) {
            console.error('Error in fetchBranchById:', error);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }
}