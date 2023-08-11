import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SidebarOption } from "./types"
import { AiOutlineUser, AiOutlineArrowUp, AiOutlineMenu } from "react-icons/ai"
import { useRequestTypeContext } from "@/utils/request.context"
// import {
//     DASHBOARD_ROUTE_UPDATE,
//     DASHBOARD_ROUTE_UPGRADE,
// } from "@/pages/routes-config"

const Sidebar: React.FC = () => {
    const { setRequestType, requestType } = useRequestTypeContext()

    // const [activeOption, setActiveOption] =
    //     useState<SidebarOption>("account-update")
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()

    const handleOptionClick = (option: SidebarOption) => {
        setRequestType(option)
        // setActiveOption(option)

        // // Navigate based on the selected option
        // if (option === "account-update") {
        //     navigate(`${DASHBOARD_ROUTE_UPDATE}`)
        // } else if (option === "account-upgrade") {
        //     navigate(`${DASHBOARD_ROUTE_UPGRADE}`)
        // }
    }

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        console.log(requestType, "the request typr")
    }, [requestType])

    return (
        <div className="h-full flex flex-col justify-between items-center min-h-screen sm:bg-transparent sm:shadow-none md:bg-transparent md:shadow-none lg:bg-blue-500 rounded-xl shadow-lg mt-24 ml-2">
            <div className="flex flex-col lg:pt-24  sm:mt-[-10px] sm:mx-auto md:ml-[9.5em] lg:ml-3 sm:z-50  lg:bg-transparent lg:px-0">
                <nav
                    className={`w-full ${
                        isMenuOpen ? "block" : " sm:hidden lg:block md:hidden"
                    }  sm:bg-blue-500  sm:pt-10 sm:px-28 md:pt-10 md:px-60  lg:bg-transparent lg:px-0`}
                >
                    <ul>
                        <li className="sm:w-full">
                            <button
                                className={`lg:py-3 lg:px-8 mb-4 w-full sm:py-0 sm:px-2 sm:w-full ${
                                    requestType === "account-update"
                                        ? "bg-blue-100 rounded-xl text-blue-500 font-bold text-lg"
                                        : "text-white font-bold"
                                } flex items-center`}
                                onClick={() =>
                                    handleOptionClick("account-update")
                                }
                            >
                                <AiOutlineUser className="mr-2 font-bold text-2xl text-blue-500 cursor-pointer" />
                                <span>Account Update</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={`py-3 px-8 mb-10  w-full ${
                                    requestType === "account-upgrade"
                                        ? "bg-blue-100 text-blue-500 font-bold rounded-xl text-lg"
                                        : "text-white font-bold"
                                } flex  items-start`}
                                onClick={() =>
                                    handleOptionClick("account-upgrade")
                                }
                            >
                                <AiOutlineArrowUp className=" font-bold text-2xl text-blue-500 cursor-pointer " />
                                <span>Account Upgrade</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className=" lg:hidden absolute top-0 left-0 sm:flex sm:justify-between md:flex shadow-lg w-full  px-1">
                <button
                    className=" text-blue-500 p-2 rounded-lg "
                    onClick={handleMenuToggle}
                >
                    {" "}
                    {isMenuOpen ? (
                        <AiOutlineMenu className="text-2xl" />
                    ) : (
                        <AiOutlineMenu className="text-2xl" />
                    )}
                </button>
                <div className="sm:ml-[120px] md:ml-0">
                    <img
                        src="https://optimusbank.com/assets/images/header/Optimus_Logo.svg"
                        alt="logo"
                        className=" my-2 w-32 p-2"
                    />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
