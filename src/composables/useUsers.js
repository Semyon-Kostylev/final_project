import axios from 'axios'
import useNotificationWithIcon from '@/composables/useNotificationWithIcon'

export default function useUsers() {
    const getUsers = async () => {
        try {
            const response = await axios.get(
                'https://6239b76228bcd99f0273a823.mockapi.io/api/v1/users'
            )
            return response.data
        } catch {
            useNotificationWithIcon('error', 'Ошибка! Перезагрузите страницу...')
        }
    }
    return {
        getUsers
    }
}
