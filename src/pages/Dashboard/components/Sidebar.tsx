import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SidebarOption } from "./types"
import { AiOutlineUser, AiOutlineArrowUp,   } from "react-icons/ai"
import { useRequestTypeContext } from "@/utils/request.context"


const Sidebar: React.FC = () => {
    const { setRequestType, requestType } = useRequestTypeContext()

   
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()

    const handleOptionClick = (option: SidebarOption) => {
        setRequestType(option)
       
    }

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        
    }, [requestType])

    return (
        <div className="h-full flex flex-col justify-between items-center min-h-screen bg-blue-500 rounded-xl shadow-lg mt-24 ml-2">
            <div className="flex flex-col pt-24 ml-3 z-50  lg:bg-transparent px-0">
                <nav
                    className={`w-full ${
                        isMenuOpen ? "block" : " lg:block"
                    }   `}
                >
                    <ul>
                        {/* <li className=""> 
                            <button
                            // sm:py-0 sm:px-2 sm:w-full
                                className={`lg:py-3 lg:px-8 mb-4 w-full sm:py-0 sm:px-2 sm:w-full ${
                                    requestType === "update"
                                        ? "bg-blue-100 rounded-xl text-blue-500 font-bold text-lg"
                                        : "text-white font-bold"
                                } flex items-center`}
                                onClick={() =>
                                    handleOptionClick("update")
                                }
                            >
                                <AiOutlineUser className="mr-2 font-bold text-2xl text-blue-500 cursor-pointer" />
                                <span>Account Update</span>
                            </button>
                        </li> */}
                        <li>
                            <button
                                className={`py-3 px-8 mb-10  w-full ${
                                    requestType === "upgrade"
                                        ? "bg-blue-100 text-blue-500 font-bold rounded-xl text-lg"
                                        : "text-white font-bold"
                                } flex  items-start`}
                                onClick={() =>
                                    handleOptionClick("upgrade")
                                }
                            >
                                <AiOutlineArrowUp className=" font-bold text-2xl text-blue-500 cursor-pointer " />
                                <span>Account Upgrade</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            {/* <div className=" lg:hidden absolute top-0 left-0 sm:flex sm:justify-between md:flex shadow-lg w-full  px-1">
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
                <div className="">
                    <img
                        src="https://optimusbank.com/assets/images/header/Optimus_Logo.svg"
                        alt="logo"
                        className=" my-2 w-32 p-2"
                    />
                </div> 
            </div> */}
        </div>
    )
}

export default Sidebar
