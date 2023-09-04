import { ReactNode } from "react";

export interface ITableBodyProps
  extends React.DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  > {
  colSpan?: number
}

export interface ITableRowProps
  extends React.DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {
  children: ReactNode;
}

export interface SidebarLink {
  id: number;
  text: string;
  isActive: boolean;
 } 
 export type SidebarOption = 'update' | 'upgrade';