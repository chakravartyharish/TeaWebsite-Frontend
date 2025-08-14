'use client';

import { useState } from 'react';
import QRCode from 'react-qr-code';

interface QRCodeGeneratorProps {
  data?: string;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  includeMargin?: boolean; // For backward compatibility, but will be handled via container padding
  bgColor?: string;
  fgColor?: string;
  className?: string;
}

export function QRCodeGenerator({
  data = '',
  size = 200,
  level = 'M',
  includeMargin = true,
  bgColor = '#FFFFFF',
  fgColor = '#000000',
  className = ''
}: QRCodeGeneratorProps) {
  if (!data) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`} 
           style={{ width: size, height: size }}>
        <span className="text-gray-500 text-sm">No data</span>
      </div>
    );
  }

  // Handle margin through container padding instead of unsupported includeMargin prop
  const containerStyle = includeMargin ? { padding: '16px', background: bgColor } : {};
  
  return (
    <div className={`inline-block ${className}`} style={containerStyle}>
      <QRCode
        value={data}
        size={size}
        level={level}
        bgColor={bgColor}
        fgColor={fgColor}
      />
    </div>
  );
}

interface QRCodeDisplayProps {
  qrCodeData: string;
  title?: string;
  description?: string;
  size?: number;
  showDownload?: boolean;
  className?: string;
}

export function QRCodeDisplay({
  qrCodeData,
  title,
  description,
  size = 200,
  showDownload = false,
  className = ''
}: QRCodeDisplayProps) {
  const [showModal, setShowModal] = useState(false);

  const downloadQRCode = () => {
    try {
      // Method 1: Try to find and download the SVG
      const qrContainer = document.querySelector('.qr-code-container');
      const svg = qrContainer?.querySelector('svg');
      
      if (svg) {
        // Clone the SVG to avoid modifying the original
        const svgClone = svg.cloneNode(true) as SVGElement;
        
        // Ensure proper dimensions
        const size = 400;
        svgClone.setAttribute('width', size.toString());
        svgClone.setAttribute('height', size.toString());
        svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        
        // Convert SVG to data URL
        const svgData = new XMLSerializer().serializeToString(svgClone);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        
        // Create canvas for PNG conversion
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context not available');
        
        const img = new Image();
        img.onload = () => {
          // Set canvas size with padding
          const padding = 20;
          canvas.width = size + padding * 2;
          canvas.height = size + padding * 2;
          
          // Fill white background
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw the QR code centered with padding
          ctx.drawImage(img, padding, padding, size, size);
          
          // Convert to blob and download
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.download = `qr-code-${(title || 'download').replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
              link.href = url;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }
          }, 'image/png', 0.9);
          
          URL.revokeObjectURL(svgUrl);
        };
        
        img.onerror = () => {
          // Fallback: download SVG directly
          const link = document.createElement('a');
          link.download = `qr-code-${(title || 'download').replace(/[^a-z0-9]/gi, '_').toLowerCase()}.svg`;
          link.href = svgUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(svgUrl);
        };
        
        img.src = svgUrl;
      } else {
        throw new Error('QR code SVG not found');
      }
    } catch (error) {
      console.error('Error downloading QR code:', error);
      alert('Sorry, QR code download failed. Please try again or use the "View Large" option to save manually.');
    }
  };

  return (
    <div className={`text-center ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      )}
      
      <div className="inline-block p-4 bg-white rounded-lg shadow-lg qr-code-container">
        <QRCodeGenerator
          data={qrCodeData}
          size={size}
          className="qr-code-svg"
        />
      </div>

      {description && (
        <p className="text-sm text-gray-400 mt-2 max-w-xs mx-auto">{description}</p>
      )}

      <div className="flex justify-center gap-2 mt-4">
        {showDownload && (
          <button
            onClick={downloadQRCode}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <span>📥</span>
            Download
          </button>
        )}
        
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
        >
          <span>🔍</span>
          View Large
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">
                {title || 'QR Code'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="text-center">
              <div className="qr-code-container">
                <QRCodeGenerator
                  data={qrCodeData}
                  size={300}
                />
              </div>
              
              {description && (
                <p className="text-sm text-gray-600 mt-4">{description}</p>
              )}
              
              <button
                onClick={downloadQRCode}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <span>📥</span>
                Download QR Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}