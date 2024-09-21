"use client";

import trashIcon from "@/app/assets/trash.svg";
import { TaskModel } from "@/backend/models/task-model";
import updateTask from "@/backend/tasks/update-task";
import useTasks from "@/data/hooks /useTasks";
import Image from "next/image";
import { useState } from "react";
import { AddTaskModal } from "../AddTaskModal";
import { DeleteTaskModal } from "../DeleteTaskModal";
import styles from "./tasks.module.scss";

export function Tasks() {
  const {
    tasksPending,
    tasksFinalized,
    setTasksFinalized,
    setTasksPending,
    fetchTasks,
  } = useTasks();
  const [selectedTask, setSelectedTask] = useState("");
  const [isOpenAddTaskModal, setIsOpenAddTaskModal] = useState(false);
  const [isOpenDeleteTaskModal, setIsOpenDeleteTaskModal] = useState(false);

  function updateTasks(isChecked: boolean, task: TaskModel) {
    if (isChecked) {
      setTasksPending([...tasksPending, { ...task, status: "pending" }]);
      setTasksFinalized(tasksFinalized.filter((t) => t.id !== task.id));
    } else {
      setTasksPending(tasksPending.filter((t) => t.id !== task.id));
      setTasksFinalized([...tasksFinalized, { ...task, status: "finished" }]);
    }
  }

  async function handleCheckboxChange(task: TaskModel, isChecked: boolean) {
    updateTasks(isChecked, task);

    try {
      await updateTask(task.id, isChecked ? "finished" : "pending");
    } catch (err) {
      console.error("Failed to update task:", err);
      updateTasks(isChecked, task);
    }
  }

  function handleDeleteTask(id: string) {
    setSelectedTask(id);
    setIsOpenDeleteTaskModal(true);
  }

  function handleTaskAdded() {
    setIsOpenAddTaskModal(false);
    fetchTasks();
  }

  function handleTaskDeleted() {
    setIsOpenDeleteTaskModal(false);
    fetchTasks();
  }

  return (
    <div className={styles.container}>
      <div className={styles.tarefas}>
        {tasksPending.length > 0 && (
          <div className={styles.tarefasHeader}>Suas tarefas de hoje</div>
        )}
        <ul className={styles.taskList}>
          {tasksPending.map((task) => (
            <li key={task.id} className={styles.taskItem}>
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(task, e.target.checked)}
              />
              <span className={styles.taskText}> {task.description} </span>
              <button onClick={() => handleDeleteTask(task.id)}>
                <Image
                  className={styles.trash}
                  src={trashIcon}
                  width={18}
                  height={20}
                  alt="delete"
                />
              </button>
            </li>
          ))}
        </ul>

        {tasksFinalized.length > 0 && (
          <div className={styles.tarefasHeader}>Tarefas Finalizadas</div>
        )}
        <ul className={styles.taskList}>
          {tasksFinalized.map((task) => (
            <li key={task.id} className={styles.taskItem}>
              <input
                type="checkbox"
                checked
                onChange={(e) => handleCheckboxChange(task, e.target.checked)}
              />
              <span className={styles.taskText}> {task.description} </span>
              <button onClick={() => handleDeleteTask(task.id)}>
                <Image
                  className={styles.trash}
                  src={trashIcon}
                  width={18}
                  height={20}
                  alt="delete"
                />
              </button>
            </li>
          ))}
        </ul>

        {isOpenAddTaskModal && (
          <AddTaskModal
            onClose={() => setIsOpenAddTaskModal(false)}
            onTaskAdded={handleTaskAdded}
          />
        )}
        {isOpenDeleteTaskModal && (
          <DeleteTaskModal
            id={selectedTask}
            onClose={() => setIsOpenDeleteTaskModal(false)}
            onTaskDeleted={handleTaskDeleted}
          />
        )}
      </div>

      <div className={styles.footer}>
        <button
          className={styles.addTaskButton}
          onClick={() => setIsOpenAddTaskModal(true)}
        >
          Adicionar nova tarefa
        </button>
      </div>
    </div>
  );
}
