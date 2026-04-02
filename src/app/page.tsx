
import Link from "next/link";
import styles from "./page.module.css";
import { SignIn } from "@/components/sign-in";

export default function Home() {

  return (
    <section className={styles.section}>
      <h1>MU-TH-ER</h1>
      <h2>Multi-User Tracking Hub for Entertainment Resources</h2>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/admin">Admin</Link>
      <p>Login</p>
      <SignIn></SignIn>
    </section>
  );
}