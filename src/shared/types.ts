/**
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
    RequestType: string
    updateStatus: string
    bvn: string | null
    personalDetails: personalDetails
    nextOfKin: NextOfKin
    employeeStatus: EmployeeStatus
    contactAddress: contactAddress
    dateCreated: string
    documents: AccountDocumentResponse[]
}

/**
 * Represents an account document.
 */
export interface Document {
    documentName?: string
    documentType?: string
    documentStatus: string
    documentComment: string | null
}

export interface AccountDocumentUpdate extends Document {
    document: string[]
    email: string
}

/**
 * Represents multiple customer documents.
 */

export interface CustomerDocumentMultiple {
    email?: string
    status?: string
    comment: string
   
}

/**
 * Represents an account document with additional response-specific properties.
 */
export interface AccountDocumentResponse extends Document {
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
export interface contactAddress {
    country: string
    city: string
    zipCode: string
    localGovernment: string
    state: string
    addressLine1: string
    addressLine2: string
    streetAddress: string
    houseNumber:string
    dateCreated: Date
    dateLastModified: Date

    requestId: string
    
}

/**
 * Represents an updated contact address.
 */
export interface ContactAddressUpdate extends contactAddress {
    contactAddressId: string
}

/**
 * Represents the customer personal information.
 */
export interface personalDetails {
    personalDetailsId: string
    title: string
    maritalStatus: string
    motherMaidenName: string
    firstName: string
    lastName: string
    middleName: string
    DOB: string
    dateCreated: Date
    dateLastModified: Date
}
/**
 * Represents the next of kin personal information.
 */
export interface NextOfKin {
    fullName: string
    RelationshipOfKin: string
    DobOfKin: string
    phoneNumber: string
    HouseNumberOfKin: string
    StateOfKin: string
    StreetNameOfKin: string
    LocalGovernmentOfKin: string
    PostalZipCodeOfKin: string
    dateCreated: Date
    dateLastModified: Date
}
export interface EmployeeStatus {
    Status: string
    EmployersName: string
    NatureOfBusiness: string
    NumberofYears: string
    AnnualIncome: string
    dateCreated?: Date
    dateLastModified?: Date
}

export interface Citizenship {
    foreignTaxId: string
    countryTaxResidence: string
    mobileNumber: string
    addressLine1: string
    addressLine2: string
    country: string
    dateCreated?: Date
    dateLastModified?: Date
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
