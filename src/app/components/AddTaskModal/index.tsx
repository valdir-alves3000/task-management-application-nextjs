"use client";

import addTask from "@/backend/tasks/add-task";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "./add-task-modal.module.scss";

interface AddTaskModalProps {
  onClose: Dispatch<SetStateAction<boolean>>;
  onTaskAdded: () => void;
}

export function AddTaskModal({ onClose, onTaskAdded }: AddTaskModalProps) {
  const [taskDescription, setTaskDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  async function handleSubmit() {
    if (!taskDescription.trim()) {
      return;
    }
    setIsAdding(true);

    try {
      await addTask(taskDescription);
      onTaskAdded();
    } catch (err) {
      console.error("Error adding task:", err);
    } finally {
      onClose(true);
      setIsAdding(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h2 className={styles.header}>Adicionar Nova Tarefa</h2>
        <div className={styles.inputContainer}>
          <span className={styles.inputLabel}>Título</span>
          <div className={styles.inputFrame}>
            <input
              type="text"
              autoFocus
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Digite"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <button
            onClick={handleSubmit}
            disabled={isAdding}
            className={styles.addButton}
          >
            {isAdding ? "Adicionando..." : "Adicionar"}
          </button>
          <button
            onClick={() => onClose(true)}
            className={styles.cancelButton}
            disabled={isAdding}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
