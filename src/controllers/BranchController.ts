// Importing necessary modules for handling HTTP requests and database models
import { Request, Response } from 'express'; // Importing types for request and response objects
import { Branch, BranchI } from '../models/Branch'; // Importing Branch model and its interface for type safety

// Defining the BranchController class to manage CRUD operations on Branch entities
export class BranchController {
    /**
     * Retrieves all branches from the database and sends them in the response.
     * @param req - Express HTTP request object
     * @param res - Express HTTP response object
     */
    public async getAllBranches(req: Request, res: Response): Promise<void> {
        try {
            const branches: BranchI[] = await Branch.findAll(); // Fetch all branches
            res.status(200).json({ branches }); // Send branches as JSON response
        } catch (error) {
            console.error('Error in getAllBranches:', error); // Log any errors
            res.status(500).json({ msg: "Internal Server Error" }); // Respond with a server error message
        }
    }

    /**
     * Retrieves a single branch by its ID and sends it in the response.
     * @param req - Express HTTP request object containing branch ID in params
     * @param res - Express HTTP response object
     */
    public async getOneBranch(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // Extract branch ID from request parameters

        try {
            const branch: BranchI | null = await Branch.findOne({ where: { id } }); // Find branch by ID
            if (branch) {
                res.status(200).json({ branch }); // Send the branch if found
            } else {
                res.status(404).json({ msg: "The branch does not exist" }); // Respond with a not found message
            }
        } catch (error) {
            console.error('Error in getOneBranch:', error); // Log any errors
            res.status(500).json({ msg: "Internal Server Error" }); // Respond with a server error message
        }
    }

    /**
     * Creates a new branch with the details provided in the request body.
     * @param req - Express HTTP request object containing branch details in the body
     * @param res - Express HTTP response object
     */
    public async createBranch(req: Request, res: Response): Promise<void> {
        const { name, address, city, phone } = req.body; // Extract branch details from request body

        try {
            const newBranch: BranchI = await Branch.create({ name, address, city, phone }); // Create a new branch
            res.status(201).json({ newBranch }); // Respond with the created branch
        } catch (error) {
            console.error('Error in createBranch:', error); // Log any errors
            res.status(500).json({ msg: "Error creating the branch" }); // Respond with a creation error message
        }
    }

    /**
     * Updates an existing branch with new details provided in the request body.
     * @param req - Express HTTP request object containing branch ID in params and updated details in the body
     * @param res - Express HTTP response object
     */
    public async updateBranch(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // Extract branch ID from request parameters
        const { name, address, city, phone } = req.body; // Extract updated branch details from request body

        try {
            const existingBranch: BranchI | null = await Branch.findByPk(id); // Find the branch by ID
            if (!existingBranch) {
                res.status(404).json({ msg: "The branch does not exist" }); // Respond if the branch is not found
                return;
            }

            await Branch.update({ name, address, city, phone }, { where: { id } }); // Update the branch details
            const updatedBranch: BranchI | null = await Branch.findByPk(id); // Retrieve the updated branch
            res.status(200).json({ branch: updatedBranch }); // Respond with the updated branch
        } catch (error) {
            console.error('Error in updateBranch:', error); // Log any errors
            res.status(500).json({ msg: "Error updating the branch" }); // Respond with an update error message
        }
    }

    /**
     * Deletes a branch specified by its ID.
     * @param req - Express HTTP request object containing branch ID in params
     * @param res - Express HTTP response object
     */
    public async deleteBranch(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // Extract branch ID from request parameters

        try {
            const existingBranch: BranchI | null = await Branch.findByPk(id); // Find the branch by ID
            if (!existingBranch) {
                res.status(404).json({ msg: "The branch does not exist" }); // Respond if the branch is not found
                return;
            }

            await Branch.destroy({ where: { id } }); // Delete the branch
            res.status(200).json({ msg: "Branch Deleted" }); // Respond with a success message
        } catch (error) {
            console.error('Error in deleteBranch:', error); // Log any errors
            res.status(500).json({ msg: "Error deleting the branch" }); // Respond with a deletion error message
        }
    }

    /**
     * Alternative method to fetch all branches and return them directly.
     * @param req - Express HTTP request object
     * @param res - Express HTTP response object
     */
    public async fetchAllBranches(req: Request, res: Response): Promise<void> {
        try {
            const branches: BranchI[] = await Branch.findAll(); // Fetch all branches
            res.status(200).json(branches); // Send branches directly as an array
        } catch (error) {
            console.error('Error in fetchAllBranches:', error); // Log any errors
            res.status(500).json({ msg: "Internal Server Error" }); // Respond with a server error message
        }
    }

    /**
     * Alternative method to fetch a single branch by its ID and return it directly.
     * @param req - Express HTTP request object containing branch ID in params
     * @param res - Express HTTP response object
     */
    public async fetchBranchById(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // Extract branch ID from request parameters

        try {
            const branch: BranchI | null = await Branch.findOne({ where: { id: parseInt(id) } }); // Find branch by ID
            if (branch) {
                res.status(200).json(branch); // Respond with the branch directly
            } else {
                res.status(404).json({ msg: "The branch does not exist" }); // Respond if the branch is not found
            }
        } catch (error) {
            console.error('Error in fetchBranchById:', error); // Log any errors
            res.status(500).json({ msg: "Internal Server Error" }); // Respond with a server error message
        }
    }
}
