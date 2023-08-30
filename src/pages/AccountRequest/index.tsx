import { useReducer, useState } from "react"
import { DrawerCell } from "../Dashboard/components/drawer"
import { BiArrowBack } from "react-icons/bi"
import {
    // useAccountNumberQuery,
    useAccountRequestQuery,
    useDocumentUpdate,
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


export default function AccountRequest() {
    const { data, isLoading } = useAccountRequestQuery()
    const [comment, setComment] = useState("")
    const [document, setDocument] = useState<string | null>(null)
    const [isImgLoaded, setIsImgLoaded] = useState(false)
    // const accountNoQuery = useAccountNumberQuery()
    // console.log("accountnoquery", accountNoQuery)

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
            comment: comment,

            // email: accountNoQuery.data?.data.emailId as string,
        })
    }

    return (
        <div className="px-6 py-10 min-h-screen ">
            <div className="flex items-center gap-6 mb-10">
                <BiArrowBack
                    className="text-3xl"
                    onClick={() => navigate(DASHBOARD_ROUTE)}
                    role="button"
                    aria-label="goto dashboard"
                />
                 <img
                                src={headerOptimusLogo}
                                alt="optimus_bank_logo"
                            />
            </div>
            <div className="lg:grid grid-cols-2 items-center">
                <main className="p-4 pr-6">
                    <div className="mb-20">
                        <h2 className="text-lg mb-8 centered-line">
                            Personal Details
                        </h2>
                        <div className="grid grid-cols-2 gap-6 gap-x-6">
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Marital Status"
                                    content={
                                        data?.personalDetails?.maritalStatus !== undefined
                                            ? data?.personalDetails?.maritalStatus
                                            : '---'
                                    }
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Mother's Maiden Name"
                                    content={
                                        data?.personalDetails?.motherMaidenName !== undefined
                                            ? data?.personalDetails?.motherMaidenName
                                            : '---'
                                    }
                                 
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Name of Next of Kin"
                                    content={
                                        data?.nextOfKin?.fullName !== "undefined"
                                            ? data?.nextOfKin?.fullName
                                            : '---'
                                    }
                                   
                                />
                            </Skeleton>
                            <Skeleton visible={isLoading}>
                                <DrawerCell
                                    title="Phone No. of Next of Kin"
                                    content={
                                        !data?.nextOfKin?.phoneNumber || data?.nextOfKin?.phoneNumber == "undefined"
                                            ? '---'
                                           : data?.nextOfKin?.phoneNumber
                                             
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
                                            )?.filePath || '---'
                                        }
                                        alt="user"
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
                                            )?.filePath || '---'
                                        }
                                        alt="signature file"
                                    />
                                </DrawerCell>
                            </Skeleton>
                        </div>
                    </div>
                    <ContactDetails
                        isLoading={isLoading}
                        data={data?.contactAddress}
                    />
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
                                                item.documentType !== "DIASPORA"
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
                        </Skeleton>
                    </div>
                    <div className="mb-14">
                        <h2 className="text-lg mb-4">Diaspora Information</h2>

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
                                                link: item.filePath,
                                            }}
                                            isChecked={selectedIds.includes(
                                                item.documentId
                                            )}
                                            toggleSelection={selectDocument}
                                            onView={(args) => setDocument(args)}
                                        />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </main>

                <div className=" fixed lg:w-2/4 right-0 bg-gray-200 h-screen top-0 flex items-center justify-center w-full border border-gray-100 ">
                    {document ? (
                        <>
                            {!isImgLoaded && <Loader size={24} />}

                            <object
                                type="application/pdf"
                                data={document}
                                width="250"
                                height="200"
                                onLoad={() => setIsImgLoaded(true)}
                                className="bg-gray-50 h-full w-full object-contain"
                            ></object>
                        </>
                    ) : (
                        <p>Click on a document to display</p>
                    )}
                </div>
            </div>

            <Modal
                opened={modalState.modalType === "REJECT"}
                onClose={() => dispatch({ type: "CLOSE_MODAL" })}
                size={500}
            >
                <h1>Reject Document(s)</h1>

                <Label labelName="rejection-reason">Reason</Label>
                <Controller
                    name="documentComment"
                    control={methods.control}
                    render={({ field: { value, ...restField } }) => {
                        setComment(value)
                        return (
                            <textarea
                                {...restField}
                                value={value as string}
                                className="w-full bg-gray-100 p-4 resize-none"
                                rows={10}
                            />
                        )
                    }}
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
                            handleSubmit(e, "Rejected")
                        })}
                    >
                        Confirm Rejection
                    </Button>
                </div>
            </Modal>
            <Modal
                opened={modalState.modalType === "ACCEPT"}
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
                        onClick={() => dispatch({ type: "CLOSE_MODAL" })}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="primary"
                        className="w-20"
                        onClick={methods.handleSubmit((e) =>
                            handleSubmit(e, "Accepted")
                        )}
                    >
                        Confirm
                    </Button>
                </div>
            </Modal>
        </div>
    )
}
