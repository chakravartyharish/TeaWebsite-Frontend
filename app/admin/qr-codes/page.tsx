'use client';

import { useState, useEffect } from 'react';
import { QRCodeDisplay } from '@/components/qr-code-generator';
import { QRScanner, QRScanResult } from '@/components/qr-scanner';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
}

export default function AdminQRCodes() {
  const [activeTab, setActiveTab] = useState('generator');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [qrType, setQrType] = useState('product');
  const [scanResult, setScanResult] = useState<string>('');
  const [customData, setCustomData] = useState({
    storeLocation: {
      name: 'Inner Veda Main Store',
      address: '123 Tea Street, Mumbai, India',
      phone: '+91 9876543210',
      latitude: '19.0760',
      longitude: '72.8777',
      hours: '9 AM - 9 PM'
    },
    contact: {
      name: 'Inner Veda Support',
      organization: 'Inner Veda Tea Store',
      phone: '+91 9876543210',
      email: 'support@innerveda.com',
      website: 'https://innerveda.netlify.app'
    },
    discount: {
      code: 'SAVE20',
      expiryDays: 30,
      terms: 'Valid on orders above ₹500. One time use only.'
    },
    wifi: {
      ssid: 'Inner_Veda_Guest',
      password: 'TeaLovers2024',
      security: 'WPA'
    }
  });

  // Mock data - in real app this would come from API
  useEffect(() => {
    const mockProducts = [
      { id: '1', name: 'Earl Grey Supreme', slug: 'earl-grey-supreme', price: 450 },
      { id: '2', name: 'Dragon Well Green Tea', slug: 'dragon-well-green', price: 380 },
      { id: '3', name: 'Royal Masala Chai', slug: 'royal-masala-chai', price: 320 }
    ];
    setProducts(mockProducts);
  }, []);

  const generateQRCode = () => {
    // In a real app, this would call the backend API
    console.log('Generating QR code for:', qrType, selectedProduct);
  };

  const handleScan = (result: string) => {
    setScanResult(result);
  };

  const resetScan = () => {
    setScanResult('');
  };

  const renderQRGenerator = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">QR Code Generator</h3>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                QR Code Type
              </label>
              <select
                value={qrType}
                onChange={(e) => setQrType(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500"
              >
                <option value="product">Product Link</option>
                <option value="payment">Payment QR</option>
                <option value="store-location">Store Location</option>
                <option value="contact">Contact vCard</option>
                <option value="discount">Discount Code</option>
                <option value="feedback">Feedback Form</option>
                <option value="wifi">WiFi Access</option>
                <option value="social">Social Media</option>
              </select>
            </div>

            {qrType === 'product' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Product
                </label>
                <select
                  onChange={(e) => {
                    const product = products.find(p => p.id === e.target.value);
                    setSelectedProduct(product || null);
                  }}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select a product...</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} - ₹{product.price}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {qrType === 'payment' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="500"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Order ID
                  </label>
                  <input
                    type="text"
                    placeholder="ORDER001"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            )}

            <button
              onClick={generateQRCode}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Generate QR Code
            </button>
          </div>

          <div className="flex justify-center">
            {qrType === 'product' && selectedProduct && (
              <QRCodeDisplay
                qrCodeData={`https://innerveda.netlify.app/product/${selectedProduct.slug}`}
                title={selectedProduct.name}
                description="Product page QR code"
                showDownload={true}
              />
            )}
            
            {qrType === 'store-location' && (
              <QRCodeDisplay
                qrCodeData={JSON.stringify({
                  type: 'store_location',
                  ...customData.storeLocation,
                  maps_url: `https://maps.google.com/?q=${customData.storeLocation.latitude},${customData.storeLocation.longitude}`
                })}
                title="Store Location"
                description="Scan to get store details and directions"
                showDownload={true}
              />
            )}
            
            {qrType === 'contact' && (
              <QRCodeDisplay
                qrCodeData={`BEGIN:VCARD\nVERSION:3.0\nFN:${customData.contact.name}\nORG:${customData.contact.organization}\nTEL:${customData.contact.phone}\nEMAIL:${customData.contact.email}\nURL:${customData.contact.website}\nEND:VCARD`}
                title="Contact Card"
                description="Scan to save contact information"
                showDownload={true}
              />
            )}
            
            {qrType === 'discount' && (
              <QRCodeDisplay
                qrCodeData={JSON.stringify({
                  type: 'discount',
                  code: customData.discount.code,
                  expires: new Date(Date.now() + customData.discount.expiryDays * 24 * 60 * 60 * 1000).toISOString(),
                  terms: customData.discount.terms
                })}
                title={customData.discount.code}
                description="Discount coupon QR code"
                showDownload={true}
              />
            )}
            
            {qrType === 'feedback' && (
              <QRCodeDisplay
                qrCodeData="https://innerveda.netlify.app/feedback"
                title="Feedback Form"
                description="Scan to leave feedback"
                showDownload={true}
              />
            )}
            
            {qrType === 'wifi' && (
              <QRCodeDisplay
                qrCodeData={`WIFI:T:${customData.wifi.security};S:${customData.wifi.ssid};P:${customData.wifi.password};;`}
                title="WiFi Access"
                description={`Network: ${customData.wifi.ssid}`}
                showDownload={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderQRScanner = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">QR Code Scanner</h3>
        
        {!scanResult ? (
          <QRScanner
            onScan={handleScan}
            onError={(error) => console.error('Scan error:', error)}
          />
        ) : (
          <QRScanResult
            result={scanResult}
            onReset={resetScan}
          />
        )}
      </div>
    </div>
  );

  const renderQuickActions = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-gray-800 rounded-lg p-4 text-center">
        <div className="text-2xl mb-2">🛍️</div>
        <h4 className="font-medium text-white mb-2">Product QRs</h4>
        <p className="text-sm text-gray-400 mb-3">Generate QR codes for all products</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Bulk Generate
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-4 text-center">
        <div className="text-2xl mb-2">📍</div>
        <h4 className="font-medium text-white mb-2">Store Location</h4>
        <p className="text-sm text-gray-400 mb-3">QR for store address & map</p>
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
          Generate
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-4 text-center">
        <div className="text-2xl mb-2">📝</div>
        <h4 className="font-medium text-white mb-2">Feedback</h4>
        <p className="text-sm text-gray-400 mb-3">Customer feedback form</p>
        <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
          Generate
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-4 text-center">
        <div className="text-2xl mb-2">📶</div>
        <h4 className="font-medium text-white mb-2">WiFi Access</h4>
        <p className="text-sm text-gray-400 mb-3">Guest WiFi credentials</p>
        <button className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">
          Generate
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">QR Code Management</h1>
          <p className="text-gray-400">Generate and scan QR codes for various business operations</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          {renderQuickActions()}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'generator'
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            🎯 Generator
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'scanner'
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            📷 Scanner
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'generator' && renderQRGenerator()}
        {activeTab === 'scanner' && renderQRScanner()}
      </div>
    </div>
  );
}