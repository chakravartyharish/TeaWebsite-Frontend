import { apiGet } from "@/lib/api";
import AddToCart from "./add-to-cart";
import FeedbackForm from "@/components/feedback-form";

export default async function ProductPage({ params }: { params: { slug: string } }){
  const p = await apiGet<any>(`/products/${params.slug}`);
  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-2 gap-10">
        <img src={p.hero_image} alt={p.name} className="rounded-xl"/>
        <div>
          <h1 className="font-heading text-3xl">{p.name}</h1>
          <p className="mt-4 whitespace-pre-line">{p.story}</p>
          <AddToCart product={p} />
          <div className="mt-8 text-sm text-gray-700">
            <div>🫖 Brew: {p.brew_time_min} min @ {p.brew_temp_c}°C</div>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-12">
        <h2 className="font-heading text-2xl text-tea-forest mb-6">Share Your Experience</h2>
        <p className="text-gray-600 mb-6">
          Tried this tea? We'd love to hear about your experience! Your feedback helps other tea lovers discover their perfect brew.
        </p>
        <FeedbackForm productId={p.id} />
      </div>
    </div>
  )
}


