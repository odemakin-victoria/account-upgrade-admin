import { AccountDocumentUpdate, CustomerDocumentMultiple } from "@/shared/types"
import { useState } from "react"

type DocumentId = string | number

interface DocumentSelection {
    selectedIds: string[]
    selectDocument: (document: string) => void
    selectAllDocuments: (documents: string[]) => void
    clearSelection: () => void
}

function useDocumentSelection(): DocumentSelection {
    const [selectedIds, setSelectedIds] = useState<string[]>([])

    const selectDocument = (documentId: string): void => {
        if (selectedIds.some((selected) => selected === documentId)) {
            setSelectedIds(
                selectedIds.filter(
                    (selected) => selected !== documentId
                )
            )
        } else {
            setSelectedIds([...selectedIds, documentId])
        }
    }

    const selectAllDocuments = (documents: string[]): void => {
        setSelectedIds(documents)
    }

    const clearSelection = (): void => {
        setSelectedIds([])
    }

    return {
        selectedIds,
        selectDocument,
        selectAllDocuments,
        clearSelection,
    }
}

export default useDocumentSelection
