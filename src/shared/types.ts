/**
 * Represents the API response structure.
 */
export interface ApiResponse<T> {
    responseCode: string
    responseMessage: string
    data: T
}

/**
 * Represents the response structure for an account request.
 */
export interface AccountRequestResponse {
    accountNumber: string
    updateStatus: string
    bvn: string | null
    customer: Customer
    contactAddress: ContactAddress
    accountDocuments: AccountDocumentResponse[]
    dateCreated: string
}

/**
 * Represents an account document.
 */
export interface AccountDocument {
    documentName?: string
    documentType?: string
    documentStatus: string
    documentComment: string | null
}

export interface AccountDocumentUpdate extends AccountDocument {
    document: string[]
    email: string
}

/**
 * Represents multiple customer documents.
 */
export interface CustomerDocumentMultiple {
    email?: string
    customerName?: string
    documentIds: string[]
    documentStatus?: string
    documentComment?: string
}

/**
 * Represents an account document with additional response-specific properties.
 */
export interface AccountDocumentResponse extends AccountDocument {
    documentId: string
    filePath: string
    dateCreated: string
    dateLastModified: string
}

/**
 * Represents a request for an account document.
 */
export interface AccountDocumentRequest {
    documentId: string
    document: File
    documentName?: string
    documentType?: string
}

/**
 * Represents the contact address information.
 */
export interface ContactAddress {
    contactAddressId: string
    country: string
    city: string
    postalCode?: string
    localGovt: string
    state: string
    line1?: string
    line2?: string
    dateCreated?: Date
    dateLastModified?: Date
}

/**
 * Represents an updated contact address.
 */
export interface ContactAddressUpdate extends ContactAddress {
    contactAddressId: string
}

/**
 * Represents the customer personal information.
 */
export interface Customer {
    customerId: string
    customerName: string
    maritalStatus: string
    motherMaidenName: string
    nextOfKinName: string
    nextOfKinPhone: string
    dateCreated: Date
    dateLastModified: Date
}

/**
 * Enumerates the types of documents.
 */
export enum DocumentType {
    Customerphoto = "CUSTOMERPHOTO",
    Diaspora = "DIASPORA",
    Identification = "IDENTIFICATION",
    Proofofadress = "PROOFOFADRESS",
    Signature = "SIGNATURE",
}

/**
 * Enumerates the possible statuses of a document.
 */
export enum DocumentStatus {
    Accepted = "Accepted",
    Pending = "Pending",
}

/**
 * Represents a file field for uploading files.
 */
export type FileField = {
    name: string | null
    file: File | string | null
} | null
