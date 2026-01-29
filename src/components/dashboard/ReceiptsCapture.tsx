import { Camera, Upload, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";

const ReceiptsCapture = () => {
  const handleCapture = () => {
    console.log('Open camera to capture receipt');
    // TODO: Implement camera capture with device camera API
  };

  const handleUpload = () => {
    console.log('Open file picker to upload receipt');
    // TODO: Implement file upload with validation
  };

  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Receipt className="w-5 h-5 text-gradient-gold" />
        <h2 className="text-lg font-semibold text-foreground">Receipts</h2>
      </div>

      {/* Placeholder area */}
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
        </div>
      </div>

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
