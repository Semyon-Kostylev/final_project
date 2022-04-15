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
    export default defineComponent({
        props: {
            publication: Object
        },

        setup(props) {
            const visible = ref(false)

            const showModal = () => {
                visible.value = true
            }

            const handleOk = () => {
                if (
                    title.value === props.publication.title &&
                    description.value === props.publication.description
                ) {
                    return
                }

                axios
                    .put(
                        `https://6239b76228bcd99f0273a823.mockapi.io/api/v1/publications/${props.publication.id}`,
                        {
                            title: title.value,
                            oldDate: props.publication.oldDate,
                            newDate: currentDate,
                            date: `${props.publication.oldDate} (изменено ${currentDate})`,
                            description: description.value
                        }
                    )
                    .then(() => window.location.reload())
                    .catch()
            }
            const currentDate = new Date().toLocaleDateString()
            const title = ref(props.publication.title)
            const description = ref(props.publication.description)

            return {
                visible,
                showModal,
                handleOk,
                title,
                description
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
