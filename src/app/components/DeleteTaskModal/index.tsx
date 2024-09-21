"use client";

import deleteTask from "@/backend/tasks/delete-task";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "./delete-task-modal.module.scss";

interface DeleteTaskModalProps {
  id: string;
  onClose: Dispatch<SetStateAction<boolean>>;
  onTaskDeleted: () => void;
}

export function DeleteTaskModal({
  id,
  onClose,
  onTaskDeleted,
}: DeleteTaskModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteTask(id);
      onTaskDeleted();
    } catch (err) {
      console.error("Falha ao deletar a tarefa", err);
    } finally {
      setIsDeleting(false);
      onClose(true);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h2 className={styles.header}>Deletar Tarefa</h2>
        <p className={styles.text}>
          Tem certeza que deseja deletar esta tarefa?
        </p>

        <div className={styles.buttons}>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={styles.deleteButton}
          >
            {isDeleting ? "Deletando..." : "Deletar"}
          </button>
          <button
            onClick={() => onClose(true)}
            className={styles.cancelButton}
            disabled={isDeleting}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
