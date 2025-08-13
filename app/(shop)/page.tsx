'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

// Force dynamic rendering to avoid build-time prerendering issues
export const dynamic = 'force-dynamic';

interface Product {
  id: number;
  slug: string;
  name: string;
  hero_image: string;
}

function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://teawebsite-f6328f6fe19f.herokuapp.com";
        const url = `${API_BASE}/api/products`;
        
        const response = await fetch(url, { 
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform the data to match our Product interface
        const transformedProducts = data.map((product: any) => ({
          id: product.id,
          slug: product.slug,
          name: product.name,
          hero_image: product.hero_image || product.image || '/placeholder-tea.jpg'
        }));
        
        setProducts(transformedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error instanceof Error ? error.message : 'Failed to fetch products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(product => (
        <a key={product.id} href={`/product/${product.slug}`} className="border bg-white rounded-xl overflow-hidden hover:shadow-md transition">
          <img src={product.hero_image} alt={product.name} className="aspect-square object-cover"/>
          <div className="p-4">
            <h3 className="font-heading text-xl">{product.name}</h3>
          </div>
        </a>
      ))}
    </section>
  );
}

function LoadingProducts() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="border bg-gray-100 rounded-xl overflow-hidden animate-pulse">
          <div className="aspect-square bg-gray-200"></div>
          <div className="p-4">
            <div className="h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default function Home(){
  const { products, loading, error } = useProducts();

  return (
    <div className="space-y-12">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-tea-forest via-emerald-800 to-tea-forest text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative p-10 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-emerald-300">🍃</span>
                <span className="text-sm font-medium">INNER VEDA</span>
              </div>
              <h1 className="font-heading text-4xl lg:text-6xl font-bold">
                Sacred Herb Elixirs
              </h1>
              <p className="text-xl opacity-90 leading-relaxed">
                Ancient Ayurvedic wisdom meets modern convenience. Transform your daily ritual with our premium tea blends.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/products"
                  className="bg-white text-tea-forest px-8 py-4 rounded-2xl font-semibold hover:bg-tea-cream transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                >
                  Shop Now
                </Link>
                <Link 
                  href="/showcase"
                  className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-tea-forest transition-all duration-300 text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-6xl">🍵</span>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                {[1, 2, 3, 4].map((dot) => (
                  <div key={dot} className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: `${dot * 0.2}s` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Grid */}
      <section>
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-900 mb-2">Our Tea Collection</h2>
          <p className="text-gray-600">Brewed with care. Sourced ethically.</p>
        </div>
        {loading ? (
          <LoadingProducts />
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600">Error loading products: {error}</p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </section>
    </div>
  )
}


