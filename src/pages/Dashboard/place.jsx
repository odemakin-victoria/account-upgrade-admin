import React, { useEffect, useState } from "react";
import { Pagination, Skeleton } from "@mantine/core";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AiOutlinePoweroff } from "react-icons/ai";
import EmptyIcon from "./assets/icons/files";
import Table from "./components/Table"; // You might need to replace this with the actual Table component import
import { DASHBOARD_ROUTE } from "../routes-config";
import dayjs from "dayjs";
// ... (other imports)

export default function Dashboard() {
    // ... (existing code)

    const itemsPerPage = 10;
    const currentPage = Number(searchParams.get("page")) || 1;

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;

    const currentPageData = allData?.data?.slice(startIdx, endIdx) || [];

    return (
        <div className="bg-blue-100 pb-6 min-h-screen w-full">
            <div className="w-full justify-between items-center flex bg-white drop-shadow-md fixed h-16 top-0 px-10 z-30">
                {/* ... (logo and logout button) */}
            </div>

            <div className="flex">
                {/* ... (sidebar) */}

                <div className="w-full pt-48 px-14">
                    {/* ... (title and search input) */}
                    
                    <div className="space-x-4">
                        {/* ... (buttons for tab change) */}
                    </div>

                    <table className="w-full text-left shadow-md mb-24 bg-white">
                        <thead>
                            {/* ... (table header) */}
                        </thead>
                        <tbody>
                            {isLoading ? (
                                Array(10)
                                    .fill("*")
                                    .map((_, index) => (
                                        <tr key={index}>
                                            <td colSpan={10} className="p-4">
                                                <Skeleton height={40} />
                                            </td>
                                        </tr>
                                    ))
                            ) : currentPageData.length > 0 ? (
                                currentPageData.map((item, index) => (
                                    <Table.TableRow
                                        key={index}
                                        onClick={() =>
                                            navigate(
                                                `${DASHBOARD_ROUTE}/view-account/${item.accountNumber}`
                                            )
                                        }
                                    >
                                        {/* ... (table row content) */}
                                    </Table.TableRow>
                                ))
                            ) : (
                                <>
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
                                                {/* ... (table row content) */}
                                            </Table.TableRow>
                                        ))
                                    ) : (
                                        <Table.TableRow>
                                            <Table.TableBodyCell colSpan={10}>
                                                <div className="flex place-items-center w-full flex-col">
                                                    <EmptyIcon />
                                                    <p>No Form Available.</p>
                                                </div>
                                            </Table.TableBodyCell>
                                        </Table.TableRow>
                                    )}
                                </>
                            )}
                        </tbody>
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
                </div>
            </div>
        </div>
    );
}
