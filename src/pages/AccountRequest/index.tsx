import { useReducer, useState } from "react"
import { DrawerCell } from "../Dashboard/components/drawer"
import { BiArrowBack } from "react-icons/bi"
import {
    // useAccountNumberQuery,
    useAccountRequestQuery,
    useDocumentUpdate,
    useAccountStatusUpdate,
} from "./hooks/queries.hooks"
import { useNavigate, useParams } from "react-router-dom"
import { DASHBOARD_ROUTE } from "../routes-config"
import DocumentRow from "./components/table"
import useDocumentSelection from "./hooks/checbox-select.hooks"
import { Button, Label, Modal } from "@/shared/components"
import { Controller, useForm } from "react-hook-form"
import { IUpdateDocument } from "./hooks/types"

import { reducer } from "./utils"
import { Loader, Skeleton } from "@mantine/core"
import ContactDetails from "./components/contact-details"
import headerOptimusLogo from "@/shared/assets/images/Optimus_Logo.svg"
import { useRequestTypeContext } from "@/utils/request.context"
import { CustomerDocumentMultiple } from "@/shared/types"

export default function AccountRequest() {
    const { data, isLoading } = useAccountRequestQuery()
    const { requestType } = useRequestTypeContext()
    const [comment, setComment] = useState("")

    const [document, setDocument] = useState<string | null>(null)
    const [isImgLoaded, setIsImgLoaded] = useState(false)

    const { selectDocument, selectedIds, clearSelection } =
        useDocumentSelection()
    const navigate = useNavigate()
    const methods = useForm<IUpdateDocument>({
        defaultValues: {
            documentComment: "",
            documentId: [],
            documentStatus: "",
        },
    })

    const [modalState, dispatch] = useReducer(reducer, { modalType: null })
    const { mutate, ...update } = useDocumentUpdate()

    const handleSubmit = (
        value: IUpdateDocument,

        status: "Accepted" | "Rejected"
    ) => {
        dispatch({ type: "CLOSE_MODAL" })
        clearSelection()

        mutate({
            status,
            comment,
            documentId: selectedIds, // Pass the array of selected document IDs
        })
    }

    const { mutate: mutateHandler } = useAccountStatusUpdate()

    const handleRejectClick = (status: "Accepted" | "Rejected") => {
        // Assuming mutateHandler returns void
        mutateHandler(status)
        setTimeout(() => {
            navigate(DASHBOARD_ROUTE) // Navigate to dashboard after 3000ms (3 seconds)
        }, 2000)
    }

    const handleAcceptClick = (status: "Accepted" | "Rejected") => {
        // Assuming mutateHandler returns void
        mutateHandler(status)
        setTimeout(() => {
            navigate(DASHBOARD_ROUTE) // Navigate to dashboard after 3000ms (3 seconds)
        }, 2000)
    }

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }
    return (
        <div className="px-14 py-10 min-h-screen mx-auto ">
            <div className="flex items-center gap-6 mb-10">
                <BiArrowBack
                    className="text-3xl"
                    onClick={() => navigate(DASHBOARD_ROUTE)}
                    role="button"
                    aria-label="goto dashboard"
                />
                <img src={headerOptimusLogo} alt="optimus_bank_logo" />
            </div>
            <div className="px-">
                {requestType === "update" && (
                    <main className="p-4 pr-6">
                        <div>
                            {data?.toScreen === "B" ? (
                                <div
                                    style={{
                                        backgroundColor: "yellow",
                                        color: "black",
                                        padding: "30px",
                                        marginBottom: 20,
                                    }}
                                >
                                    This Customer's country{" "}
                                    {data?.contactAddress?.country} falls under
                                    the Category B classification , kindly
                                    contact Compliance to review .
                                </div>
                            ) : data?.toScreen === "C" ? (
                                <div
                                    style={{
                                        backgroundColor: "red",
                                        color: "white",
                                        padding: "30px",
                                        marginBottom: 20,
                                    }}
                                >
                                    This Customer's country{" "}
                                    {data?.contactAddress.country}{" "}
                                    classification falls under the Category C ,
                                    kindly restriced account and contact
                                    Compliance to take appropriate step.
                                </div>
                            ) : (
                                <Skeleton visible={isLoading}>
                                    <DrawerCell
                                        title="toScreen"
                                        content={
                                            data?.toScreen
                                                ? String(
                                                      data.toScreen
                                                  ).toString()
                                                : "---"
                                        }
                                    />
                                </Skeleton>
                            )}
                        </div>
                        <div className="mb-20">
                            <h2 className="text-lg mb-8 centered-line">
                                Personal Details
                            </h2>
                            <div className="grid grid-cols-2 gap-6 gap-x-6">
                                <Skeleton visible={isLoading}>
                                    <DrawerCell
                                        title="First Name"
                                        content={
                                            data?.personalDetails?.firstName !==
                                            undefined
                                                ? data?.personalDetails
                                                      ?.firstName
                                                : "---"
                                        }
                                    />
                                </Skeleton>
                                <Skeleton visible={isLoading}>
                                    <DrawerCell
                                        title="Middle Name"
                                        content={
                                            data?.personalDetails
                                                ?.middleName !== undefined
                                                ? data?.personalDetails
                                                      ?.middleName
                                                : "---"
                                        }
                                    />
                                </Skeleton>

                                <Skeleton visible={isLoading}>
                                    <DrawerCell
                                        title="Last Name"
                                        content={
                                            data?.personalDetails?.lastName !==
                                            undefined
                                                ? data?.personalDetails
                                                      ?.lastName
                                                : "---"
                                        }
                                    />
                                </Skeleton>
                                <Skeleton visible={isLoading}>
                                    <DrawerCell
                                        title="Mother's Maiden Name"
                                        content={
                                            data?.personalDetails
                                                ?.motherMaidenName !== undefined
                                                ? data?.personalDetails
                                                      ?.motherMaidenName
                                                : "---"
                                        }
                                    />
                                </Skeleton>

                                <Skeleton visible={isLoading}>
                                    <DrawerCell
                                        title="Marital Status"
                                        content={
                                            data?.personalDetails
                                                ?.maritalStatus !== undefined
                                                ? data?.personalDetails
                                                      ?.maritalStatus
                                                : "---"
                                        }
                                    />
                                </Skeleton>

                                <Skeleton visible={isLoading}>
                                    <DrawerCell
                                        title="Date of Birth"
                                        content={
                                            data?.personalDetails
                                                ?.dateOfBirth !== undefined
                                                ? data?.personalDetails
                                                      ?.dateOfBirth
                                                : "---"
                                        }
                                    />
                                </Skeleton>
                            </div>
                        </div>
                        <ContactDetails
                            isLoading={isLoading}
                            data={data?.contactAddress}
                        />
                        <h2 className="text-lg mb-8 centered-line">
                            Employment Details{" "}
                        </h2>
                        <div className="grid grid-cols-2 gap-6 gap-x-6 mb-10">
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Employment Status"
                                    content={
                                        !data?.employeeStatus
                                            ?.employmentStatus ||
                                        data?.employeeStatus
                                            ?.employmentStatus == "undefined"
                                            ? "---"
                                            : data?.employeeStatus
                                                  ?.employmentStatus
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Employer's Name"
                                    content={
                                        !data?.employeeStatus?.employersName ||
                                        data?.employeeStatus?.employersName ==
                                            "undefined"
                                            ? "---"
                                            : data?.employeeStatus
                                                  ?.employersName
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Numbers of Years in Employment"
                                    content={
                                        !data?.employeeStatus?.numbersofYears ||
                                        data?.employeeStatus?.numbersofYears ==
                                            "undefined"
                                            ? "---"
                                            : data?.employeeStatus
                                                  ?.numbersofYears
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Source of Wealth"
                                    content={
                                        !data?.employeeStatus?.sourceOfWealth ||
                                        data?.employeeStatus?.sourceOfWealth ==
                                            "undefined"
                                            ? "---"
                                            : data?.employeeStatus
                                                  ?.sourceOfWealth
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Annual Income"
                                    content={
                                        !data?.employeeStatus?.annualIncome ||
                                        data?.employeeStatus?.annualIncome ==
                                            "undefined"
                                            ? "---"
                                            : data?.employeeStatus?.annualIncome
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Nature Of Business"
                                    content={
                                        !data?.employeeStatus
                                            ?.natureOfBusiness ||
                                        data?.employeeStatus
                                            ?.natureOfBusiness == "undefined"
                                            ? "---"
                                            : data?.employeeStatus
                                                  ?.natureOfBusiness
                                    }
                                />
                            </Skeleton>
                        </div>
                        {/* <div className="grid grid-cols-2 gap-6 gap-x-6">
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Employer's Name"
                                    content={
                                        !data?.employeeStatus?.employersName ||
                                        data?.employeeStatus?.employersName ==
                                            "undefined"
                                            ? "---"
                                            : data?.employeeStatus
                                                  ?.employersName
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Employmer's Name"
                                    content={
                                        !data?.employeeStatus
                                            ?.employersAddress ||
                                        data?.employeeStatus
                                            ?.employersAddress == "undefined"
                                            ? "---"
                                            : data?.employeeStatus
                                                  ?.employersAddress
                                    }
                                />
                            </Skeleton>
                        </div> */}
                        <h2 className="text-lg mb-8 centered-line mt-10">
                            Notification Details{" "}
                        </h2>

                        <Skeleton visible={isLoading}>
                            <DrawerCell
                                title="Notification Preference"
                                content={
                                    data?.notificationPreference !== undefined
                                        ? data?.notificationPreference
                                        : "---"
                                }
                            />
                        </Skeleton>
                        <div className="mb-14 ">
                            <div className="pr-10 centered-line bg-white mb-8">
                                <h2 className="text-lg mb-4 ">
                                    Means of Identification
                                </h2>
                            </div>
                            <Skeleton visible={isLoading}>
                                {selectedIds.length > 0 && (
                                    <div className="flex justify-end gap-6 mb-6">
                                        <button
                                            type="button"
                                            className="p-4 bg-red-500 w-28 text-white rounded-lg "
                                            onClick={() =>
                                                dispatch({
                                                    type: "OPEN_MODAL",
                                                    modalType: "REJECT",
                                                })
                                            }
                                        >
                                            Reject
                                        </button>
                                        <button
                                            type="button"
                                            className="p-4 bg-blue-500 text-white rounded-lg"
                                            onClick={() =>
                                                dispatch({
                                                    type: "OPEN_MODAL",
                                                    modalType: "ACCEPT",
                                                })
                                            }
                                        >
                                            Confirm Documents
                                        </button>
                                    </div>
                                )}

                                <table className="w-full bg-gray-50">
                                    <tbody>
                                        {data?.documents
                                            ?.filter(
                                                (item) =>
                                                    item.documentType !==
                                                        "DIASPORA" &&
                                                    (item.documentStatus ===
                                                        "PENDING" ||
                                                        item.documentStatus ===
                                                            "Accepted")
                                            )
                                            .map((item, index) => (
                                                <DocumentRow
                                                    key={index}
                                                    data={{
                                                        id: item.documentId as string,
                                                        documentType:
                                                            item.documentType as string,
                                                        documentStatus:
                                                            item.documentStatus,
                                                        documentComment:
                                                            item.documentComment as string,
                                                        link: item.filePath,
                                                    }}
                                                    isChecked={selectedIds.includes(
                                                        item.documentId
                                                    )}
                                                    toggleSelection={
                                                        selectDocument
                                                    }
                                                    onView={(args) =>
                                                        setDocument(args)
                                                    }
                                                />
                                            ))}
                                    </tbody>
                                </table>
                            </Skeleton>
                        </div>
                        <div className="mb-14">
                            <h2 className="text-lg mb-4">
                                Diaspora Information
                            </h2>

                            <table className="w-full bg-gray-50">
                                <tbody>
                                    {data?.documents
                                        ?.filter(
                                            (item) =>
                                                item.documentType === "DIASPORA"
                                        )
                                        .map((item, index) => (
                                            <DocumentRow
                                                key={index}
                                                data={{
                                                    id: item.documentId as string,
                                                    documentType: `${
                                                        item.documentType
                                                    }-${index + 1}`,
                                                    documentStatus:
                                                        item.documentStatus,
                                                    documentComment:
                                                        item.documentComment as string,
                                                    link: item.filePath,
                                                }}
                                                isChecked={selectedIds.includes(
                                                    item.documentId
                                                )}
                                                toggleSelection={selectDocument}
                                                onView={(args) =>
                                                    setDocument(args)
                                                }
                                            />
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h2 className="text-lg mb-8 centered-line">
                                Rejected Documents
                            </h2>
                            <table className="w-full bg-gray-50">
                                <tbody>
                                    {data?.documents
                                        ?.filter(
                                            (item) =>
                                                item.documentType !==
                                                    "DIASPORA" &&
                                                item.documentStatus ===
                                                    "Rejected"
                                        )
                                        .map((item, index) => (
                                            <DocumentRow
                                                key={index}
                                                data={{
                                                    id: item.documentId as string,
                                                    documentType:
                                                        item.documentType as string,
                                                    documentStatus:
                                                        item.documentStatus,
                                                    documentComment:
                                                        item.documentComment as string,
                                                    link: item.filePath,
                                                }}
                                                isChecked={selectedIds.includes(
                                                    item.documentId
                                                )}
                                                toggleSelection={selectDocument}
                                                onView={(args) =>
                                                    setDocument(args)
                                                }
                                            />
                                        ))}
                                </tbody>
                            </table>
                            <div className="mt-10">
                                <h2 className="text-lg mb-8 centered-line">
                                    Final Status
                                </h2>
                                <div className="flex mx-auto">
                                    <button
                                        className={`p-4 ${
                                            data?.status === "Accepted" ||
                                            data?.status === "Rejected"
                                                ? "bg-gray-400"
                                                : "bg-red-500"
                                        } w-28 text-white rounded-lg mr-10`}
                                        onClick={() =>
                                            handleRejectClick("Rejected")
                                        }
                                        disabled={
                                            data?.status === "Accepted" ||
                                            data?.status === "Rejected"
                                        }
                                    >
                                        Reject
                                    </button>

                                    <button
                                        className={`p-4 ${
                                            data?.status === "Accepted" ||
                                            data?.status === "Rejected"
                                                ? "bg-gray-400"
                                                : "bg-blue-500"
                                        } w-28 text-white rounded-lg`}
                                        onClick={() =>
                                            handleAcceptClick("Accepted")
                                        }
                                        disabled={
                                            data?.status === "Accepted" ||
                                            data?.status === "Rejected"
                                        }
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                )}
                {requestType === "upgrade" && (
                    <main className="p-4 pr-6 mx-auto">
                        <div>
                            {data?.toScreen === "B" ? (
                                <div
                                    style={{
                                        backgroundColor: "yellow",
                                        color: "black",
                                        padding: "30px",
                                        marginBottom: 20,
                                    }}
                                >
                                    This Customer's country{" "}
                                    {data?.contactAddress.country} falls under
                                    the Category B classification , kindly
                                    contact Compliance to review .
                                </div>
                            ) : data?.toScreen === "C" ? (
                                <div
                                    style={{
                                        backgroundColor: "red",
                                        color: "white",
                                        padding: "30px",
                                        marginBottom: 20,
                                    }}
                                >
                                    This Customer's country{" "}
                                    {data?.contactAddress.country}{" "}
                                    classification falls under the Category C ,
                                    kindly restricted account and contact
                                    Compliance to take appropriate step.
                                </div>
                            ) : (
                                <Skeleton visible={isLoading}>
                                    <DrawerCell
                                        title="toScreen"
                                        content={
                                            data?.toScreen
                                                ? String(
                                                      data.toScreen
                                                  ).toString()
                                                : "---"
                                        }
                                    />
                                </Skeleton>
                            )}
                        </div>

                        {/* <div>
                            {data?.toScreen === true ? (
                                <div
                                    style={{
                                        backgroundColor: "red",
                                        color: "white",
                                        padding: "30px",
                                        marginBottom: 20,
                                    }}
                                >
                                   This account has been restricted due to the customer's classification as category B, and Compliance should be contacted to review the next steps.
                                </div>
                            ) : (
                                <Skeleton visible={isLoading}>
                                    <DrawerCell
                                        title="toScreen"
                                        content={
                                            data?.toScreen
                                                ? String(data.toScreen).toString()
                                                : "---"
                                        }
                                    />
                                </Skeleton>
                            )}
                        </div> */}
                        <div className="mb-20">
                            <h2 className="text-lg mb-8  centered-line">
                                Personal Details
                            </h2>
                            <div className="grid grid-cols-2 gap-6 gap-x-6">
                                <Skeleton visible={isLoading}>
                                    <DrawerCell
                                        title="Account Number"
                                        content={
                                            data?.accountNumber !== undefined
                                                ? data?.accountNumber
                                                : "---"
                                        }
                                    />
                                </Skeleton>
                                <Skeleton visible={isLoading}>
                                    <DrawerCell
                                        title="BVN"
                                        content={
                                            data?.bvn !== undefined
                                                ? data?.bvn
                                                : "---"
                                        }
                                    />
                                </Skeleton>

                                <Skeleton visible={isLoading}>
                                    <DrawerCell
                                        title="Title"
                                        content={
                                            data?.personalDetails?.title !==
                                            undefined
                                                ? data?.personalDetails?.title
                                                : "---"
                                        }
                                    />
                                </Skeleton>

                                <Skeleton visible={isLoading}>
                                    <DrawerCell
                                        title="Mother's Maiden Name"
                                        content={
                                            data?.personalDetails
                                                ?.motherMaidenName !== undefined
                                                ? data?.personalDetails
                                                      ?.motherMaidenName
                                                : "---"
                                        }
                                    />
                                </Skeleton>
                                <Skeleton visible={isLoading}>
                                    <DrawerCell
                                        title="Marital Status"
                                        content={
                                            data?.personalDetails
                                                ?.maritalStatus !== undefined
                                                ? data?.personalDetails
                                                      ?.maritalStatus
                                                : "---"
                                        }
                                    />
                                </Skeleton>
                                <Skeleton visible={isLoading}>
                                    <DrawerCell
                                        title="Purpose of Account "
                                        content={
                                            data?.personalDetails
                                                ?.purposeOfAccount !== undefined
                                                ? data?.personalDetails
                                                      ?.purposeOfAccount
                                                : "---"
                                        }
                                    />
                                </Skeleton>
                                <Skeleton visible={isLoading}>
                                    <DrawerCell
                                        title="Other Reason"
                                        content={
                                            data?.personalDetails
                                                ?.otherReasons !== undefined
                                                ? data?.personalDetails
                                                      ?.otherReasons
                                                : "---"
                                        }
                                    />
                                </Skeleton>
                                <Skeleton visible={isLoading}>
                                    <DrawerCell title="Upload Photo">
                                        <img
                                            src={
                                                data?.documents?.find(
                                                    (item) =>
                                                        item.documentType ===
                                                        "CUSTOMERPHOTO"
                                                )?.filePath || "---"
                                            }
                                            alt="user"
                                            className="w-48 h-48" // Set the image size to 100px by adding these classes
                                        />
                                    </DrawerCell>
                                </Skeleton>
                                <Skeleton visible={isLoading}>
                                    <DrawerCell title="Signature">
                                        <img
                                            src={
                                                data?.documents?.find(
                                                    (item) =>
                                                        item.documentType ===
                                                        "SIGNATURE"
                                                )?.filePath || "---"
                                            }
                                            alt="signature file"
                                            className="w-48 h-48" // Set the image size to 100px by adding these classes
                                        />
                                    </DrawerCell>
                                </Skeleton>
                            </div>
                        </div>

                        <h2 className="text-lg mb-8  centered-line">
                            Next of Kin Details
                        </h2>
                        <div className="grid grid-cols-2 gap-6 gap-x-6 mb-10">
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Name of Next of Kin"
                                    content={
                                        data?.nextOfKin?.fullName !==
                                        "undefined"
                                            ? data?.nextOfKin?.fullName
                                            : "---"
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Relationship with Next of Kin"
                                    content={
                                        data?.nextOfKin?.relationship !==
                                        "undefined"
                                            ? data?.nextOfKin?.relationship
                                            : "---"
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Next of Kin Phone Number"
                                    content={
                                        data?.nextOfKin?.phoneNumber !==
                                        "undefined"
                                            ? data?.nextOfKin?.phoneNumber
                                            : "---"
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Next of Kin Date of Birth"
                                    content={
                                        data?.nextOfKin?.dob !== "undefined"
                                            ? data?.nextOfKin?.dob
                                            : "---"
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Next of Kin House No"
                                    content={
                                        !data?.nextOfKin?.houseNo ||
                                        data?.nextOfKin?.houseNo == "undefined"
                                            ? data?.contactAddress?.houseNumber
                                            : data?.nextOfKin?.houseNo
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Next of Kin Street Name"
                                    content={
                                        !data?.nextOfKin?.streetName ||
                                        data?.nextOfKin?.streetName ==
                                            "undefined"
                                            ? data?.contactAddress
                                                  ?.streetAddress
                                            : data?.nextOfKin?.streetName
                                    }
                                />
                            </Skeleton>

                            <Skeleton visible={isLoading}>
                            <DrawerCell
    title="State of Next of Kin"
    content={data?.nextOfKin?.state || data?.contactAddress?.state}
/>


                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Local Government of Next of Kin"
                                    content={
                                        !data?.nextOfKin?.localGovernment ||
                                        data?.nextOfKin?.localGovernment ==
                                            "undefined"
                                            ? data?.contactAddress
                                                  ?.localGovernment
                                            : data?.nextOfKin?.localGovernment
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Next of Kin Postal Code"
                                    content={
                                        !data?.nextOfKin?.postalZipCode ||
                                        data?.nextOfKin?.postalZipCode ==
                                            "undefined"
                                            ? data?.contactAddress?.zipCode
                                            : data?.nextOfKin?.postalZipCode
                                    }
                                />
                            </Skeleton>
                        </div>

                        <ContactDetails
                            isLoading={isLoading}
                            data={data?.contactAddress}
                        />

                        <h2 className="text-lg mb-8 centered-line">
                            Employment Status
                        </h2>
                        <div className="grid grid-cols-2 gap-6 gap-x-6 mb-10">
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Employment Status"
                                    content={
                                        !data?.employeeStatus
                                            ?.employmentStatus ||
                                        data?.employeeStatus
                                            ?.employmentStatus == "undefined"
                                            ? "---"
                                            : data?.employeeStatus
                                                  ?.employmentStatus
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Employer's Name"
                                    content={
                                        !data?.employeeStatus?.employersName ||
                                        data?.employeeStatus?.employersName ==
                                            "undefined"
                                            ? "---"
                                            : data?.employeeStatus
                                                  ?.employersName
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Numbers of Years in Employment"
                                    content={
                                        !data?.employeeStatus?.numbersofYears ||
                                        data?.employeeStatus?.numbersofYears ==
                                            "undefined"
                                            ? "---"
                                            : data?.employeeStatus
                                                  ?.numbersofYears
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Source of Wealth"
                                    content={
                                        !data?.employeeStatus?.sourceOfWealth ||
                                        data?.employeeStatus?.sourceOfWealth ==
                                            "undefined"
                                            ? "---"
                                            : data?.employeeStatus
                                                  ?.sourceOfWealth
                                    }
                                />
                            </Skeleton>

                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Annual Income"
                                    content={
                                        !data?.employeeStatus?.annualIncome ||
                                        data?.employeeStatus?.annualIncome ==
                                            "undefined"
                                            ? "---"
                                            : data?.employeeStatus?.annualIncome
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Employers Address"
                                    content={
                                        !data?.employeeStatus
                                            ?.employersAddress ||
                                        data?.employeeStatus
                                            ?.employersAddress == "undefined"
                                            ? "---"
                                            : data?.employeeStatus
                                                  ?.employersAddress
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Nature Of Business"
                                    content={
                                        !data?.employeeStatus
                                            ?.natureOfBusiness ||
                                        data?.employeeStatus
                                            ?.natureOfBusiness == "undefined"
                                            ? "---"
                                            : data?.employeeStatus
                                                  ?.natureOfBusiness
                                    }
                                />
                            </Skeleton>
                        </div>

                        <h2 className="text-lg mb-8 centered-line">
                            Social Media
                        </h2>

                        <div className="grid grid-cols-2 gap-6 gap-x-6 mb-10">
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" linkedIn"
                                    content={
                                        !data?.socialMedia?.linkedIn ||
                                        data?.socialMedia?.linkedIn ==
                                            "undefined"
                                            ? "---"
                                            : data?.socialMedia?.linkedIn
                                    }
                                />
                            </Skeleton>

                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Facebook"
                                    content={
                                        !data?.socialMedia?.facebook ||
                                        data?.socialMedia?.facebook ==
                                            "undefined"
                                            ? "---"
                                            : data?.socialMedia?.facebook
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Instagram"
                                    content={
                                        !data?.socialMedia?.instagram ||
                                        data?.socialMedia?.instagram ==
                                            "undefined"
                                            ? "---"
                                            : data?.socialMedia?.instagram
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Tiktok"
                                    content={
                                        !data?.socialMedia?.tiktok ||
                                        data?.socialMedia?.tiktok == "undefined"
                                            ? "---"
                                            : data?.socialMedia?.tiktok
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Twitter"
                                    content={
                                        !data?.socialMedia?.twitter ||
                                        data?.socialMedia?.twitter ==
                                            "undefined"
                                            ? "---"
                                            : data?.socialMedia?.twitter
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Thread"
                                    content={
                                        !data?.socialMedia?.thread ||
                                        data?.socialMedia?.thread == "undefined"
                                            ? "---"
                                            : data?.socialMedia?.thread
                                    }
                                />
                            </Skeleton>
                        </div>

                        <h2 className="text-lg mb-8 centered-line">
                            FATCA/CRS
                        </h2>

                        <div className="grid grid-cols-2 gap-6 gap-x-6 mb-10">
                            <Skeleton visible={isLoading}>
                            <DrawerCell
    title="Fatca Accepted"
    content={
        data?.citizenship?.fatcaAccepted !== null
            ? data?.citizenship?.fatcaAccepted.toString()
            : "---"
    }
/>

                            </Skeleton>

                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Foreign Tax Id"
                                    content={
                                        !data?.citizenship?.foreignTaxId ||
                                        data?.citizenship?.foreignTaxId ==
                                            "undefined"
                                            ? "---"
                                            : data?.citizenship?.foreignTaxId
                                    }
                                />
                            </Skeleton>

                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Country Tax Residence"
                                    content={
                                        !data?.citizenship
                                            ?.countryTaxResidence ||
                                        data?.citizenship
                                            ?.countryTaxResidence == "undefined"
                                            ? "---"
                                            : data?.citizenship
                                                  ?.countryTaxResidence
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Address Line 1"
                                    content={
                                        !data?.citizenship?.addressLine1 ||
                                        data?.citizenship?.addressLine1 ==
                                            "undefined"
                                            ? "---"
                                            : data?.citizenship?.addressLine1
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Address Line 2"
                                    content={
                                        !data?.citizenship?.addressLine2 ||
                                        data?.citizenship?.addressLine2 ==
                                            "undefined"
                                            ? "---"
                                            : data?.citizenship?.addressLine2
                                    }
                                />
                            </Skeleton>

                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Reason for not being able to obtain TIN Reason B only"
                                    content={
                                        !data?.citizenship?.noReasonCause ||
                                        data?.citizenship?.noReasonCause ==
                                            "undefined"
                                            ? "---"
                                            : data?.citizenship?.noReasonCause
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="  Reason for No TIN "
                                    content={
                                        !data?.citizenship
                                            ?.noReasonForTinClass ||
                                        data?.citizenship
                                            ?.noReasonForTinClass == "undefined"
                                            ? "---"
                                            : data?.citizenship
                                                  ?.noReasonForTinClass
                                    }
                                />
                            </Skeleton>
                        </div>

                        <h2 className="text-lg mb-8 centered-line">
                            Identification Card
                        </h2>

                        <div className="grid grid-cols-2 gap-6 gap-x-6 mb-10">
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" Virtual NIN"
                                    content={
                                        !data?.idDetail?.vnin ||
                                        data?.idDetail?.vnin == "undefined"
                                            ? "---"
                                            : data?.idDetail?.vnin
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title=" ID Number"
                                    content={
                                        !data?.idDetail?.idNo ||
                                        data?.idDetail?.idNo == "undefined"
                                            ? "---"
                                            : data?.idDetail?.idNo
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="ID Type "
                                    content={
                                        !data?.idDetail?.idType ||
                                        data?.idDetail?.idType == "undefined"
                                            ? "---"
                                            : data?.idDetail?.idType
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Issue Date "
                                    content={
                                        !data?.idDetail?.issueDate ||
                                        data?.idDetail?.issueDate == "undefined"
                                            ? "---"
                                            : data?.idDetail?.issueDate
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Expiry Date"
                                    content={
                                        !data?.idDetail?.expiryDate ||
                                        data?.idDetail?.expiryDate ==
                                            "undefined"
                                            ? "---"
                                            : data?.idDetail?.expiryDate
                                    }
                                />
                            </Skeleton>
                        </div>

                        <h2 className="text-lg mb-8 centered-line">
                            Notification Details{" "}
                        </h2>

                        <div className="grid grid-cols-2 gap-6 gap-x-6 mb-10">
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Notification Preference"
                                    content={
                                        data?.notificationPreference !==
                                        undefined
                                            ? data?.notificationPreference
                                            : "---"
                                    }
                                />
                            </Skeleton>
                        </div>

                        <div className="mb-14 ">
                            <div className="pr-10 centered-line bg-white mb-8">
                                <h2 className="text-lg mb-4 ">
                                    Means of Identification
                                </h2>
                            </div>

                            <Skeleton visible={isLoading}>
                                {selectedIds.length > 0 && (
                                    <div className="flex justify-end gap-6 mb-6">
                                        <button
                                            type="button"
                                            className="p-4 bg-red-500 w-28 text-white rounded-lg "
                                            onClick={() =>
                                                dispatch({
                                                    type: "OPEN_MODAL",
                                                    modalType: "REJECT",
                                                })
                                            }
                                        >
                                            Reject
                                        </button>
                                        <button
                                            type="button"
                                            className="p-4 bg-blue-500 text-white rounded-lg"
                                            onClick={() =>
                                                dispatch({
                                                    type: "OPEN_MODAL",
                                                    modalType: "ACCEPT",
                                                })
                                            }
                                        >
                                            Confirm Documents
                                        </button>
                                    </div>
                                )}

                                <table className="w-full bg-gray-50">
                                    <tbody>
                                        {data?.documents
                                            ?.filter(
                                                (item) =>
                                                    item.documentType !==
                                                        "DIASPORA" &&
                                                    (item.documentStatus ===
                                                        "PENDING" ||
                                                        item.documentStatus ===
                                                            "Accepted")
                                            )
                                            .map((item, index) => (
                                                <DocumentRow
                                                    key={index}
                                                    data={{
                                                        id: item.documentId as string,
                                                        documentType:
                                                            item.documentType as string,
                                                        documentStatus:
                                                            item.documentStatus,
                                                        documentComment:
                                                            item.documentComment as string,
                                                        link: item.filePath,
                                                    }}
                                                    isChecked={selectedIds.includes(
                                                        item.documentId
                                                    )}
                                                    toggleSelection={
                                                        selectDocument
                                                    }
                                                    onView={(args) =>
                                                        setDocument(args)
                                                    }
                                                />
                                            ))}
                                    </tbody>
                                </table>
                            </Skeleton>
                        </div>
                        <div className="mb-14">
                            <h2 className="text-lg mb-4">
                                Diaspora Information
                            </h2>

                            <table className="w-full bg-gray-50">
                                <tbody>
                                    {data?.documents
                                        ?.filter(
                                            (item) =>
                                                item.documentType === "DIASPORA"
                                        )
                                        .map((item, index) => (
                                            <DocumentRow
                                                key={index}
                                                data={{
                                                    id: item.documentId as string,
                                                    documentType: `${
                                                        item.documentType
                                                    }-${index + 1}`,
                                                    documentStatus:
                                                        item.documentStatus,
                                                    documentComment:
                                                        item.documentComment as string,
                                                    link: item.filePath,
                                                }}
                                                isChecked={selectedIds.includes(
                                                    item.documentId
                                                )}
                                                toggleSelection={selectDocument}
                                                onView={(args) =>
                                                    setDocument(args)
                                                }
                                            />
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h2 className="text-lg mb-8 centered-line">
                                Rejected Documents
                            </h2>
                            <table className="w-full bg-gray-50">
                                <tbody>
                                    {data?.documents
                                        ?.filter(
                                            (item) =>
                                                item.documentType !==
                                                    "DIASPORA" &&
                                                item.documentStatus ===
                                                    "Rejected"
                                        )
                                        .map((item, index) => (
                                            <DocumentRow
                                                key={index}
                                                data={{
                                                    id: item.documentId as string,
                                                    documentType:
                                                        item.documentType as string,
                                                    documentStatus:
                                                        item.documentStatus,
                                                    documentComment:
                                                        item.documentComment as string,
                                                    link: item.filePath,
                                                }}
                                                isChecked={selectedIds.includes(
                                                    item.documentId
                                                )}
                                                toggleSelection={selectDocument}
                                                onView={(args) =>
                                                    setDocument(args)
                                                }
                                            />
                                        ))}
                                </tbody>
                            </table>
                            <div className="mt-10">
                                <h2 className="text-lg mb-8 centered-line">
                                    Final Status
                                </h2>
                                <div className="flex mx-auto">
                                    <button
                                        className={`p-4 ${
                                            data?.status === "Accepted" ||
                                            data?.status === "Rejected"
                                                ? "bg-gray-400"
                                                : "bg-red-500"
                                        } w-28 text-white rounded-lg mr-10`}
                                        onClick={() =>
                                            handleRejectClick("Rejected")
                                        }
                                        disabled={
                                            data?.status === "Accepted" ||
                                            data?.status === "Rejected"
                                        }
                                    >
                                        Reject
                                    </button>

                                    <button
                                        className={`p-4 ${
                                            data?.status === "Accepted" ||
                                            data?.status === "Rejected"
                                                ? "bg-gray-400"
                                                : "bg-blue-500"
                                        } w-28 text-white rounded-lg`}
                                        onClick={() =>
                                            handleAcceptClick("Accepted")
                                        }
                                        disabled={
                                            data?.status === "Accepted" ||
                                            data?.status === "Rejected"
                                        }
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                )}

                <Modal
                    isOpen={!!document}
                    onClose={() => setDocument(null)}
                    className="w-full"
                    size="lg"
                >
                    {document && (
                        <>
                            {document.toLowerCase().endsWith(".pdf") ? (
                                <div>
                                    <iframe
                                        src={document}
                                        title="PDF Document"
                                        width="100%"
                                        height="500"
                                    />
                                    <a
                                        href={document}
                                        download="document.pdf"
                                        className="bg-blue-500 py-3 px-2 rounded-md text-white block text-center text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 mx-40 my-5"
                                    >
                                        Download PDF
                                    </a>
                                </div>
                            ) : (
                                <img src={document} alt="" />
                            )}
                        </>
                    )}
                </Modal>
            </div>

            <Modal
                isOpen={modalState.modalType === "REJECT"}
                onClose={() => dispatch({ type: "CLOSE_MODAL" })}
                size={500}
            >
                <h1>Reject Document(s)</h1>

                <Label labelName="rejection-reason">Reason</Label>
                <Controller
                    name="documentComment"
                    control={methods.control}
                    render={({ field: { onChange, value, ...restField } }) => (
                        <textarea
                            {...restField}
                            value={value as string}
                            className="w-full bg-gray-100 p-4 resize-none"
                            rows={10}
                            onChange={(e) => {
                                onChange(e.target.value) // Update the value in the form
                                setComment(e.target.value) // Update the comment state
                            }}
                        />
                    )}
                />

                <div className="flex items-center gap-6 mt-6">
                    <Button
                        variant="outline"
                        className="border border-gray-300 w-20"
                        onClick={() => dispatch({ type: "CLOSE_MODAL" })}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="primary"
                        className="w-fit"
                        onClick={methods.handleSubmit((e) => {
                            // Clear the comment state
                            handleSubmit(e, "Rejected")
                            setComment("")
                            dispatch({ type: "CLOSE_MODAL" })
                        })}
                    >
                        Confirm Rejection
                    </Button>
                </div>
            </Modal>
            <Modal
                isOpen={modalState.modalType === "ACCEPT"}
                onClose={() => dispatch({ type: "CLOSE_MODAL" })}
                centered
                size={500}
            >
                <h1 className="text-xl font-bold">Accept Document(s)</h1>
                <p>Please review your selection before proceeding.</p>

                <div className="flex items-center gap-6 mt-6">
                    <Button
                        variant="outline"
                        className="border border-gray-300 w-20"
                        onClick={() => {
                            dispatch({ type: "CLOSE_MODAL" })
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="primary"
                        className="w-20"
                        onClick={methods.handleSubmit((e) => {
                            handleSubmit(e, "Accepted")
                            setComment("Accepted") // Set the comment state to "Accepted"
                            dispatch({ type: "CLOSE_MODAL" }) // Close the modal
                        })}
                    >
                        Confirm
                    </Button>
                </div>
            </Modal>
        </div>
    )
}
