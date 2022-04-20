import { notification } from 'ant-design-vue'

export default function useNotificationWithIcon(type, notificationMessage) {
    notification[type]({
        message: notificationMessage
    })
}
