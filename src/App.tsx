import React, { useRef, useState } from 'react';
import { instantiate } from "@assemblyscript/loader";

// Define the shape of our Wasm exports for TypeScript safety
interface WasmExports {
  IMAGE_DATA_ID: { value: number };
 processImage: (arr: number, width: number, height: number) => void;
  __newArray: (id: number, data: Uint8Array | Uint8ClampedArray) => number;
  __getUint8Array: (ptr: number) => Uint8Array;
  __pin: (ptr: number) => number;
  __unpin: (ptr: number) => void;
}

const App: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState("Waiting for upload...");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const downloadCanvas = (canvas: HTMLCanvasElement) => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'wasm-processed-image.png';
      link.click();
      URL.revokeObjectURL(url); // Clean up memory
    }, 'image/png');
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setStatus("Loading image...");

    try {
      // 1. Load the file into an Image object
      const img = new Image();
      img.src = URL.createObjectURL(file);
      
      img.onload = async () => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
        
        // Match canvas size to image
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // 2. Extract raw pixels
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        setStatus("Connecting to Wasm Sandbox...");

        // 3. Instantiate Wasm
        // Ensure release.wasm is in your /public folder!
        const loader = await instantiate<WasmExports>(fetch("/release.wasm"));

        setStatus("Processing pixels in Wasm...");

        // 4. Memory Management: Allocation and Pinning
        // We use the ID we exported in assembly/index.ts
        const ptr = loader.exports.__pin(
          loader.exports.__newArray(loader.exports.IMAGE_DATA_ID.value, imageData.data)
        );

        try {
          // 5. Call the Wasm logic
       loader.exports.processImage(ptr, img.width, img.height);

          // 6. Memory Safety: Copy the data back out immediately
          // .slice() prevents "Index out of bounds" if memory detaches
          const resultView = loader.exports.__getUint8Array(ptr);
          const resultCopy = new Uint8ClampedArray(resultView.slice());

          // 7. Update Canvas with processed pixels
          const newImageData = new ImageData(resultCopy, img.width, img.height);
          ctx.putImageData(newImageData, 0, 0);

          setStatus("Download starting!");
          downloadCanvas(canvas);
        } finally {
          // 8. Always unpin to prevent memory leaks in the Wasm heap
          loader.exports.__unpin(ptr);
          setIsProcessing(false);
          setStatus("Done!");
        }
      };
    } catch (err) {
      console.error("Wasm Error:", err);
      setStatus(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsProcessing(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Wasm Image Processor</h1>
        <p style={styles.status}>{status}</p>
        
        <div style={styles.uploadArea}>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleUpload} 
            disabled={isProcessing}
            id="file-upload"
            style={styles.fileInput}
          />
          <label htmlFor="file-upload" style={{
            ...styles.button,
            backgroundColor: isProcessing ? '#ccc' : '#007bff'
          }}>
            {isProcessing ? 'Processing...' : 'Upload & Invert Image'}
          </label>
        </div>

        <canvas ref={canvasRef} style={styles.previewCanvas} />
      </div>
    </div>
  );
};

// Simple inline styles for a dashboard look
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'system-ui, sans-serif'
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
    marginTop: '10vh',
    width: '400px'
  },
  title: { margin: '0 0 1rem 0', color: '#1a1a1a' },
  status: { color: '#666', marginBottom: '1.5rem' },
  uploadArea: { marginBottom: '1.5rem' },
  fileInput: { display: 'none' },
  button: {
    padding: '12px 24px',
    color: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'inline-block',
    fontWeight: 'bold'
  },
  previewCanvas: {
    maxWidth: '100%',
    marginTop: '1rem',
    borderRadius: '4px',
    border: '1px solid #ddd'
  }
};

export default App;