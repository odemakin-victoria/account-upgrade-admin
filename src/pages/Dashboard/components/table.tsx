import React, { ReactNode } from "react";
import { ITableBodyProps, ITableRowProps } from "./types";

export function TableHeadCell({ children }: { children: ReactNode }) {
  return (
    <th className="bg-blue-500 text-base p-4 font-normal text-white">
      {children}
    </th>
  );
}


export function TableBodyCell({ children, className, ...props }: ITableBodyProps) {
  return <td className={`rounded p-4 font-light text-base ${className ||""}`} {...props}>{children}</td>;
}
export function TableRow({ children, className , ...rest}: ITableRowProps) {
  return <tr className={`hover:bg-gray-50 hover:cursor-pointer ${className}`} {...rest}>{children}</tr>;
}
