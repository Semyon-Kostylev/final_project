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
        setup(props, context) {
            const visible = ref(false)

            const showModal = () => {
                visible.value = true
            }

            const handleOk = () => {
                if (!title.value || !description.value) {
                    return
                }

                axios
                    .post('https://6239b76228bcd99f0273a823.mockapi.io/api/v1/publications', {
                        title: title.value,
                        oldDate: currentDate,
                        date: currentDate,
                        description: description.value
                    })
                    .then(() => {
                        visible.value = false
                        context.emit('addPublication')
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
