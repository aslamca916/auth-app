import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products', {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: '1rem' }}>Product Listing</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {products.map((product) => (
          <article
            key={product.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              background: '#fff',
            }}
          >
            <div style={{ padding: '1rem', textAlign: 'center' }}>
              <img
                src={product.image}
                alt={product.title}
                width={200}
                height={180}
              />
            </div>
            <div style={{ padding: '1rem' }}>
              <p style={{ margin: '0 0 0.5rem', color: '#555', fontSize: '0.9rem' }}>
                {product.category}
              </p>
              <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.05rem' }}>{product.title}</h2>
            </div>
            <div style={{ padding: '1rem' }}>
              <p style={{ margin: '0 0 0.5rem', color: '#555', fontSize: '0.9rem' }}>
                {product.category}
              </p>
              <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.05rem' }}>{product.title}</h2>
              <p style={{ margin: '0 0 1rem', color: '#333', fontSize: '0.95rem', minHeight: '3rem' }}>
                {product.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>${product.price.toFixed(2)}</span>
                <button
                  type="button"
                  style={{
                    border: 'none',
                    background: '#111',
                    color: '#fff',
                    padding: '0.5rem 0.85rem',
                    borderRadius: '999px',
                    cursor: 'pointer',
                  }}
                >
                  View
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
