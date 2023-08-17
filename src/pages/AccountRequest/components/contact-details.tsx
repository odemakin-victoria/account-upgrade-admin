import { DrawerCell } from "@/pages/Dashboard/components/drawer"
import { ContactAddress } from "@/shared/types"
import { Skeleton } from "@mantine/core"

export default function ContactDetails({
    isLoading,
    data,
}: {
    isLoading: boolean
    data?: ContactAddress
}) {
    if (!data) {
        return null
    }
    const country = data.country ? data.country.toLowerCase() : '';

    if (country === "nigeria") {
        return <Local isLoading={isLoading} data={data} />;
    }
    return <International isLoading={isLoading} data={data} />;
}
const International = ({
    isLoading,
    data,
}: {
    isLoading: boolean
    data: ContactAddress
}) => {
    return (
        <div className="mb-14">
            <h2 className="text-lg mb-4 centered-line">Contact Details</h2>
            <div className="grid grid-cols-2 gap-6 gap-x-6">
                <Skeleton visible={isLoading}>
                    <DrawerCell
                        title="Country"
                        content={`${data?.country ?? "---"}`}
                    />
                </Skeleton>
                <Skeleton visible={isLoading}>
                    <DrawerCell title="State" content={data?.state ?? "---"} />
                </Skeleton>
                <Skeleton visible={isLoading}>
                    <DrawerCell
                        title="City"
                        content={`${data?.city ?? "---"}`}
                    />
                </Skeleton>
                <Skeleton visible={isLoading}>
                    <DrawerCell
                        title="Zip Code"
                        content={data?.zipCode || "---"}
                    />
                </Skeleton>
                <Skeleton visible={isLoading}>
                    <DrawerCell
                        title="Address Line 1"
                        content={`${data?.addressLine1 ?? "---"}`}
                    />
                </Skeleton>
                <Skeleton visible={isLoading}>
                    <DrawerCell
                        title="Address Line 2"
                        content={`${data?.addressLine2 ?? "---"}`}
                    />
                </Skeleton>
            </div>
        </div>
    )
}

const Local = ({
    isLoading,
    data,
}: {
    isLoading: boolean
    data: ContactAddress
}) => {
    return (
        <div className="mb-14">
            <h2 className="text-lg mb-4 centered-line">Contact Details</h2>
            <div className="grid grid-cols-2 gap-6 gap-x-6">
                <Skeleton visible={isLoading}>
                    <DrawerCell
                        title="Street Address"
                        content={`${data?.addressLine1 ?? "---"} ${data?.addressLine2 ?? ""}`}
                    />
                </Skeleton>
                <Skeleton visible={isLoading}>
                    <DrawerCell
                        title="Local Government"
                        content={data?.localGovernment || "---"}
                    />
                </Skeleton>
                <Skeleton visible={isLoading}>
                    <DrawerCell
                        title="Post Code"
                        content={data?.zipCode || "---"}
                    />
                </Skeleton>
                <Skeleton visible={isLoading}>
                    <DrawerCell title="State" content={data?.state || "---"} />
                </Skeleton>
            </div>
        </div>
    )
}
