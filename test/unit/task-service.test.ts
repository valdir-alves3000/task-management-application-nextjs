import { TaskModel } from '@/backend/models/task-model';
import { TaskRepository } from '@/backend/repositories/task-repository';
import { TaskService } from '@/backend/services/task-service';
import { mockPrisma } from '../__mock__/mock_prisma_client';

jest.mock('@/backend/repositories/task-repository');

const ID_UUID = '0';
jest.mock('crypto', () => ({
  randomUUID: jest.fn(() => ID_UUID),
}));

describe('Task Service Suite', () => {
  let _mockTaskRepository: jest.Mocked<TaskRepository>;
  let _service: TaskService;

  beforeEach(() => {
    _mockTaskRepository = new TaskRepository(mockPrisma) as jest.Mocked<TaskRepository>;
    _service = new TaskService(_mockTaskRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create Task', () => {
    it('should create the task', async () => {
      const mockTask = {
        id: '0',
        description: 'Lavar a louça',
        status: 'pendente',
      };
      const description = 'Lavar a louça';

      jest.spyOn(_mockTaskRepository, 'create').mockResolvedValue(mockTask);

      const result = await _service.create(description);

      expect(_mockTaskRepository.create).toHaveBeenCalledWith({
        id: '0',
        description: 'Lavar a louça',
      });
      expect(result).toEqual(mockTask);
    });

    it('should return error if description is missing', async () => {
      const result = await _service.create('');

      expect(result).toBe('task is required.');
    });
  });

  describe('getTaskById', () => {
    it('should return a task by ID', async () => {
      const mockTask: TaskModel = {
        id: '0',
        description: 'Lavar a louça',
        status: 'pendente',
      };

      jest.spyOn(_mockTaskRepository, 'getTaskById').mockResolvedValue(mockTask);

      const result = await _service.getTaskById('0');

      expect(_mockTaskRepository.getTaskById).toHaveBeenCalledWith('0');
      expect(result).toEqual(mockTask);
    });

    it('should return error if task is not found', async () => {
      jest.spyOn(_mockTaskRepository, 'getTaskById').mockResolvedValue(null);

      const result = await _service.getTaskById('1');

      expect(_mockTaskRepository.getTaskById).toHaveBeenCalledWith('1');
      expect(result).toBe('Task not found.');
    });
  });

  describe('delete Task', () => {
    it('should delete the task by ID', async () => {
      const mockTask: TaskModel = {
        id: '0',
        description: 'Lavar a louça',
        status: 'pendente',
      };

      jest.spyOn(_mockTaskRepository, 'getTaskById').mockResolvedValue(mockTask);
      jest.spyOn(_mockTaskRepository, 'delete').mockResolvedValue(true);

      const result = await _service.delete('0');

      expect(_mockTaskRepository.getTaskById).toHaveBeenCalledWith('0');
      expect(_mockTaskRepository.delete).toHaveBeenCalledWith('0');
      expect(result).toBe(true);
    });

    it('should return error if task is not found', async () => {
      jest.spyOn(_mockTaskRepository, 'getTaskById').mockResolvedValue(null);

      const result = await _service.delete('1');

      expect(_mockTaskRepository.getTaskById).toHaveBeenCalledWith('1');
      expect(result).toBe(false);
    });
  });

  describe('update Task', () => {
    it('should update the task by ID', async () => {
      const id = '0'
      const status = 'finished'
      const mockTask: TaskModel = {
        id,
        description: 'Lavar a louça',
        status: 'pendente',
      };
      const mockTaskUpdated: TaskModel = {
        id: '0',
        description: 'Lavar a louça',
        status
      };

      jest.spyOn(_mockTaskRepository, 'getTaskById').mockResolvedValue(mockTask);
      jest.spyOn(_mockTaskRepository, 'updateStatus').mockResolvedValue(mockTaskUpdated);

      const result = await _service.updateStatus(id, status)

      expect(result).toMatchObject({
        id,
        description: 'Lavar a louça',
        status: 'finished'
      })
    })
  })
});