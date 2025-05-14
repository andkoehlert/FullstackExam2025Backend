import { Request, Response } from 'express';
import { TaskModel } from '../models/task'; // Assuming your Task model is in taskModel
import { connect, disconnect } from '../repositroy/database';

/**
 * Create a new task in the database based on the request body.
 * @param req
 * @param res
 */
export async function createTask(req: Request, res: Response): Promise<void> {
  const { name, status, projectId, _createdBy } = req.body;

  // Debug log to see incoming data
 // console.log('Incoming task data:', req.body);

  // Basic Validation for required fields
  if (!name || !_createdBy) {
    res.status(400).send('Name and creator (_createdBy) are required');
    return;
  }

  const taskData: any = {
    name,
    status: status || 'todo',
    _createdBy,
    employees: [],
  };

  // Only add projectId if it's provided and valid
  if (projectId && typeof projectId === 'string' && projectId.trim() !== '') {
    taskData.projectId = projectId;
  }

  try {
    await connect();

  //  console.log('Task data being saved:', taskData);

    const task = new TaskModel(taskData);
    const result = await task.save();

    // Debug log after saving
   // console.log('Task saved successfully:', result);

    res.status(201).send(result);
  } catch (err) {
    // console.error('Error creating task:', err);
    res.status(500).send('Error creating task: ' + err);
  } finally {
    await disconnect();
  }
}

/**
 * Get all tasks from the database.
 * @param req
 * @param res
 */
export async function getAllTasks(req: Request, res: Response): Promise<void> {
  try {
    await connect();
    
    const query = req.query.projectId 
      ? { projectId: req.query.projectId }
      : {};
    
    const result = await TaskModel.find(query)
      .populate('projectId employees.employeeId');
      
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send('Error fetching tasks: ' + err);
  } finally {
    await disconnect();
  }
}
/**
 * Get a specific task from the database by ID.
 * @param req
 * @param res
 */
export async function getTaskById(req: Request, res: Response): Promise<void> {
  const id = req.params.id;

  try {
    await connect();

    // Find the task by its _id
    const result = await TaskModel.findById(id).populate('projectId employees.employeeId'); // Populate projectId and employeeId

    if (!result) {
      res.status(404).send('Task not found with id: ' + id);
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    res.status(500).send('Error fetching task by id: ' + err);
  } finally {
    await disconnect();
  }
}

/**
 * Update a specific task's status by ID.
 * @param req
 * @param res
 */
export async function updateTaskById(req: Request, res: Response): Promise<void> {
  const id = req.params.id;

  try {
    await connect();

    // Find the task by its ID and update it with new data (status)
    const result = await TaskModel.findByIdAndUpdate(id, req.body, { new: true }).populate('projectId employees.employeeId');

    if (!result) {
      res.status(404).send("Can't update task with id: " + id);
    } else {
      res.status(200).send("Task successfully updated.");
    }
  } catch (err) {
    res.status(500).send('Error updating task by id: ' + err);
  } finally {
    await disconnect();
  }
}

/**
 * Delete a specific task by ID.
 * @param req
 * @param res
 */
export async function deleteTaskById(req: Request, res: Response): Promise<void> {
  const id = req.params.id;

  try {
    await connect();

    // Find the task by its ID and delete it
    const result = await TaskModel.findByIdAndDelete(id);

    if (!result) {
      res.status(404).send("Can't delete task with id: " + id);
    } else {
      res.status(200).send("Task successfully deleted.");
    }
  } catch (err) {
    res.status(500).send('Error deleting task by id: ' + err);
  } finally {
    await disconnect();
  }
}
