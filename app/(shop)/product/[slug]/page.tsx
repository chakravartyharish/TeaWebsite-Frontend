import { apiGet } from "@/lib/api";
import AddToCart from "./add-to-cart";
import FeedbackForm from "@/components/feedback-form";
import { QRCodeDisplay } from "@/components/qr-code-generator";

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
      
      <div className="border-t pt-8">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="font-heading text-xl text-white mb-4 flex items-center gap-2">
            <span>📱</span>
            Share This Tea
          </h2>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-gray-300 mb-4">
                Scan this QR code to share {p.name} with friends or save it for later!
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => navigator.share?.({
                    title: p.name,
                    text: p.description,
                    url: window.location.href
                  })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <span>📤</span>
                  Share
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <span>🔗</span>
                  Copy Link
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <QRCodeDisplay
                qrCodeData={`https://innerveda.netlify.app/product/${p.slug}`}
                title={`${p.name}`}
                description="Scan to view this product"
                size={150}
                showDownload={true}
              />
            </div>
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


