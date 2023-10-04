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
    notificationPreference: string | undefined;
    accountNumber: string
    toScreen: string; 
    RequestType: string
    updateStatus: string
    bvn: string 
    vnin: string 
    personalDetails: personalDetails
    nextOfKin: NextOfKin
    employeeStatus: EmployeeStatus
    contactAddress: contactAddress
    citizenship:citizenship
    socialMedia:socialMedia
    idDetail:idDetail
    createdAt: string
    documents: AccountDocumentResponse[]
}

/**
 * Represents an account document.
 */
export interface Document {
    documentName?: string
    documentType?: string
    documentStatus: string
    documentComment: string 
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
    documentId: string[]
   
}
export interface CustomerStatusUpdate {
    status: string
  
   
}

/**
 * Represents an account document with additional response-specific properties.
 */
export interface AccountDocumentResponse extends Document {
    someConditionToBeRejected: any
    documentId: string
    filePath: string
    createdAt: string
    updatedAt: string
}

/**
 * Represents a request for an account document.
 */
export interface AccountDocumentRequest {
    documentId: string
    document: File
    documentName?: string
    documentType?: string
    documentComment?: string
}

/**
 * Represents the contact address information.
 */
export interface contactAddress {
    contactAddress: any
    country: string
    city: string
    zipCode: string
    localGovernment: string
    state: string
    addressLine1: string
    addressLine2: string
    streetAddress: string
    houseNumber:string
    createdAt: Date
    updatedAt: Date

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
    otherReasons:string
    motherMaidenName: string
    firstName: string
    lastName: string
    middleName: string
    dateOfBirth: string
    purposeOfAccount:string
    createdAt: Date
    updatedAt: Date
}
/**
 * Represents the next of kin personal information.
 */
export interface NextOfKin {
    fullName: string
    relationship: string
    dob: string
    phoneNumber: string
    houseNo: string
    state: string
    streetName: string
    localGovernment: string
    postalZipCode: string
    createdAt: Date
    updatedAt: Date
}
export interface EmployeeStatus {
    employmentStatus: string
    employersName: string
    employersAddress:string
    natureOfBusiness: string
    numbersofYears: string
    annualIncome: string
    sourceOfWealth:string
    createdAt?: Date
    updatedAt?: Date
}
export interface socialMedia {
    customerId?: string
    linkedIn: string
    facebook: string
    instagram:string
    tiktok: string
    twitter:string
    thread:string,
    createdAt?: Date
    updatedAt?: Date
}
export interface idDetail {
    customerId?: string
    vnin: string
    idNo: string
    idType:string
    issueDate: string
    expiryDate:string
    createdAt?: Date
    updatedAt?: Date
}
export interface citizenship {
    foreignTaxId: string
    countryTaxResidence: string
    addressLine1: string
    addressLine2: string
    createdAt?: Date
    updatedAt?: Date
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
