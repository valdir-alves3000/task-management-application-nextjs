import { TaskModel } from "@/backend/models/task-model"
import { TaskRepository } from "@/backend/repositories/task-repository"
import { mockPrisma } from "../__mock__/mock_prisma_client"

describe("TaskRepository", () => {
  let _taskRepository: TaskRepository

  beforeEach(() => {
    _taskRepository = new TaskRepository(mockPrisma)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should create a new task", async () => {
    const task: TaskModel = {
      id: "1", description: "Lavar as mãos", status: "pendente"
    }
    const createTask: TaskModel = {
      id: "1",
      description: "Lavar as mãos"
    };

    (mockPrisma.task.create as jest.Mock).mockResolvedValue(task);
    const result = await _taskRepository.create(createTask)

    expect(mockPrisma.task.create).toHaveBeenCalledWith({
      data: {
        id: task.id,
        description: task.description,
      }
    })

    expect(result).toEqual(task)
  })

  it("should return a list of all tasks", async () => {
    const tasks = [
      { id: "1", name: "Lavar as mãos", status: "pendente" },
      { id: "2", name: "Fazer um bolo", status: "pendente" },
      { id: "3", name: "Lavar a louça", status: "pendente" },
      { id: "4", name: "Levar o lixo para fora", status: "finalizado" },
    ];

    (mockPrisma.task.findMany as jest.Mock).mockReturnValue(tasks)
    const result = await _taskRepository.getAll()

    expect(result).toEqual([
      { id: "1", name: "Lavar as mãos", status: "pendente" },
      { id: "2", name: "Fazer um bolo", status: "pendente" },
      { id: "3", name: "Lavar a louça", status: "pendente" },
      { id: "4", name: "Levar o lixo para fora", status: "finalizado" },
    ])
  })

  it("should delete the task and return true", async () => {
    const taskId = '1234';

    (mockPrisma.task.delete as jest.Mock).mockResolvedValue(true)
    const result = await _taskRepository.delete(taskId)

    expect(mockPrisma.task.delete).toHaveBeenCalledWith({
      where: { id: taskId }
    })

    expect(result).toBe(true)
  })
})
