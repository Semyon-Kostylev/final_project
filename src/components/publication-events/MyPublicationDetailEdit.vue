<template>
    <div class="publication-edit">
        <div class="publication-edit__btn" type="primary" @click="showModal"></div>
        <a-modal
            class="publication-edit__modal"
            v-model:visible="visible"
            title="Редактировать публикацию"
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
    import { useRoute } from 'vue-router'
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
    import useNotificationWithIcon from '@/composables/useNotificationWithIcon'

    export default defineComponent({
        setup(props, context) {
            const route = useRoute()
            const visible = ref(false)

            const showModal = () => {
                visible.value = true
            }

            const publication = ref({})

            async function getPublication() {
                try {
                    const response = await axios.get(
                        `https://6239b76228bcd99f0273a823.mockapi.io/api/v1/publications/${route.params.id}`
                    )
                    publication.value = response.data
                    title.value = publication.value.title
                    description.value = publication.value.description
                } catch {
                    useNotificationWithIcon('error', 'При загрузке страницы произошла ошибка')
                }
            }
            getPublication()

            const handleOk = () => {
                if (
                    title.value === publication.value.title &&
                    description.value === publication.value.description
                ) {
                    return
                }

                const editPublication = async () => {
                    try {
                        await axios.put(
                            `https://6239b76228bcd99f0273a823.mockapi.io/api/v1/publications/${route.params.id}`,
                            {
                                title: title.value,
                                newDate: currentDate,
                                newDateVision: currentDate.toLocaleDateString(),
                                date: `${
                                    publication.value.oldDateVision
                                } (изменено ${currentDate.toLocaleDateString()})`,
                                description: description.value
                            }
                        )
                        visible.value = false
                        context.emit('editPublication')
                    } catch {
                        useNotificationWithIcon(
                            'error',
                            'При выполнении действия произошла ошибка. Попоробуйте снова'
                        )
                    }
                }
                editPublication()
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
                publication,
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
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
</style>
