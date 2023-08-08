import { Input } from "@/shared/components"
import UsePageTitle from "@/utils/page-title.hook"
import dayjs from "dayjs"
import { Table } from "../components"
import { useDashboardQuery } from "../hooks/queries.hooks"
import loclizedFormat from "dayjs/plugin/localizedFormat"
import { useNavigate, useSearchParams } from "react-router-dom"
import { DASHBOARD_ROUTE_UPGRADE } from "../../routes-config"
import { Pagination, Skeleton } from "@mantine/core"
import { Tabs } from "@mantine/core"
import { mapItemName } from "../../AccountRequest/utils"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { AiOutlinePoweroff } from "react-icons/ai"
import EmptyIcon from "../assets/icons/files"
import { useAuthContext } from "@/utils/auth.context"
import { AccountDocument, AccountRequestResponse } from "@/shared/types"
dayjs.extend(loclizedFormat)
import Accepted from "../components/Section/Accepted"
import Rejected from "../components/Section/Rejected"
import Pending from "../components/Section/Pending"
import Sidebar from "../components/Sidebar"

export default function AccountUpgrade() {
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
        navigate(`${DASHBOARD_ROUTE_UPGRADE}/?page=${pageNumber}`)
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
        <div className=" bg-blue-100 pb-6 min-h-screen ">
            <div className=" sm:hidden  w-full justify-between items-center lg:flex   drop-shadow-md fixed h-16 top-0  z-50 bg-blue-100 shadow-lg">
                <div>
                    <img
                        src="https://optimusbank.com/assets/images/header/Optimus_Logo.svg"
                        alt="logo"
                        className="pl-10 my-2"
                    />
                </div>
                <button
                    type="button"
                    className="flex items-center p-4 rounded-2xl text-blue "
                    onClick={() => auth.logout()}
                >
                    <AiOutlinePoweroff
                        className="text-3xl text-red-400 cursor-pointer mr-4"
                        aria-label="button"
                    />
                    Logout
                </button>
            </div>

            <div className=" w-full flex flex-row-reverse justify-between">
                <div className="  flex flex-col lg:w-4/5 lg:px-4 sm:w-full sm:px-2">
                    <div className=" w-full lg:pt-40 sm:pt-24 pb-4 flex justify-between lg:flex-row  sm:flex-col items-center mb-8 ">
                    <h2 className='mt-6 font-bold lg:text-2xl  text-blue-500 w-11/12 sm:text-lg lg:w-full '>Account Update</h2>

                        <Input
                            placeholder="Search by Account Number"
                            onChange={(e) => setvalue(e.target.value)}
                            className="lg:ml-[390px] mt-6 sm:ml-0"
                        />
                    </div>

                    <div className="bg-blue-100 w-full sm:mt-4">
                        <Tabs defaultValue="Accepted" orientation="horizontal">
                            <div className="overflow-scroll md:overflow-auto sm:mb-14 lg:mb-0">
                                <Tabs.List className="font-sans mb-6 ">
                                    <Tabs.Tab
                                        className="font-sans text-lg font-semibold"
                                        value="Accepted"
                                    >
                                        Accepted
                                    </Tabs.Tab>
                                    <Tabs.Tab
                                        className="font-sans text-lg font-semibold"
                                        value="Rejected"
                                    >
                                        Rejected{" "}
                                    </Tabs.Tab>
                                    <Tabs.Tab
                                        className="font-sans text-lg font-semibold"
                                        value="Pending"
                                    >
                                        Pending{" "}
                                    </Tabs.Tab>
                                </Tabs.List>
                            </div>

                            <Tabs.Panel value="Accepted">
                                <Accepted />
                            </Tabs.Panel>
                            <Tabs.Panel value="Rejected">
                                <Rejected />
                            </Tabs.Panel>
                            <Tabs.Panel value="Pending">
                                <Pending />
                            </Tabs.Panel>
                        </Tabs>
                    </div>
                </div>

                <div className="w-1/5">
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}
