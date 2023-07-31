import { Input } from "@/shared/components"
import UsePageTitle from "@/utils/page-title.hook"
import dayjs from "dayjs"
import { Table } from "./components"
import { useDashboardQuery } from "./hooks/queries.hooks"
import loclizedFormat from "dayjs/plugin/localizedFormat"
import { useNavigate, useSearchParams } from "react-router-dom"
import { DASHBOARD_ROUTE } from "../routes-config"
import { Pagination, Skeleton } from "@mantine/core"

import { mapItemName } from "../AccountRequest/utils"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { AiOutlinePoweroff } from "react-icons/ai"
import EmptyIcon from "./assets/icons/files"
import { useAuthContext } from "@/utils/auth.context"
import { AccountDocument, AccountRequestResponse } from "@/shared/types"
dayjs.extend(loclizedFormat)

export default function Dashboard() {
    UsePageTitle("Dashboard | Submitted Forms")
    const [searchParams] = useSearchParams()
    const [value, setvalue] = useState("")
    const [debounced] = useDebouncedValue(value, 500, { leading: true })
    const { data, refetch, isLoading } = useDashboardQuery(
        value,
        searchParams.get("page")
    )
    const navigate = useNavigate()
    const auth = useAuthContext()

    useEffect(() => {
        if (debounced) {
            refetch({ cancelRefetch: true })
        } else {
            refetch()
        }
    }, [debounced])

    const onChange = (pageNumber: number) => {
        navigate(`${DASHBOARD_ROUTE}/?page=${pageNumber}`)
    }

    function checkArrayAndMapHalf(
        arr: AccountDocument[],
        mapFunc: (val: AccountDocument, index: number) => void
    ) {
        if (arr.length > 2) {
            const halfLength = Math.floor(arr.length / 2)
            const remainingCount = arr.length - halfLength
            const halfArray = arr.slice(0, halfLength).map(mapFunc)
            return [halfArray, remainingCount]
        } else {
            const mappedArray = arr.map(mapFunc)
            return [mappedArray, 0]
        }
    }

    const handleNumberOfItemsToShow = (
        item: AccountDocument[],
        name?: string
    ) => {
        let arr
        if (name === "DIASPORA") {
            arr = item.filter((item) => item.documentType === name)
        } else {
            arr = item.filter((item) => item.documentType !== "DIASPORA")
        }

        const [halfArray, remainingCount] = checkArrayAndMapHalf(
            arr,
            (item, index) => (
                <span className="bg-blue-150 rounded p-2" key={index}>
                    {mapItemName(item.documentType || "")}
                </span>
            )
        )

        if (arr?.length > 0) {
            return (
                <div className="flex items-center  gap-4">
                    <>
                        {halfArray}{" "}
                        {
                            // @ts-ignore
                            remainingCount > 0 && (
                                <span>{`+${remainingCount}`}</span>
                            )
                        }
                    </>
                </div>
            )
        }

        return <p className="text-center">---</p>
    }

    return (
        <div className=" bg-blue-100 pb-6 min-h-screen">
            <div className="w-full justify-between items-center flex bg-white drop-shadow-md fixed h-16 top-0 px-10">
                <img
                    src="https://optimusbank.com/assets/images/header/Optimus_Logo.svg"
                    alt="logo"
                />

                <button
                    type="button"
                    className="flex items-center p-4 rounded-2xl "
                    onClick={() => auth.logout()}
                >
                    <AiOutlinePoweroff
                        className="text-3xl text-red-600 cursor-pointer mr-4"
                        aria-label="button"
                    />
                    Logout
                </button>
            </div>

            <div className=" w-full  pt-48 px-14">
                <div className=" mb-6 flex justify-between items-center">
                    <h1 className="">Submitted Forms</h1>

                    <div>
                        <Input
                            placeholder="Search by Account Number"
                            onChange={(e) => setvalue(e.target.value)}
                            className="w-72"
                        />
                    </div>
                </div>
                <table className="w-full text-left shadow-md mb-24 bg-white">
                    <thead>
                        <Table.TableRow>
                            <Table.TableHeadCell>
                                Account Number
                            </Table.TableHeadCell>
                            <Table.TableHeadCell>
                                Customer Name
                            </Table.TableHeadCell>
                            <Table.TableHeadCell>BVN</Table.TableHeadCell>
                            <Table.TableHeadCell>
                                Marital Status
                            </Table.TableHeadCell>
                            <Table.TableHeadCell>
                                Means of Identification
                            </Table.TableHeadCell>
                            <Table.TableHeadCell>
                                Diaspora Documents
                            </Table.TableHeadCell>
                            <Table.TableHeadCell>
                                Date Submitted
                            </Table.TableHeadCell>
                        </Table.TableRow>
                    </thead>

                    {isLoading ? (
                        <>
                            {Array(10)
                                .fill("*")
                                .map(() => (
                                    <tr>
                                        <td colSpan={10} className="p-4">
                                            <Skeleton height={40} />
                                        </td>
                                    </tr>
                                ))}
                        </>
                    ) : (
                        <tbody>
                            {(data?.data as unknown as AccountRequestResponse[])
                                ?.length > 0 ? (
                                (
                                    data?.data as unknown as AccountRequestResponse[]
                                ).map((item, index) => (
                                    <Table.TableRow
                                        key={index}
                                        onClick={() =>
                                            navigate(
                                                `account-update-request/${item.accountNumber}`
                                            )
                                        }
                                    >
                                        <Table.TableBodyCell>
                                            <Skeleton visible={isLoading}>
                                                {item.accountNumber}
                                            </Skeleton>
                                        </Table.TableBodyCell>
                                        <Table.TableBodyCell>
                                            {item.customer.customerName}
                                        </Table.TableBodyCell>
                                        <Table.TableBodyCell>
                                            {item.bvn}
                                        </Table.TableBodyCell>
                                        <Table.TableBodyCell>
                                            {item.customer?.maritalStatus}
                                        </Table.TableBodyCell>

                                        <Table.TableBodyCell>
                                            {handleNumberOfItemsToShow(
                                                item.accountDocuments
                                            ) ?? "---"}
                                        </Table.TableBodyCell>

                                        <Table.TableBodyCell className="flex items-center  gap-4">
                                            {handleNumberOfItemsToShow(
                                                item.accountDocuments,
                                                "DIASPORA"
                                            ) ?? "---"}
                                        </Table.TableBodyCell>
                                        <Table.TableBodyCell>
                                            {dayjs(item.dateCreated).format(
                                                "LL"
                                            )}{" "}
                                        </Table.TableBodyCell>
                                    </Table.TableRow>
                                ))
                            ) : (
                                <Table.TableBodyCell colSpan={10}>
                                    <div className="flex place-items-center w-full flex-col">
                                        <EmptyIcon />
                                        <p>No Form Available.</p>
                                    </div>{" "}
                                </Table.TableBodyCell>
                            )}
                        </tbody>
                    )}
                </table>

                {data && data?.data?.length > 0 && (
                    <div className="flex justify-end">
                        <Pagination
                            total={data ? Math.ceil(data!.totalCount / 10) : 1}
                            className="bg-white"
                            onChange={onChange}
                            value={Number(searchParams.get("page")) || 1}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
