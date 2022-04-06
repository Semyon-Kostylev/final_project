import { ref } from 'vue'
import axios from 'axios'

export default async function getUsers() {
    const users = ref([])
    axios
        .get('https://6239b76228bcd99f0273a823.mockapi.io/api/v1/users')
        .then((response) => (users.value = response.data))
        .catch(() => console.log('ошибка'))

    return {
        users
    }
}
