import { PrismaClient } from "@prisma/client"
import { TaskModel } from "../models/task-model"

export class TaskRepository {
  _prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this._prisma = prisma
  }

  async create({ id, description }: TaskModel) {
    const task = await this._prisma.task.create({
      data: {
        id, description
      }
    })

    return task
  }

  async getTaskById(id: string): Promise<TaskModel | null> {
    const task = this._prisma.task.findUnique({
      where: {
        id,
      },
    })

    return task
  }

  async delete(id: string): Promise<boolean> {
    const deletedUser = await this._prisma.task.delete({
      where: {
        id,
      },
    });

    return !!deletedUser
  }

  async updateStatus(id: string, status: string): Promise<TaskModel | string> {
    const task = await this._prisma.task.findUnique({
      where: {
        id
      }
    })
    if (!task) return "Task not found."

    const updateTask = await this._prisma.task.update({
      where: { id }, data: {
        status
      }
    })

    return updateTask
  }

  async getAll(): Promise<TaskModel[]> {
    const tasks = await this._prisma.task.findMany()
    return tasks
  }
}