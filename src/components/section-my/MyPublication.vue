<template>
    <div class="publication">
        <router-link class="publication__link-back" :to="{ name: 'my-publications' }">
            <img src="@/assets/img/svg/back-arrow.svg" alt="" />
            вернуться к публикациям
        </router-link>
        <div class="publication__deleted" v-if="publicationIsDeleted">
            Публикация успешно удалена
        </div>
        <div class="publication__content" v-else>
            <h1 class="publication__title">{{ publication.title }}</h1>
            <div class="publication__date">{{ publication.date }}</div>
            <div class="publication__wrapper">
                <img class="publication__image" :src="publication.image" :alt="publication.title" />
                <div class="publication__btn-group">
                    <a-button class="publication__btn btn" type="primary">
                        Редактировать
                        <my-publication-detail-edit
                            class="publication__edit"
                            @edit-publication="editPublication"
                        />
                    </a-button>

                    <a-popconfirm
                        title="Вы уверены, что хотите удалить публикацию?"
                        ok-text="Да"
                        cancel-text="Отмена"
                        @confirm="removePublication"
                        @cancel="cancel"
                    >
                        <a-button class="publication__btn btn" type="primary"> Удалить </a-button>
                    </a-popconfirm>
                </div>
            </div>
            <div class="publication__description">{{ publication.description }}</div>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue'
    import { useRoute } from 'vue-router'
    import axios from 'axios'
    import { message } from 'ant-design-vue'
    import MyPublicationDetailEdit from '@/components/publication-events/MyPublicationDetailEdit.vue'

    export default {
        components: {
            MyPublicationDetailEdit
        },

        setup() {
            const route = useRoute()
            const publication = ref([])
            const publicationIsDeleted = ref(false)

            axios
                .get(
                    `https://6239b76228bcd99f0273a823.mockapi.io/api/v1/publications/${route.params.id}`
                )
                .then(response => (publication.value = response.data))
                .catch()

            const cancel = () => {
                return
            }

            const removePublication = () => {
                axios
                    .delete(
                        `https://6239b76228bcd99f0273a823.mockapi.io/api/v1/publications/${route.params.id}`
                    )
                    .then(() => {
                        publication.value = null
                        publicationIsDeleted.value = true
                        message.success('Публикация успешно удалена')
                    })
                    .catch()
            }

            const editPublication = () => {
                axios
                    .get(
                        `https://6239b76228bcd99f0273a823.mockapi.io/api/v1/publications/${route.params.id}`
                    )
                    .then(response => (publication.value = response.data))
                    .catch()
            }

            return {
                publication,
                publicationIsDeleted,
                removePublication,
                confirm,
                cancel,
                editPublication
            }
        }
    }
</script>

<style lang="scss" scoped>
    .publication {
        display: grid;

        &__link-back {
            margin-bottom: 29px;
        }

        &__title {
            margin-bottom: 20px;
            font-size: 30px;
            color: $black-color;
            font-weight: 700;
            line-height: normal;
        }

        &__date {
            padding: 10px 20px;
            width: max-content;
            margin-bottom: 20px;
            font-size: 11px;
            line-height: normal;
            text-align: center;
            color: $main-bg-color;
            background-color: $date-bg-color;
        }

        &__wrapper {
            display: grid;
            grid-template-columns: max-content max-content;
            column-gap: 111px;
            margin-bottom: 20px;
        }

        &__img {
            width: 682px;
            height: 406px;
        }

        &__btn-group {
            display: grid;
            row-gap: 20px;
            height: max-content;
        }

        &__btn {
            position: relative;
        }

        &__edit {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            z-index: 1;
        }

        &__description {
            max-width: 682px;
        }
    }
</style>
