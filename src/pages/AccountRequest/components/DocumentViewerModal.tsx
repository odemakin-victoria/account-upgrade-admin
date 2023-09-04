import React, { useState } from "react"
import { Modal } from "@mantine/core"
import { Document, Page, pdfjs } from "react-pdf"

// Initialize pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface DocumentViewerModalProps {
    isOpen: boolean
    onClose: () => void
    fileUrl: string
    // fileType: "pdf" | "image";
}

export default function DocumentViewerModal({
    isOpen,
    onClose,
    fileUrl,
}: DocumentViewerModalProps) {
    const [numPages, setNumPages] = useState<number | null>(null)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [fileType, setFileType] = useState<string>("")

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
    }

    const getFileExtension = () => {
        const lastDotIndex = fileUrl.lastIndexOf(".")
        if (lastDotIndex === -1) {
            return "" // No file extension found
        }
        const extension = fileUrl.slice(lastDotIndex + 1)
        setFileType(extension.toLowerCase()) // Convert to lowercase if needed
    }

    return (
        <Modal opened={isOpen} onClose={onClose} title="Document Viewer">
            {fileType === "pdf" || fileType === "docx" || fileType === "doc" ? (
                <div>
                    <Document
                        file={fileUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        {Array.from(new Array(numPages || 0), (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                width={400}
                            />
                        ))}
                    </Document>
                    {numPages && (
                        <p>
                            Page {pageNumber} of {numPages}
                        </p>
                    )}
                    <button
                        onClick={() => setPageNumber(pageNumber - 1)}
                        disabled={pageNumber <= 1}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setPageNumber(pageNumber + 1)}
                        disabled={pageNumber >= (numPages || 1)}
                    >
                        Next
                    </button>
                </div>
            ) : (
                <img src={fileUrl} alt="Image" />
            )}
        </Modal>
    )
}
