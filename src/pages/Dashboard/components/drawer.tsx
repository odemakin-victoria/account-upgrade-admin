import { Drawer, DrawerProps } from "@mantine/core";
import React, { ReactNode } from "react";
import Document from "../assets/icons/document";

export default function UserDetailsDrawer({
  children,
  ...props
}: DrawerProps & { children: ReactNode }) {
  return (
    <Drawer {...props}>
      <Drawer.Body className="px-10">{children}</Drawer.Body>
    </Drawer>
  );
}

export const DrawerCell = ({
  title,
  content,
  children,
}: {
  children?: ReactNode;
  title?: string;
  content?: string;
}) => {
  return (
    <div>
      <p className="text-gray-500 mb-2 text-base">{title}</p>
      {children ? (
        children
      ) : (
        <>
          <p>{content}</p>
        </>
      )}
    </div>
  );
};

export const DocumentItem = ({
  link,
  text,
}: {
  link?: string;
  text: string;
}) => {
  const handleClick = () => {
    window.open(link, "_blank");
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      name="open document"
      className="flex items-center bg-gray-100 p-6 focus:ring-2 ring-blue-300 focus:bg-blue-200 h-14 w-full"
    >
      <Document /> <span className="text-sm ml-4">{text}</span>
    </button>
  );
};
