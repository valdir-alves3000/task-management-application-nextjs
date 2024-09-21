import logoImg from "@/app/assets/logo.svg";
import Image from "next/image";
import styles from "./header.module.scss";

export function Header() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className={styles.header}>
      <Image src={logoImg} width={150} height={36} alt="Logo" />
      <p className={styles.welcomeMessage}>Bem-vindo de volta, Marcus</p>
      <p className={styles.date}>{formattedDate}</p>
    </header>
  );
}
