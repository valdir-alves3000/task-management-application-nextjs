import { TaskModel } from '@/backend/models/task-model';
import addTask from '@/backend/tasks/add-task';
import deleteTask from '@/backend/tasks/delete-task';
import getTaskById from '@/backend/tasks/get-task-byid';
import updateTask from '@/backend/tasks/update-task';

describe('Task Management Server Suite', () => {
  describe('Task Creation and Lifecycle Management', () => {
    it('should return "Description is required." if description is empty', async () => {
      const result = await addTask('');
      expect(result).toBe('Description is required.');
    });

    it('should create a created task and then lie down', async () => {
      const description = 'Test Task'
      const result = await addTask('Test Task') as TaskModel;

      expect(result).toEqual({
        id: expect.stringMatching(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i // Verifica se o id é um UUID válido
        ),
        description,
        status: "pending"
      });

      const task = await getTaskById(result.id) as TaskModel
      expect(task.id).toBe(result.id)
      expect(task.description).toBe(description)

      const updatedTask = await updateTask(task.id, "finished") as TaskModel
      expect(updatedTask.id).toBe(result.id)
      expect(updatedTask.status).toBe("finished")

      const getTask = await getTaskById(updatedTask.id) as TaskModel
      expect(getTask.id).toBe(result.id)
      expect(getTask.description).toBe(description)
      expect(getTask.status).toBe("finished")

      await deleteTask(result.id)
      const taskNotfund = await getTaskById(updatedTask.id)
      expect(taskNotfund).toBe("Task not found.")
    });
  });
});
