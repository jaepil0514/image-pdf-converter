export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h1>
        <p className="text-lg text-gray-600 mb-12">
          Our simple 3-step process makes converting files easy and fast. No registration, no software installation needed.
        </p>

        <div className="space-y-12">
          <div className="flex gap-8 items-start">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white text-xl font-bold">
                1
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Upload Your File</h2>
              <p className="text-gray-600 mb-4">
                Select the file you want to convert. We support images and documents in multiple formats.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Drag and drop or click to select</li>
                <li>Support for files up to 50MB</li>
                <li>Multiple file formats supported</li>
                <li>No registration required</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-8 items-start">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white text-xl font-bold">
                2
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Choose Output Format</h2>
              <p className="text-gray-600 mb-4">
                Select the format you want to convert to. We offer multiple output options for each file type.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Wide range of output formats</li>
                <li>Instant format selection</li>
                <li>Quality settings available</li>
                <li>Batch conversion support</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-8 items-start">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white text-xl font-bold">
                3
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Download Converted File</h2>
              <p className="text-gray-600 mb-4">
                Your file is converted instantly and ready to download. No waiting, no email required.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Instant download</li>
                <li>High-quality output</li>
                <li>Secure processing</li>
                <li>Files deleted after conversion</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-16 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Our Converter?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">100% Free</h3>
              <p className="text-gray-600">
                No hidden charges, no premium features. Convert unlimited files completely free.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Private</h3>
              <p className="text-gray-600">
                Your files are processed securely and deleted immediately after conversion.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Processing</h3>
              <p className="text-gray-600">
                Most conversions complete in seconds. No waiting, no queues, instant results.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Works Everywhere</h3>
              <p className="text-gray-600">
                Convert files on any device - desktop, tablet, or mobile. No software needed.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-16 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Supported Formats</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Image Formats</h3>
              <p className="text-gray-600 mb-4">
                Convert between popular image formats with high quality preservation.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 font-mono text-sm">
                  JPG, PNG, GIF, BMP, WebP, SVG, TIFF, ICO
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Document Formats</h3>
              <p className="text-gray-600 mb-4">
                Convert documents while preserving formatting and layout.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 font-mono text-sm">
                  PDF, DOCX, DOC, XLSX, XLS, PPTX, PPT, TXT, RTF, ODT
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
