'use server'

import { TaskRepository } from '@/backend/repositories/task-repository';
import { TaskService } from '@/backend/services/task-service';
import { prisma } from '../lib/prisma';

export default async function listTask() {
  const taskRepository = new TaskRepository(prisma);
  const taskService = new TaskService(taskRepository);

  try {
    return await taskService.getAll();
  } catch (error) {
    return `Error creating task: ${error}`;
  }
}
