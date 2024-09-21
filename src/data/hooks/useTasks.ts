import { TaskModel } from '@/backend/models/task-model';
import listTask from '@/backend/tasks/list-task';
import { useEffect, useState } from 'react';

export default function useTasks() {
  const [tasksPending, setTasksPending] = useState<TaskModel[]>([]);
  const [tasksFinalized, setTasksFinalized] = useState<TaskModel[]>([]);

  async function updateTasks(tasks: TaskModel[]) {
    const pending = tasks.filter(
      (task: TaskModel) => task.status === "pending"
    );
    const finalized = tasks.filter(
      (task: TaskModel) => task.status === "finished"
    );

    setTasksPending(pending);
    setTasksFinalized(finalized);
  }

  async function fetchTasks() {
    try {
      const initialTasks = await listTask() as TaskModel[]
      await updateTasks(initialTasks)
    } catch (err) {
      console.error("Erro ao buscar tarefas:", err);
    }
  }
  useEffect(() => {
    fetchTasks()
  }, [])

  return {
    fetchTasks,
    tasksFinalized,
    tasksPending,
    setTasksFinalized,
    setTasksPending,
  }
}