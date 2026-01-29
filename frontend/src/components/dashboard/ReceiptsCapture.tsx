import { useRef, useState } from 'react';
import { Camera, Upload, Receipt, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ReceiptsCapture = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedReceipts, setCapturedReceipts] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleCapture = async () => {
    if (!isCameraActive) {
      // Start camera
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraActive(true);
        }
      } catch (err) {
        console.error('Camera access denied:', err);
        alert('Unable to access camera. Please check permissions.');
      }
    } else {
      // Take photo
      if (canvasRef.current && videoRef.current) {
        const context = canvasRef.current.getContext('2d');
        if (context) {
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
          context.drawImage(videoRef.current, 0, 0);
          const imageData = canvasRef.current.toDataURL('image/jpeg');
          setCapturedReceipts([...capturedReceipts, imageData]);
          
          // Stop camera
          const stream = videoRef.current.srcObject as MediaStream;
          stream?.getTracks().forEach(track => track.stop());
          setIsCameraActive(false);
          
          console.log('Receipt captured successfully');
        }
      }
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setUploadedFile(file);
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          setCapturedReceipts([...capturedReceipts, result]);
          console.log('Receipt uploaded successfully:', file.name);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select an image file');
      }
    }
  };

  const removeReceipt = (index: number) => {
    setCapturedReceipts(capturedReceipts.filter((_, i) => i !== index));
  };

  const closeCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Receipt className="w-5 h-5 text-gradient-gold" />
        <h2 className="text-lg font-semibold text-foreground">Receipts</h2>
        {capturedReceipts.length > 0 && (
          <span className="ml-auto text-xs bg-gradient-gold/20 text-gradient-gold font-semibold px-2 py-1 rounded-full">
            {capturedReceipts.length} saved
          </span>
        )}
      </div>

      {/* Camera view */}
      {isCameraActive && (
        <div className="mb-4 relative rounded-lg overflow-hidden bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-64 object-cover"
          />
          <canvas ref={canvasRef} className="hidden" />
          <div className="absolute inset-0 flex flex-col items-center justify-between p-4">
            <button
              onClick={closeCamera}
              className="self-start p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <div className="flex gap-3">
              <Button
                onClick={handleCapture}
                className="gradient-gold text-primary-foreground hover:opacity-90 font-medium"
              >
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Captured receipts gallery */}
      {capturedReceipts.length > 0 && !isCameraActive && (
        <div className="mb-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">Captured Receipts:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {capturedReceipts.map((receipt, index) => (
              <div key={index} className="relative group rounded-lg overflow-hidden bg-muted border border-border">
                <img src={receipt} alt={`Receipt ${index + 1}`} className="w-full h-24 object-cover" />
                <button
                  onClick={() => removeReceipt(index)}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Placeholder area (shown when no camera active and no receipts yet) */}
      {!isCameraActive && capturedReceipts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-6 sm:py-8 px-3 border-2 border-dashed border-border rounded-lg bg-muted-foreground/3 transition-colors duration-200">
          {/* Icon container */}
          <div className="mb-4">
            <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground/60" />
          </div>

          {/* Main text */}
          <p className="text-sm font-medium text-foreground text-center mb-1">
            Upload receipt or take photo
          </p>

          {/* Subtitle */}
          <p className="text-xs text-muted-foreground text-center mb-5">
            Helps track expenses and profits over time
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {/* Capture button */}
            <Button
              onClick={handleCapture}
              className="gradient-gold text-primary-foreground hover:opacity-90 transition-all duration-300 font-medium py-2 px-4 rounded-md text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md w-full sm:w-auto"
            >
              <Camera className="w-4 h-4" />
              <span>Capture</span>
            </Button>

            {/* Upload button */}
            <Button
              onClick={handleUpload}
              className="bg-muted-foreground/10 text-foreground border border-border hover:bg-muted-foreground/15 transition-colors duration-200 font-medium py-2 px-4 rounded-md text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>
      )}

      {/* Info note */}
      <div className="mt-3 p-2 bg-muted-foreground/5 rounded-lg border border-border">
        <p className="text-xs text-muted-foreground leading-relaxed">
          📸 <span className="font-medium text-foreground">Tip:</span> Clear photos help with expense tracking. Store receipts safely for record-keeping.
        </p>
      </div>
    </div>
  );
};

export default ReceiptsCapture;
