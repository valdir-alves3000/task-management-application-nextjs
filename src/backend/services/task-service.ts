import { randomUUID } from 'crypto';
import { TaskModel } from '../models/task-model';
import { TaskRepository } from '../repositories/task-repository';

export class TaskService {
  _taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this._taskRepository = taskRepository;
  }

  async getAll() {
    return await this._taskRepository.getAll()
  }

  async getTaskById(id: string): Promise<TaskModel | string> {
    const task = await this._taskRepository.getTaskById(id)
    if (!task) return "Task not found."

    return task
  }

  async create(description: string): Promise<TaskModel | string> {
    if (!description) return "task is required."
    const id = randomUUID()
    const task = await this._taskRepository.create({ id, description })

    return task
  }

  async delete(id: string) {
    const task = await this._taskRepository.getTaskById(id)
    if (!task) return false

    const isDeleted = await this._taskRepository.delete(id)
    return isDeleted
  }

  async updateStatus(id: string, status: string): Promise<TaskModel | string> {
    const task = await this._taskRepository.getTaskById(id)
    if (!task) return "Task not found."

    const updatedTask = await this._taskRepository.updateStatus(id, status)
    return updatedTask
  }
}