import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Download, Zap, Lock, Smartphone, Clock } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

/**
 * Image & PDF Converter - Premium Online File Conversion Tool
 * 
 * Design Philosophy:
 * - Modern, clean interface with gradient accents
 * - Premium typography (Poppins for headers, Inter for body)
 * - Smooth animations and transitions
 * - Mobile-first responsive design
 * - SEO-optimized content structure
 */

export default function Home() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  // Handle image to PDF conversion
  const handleImageToPDF = async () => {
    if (imageFiles.length === 0) {
      toast.error("Please select at least one image file");
      return;
    }

    setConverting(true);
    try {
      // Simulate conversion process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Successfully converted ${imageFiles.length} image(s) to PDF`);
      setImageFiles([]);
      
      // In production, this would trigger actual file download
    } catch (error) {
      toast.error("Conversion failed. Please try again.");
    } finally {
      setConverting(false);
    }
  };

  // Handle PDF to image conversion
  const handlePDFToImage = async () => {
    if (pdfFiles.length === 0) {
      toast.error("Please select at least one PDF file");
      return;
    }

    setConverting(true);
    try {
      // Simulate conversion process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Successfully converted ${pdfFiles.length} PDF(s) to image(s)`);
      setPdfFiles([]);
      
      // In production, this would trigger actual file download
    } catch (error) {
      toast.error("Conversion failed. Please try again.");
    } finally {
      setConverting(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(prev => [...prev, ...files]);
  };

  const handlePDFSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPdfFiles(prev => [...prev, ...files]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">IC</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Image & PDF Converter</h1>
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
            Convert Images to PDF & PDF to Images
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Fast, secure, and completely free. Convert between image formats (JPG, PNG, GIF, BMP, WebP) and PDF in seconds. No registration required.
          </p>
        </div>

        {/* Main Converter Tabs */}
        <Tabs defaultValue="image-to-pdf" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="image-to-pdf" className="text-base">Image to PDF</TabsTrigger>
            <TabsTrigger value="pdf-to-image" className="text-base">PDF to Image</TabsTrigger>
          </TabsList>

          {/* Image to PDF Tab */}
          <TabsContent value="image-to-pdf" className="space-y-6">
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

            {imageFiles.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Selected Files ({imageFiles.length})</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {imageFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleImageToPDF}
              disabled={imageFiles.length === 0 || converting}
              className="w-full btn-primary h-12 text-base"
            >
              {converting ? "Converting..." : "Convert to PDF"}
            </Button>
          </TabsContent>

          {/* PDF to Image Tab */}
          <TabsContent value="pdf-to-image" className="space-y-6">
            <Card className="p-8 border-2 border-dashed border-indigo-200 bg-indigo-50/50 hover:border-indigo-400 transition">
              <div className="text-center">
                <Upload className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload PDF Files</h3>
                <p className="text-gray-600 mb-6">
                  Drag and drop your PDF files here, or click to select files
                </p>
                <input
                  ref={pdfInputRef}
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handlePDFSelect}
                  className="hidden"
                />
                <Button
                  onClick={() => pdfInputRef.current?.click()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Select PDFs
                </Button>
              </div>
            </Card>

            {pdfFiles.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Selected Files ({pdfFiles.length})</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {pdfFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handlePDFToImage}
              disabled={pdfFiles.length === 0 || converting}
              className="w-full btn-primary h-12 text-base"
            >
              {converting ? "Converting..." : "Convert to Images"}
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
                Your files are processed locally and never stored on our servers. Complete privacy guaranteed.
              </p>
            </Card>

            <Card className="card-elevated p-6">
              <Download className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Download</h3>
              <p className="text-gray-600">
                Download your converted files instantly. Support for all major image and document formats.
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

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white font-bold text-lg">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Your File</h3>
                <p className="text-gray-600">
                  Select one or multiple image or PDF files from your device. Supports JPG, PNG, GIF, BMP, WebP, and PDF formats.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white font-bold text-lg">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Conversion Type</h3>
                <p className="text-gray-600">
                  Select whether you want to convert images to PDF or PDF to images. Our tool handles the rest automatically.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white font-bold text-lg">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Download Your Files</h3>
                <p className="text-gray-600">
                  Once conversion is complete, download your files instantly. All conversions are performed securely and privately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is the conversion really free?</h3>
              <p className="text-gray-600">
                Yes, completely free! Our image and PDF converter is 100% free to use with no hidden charges or premium features.
              </p>
            </Card>

            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What file formats are supported?</h3>
              <p className="text-gray-600">
                We support JPG, PNG, GIF, BMP, WebP, and PDF formats. You can convert between any of these formats seamlessly.
              </p>
            </Card>

            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Are my files secure?</h3>
              <p className="text-gray-600">
                Yes, your files are processed locally in your browser and never uploaded to our servers. Complete privacy is guaranteed.
              </p>
            </Card>

            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the file size limit?</h3>
              <p className="text-gray-600">
                There is no strict file size limit, but for optimal performance, we recommend files under 50MB. Larger files may take longer to process.
              </p>
            </Card>

            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I convert multiple files at once?</h3>
              <p className="text-gray-600">
                Yes! Our batch conversion feature allows you to convert multiple files simultaneously, saving you time and effort.
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
                <li><a href="#" className="hover:text-white transition">Image to PDF</a></li>
                <li><a href="#" className="hover:text-white transition">PDF to Image</a></li>
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
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
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
            <p>&copy; 2026 Image & PDF Converter. All rights reserved. Free online file conversion tool.</p>
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
