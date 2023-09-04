import React, { useState } from "react";
import { Checkbox, Modal } from "@mantine/core";
import {
  IconCircleCheckFilled,
  IconArrowNarrowRight,
  IconAlertTriangleFilled,
  IconBan,
  IconFile3d,
} from "@tabler/icons-react";
import { mapItemName } from "../utils";
import { Loader, Skeleton } from "@mantine/core";
import DocumentViewerModal from "./DocumentViewerModal";

export default function DocumentRow({
  data,
  isChecked,
  toggleSelection,
  ...props
}: {
  data: {
    [x: string]: any;
    documentType: string;
    documentStatus: string;
    documentComment: string;
    id: string;
    link: string ;
  };
  isChecked: boolean;
  toggleSelection: (documentId: string) => void;
  onView: (args: string | null) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isPdf = data.documentType.toLowerCase() === "pdf";

  return (
    <tr className="w-full">
      <td className="border border-gray-300 p-4 w-10">
        {data.documentStatus.toLowerCase() === "pending" && (
          <Checkbox
            onChange={() => toggleSelection(data.id)}
            value={data.id}
            checked={isChecked}
          />
        )}
      </td>
      <td className="border border-gray-300 p-4 w-96">
        {mapItemName(data.documentType)}
      </td>
      <td className="border border-gray-300 p-4 w-96">
  {isPdf ? (
    <IconFile3d className="text-red-500 text-2xl" />
  ) : data.link && data.link.toLowerCase().endsWith(".pdf") ? (
    <IconFile3d className="text-red-500 text-2xl" />
  ) : (
    <img src={data.link} alt="" />
  )}
</td>
      <td className="border border-gray-300 p-4 w-96">
        {data.documentStatus.toLowerCase() === "accepted" ? (
          <span className="inline-flex items-center">
            <IconCircleCheckFilled className="mr-2 text-green-500" />{" "}
            {data.documentStatus}
          </span>
        ) : data.documentStatus.toLowerCase() === "pending" ? (
          <span className="inline-flex items-center">
            <IconAlertTriangleFilled className="mr-2 text-yellow-500" />{" "}
            {data.documentStatus}
          </span>
        ) : (
          <span className="inline-flex items-center">
            <IconBan className="mr-2 text-red-500" /> {data.documentStatus}
          </span>
        )}
      </td>
      <td className="border border-gray-300 p-4 w-96">
        <button
          className="bg-gray-100 p-4 gap-6 w-full hover:bg-gray-200 flex items-center justify-center"
          type="button"
          name="View document"
          onClick={() => {
            props.onView(data.link);
            // openModal()
            // console.log(data.link, "the datalink");
          }}
        >
          <span className="inline-block">View</span>
          <IconArrowNarrowRight
            className="text-xl"
            role="button"
            aria-label="goto dashboard"
          />
        </button>
      </td>
      <td className="border border-gray-300 p-4 w-96">
        {mapItemName(data.documentComment)}
      </td>

      {/* Modal */}
      {/* <Modal
                opened={isModalOpen}
                onClose={() => closeModal()}
                className="w-full"
            >
                <img src={data.link} />
            </Modal> */}

      {/* <DocumentViewerModal  isOpen = {isModalOpen}
  onClose={() => closeModal()}
    fileUrl = {data.link}/> */}
    </tr>
  );
}
