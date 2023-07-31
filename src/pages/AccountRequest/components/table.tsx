import { Checkbox } from "@mantine/core";
import {
  IconCircleCheckFilled,
  IconArrowNarrowRight,
  IconAlertTriangleFilled,
  IconBan,
} from "@tabler/icons-react";
import { mapItemName } from "../utils";

export default function DocumentRow({
  data,
  isChecked,
  toggleSelection,
  ...props
}: {
  data: {
    documentType: string;
    documentStatus: string;
    id: string;
    link: string | null;
  };
  isChecked:boolean,
  toggleSelection: (documentId: string) => void;
  onView: (args: string | null) => void;
}) {
  return (
    <tr>  
      <td className="border border-gray-300 p-4 w-10">
        {
          data.documentStatus.toLowerCase() == "pending" &&   <Checkbox onChange={() => toggleSelection(data.id)} value={data.id} checked={isChecked}/>
        }
       
      </td>
      <td className="border border-gray-300 p-4 w-52">
        {mapItemName(data.documentType)}
      </td>
      <td className="border border-gray-300 p-4">
        {data.documentStatus.toLowerCase() == "accepted" ? (
          <span className="inline-flex items-center">
            <IconCircleCheckFilled className="mr-2 text-green-500" />{" "}
            {data.documentStatus}
          </span>
        ) : data.documentStatus.toLowerCase() == "pending" ? (
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
      <td className="border border-gray-300 p-4">
        <button
          className="bg-gray-100 p-4 gap-6 w-full hover:bg-gray-200 flex items-center justify-center "
          type="button"
          name="View document"
          onClick={() => props.onView(data.link)}
        >
          <span className="inline-block">View</span>
          <IconArrowNarrowRight
            className="text-xl"
            role="button"
            aria-label="goto dashboard"
          />
        </button>
      </td>
    </tr>
  );
}
