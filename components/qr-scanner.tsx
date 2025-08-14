'use client';

import { useState, useRef, useEffect } from 'react';
import QrScanner from 'qr-scanner';

interface QRScannerProps {
  onScan: (result: string) => void;
  onError?: (error: string) => void;
  className?: string;
  showViewfinder?: boolean;
  preferredCamera?: 'environment' | 'user';
}

export function QRScanner({
  onScan,
  onError,
  className = '',
  showViewfinder = true,
  preferredCamera = 'environment'
}: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup scanner on unmount
      if (scannerRef.current) {
        scannerRef.current.destroy();
      }
    };
  }, []);

  const startScanning = async () => {
    if (!videoRef.current) return;

    try {
      setError('');
      setIsScanning(true);

      // Check for camera permission
      const hasCamera = await QrScanner.hasCamera();
      if (!hasCamera) {
        throw new Error('No camera found');
      }

      // Create scanner
      const scanner = new QrScanner(
        videoRef.current,
        (result) => {
          onScan(result.data);
        },
        {
          onDecodeError: (error) => {
            console.log('Decode error:', error);
          },
          preferredCamera: preferredCamera,
          highlightScanRegion: showViewfinder,
          highlightCodeOutline: true
        }
      );

      scannerRef.current = scanner;
      await scanner.start();
      setHasPermission(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start scanner';
      setError(errorMessage);
      setHasPermission(false);
      setIsScanning(false);
      onError?.(errorMessage);
    }
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.stop();
      scannerRef.current.destroy();
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const toggleScanning = () => {
    if (isScanning) {
      stopScanning();
    } else {
      startScanning();
    }
  };

  return (
    <div className={`qr-scanner ${className}`}>
      <div className="relative bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-64 object-cover"
          playsInline
          muted
        />
        
        {showViewfinder && isScanning && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-8 border-2 border-white rounded-lg">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-red-500 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-red-500 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-red-500 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-red-500 rounded-br-lg"></div>
            </div>
          </div>
        )}

        {!isScanning && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="text-center text-white">
              <div className="text-4xl mb-2">📷</div>
              <p>Camera ready to scan</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={toggleScanning}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            isScanning
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isScanning ? '⏹ Stop Scanning' : '📷 Start Scanning'}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="text-sm">
            <span className="font-medium">Error:</span> {error}
          </p>
          {error.includes('permission') && (
            <p className="text-xs mt-1">
              Please allow camera access and refresh the page.
            </p>
          )}
        </div>
      )}

      {hasPermission === false && !error && (
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
          <p className="text-sm">
            Camera permission is required to scan QR codes.
          </p>
        </div>
      )}
    </div>
  );
}

interface QRScanResultProps {
  result: string;
  onReset: () => void;
  className?: string;
}

export function QRScanResult({ result, onReset, className = '' }: QRScanResultProps) {
  const [parsedData, setParsedData] = useState<any>(null);

  useEffect(() => {
    try {
      const parsed = JSON.parse(result);
      setParsedData(parsed);
    } catch {
      setParsedData(null);
    }
  }, [result]);

  const renderResultContent = () => {
    if (!parsedData) {
      // Plain text or URL
      if (result.startsWith('http')) {
        return (
          <div>
            <h3 className="font-medium text-white mb-2">Website Link</h3>
            <a 
              href={result} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline break-all"
            >
              {result}
            </a>
          </div>
        );
      }
      
      if (result.startsWith('upi://')) {
        return (
          <div>
            <h3 className="font-medium text-white mb-2">UPI Payment</h3>
            <p className="text-gray-300 break-all">{result}</p>
          </div>
        );
      }
      
      return (
        <div>
          <h3 className="font-medium text-white mb-2">Text Content</h3>
          <p className="text-gray-300 break-all">{result}</p>
        </div>
      );
    }

    // Structured data
    switch (parsedData.type) {
      case 'order_tracking':
        return (
          <div>
            <h3 className="font-medium text-white mb-2">📦 Order Tracking</h3>
            <div className="space-y-1 text-gray-300">
              <p>Order ID: {parsedData.order_id}</p>
              <p>Phone: {parsedData.phone}</p>
              {parsedData.url && (
                <a 
                  href={parsedData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Track Order
                </a>
              )}
            </div>
          </div>
        );

      case 'discount':
        return (
          <div>
            <h3 className="font-medium text-white mb-2">🎫 Discount Code</h3>
            <div className="space-y-1 text-gray-300">
              <p className="font-mono text-lg text-green-400">{parsedData.code}</p>
              <p>Expires: {new Date(parsedData.expires).toLocaleDateString()}</p>
              {parsedData.terms && <p className="text-sm">{parsedData.terms}</p>}
            </div>
          </div>
        );

      case 'loyalty':
        return (
          <div>
            <h3 className="font-medium text-white mb-2">⭐ Loyalty Card</h3>
            <div className="space-y-1 text-gray-300">
              <p>Customer: {parsedData.customer_id}</p>
              <p>Points: {parsedData.points}</p>
            </div>
          </div>
        );

      case 'inventory':
        return (
          <div>
            <h3 className="font-medium text-white mb-2">📋 Inventory Item</h3>
            <div className="space-y-1 text-gray-300">
              <p>Product ID: {parsedData.product_id}</p>
              <p>SKU: {parsedData.sku}</p>
              {parsedData.location && <p>Location: {parsedData.location}</p>}
            </div>
          </div>
        );

      case 'store_location':
        return (
          <div>
            <h3 className="font-medium text-white mb-2">📍 Store Location</h3>
            <div className="space-y-1 text-gray-300">
              <p className="font-medium">{parsedData.name}</p>
              <p>{parsedData.address}</p>
              {parsedData.phone && <p>Phone: {parsedData.phone}</p>}
              {parsedData.hours && <p>Hours: {parsedData.hours}</p>}
              {parsedData.maps_url && (
                <a 
                  href={parsedData.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Open in Maps
                </a>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h3 className="font-medium text-white mb-2">📱 Scanned Data</h3>
            <pre className="text-gray-300 text-sm whitespace-pre-wrap break-all">
              {JSON.stringify(parsedData, null, 2)}
            </pre>
          </div>
        );
    }
  };

  return (
    <div className={`bg-gray-800 rounded-lg p-4 ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold text-white">Scan Result</h2>
        <button
          onClick={onReset}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      {renderResultContent()}

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => navigator.clipboard.writeText(result)}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          📋 Copy
        </button>
        <button
          onClick={onReset}
          className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
        >
          🔄 Scan Again
        </button>
      </div>
    </div>
  );
}