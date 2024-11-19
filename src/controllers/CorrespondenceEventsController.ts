import { Request, Response } from 'express';
import { CorrespondenceEvents } from '../models/CorrespondenceEvents';

/**
 * Controller for managing correspondence event operations
 */
export class CorrespondenceEventsController {
    /**
     * Test method for the correspondence events
     * @param req - Express request object
     * @param res - Express response object
     */
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hello, test method for CorrespondenceEvents'); // Respond with a test message
        } catch (error) {
            res.status(500).json({ msg: "Internal error" }); // Respond with an internal server error message
        }
    }

    /**
     * Retrieve all correspondence events
     * @param req - Express request object
     * @param res - Express response object
     */
    public async getAllEvents(req: Request, res: Response): Promise<void> {
        try {
            const events = await CorrespondenceEvents.findAll(); // Fetch all correspondence events from the database
            res.status(200).json({ events }); // Respond with a success status and the events
        } catch (error) {
            console.error('Error in getAllEvents:', error); // Log the error
            res.status(500).json({ msg: "Internal error" }); // Respond with an internal server error message
        }
    }

    /**
     * Retrieve a single correspondence event by its ID
     * @param req - Express request object
     * @param res - Express response object
     */
    public async getOneEvent(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params; // Extract the event ID from the request parameters

        try {
            const event = await CorrespondenceEvents.findOne({ where: { id: idParam } }); // Fetch the event with the specified ID

            if (event) {
                res.status(200).json({ event }); // Respond with the found event
            } else {
                res.status(404).json({ msg: "The event does not exist" }); // Respond with a not found message
            }
        } catch (error) {
            res.status(500).json({ msg: "Internal error" }); // Respond with an internal server error message
        }
    }

    /**
     * Create a new correspondence event
     * @param req - Express request object
     * @param res - Express response object
     */
    public async createEvent(req: Request, res: Response): Promise<void> {
        const { correspondenceId, branchId, employeeId, correspondenceStatusId, eventDate, description } = req.body; // Extract event details from the request body

        try {
            const event = await CorrespondenceEvents.create({
                correspondenceId,
                branchId,
                employeeId,
                correspondenceStatusId,
                eventDate,
                description,
            }); // Create a new correspondence event in the database
            res.status(201).json({ event }); // Respond with a created status and the new event
        } catch (error) {
            res.status(500).json({ msg: "Error creating event" }); // Respond with an error message
        }
    }

    /**
     * Update an existing correspondence event
     * @param req - Express request object
     * @param res - Express response object
     */
    public async updateEvent(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params; // Extract the event ID from the request parameters
        const { correspondenceId, branchId, employeeId, correspondenceStatusId, eventDate, description } = req.body; // Extract updated event details from the request body

        try {
            const eventExists = await CorrespondenceEvents.findByPk(pk); // Check if the event exists

            if (!eventExists) {
                res.status(404).json({ msg: "The event does not exist" }); // Respond with a not found message
            } else {
                await CorrespondenceEvents.update({
                    correspondenceId,
                    branchId,
                    employeeId,
                    correspondenceStatusId,
                    eventDate,
                    description,
                }, { where: { id: pk } }); // Update the event details in the database

                const updatedEvent = await CorrespondenceEvents.findByPk(pk); // Retrieve the updated event
                res.status(200).json({ event: updatedEvent }); // Respond with the updated event
            }
        } catch (error) {
            res.status(500).json({ msg: "Error updating event" }); // Respond with an error message
        }
    }

    /**
     * Delete a correspondence event by its ID
     * @param req - Express request object
     * @param res - Express response object
     */
    public async deleteEvent(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params; // Extract the event ID from the request parameters

        try {
            const eventExists = await CorrespondenceEvents.findByPk(pk); // Check if the event exists

            if (!eventExists) {
                res.status(404).json({ msg: "The event does not exist" }); // Respond with a not found message
            } else {
                await CorrespondenceEvents.destroy({ where: { id: pk } }); // Delete the event from the database
                res.status(200).json({ msg: "Event Deleted" }); // Respond with a success message
            }
        } catch (error) {
            res.status(500).json({ msg: "Error deleting event" }); // Respond with an error message
        }
    }
}
