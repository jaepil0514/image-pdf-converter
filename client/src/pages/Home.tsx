import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Download, Zap, Lock, Smartphone, Clock, FileText, Image as ImageIcon } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

// Image format options
const IMAGE_FORMATS = [
  { value: 'jpg', label: 'JPG', icon: '🖼️' },
  { value: 'png', label: 'PNG', icon: '🖼️' },
  { value: 'gif', label: 'GIF', icon: '🎬' },
  { value: 'bmp', label: 'BMP', icon: '🖼️' },
  { value: 'webp', label: 'WebP', icon: '🌐' },
  { value: 'svg', label: 'SVG', icon: '✨' },
  { value: 'tiff', label: 'TIFF', icon: '📸' },
  { value: 'ico', label: 'ICO', icon: '🔲' },
];

// Document format options
const DOCUMENT_FORMATS = [
  { value: 'pdf', label: 'PDF', icon: '📄' },
  { value: 'docx', label: 'Word (DOCX)', icon: '📝' },
  { value: 'doc', label: 'Word (DOC)', icon: '📝' },
  { value: 'xlsx', label: 'Excel (XLSX)', icon: '📊' },
  { value: 'xls', label: 'Excel (XLS)', icon: '📊' },
  { value: 'pptx', label: 'PowerPoint (PPTX)', icon: '🎯' },
  { value: 'ppt', label: 'PowerPoint (PPT)', icon: '🎯' },
  { value: 'txt', label: 'Text (TXT)', icon: '📋' },
  { value: 'rtf', label: 'Rich Text (RTF)', icon: '📋' },
  { value: 'odt', label: 'OpenDocument (ODT)', icon: '📄' },
];

