'use server'

import { TaskRepository } from '@/backend/repositories/task-repository';
import { TaskService } from '@/backend/services/task-service';
import { prisma } from '../lib/prisma';

export default async function addTask(description: string) {
  const taskRepository = new TaskRepository(prisma);
  const taskService = new TaskService(taskRepository);

  if (!description) {
    return "Description is required.";
  }

  try {
    const newTask = await taskService.create(description);
    return newTask;
  } catch (error) {
    return `Error creating task: ${error}`;
  }
}
