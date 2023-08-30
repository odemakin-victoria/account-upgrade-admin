import { Input } from "@/shared/components"
import UsePageTitle from "@/utils/page-title.hook"
import dayjs from "dayjs"
import { Table } from "./components"
import Sidebar from "../Dashboard/components/Sidebar"
import {
    useDashboardQuery,
    useAccountRequestQuery,
} from "./hooks/queries.hooks"
import loclizedFormat from "dayjs/plugin/localizedFormat"
import { useNavigate, useSearchParams } from "react-router-dom"
import { DASHBOARD_ROUTE } from "../routes-config"
import { Pagination, Skeleton } from "@mantine/core"
import { Tabs } from "@mantine/core"
import { mapItemName } from "../AccountRequest/utils"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { AiOutlinePoweroff } from "react-icons/ai"
import EmptyIcon from "./assets/icons/files"
import { useAuthContext } from "@/utils/auth.context"
import { Document, AccountRequestResponse } from "@/shared/types"
import { useRequestTypeContext } from "@/utils/request.context"
import { Paginate } from "./types"
import headerOptimusLogo from "@/shared/assets/images/Optimus_Logo.svg"
dayjs.extend(loclizedFormat)

export default function Dashboard() {
    const { requestType } = useRequestTypeContext()
    UsePageTitle("Dashboard | Submitted Forms")
    const [searchParams] = useSearchParams()
    const accountRequestQuery = useAccountRequestQuery(
        searchParams.get("accountNumber")
    )
    const [value, setvalue] = useState("update")
    const [status, setStatus] = useState("pending")
    const [debounced] = useDebouncedValue(value, 500, { leading: true })
    const { data, refetch, isLoading } = useDashboardQuery(
        value,
        status,
        searchParams.get("page")
    )
    const [allData, setAllData] = useState<any>(data)

    const navigate = useNavigate()
    const auth = useAuthContext()
    const [activeTab, setActiveTab] = useState<string>("accepted") // Initial active tab
    const [showPassword, setShowPassword] = useState(false); // State to control password visibility


    useEffect(() => {
        if (debounced) {
            refetch({ cancelRefetch: true })
        } else {
            refetch()
        }
    }, [debounced])
    useEffect(() => {
        setAllData(data)
    }, [data])

    const onChange = (pageNumber: number) => {
        navigate(`${DASHBOARD_ROUTE}/?page=${pageNumber}`)
    }
    const [filteredData, setFilteredData] = useState<AccountRequestResponse[]>([]);

    const handleAccountNumberSearch = () => {
        const accountNumber = searchParams.get("accountNumber");
        if (accountNumber && allData?.data) {
            const filteredItems = allData.data.filter(
                (item: { accountNumber: string }) => item.accountNumber === accountNumber
            );
            setFilteredData(filteredItems);
        } else {
            setFilteredData([]);
        }
    };

    useEffect(() => {
        handleAccountNumberSearch();
    }, [searchParams.get("accountNumber"), allData?.data]);

    // useEffect(() => {
    //     accountRequestQuery.refetch()
    // }, [searchParams.get("accountNumber")])

    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
        setStatus(tab)
    }
    useEffect(() => {
        refetch()
    }, [activeTab, requestType])

    function checkArrayAndMapHalf(
        arr: Document[],
        mapFunc: (val: Document, index: number) => void
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

    const handleNumberOfItemsToShow = (item: Document[], name?: string) => {
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

    const itemsPerPage = 10;
    const currentPage = Number(searchParams.get("page")) || 1;

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;

    const currentPageData = allData?.data?.slice(startIdx, endIdx) || [];

    return (
        <div className=" bg-blue-100 pb-6 min-h-screen w-full">
            <div className="w-full justify-between items-center flex bg-white drop-shadow-md fixed h-16 top-0 px-10 z-30">
            <img
                                src={headerOptimusLogo}
                                alt="optimus_bank_logo"
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

            <div className="flex ">
                <div className="w-1/5">
                    <Sidebar />
                </div>

                <div className=" w-full  pt-48 px-14">
                    <div className=" mb-6 flex justify-between items-center">
                        <h1 className="mt-[-20px]">
                            {requestType == "account-update"
                                ? "Account Update"
                                : "Account Upgrade"}
                        </h1>

                        <div className=" mb-6 flex justify-between items-center">
                            <Input
                                placeholder="Search by Account Number"
                                onChange={(e) => {
                                    searchParams.set(
                                        "accountNumber",
                                        e.target.value
                                    )
                                }}
                                // onChange={(e) => {
                                //     searchParams.set("accountNumber", e.target.value)
                                // }}
                                className="w-72"
                            />
                            <button onClick={()=>handleAccountNumberSearch()} className="bg-blue-500 text-white py-3 px-4 rounded-lg ml-4">
                                {" "}
                                Enter
                            </button>
                        </div>
                    </div>

                    <div className="space-x-4">
                        <button
                            onClick={() => handleTabChange("accepted")}
                            className={`${
                                activeTab === "accepted"
                                    ? "font-semibold border-b-2 border-blue-500 text-blue-500"
                                    : "text-gray-500"
                            } bg-transparent border-none text-base cursor-pointer px-3 py-2 transition duration-300`}
                        >
                            Accepted
                        </button>
                        <button
                            onClick={() => handleTabChange("rejected")}
                            className={`${
                                activeTab === "rejected"
                                    ? "font-semibold border-b-2 border-blue-500 text-blue-500"
                                    : "text-gray-500"
                            } bg-transparent border-none text-base cursor-pointer px-3 py-2 transition duration-300`}
                        >
                            Rejected
                        </button>
                        <button
                            onClick={() => handleTabChange("pending")}
                            className={`${
                                activeTab === "pending"
                                    ? "font-semibold border-b-2 border-blue-500 text-blue-500"
                                    : "text-gray-500"
                            } bg-transparent border-none text-base cursor-pointer px-3 py-2 transition duration-300`}
                        >
                            Pending
                        </button>
                    </div>

                    <table className="w-full text-left shadow-md mb-24 bg-white">
                        <thead>
                            <Table.TableRow>
                                <Table.TableHeadCell>
                                    Account Number
                                </Table.TableHeadCell>
                                {requestType !== "account-upgrade" && (
                                    <Table.TableHeadCell>
                                        Customer Name
                                    </Table.TableHeadCell>
                                )}
                                {requestType !== "account-update" && (
                                    <Table.TableHeadCell>
                                        BVN
                                    </Table.TableHeadCell>
                                )}
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
                        ) :  (
                            <tbody>
                                  {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
            <Table.TableRow
                key={index}
                onClick={() =>
                    navigate(
                        `${DASHBOARD_ROUTE}/view-account/${item.accountNumber}`
                    )
                }
            >
                <Table.TableBodyCell>
                                                    <Skeleton
                                                        visible={isLoading}
                                                    >
                                                        {item.accountNumber}
                                                    </Skeleton>
                                                </Table.TableBodyCell>

                                                {requestType !==
                                                    "account-upgrade" && (
                                                    <Table.TableBodyCell>
                                                        {`${
                                                            item.personalDetails
                                                                ?.firstName ??
                                                            ""
                                                        } ${
                                                            item.personalDetails
                                                                ?.lastName ?? ""
                                                        }`}
                                                    </Table.TableBodyCell>
                                                )}
                                                {requestType !==
                                                    "account-update" && (
                                                    <Table.TableBodyCell>
                                                        {item.bvn}
                                                    </Table.TableBodyCell>
                                                )}
                                                <Table.TableBodyCell>
                                                    {
                                                        item.personalDetails
                                                            ?.maritalStatus
                                                    }
                                                </Table.TableBodyCell>

                                                <Table.TableBodyCell>
                                                    {handleNumberOfItemsToShow(
                                                        item.documents
                                                    ) ?? "---"}
                                                </Table.TableBodyCell>

                                                <Table.TableBodyCell className="flex items-center  gap-4">
                                                    {handleNumberOfItemsToShow(
                                                        item.documents,
                                                        "DIASPORA"
                                                    ) ?? "---"}
                                                </Table.TableBodyCell>
                                                <Table.TableBodyCell>
                                                    {dayjs(
                                                        item.dateCreated
                                                    ).format("LL")}{" "}
                                                </Table.TableBodyCell>
            </Table.TableRow>
        ))
    ):
    allData && allData?.data?.length > 0 ?(
                                    (
                                        allData?.data as unknown as AccountRequestResponse[]
                                    ).map((item, index) => {
                                        // console.log(item, "the item")
                                        return (
                                            <Table.TableRow
                                                key={index}
                                                onClick={() =>
                                                    navigate(
                                                        `${DASHBOARD_ROUTE}/view-account/${item.accountNumber}`
                                                    )
                                                }
                                            >
                                                <Table.TableBodyCell>
                                                    <Skeleton
                                                        visible={isLoading}
                                                    >
                                                        {item.accountNumber}
                                                    </Skeleton>
                                                </Table.TableBodyCell>

                                                {requestType !==
                                                    "account-upgrade" && (
                                                    <Table.TableBodyCell>
                                                        {`${
                                                            item.personalDetails
                                                                ?.firstName ??
                                                            ""
                                                        } ${
                                                            item.personalDetails
                                                                ?.lastName ?? ""
                                                        }`}
                                                    </Table.TableBodyCell>
                                                )}
                                                {requestType !==
                                                    "account-update" && (
                                                    <Table.TableBodyCell>
                                                        {item.bvn}
                                                    </Table.TableBodyCell>
                                                )}
                                                <Table.TableBodyCell>
                                                    {
                                                        item.personalDetails
                                                            ?.maritalStatus
                                                    }
                                                </Table.TableBodyCell>

                                                <Table.TableBodyCell>
                                                    {handleNumberOfItemsToShow(
                                                        item.documents
                                                    ) ?? "---"}
                                                </Table.TableBodyCell>

                                                <Table.TableBodyCell className="flex items-center  gap-4">
                                                    {handleNumberOfItemsToShow(
                                                        item.documents,
                                                        "DIASPORA"
                                                    ) ?? "---"}
                                                </Table.TableBodyCell>
                                                <Table.TableBodyCell>
                                                    {dayjs(
                                                        item.dateCreated
                                                    ).format("LL")}{" "}
                                                </Table.TableBodyCell>
                                            </Table.TableRow>
                                        )
                                    })
                               ) : (
                                    <Table.TableBodyCell colSpan={10}>
                                        <div className="flex place-items-center w-full flex-col">
                                            <EmptyIcon />
                                            <p>No Form Available.</p>
                                        </div>{" "}
                                    </Table.TableBodyCell>
                                )}</tbody>
                                )}  
                    </table>

                      {/* Always show the pagination */}
            <div className="flex justify-end">
                <Pagination
                    total={Math.ceil((allData?.totalCount || 1) / itemsPerPage)}
                    className="bg-white"
                    onChange={onChange}
                    value={currentPage}
                   
                />
            </div>
           
{/* 
                     {allData && allData?.data?.length > 0 && (
                        <div className="flex justify-end">
                            <Pagination
                                total={
                                    allData
                                        ? Math.ceil(allData!.totalCount / 10)
                                        : 1
                                }
                                className="bg-white"
                                onChange={onChange}
                                value={Number(searchParams.get("page")) || 1}
                            />
                        </div>
                    )}  */}
                </div>
            </div>
        </div>
    )
}