export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [selectedImageFormat, setSelectedImageFormat] = useState('jpg');
  const [selectedDocumentFormat, setSelectedDocumentFormat] = useState('docx');
  const [converting, setConverting] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  // tRPC mutations
  const convertImageMutation = trpc.fileConverter.convertImage.useMutation();
  const convertDocumentMutation = trpc.fileConverter.convertDocument.useMutation();

  // Handle image conversion
  const handleImageConversion = async () => {
    if (imageFiles.length === 0) {
      toast.error("Please select at least one image file");
      return;
    }

    setConverting(true);
    try {
      // Convert each image file
      for (const file of imageFiles) {
        try {
          const base64Data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const result = e.target?.result as string;
              resolve(result.split(',')[1]);
            };
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsDataURL(file);
          });
          
          const result = await convertImageMutation.mutateAsync({
            fileData: base64Data,
            fileName: file.name.split('.')[0],
            targetFormat: selectedImageFormat as any,
          });

          // Create download link
          const link = document.createElement('a');
          link.href = result.url;
          link.download = result.fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          toast.success(`Successfully converted ${file.name}`);
        } catch (error) {
          toast.error(`Failed to convert ${file.name}`);
          console.error(error);
        }
      }
      
      setImageFiles([]);
    } finally {
      setConverting(false);
    }
  };

  // Handle document conversion
  const handleDocumentConversion = async () => {
    if (documentFiles.length === 0) {
      toast.error("Please select at least one document file");
      return;
    }

    setConverting(true);
    try {
      // Convert each document file
      for (const file of documentFiles) {
        try {
          const base64Data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const result = e.target?.result as string;
              resolve(result.split(',')[1]);
            };
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsDataURL(file);
          });
          
          const sourceFormat = file.name.split('.').pop()?.toLowerCase() || 'pdf';
          
          const result = await convertDocumentMutation.mutateAsync({
            fileData: base64Data,
            fileName: file.name.split('.')[0],
            sourceFormat: sourceFormat as any,
            targetFormat: selectedDocumentFormat as any,
          });

          // Create download link
          const link = document.createElement('a');
          link.href = result.url;
          link.download = result.fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          toast.success(`Successfully converted ${file.name}`);
        } catch (error) {
          toast.error(`Failed to convert ${file.name}`);
          console.error(error);
        }
      }
      
      setDocumentFiles([]);
    } finally {
      setConverting(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(prev => [...prev, ...files]);
  };

  const handleDocumentSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setDocumentFiles(prev => [...prev, ...files]);
  };

  const removeImageFile = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeDocumentFile = (index: number) => {
    setDocumentFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">FC</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Universal File Converter</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition">How It Works</a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900 transition">FAQ</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Convert Any File Format Instantly
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Convert images to 8+ formats and documents to 10+ formats. Fast, secure, and completely free. No registration required.
          </p>
        </div>

        {/* Main Converter Tabs */}
        <Tabs defaultValue="image-converter" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="image-converter" className="text-base flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Image Converter
            </TabsTrigger>
            <TabsTrigger value="document-converter" className="text-base flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Document Converter
            </TabsTrigger>
          </TabsList>

          {/* Image Converter Tab */}
          <TabsContent value="image-converter" className="space-y-6">
            <Card className="p-8 border-2 border-dashed border-blue-200 bg-blue-50/50 hover:border-blue-400 transition">
              <div className="text-center">
                <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Images</h3>
                <p className="text-gray-600 mb-6">
                  Drag and drop your images here, or click to select files
                </p>
                <input
                  ref={imageInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <Button
                  onClick={() => imageInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Select Images
                </Button>
              </div>
            </Card>

            {/* Image Format Selection */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Convert to Format:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {IMAGE_FORMATS.map(format => (
                  <button
                    key={format.value}
                    onClick={() => setSelectedImageFormat(format.value)}
                    className={`p-3 rounded-lg border-2 transition ${
                      selectedImageFormat === format.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{format.icon}</div>
                    <div className="text-sm font-medium text-gray-900">{format.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {imageFiles.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Selected Files ({imageFiles.length})</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {imageFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500 ml-2">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                      <button
                        onClick={() => removeImageFile(idx)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleImageConversion}
              disabled={imageFiles.length === 0 || converting}
              className="w-full btn-primary h-12 text-base"
            >
              {converting ? "Converting..." : `Convert to ${selectedImageFormat.toUpperCase()}`}
            </Button>
          </TabsContent>

          {/* Document Converter Tab */}
          <TabsContent value="document-converter" className="space-y-6">
            <Card className="p-8 border-2 border-dashed border-indigo-200 bg-indigo-50/50 hover:border-indigo-400 transition">
              <div className="text-center">
                <Upload className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Documents</h3>
                <p className="text-gray-600 mb-6">
                  Drag and drop your documents here, or click to select files
                </p>
                <input
                  ref={documentInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.odt"
                  onChange={handleDocumentSelect}
                  className="hidden"
                />
                <Button
                  onClick={() => documentInputRef.current?.click()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Select Documents
                </Button>
              </div>
            </Card>

            {/* Document Format Selection */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Convert to Format:</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {DOCUMENT_FORMATS.map(format => (
                  <button
                    key={format.value}
                    onClick={() => setSelectedDocumentFormat(format.value)}
                    className={`p-3 rounded-lg border-2 transition ${
                      selectedDocumentFormat === format.value
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 bg-white hover:border-indigo-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{format.icon}</div>
                    <div className="text-xs font-medium text-gray-900">{format.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {documentFiles.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Selected Files ({documentFiles.length})</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {documentFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500 ml-2">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                      <button
                        onClick={() => removeDocumentFile(idx)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleDocumentConversion}
              disabled={documentFiles.length === 0 || converting}
              className="w-full btn-primary h-12 text-base"
            >
              {converting ? "Converting..." : `Convert to ${selectedDocumentFormat.toUpperCase()}`}
            </Button>
          </TabsContent>
        </Tabs>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Converter?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-elevated p-6">
              <Zap className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Convert your files in seconds with our optimized processing engine. No waiting, no delays.
              </p>
            </Card>

            <Card className="card-elevated p-6">
              <Lock className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">100% Secure</h3>
              <p className="text-gray-600">
                Your files are processed securely and never stored permanently. Complete privacy guaranteed.
              </p>
            </Card>

            <Card className="card-elevated p-6">
              <Download className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Download</h3>
              <p className="text-gray-600">
                Download your converted files instantly. Support for 18+ file formats.
              </p>
            </Card>

            <Card className="card-elevated p-6">
              <Smartphone className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
              <p className="text-gray-600">
                Works seamlessly on desktop, tablet, and mobile devices. Convert on the go.
              </p>
            </Card>

            <Card className="card-elevated p-6">
              <Clock className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Registration</h3>
              <p className="text-gray-600">
                Start converting immediately. No account creation, no email verification required.
              </p>
            </Card>

            <Card className="card-elevated p-6">
              <Zap className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Batch Convert</h3>
              <p className="text-gray-600">
                Convert multiple files at once and save time. Perfect for bulk processing.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Image Converter</a></li>
                <li><a href="#" className="hover:text-white transition">Document Converter</a></li>
                <li><a href="#" className="hover:text-white transition">Batch Convert</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="/cookies" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Image & PDF Converter. All rights reserved. Free online file conversion tool supporting 18+ formats.</p>
            <p className="mt-2 text-gray-500">Convert images and documents securely. No registration required.</p>
          </div>
        </div>
      </footer>

      {/* Google AdSense Ad Placement */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-500 text-sm">
          <p>Advertisement</p>
          <div className="bg-gray-100 rounded-lg p-8 my-4 min-h-[250px] flex items-center justify-center">
            <p className="text-gray-400">Google AdSense ads will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
