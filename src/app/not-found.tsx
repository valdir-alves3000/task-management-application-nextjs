import Link from "next/link";
import styles from "./styles/not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Not Found</h2>
      <p className={styles.text}>
        Não foi possível encontrar a página solicitada
      </p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
