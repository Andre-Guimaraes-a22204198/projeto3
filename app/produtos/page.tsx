'use client';

import React, { useState, useEffect } from 'react';

interface Produto {
  id: string;
  title: string;
  price: number;
  image: string;
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [cart, setCart] = useState<Produto[]>([]);
  const [mensagem, setMensagem] = useState<string | null>(null);

  // Carrega produtos da API
  useEffect(() => {
    async function fetchProdutos() {
      const res = await fetch('https://deisishop.pythonanywhere.com/products');
      const data = await res.json();
      setProdutos(data);
    }
    fetchProdutos();
  }, []);

  // Salva o carrinho no localStorage sempre que ele for atualizado
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Carrega o carrinho do localStorage quando a página é carregada
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Adiciona um produto ao carrinho
  function adicionarAoCarrinho(produto: Produto) {
    setCart([...cart, produto]);
  }

  // Remove um produto do carrinho
  function removerDoCarrinho(produtoId: string) {
    setCart(cart.filter((produto) => produto.id !== produtoId));
  }

  // Finaliza a compra
  async function comprarProdutos() {
    if (cart.length === 0) {
      setMensagem('O carrinho está vazio!');
      return;
    }

    try {
      const res = await fetch('/api/deisishop/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: cart }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMensagem(errorData.error || 'Erro ao realizar a compra.');
        return;
      }

      const data = await res.json();
      setMensagem(`Compra realizada com sucesso! ID da compra: ${data.orderId}`);
      setCart([]); // Limpa o carrinho após a compra
    } catch (error) {
      setMensagem('Erro ao conectar com o servidor.');
    }
  }

  return (
    <main>
      <h1>Produtos</h1>
      <section>
        <h2>Lista de Produtos</h2>
        <div className="product-list">
          {produtos.map((produto) => (
            <article key={produto.id} className="product-item">
              <img src={produto.image} alt={produto.title} />
              <h3>{produto.title}</h3>
              <p>Preço: {produto.price}€</p>
              <button onClick={() => adicionarAoCarrinho(produto)}>
                + Adicionar ao Carrinho
              </button>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Seu Carrinho</h2>
        <div className="cart-list">
          {cart.map((produto) => (
            <article key={produto.id} className="cart-item">
              <h3>{produto.title}</h3>
              <p>Preço: {produto.price}€</p>
              <button onClick={() => removerDoCarrinho(produto.id)}>
                - Remover
              </button>
            </article>
          ))}
        </div>
        <p>
          Total: {cart.reduce((total, produto) => total + produto.price, 0).toFixed(2)}€
        </p>
        <button onClick={comprarProdutos}>Comprar</button>
        {mensagem && <p>{mensagem}</p>}
      </section>
    </main>
  );
}
