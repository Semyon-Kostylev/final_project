<template>
    <div class="publication-edit">
        <div class="publication-edit__btn" type="primary" @click="showModal"></div>
        <a-modal
            class="publication-edit__modal"
            v-model:visible="visible"
            title="Добавить публикацию"
            @ok="handleOk"
        >
            <a-textarea
                class="publication-edit__area"
                v-model:value="title"
                placeholder="Заголовок публикации"
                :rows="3"
            />
            <ckeditor :editor="editor" v-model="description"></ckeditor>
        </a-modal>
    </div>
</template>
<script>
    import { defineComponent, ref } from 'vue'
    import axios from 'axios'
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
    import useNotificationWithIcon from '@/composables/useNotificationWithIcon'

    export default defineComponent({
        props: {
            currentUser: Object
        },

        setup(props, context) {
            const visible = ref(false)

            const showModal = () => {
                visible.value = true
            }

            const handleOk = () => {
                if (!title.value || !description.value) {
                    return
                }

                const AddPublication = async () => {
                    try {
                        await axios.post(
                            'https://6239b76228bcd99f0273a823.mockapi.io/api/v1/publications',
                            {
                                title: title.value,
                                oldDate: currentDate,
                                oldDateVision: currentDate.toLocaleDateString(),
                                date: currentDate.toLocaleDateString(),
                                description: description.value,
                                comments: [],
                                author: {
                                    firstname: props.currentUser.firstname,
                                    lastname: props.currentUser.lastname,
                                    email: props.currentUser.email,
                                    id: +props.currentUser.id
                                }
                            }
                        )
                        title.value = ''
                        description.value = ''
                        visible.value = false
                        context.emit('addPublication')
                    } catch {
                        useNotificationWithIcon(
                            'error',
                            'При выполнении действия произошла ошибка. Попоробуйте снова'
                        )
                    }
                }
                AddPublication()
            }
            const currentDate = new Date()
            const title = ref('')
            const description = ref('')

            const editor = ClassicEditor

            return {
                visible,
                showModal,
                handleOk,
                title,
                description,
                editor
            }
        }
    })
</script>

<style lang="scss" scoped>
    .publication-edit {
        &__btn {
            width: 100%;
            height: 100%;
        }
        &__area {
            padding: 10px;
            margin-bottom: 30px;
            border: 1px solid gray;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
</style>
