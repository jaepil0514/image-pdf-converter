import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is the file converter really free?",
      answer: "Yes, our file converter is 100% free. There are no hidden charges, no premium features, and no limitations on the number of conversions you can make. You can convert as many files as you want without paying anything."
    },
    {
      question: "What file formats do you support?",
      answer: "We support 18+ file formats including images (JPG, PNG, GIF, BMP, WebP, SVG, TIFF, ICO) and documents (PDF, DOCX, DOC, XLSX, XLS, PPTX, PPT, TXT, RTF, ODT). You can convert between any of these formats."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, your data is completely secure. We use HTTPS encryption for all data in transit, and your files are processed securely on our servers. Most importantly, we delete your files immediately after conversion is complete. We never store or access your files."
    },
    {
      question: "Do I need to register an account?",
      answer: "No, registration is not required. You can start converting files immediately without creating an account or providing any personal information. Just upload your file, choose the output format, and download the converted file."
    },
    {
      question: "How long does conversion take?",
      answer: "Most file conversions are completed in seconds. The exact time depends on the file size and the conversion type, but typically you'll have your converted file ready within 1-5 seconds."
    },
    {
      question: "What is the maximum file size?",
      answer: "The maximum file size for conversion is 50MB. If your file is larger than this, you may need to compress it first or split it into smaller parts."
    },
    {
      question: "Can I convert multiple files at once?",
      answer: "Yes, our converter supports batch processing. You can upload multiple files and convert them all at once. This saves you time when you need to convert many files to the same format."
    },
    {
      question: "Does the converter work on mobile devices?",
      answer: "Yes, our converter is fully responsive and works on all devices including smartphones, tablets, and desktop computers. You can convert files on the go using your mobile device."
    },
    {
      question: "What happens to my files after conversion?",
      answer: "Your files are deleted immediately after the conversion is complete. We do not store any of your files on our servers. Once you download your converted file, the original is permanently removed from our system."
    },
    {
      question: "Can I convert images to PDF?",
      answer: "Yes, you can convert images to PDF format. Simply upload your image file, select PDF as the output format, and download the converted PDF file."
    },
    {
      question: "Can I convert PDF to images?",
      answer: "Yes, you can convert PDF files to image formats like JPG, PNG, and others. Select your desired image format and download the converted file."
    },
    {
      question: "Is there a limit on how many files I can convert?",
      answer: "No, there is no limit on the number of files you can convert. You can convert as many files as you want, whenever you want, completely free."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600 mb-12">
          Find answers to common questions about our file converter service.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-semibold text-gray-900 text-left">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transition-transform flex-shrink-0 ml-4 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 pt-16 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            If you couldn't find the answer you're looking for, feel free to contact us.
          </p>
          <a
            href="mailto:support@imgpdfconv.com"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Contact Support
          </a>
        </div>
      </div>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}
      </script>
    </div>
  );
}
