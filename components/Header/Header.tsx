import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Minha Loja</h1>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/produtos">Produtos</Link>
          </li>
          <li>
            <Link href="/tecnologias">Tecnologias</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
