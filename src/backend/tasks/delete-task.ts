'use server'

import { TaskRepository } from '@/backend/repositories/task-repository';
import { TaskService } from '@/backend/services/task-service';
import { prisma } from '../lib/prisma';

export default async function deleteTask(id: string) {
  const taskRepository = new TaskRepository(prisma);
  const taskService = new TaskService(taskRepository);

  if (!id) return 'Task ID is required.';

  try {
    const isDeleted = await taskService.delete(id);
    return isDeleted ? `Task ${id} deleted successfully.` : `Task not found.`;
  } catch (error) {
    return `Error deleting task: ${error}`;
  }
}
