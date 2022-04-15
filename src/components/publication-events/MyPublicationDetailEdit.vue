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
            <a-textarea
                class="publication-edit__area"
                v-model:value="description"
                placeholder="Текст публикации"
                :rows="15"
            />
        </a-modal>
    </div>
</template>
<script>
    import { defineComponent, ref } from 'vue'
    import axios from 'axios'
    import { useRoute } from 'vue-router'
    export default defineComponent({
        setup(props, context) {
            const route = useRoute()
            const visible = ref(false)

            const showModal = () => {
                visible.value = true
            }

            const publication = ref({})

            axios
                .get(
                    `https://6239b76228bcd99f0273a823.mockapi.io/api/v1/publications/${route.params.id}`
                )
                .then(response => {
                    publication.value = response.data
                    title.value = publication.value.title
                    description.value = publication.value.description
                })
                .catch()

            const handleOk = () => {
                if (
                    title.value === publication.value.title &&
                    description.value === publication.value.description
                ) {
                    return
                }

                axios
                    .put(
                        `https://6239b76228bcd99f0273a823.mockapi.io/api/v1/publications/${route.params.id}`,
                        {
                            title: title.value,
                            oldDate: publication.value.oldDate,
                            newDate: currentDate,
                            date: `${publication.value.oldDate} (изменено ${currentDate})`,
                            description: description.value
                        }
                    )
                    .then(() => {
                        visible.value = false
                        context.emit('editPublication')
                    })
                    .catch()
            }
            const currentDate = new Date().toLocaleDateString()
            const title = ref('')
            const description = ref('')

            return {
                visible,
                showModal,
                handleOk,
                title,
                description,
                publication
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
