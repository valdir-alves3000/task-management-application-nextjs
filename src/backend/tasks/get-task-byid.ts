'use server'

import { TaskRepository } from '@/backend/repositories/task-repository';
import { TaskService } from '@/backend/services/task-service';
import { prisma } from '../lib/prisma';

export default async function getTaskById(id: string) {
  const taskRepository = new TaskRepository(prisma);
  const taskService = new TaskService(taskRepository);

  if (!id) return 'Task ID is required.';

  try {
    const task = await taskService.getTaskById(id);
    return task ? task : 'Task not found.';
  } catch (error) {
    return `Error fetching task: ${error}`;
  }
}
