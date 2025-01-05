'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>Bem-vindo à Loja DEISI</h1>
      <p>Explore nossos produtos e tecnologias!</p>
      <nav>
        <ul>
          <li>
            <Link href="/produtos">Ir para Produtos</Link>
          </li>
          <li>
            <Link href="/tecnologias">Ir para Tecnologias</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
