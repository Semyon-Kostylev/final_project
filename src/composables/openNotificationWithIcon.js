import { notification } from 'ant-design-vue'

export default function openNotificationWithIcon(type, notificationMessage) {
    notification[type]({
        message: notificationMessage
    })
}
