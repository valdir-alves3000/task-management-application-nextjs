'use server'

import { TaskRepository } from '@/backend/repositories/task-repository';
import { TaskService } from '@/backend/services/task-service';
import { prisma } from '../lib/prisma';

export default async function updateTask(id: string, status: string) {
  const taskRepository = new TaskRepository(prisma);
  const taskService = new TaskService(taskRepository);

  if (!id) return 'Task ID is required.';
  if (!status) return 'At least one field (description or status) is required to update.';

  try {
    const task = await taskService.getTaskById(id);
    if (!task) return 'Task not found.';

    const updatedTask = await taskService.updateStatus(id, status);
    return updatedTask;
  } catch (error) {
    return `Error updating task: ${error}`;
  }
}
