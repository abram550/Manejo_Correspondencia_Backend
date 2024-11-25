import { Request, Response } from 'express'; // Import Express request and response objects
import { CorrespondenceEvents } from '../models/CorrespondenceEvents'; // Import the CorrespondenceEvents model

/**
 * Controller for managing operations related to correspondence events.
 * Provides methods for CRUD operations and event retrieval.
 */
export class CorrespondenceEventsController {
    /**
     * Test method to check if the controller is working.
     * @param req - Express request object, representing the incoming HTTP request.
     * @param res - Express response object, used to send a response.
     */
    public async test(req: Request, res: Response): Promise<void> {
        try {
            // Send a simple response to verify the controller is functioning
            res.send('Hello, test method for CorrespondenceEvents');
        } catch (error) {
            // Handle errors by responding with a 500 status code
            res.status(500).json({ msg: "Internal error" });
        }
    }

    /**
     * Retrieves all correspondence events from the database.
     * @param req - Express request object.
     * @param res - Express response object.
     */
    public async getAllEvents(req: Request, res: Response): Promise<void> {
        try {
            // Fetch all records from the CorrespondenceEvents table
            const events = await CorrespondenceEvents.findAll();
            // Send the retrieved events with a 200 status code
            res.status(200).json({ events });
        } catch (error) {
            // Log the error for debugging purposes
            console.error('Error in getAllEvents:', error);
            // Respond with a 500 status code indicating an internal server error
            res.status(500).json({ msg: "Internal error" });
        }
    }

    /**
     * Retrieves a single correspondence event by its unique ID.
     * @param req - Express request object.
     * @param res - Express response object.
     */
    public async getOneEvent(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params; // Extract the `id` parameter from the request URL

        try {
            // Fetch a single event matching the provided ID
            const event = await CorrespondenceEvents.findOne({ where: { id: idParam } });

            if (event) {
                // If the event exists, respond with the event details
                res.status(200).json({ event });
            } else {
                // If no event is found, respond with a 404 status code
                res.status(404).json({ msg: "The event does not exist" });
            }
        } catch (error) {
            // Handle server errors with a 500 status code
            res.status(500).json({ msg: "Internal error" });
        }
    }

    /**
     * Creates a new correspondence event in the database.
     * @param req - Express request object containing the event data in the body.
     * @param res - Express response object.
     */
    public async createEvent(req: Request, res: Response): Promise<void> {
        // Extract the required fields from the request body
        const { correspondenceId, branchId, employeeId, correspondenceStatusId, eventDate, description } = req.body;

        try {
            // Create a new record in the CorrespondenceEvents table
            const event = await CorrespondenceEvents.create({
                correspondenceId,
                branchId,
                employeeId,
                correspondenceStatusId,
                eventDate,
                description,
            });
            // Respond with the newly created event and a 201 status code
            res.status(201).json({ event });
        } catch (error) {
            // Handle errors during creation with a 500 status code
            res.status(500).json({ msg: "Error creating event" });
        }
    }

    /**
     * Updates an existing correspondence event by its ID.
     * @param req - Express request object containing the ID in the URL and updated data in the body.
     * @param res - Express response object.
     */
    public async updateEvent(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params; // Extract the `id` parameter from the request URL
        const { correspondenceId, branchId, employeeId, correspondenceStatusId, eventDate, description } = req.body;

        try {
            // Check if the event exists in the database
            const eventExists = await CorrespondenceEvents.findByPk(pk);

            if (!eventExists) {
                // If no event is found, respond with a 404 status code
                res.status(404).json({ msg: "The event does not exist" });
            } else {
                // Update the existing event with the provided data
                await CorrespondenceEvents.update({
                    correspondenceId,
                    branchId,
                    employeeId,
                    correspondenceStatusId,
                    eventDate,
                    description,
                }, { where: { id: pk } });

                // Retrieve the updated event details
                const updatedEvent = await CorrespondenceEvents.findByPk(pk);
                // Respond with the updated event
                res.status(200).json({ event: updatedEvent });
            }
        } catch (error) {
            // Handle errors during update with a 500 status code
            res.status(500).json({ msg: "Error updating event" });
        }
    }

    /**
     * Deletes a correspondence event by its ID.
     * @param req - Express request object containing the ID in the URL.
     * @param res - Express response object.
     */
    public async deleteEvent(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params; // Extract the `id` parameter from the request URL

        try {
            // Check if the event exists in the database
            const eventExists = await CorrespondenceEvents.findByPk(pk);

            if (!eventExists) {
                // If no event is found, respond with a 404 status code
                res.status(404).json({ msg: "The event does not exist" });
            } else {
                // Delete the event from the database
                await CorrespondenceEvents.destroy({ where: { id: pk } });
                // Respond with a success message and a 200 status code
                res.status(200).json({ msg: "Event Deleted" });
            }
        } catch (error) {
            // Handle errors during deletion with a 500 status code
            res.status(500).json({ msg: "Error deleting event" });
        }
    }
}
