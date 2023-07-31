import { notifications } from "@mantine/notifications"

export class NotificationManager {
   static showErrorNotification(message?: string, ): void {
        notifications.show({
            title: "Error!",
            message: message ?? "An Error occurred, please try again later",
            styles: (theme) => ({
                root: {
                    backgroundColor: theme.colors.red[8],
                    border: "transparent",
                    "&::before": { backgroundColor: theme.white },
                },
                description: {
                    color: "white",
                },
                title: {
                    color: "white",
                    fontWeight: "bold",
                },
            }),
            color: "white",
            withCloseButton: false,
            autoClose: 5000,
        })
    }

    static showSuccessNotification(message?: string, ): void {
        notifications.show({
            title: "Success!",
            message: message ?? "Operation completed successfully",
            styles: (theme) => ({
              root: {
                backgroundColor: theme.colors.green[8],
                border: "transparent",
                "&::before": { backgroundColor: theme.white },
              },
              description: {
                color: "white",
              },
              title: {
                color: "white",
                fontWeight: "bold",
              },
            }),
            color: "white",
            withCloseButton: false,
            autoClose: 5000,
          });
          
    }
}
