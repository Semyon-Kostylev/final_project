<template>
    <div class="publication">
        <a class="publication__link-back" @click="$router.go(-1)">
            <img src="@/assets/img/svg/back-arrow.svg" alt="" />
            вернуться к публикациям
        </a>
        <div class="publication__deleted" v-if="publicationIsDeleted">
            Публикация успешно удалена
        </div>
        <div class="publication__content" v-else>
            <h1 class="publication__title">{{ publication.title }}</h1>
            <div class="publication__date">{{ publication.date }}</div>
            <div class="publication__wrapper">
                <img class="publication__image" :src="publication.image" :alt="publication.title" />
                <div
                    class="publication__btn-group"
                    v-show="+publication.author.id === +currentUser.id"
                >
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
            <div class="publication__description" v-html="publication.description"></div>

            <div class="publication__comments comments">
                <ul class="comments__list">
                    <li
                        class="comments__item detail-comment"
                        v-for="(comment, index) in publication.comments"
                        :key="index"
                    >
                        <div class="detail-comment__left">
                            <img
                                class="detail-comment__img"
                                src="@/assets/img/svg/user-photo.svg"
                                alt="#"
                            />
                        </div>
                        <div class="detail-comment__wrap">
                            <div class="detail-comment__top">
                                <h3 class="detail-comment__title">
                                    {{
                                        comment.firstname && comment.lastname
                                            ? `${comment.firstname} ${comment.lastname}`
                                            : comment.email
                                    }}
                                </h3>
                                <div class="detail-comment__date">{{ comment.date }}</div>
                                <a-popconfirm
                                    title="Вы уверены, что хотите удалить комментарий?"
                                    ok-text="Да"
                                    cancel-text="Отмена"
                                    @confirm="removeComment(comment)"
                                    @cancel="cancel"
                                >
                                    <button
                                        class="detail-comment__remove-btn"
                                        v-if="currentUser.email === comment.email"
                                    >
                                        &times;
                                    </button>
                                </a-popconfirm>
                            </div>
                            <div class="detail-comment__content" v-html="comment.content"></div>
                        </div>
                    </li>
                </ul>
                <div class="comments__write">
                    <div class="comments__field">
                        <ckeditor :editor="editor" v-model="commentContent"></ckeditor>
                    </div>
                    <a-button class="comments__add-btn" @click="addComment" type="primary">
                        Опубликовать комментарий
                    </a-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, reactive } from 'vue'
    import { useRoute } from 'vue-router'
    import axios from 'axios'
    import { message } from 'ant-design-vue'
    import useNotificationWithIcon from '@/composables/useNotificationWithIcon'
    import MyPublicationDetailEdit from '@/components/publication-events/MyPublicationDetailEdit.vue'
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

    export default {
        components: {
            MyPublicationDetailEdit
        },

        setup() {
            const route = useRoute()
            const publication = ref([])
            const publicationIsDeleted = ref(false)

            const currentUser = reactive(JSON.parse(localStorage['currentUser']))

            const getPublication = async () => {
                try {
                    const response = await axios.get(
                        `https://6239b76228bcd99f0273a823.mockapi.io/api/v1/publications/${route.params.id}`
                    )
                    publication.value = response.data
                } catch {
                    useNotificationWithIcon('error', 'При загрузке страницы произошла ошибка')
                }
            }
            getPublication()

            const cancel = () => {
                return
            }

            const removePublication = async () => {
                try {
                    await axios.delete(
                        `https://6239b76228bcd99f0273a823.mockapi.io/api/v1/publications/${route.params.id}`
                    )
                    publication.value = null
                    publicationIsDeleted.value = true
                    message.success('Публикация успешно удалена')
                } catch {
                    useNotificationWithIcon(
                        'error',
                        'При выполнении действия произошла ошибка. Попоробуйте снова'
                    )
                }
            }

            const editPublication = () => {
                getPublication()
            }

            const editor = ClassicEditor

            const commentContent = ref('')

            const addComment = () => {
                const date = new Date().toLocaleString()

                const newComment = {
                    firstname: currentUser.firstname,
                    lastname: currentUser.lastname,
                    email: currentUser.email,
                    content: commentContent.value,
                    date: date
                }
                const allComments = publication.value.comments
                allComments.push(newComment)

                const addComment = async () => {
                    try {
                        await axios.put(
                            `https://6239b76228bcd99f0273a823.mockapi.io/api/v1/publications/${route.params.id}`,
                            {
                                comments: allComments
                            }
                        )
                        await getPublication()
                        commentContent.value = ''
                    } catch {
                        useNotificationWithIcon(
                            'error',
                            'При выполнении действия произошла ошибка. Попоробуйте снова'
                        )
                    }
                }
                addComment()
            }

            const removeComment = currentComment => {
                const filteredComments = publication.value.comments.filter(
                    comment => comment !== currentComment
                )

                const removeComment = async () => {
                    try {
                        await axios.put(
                            `https://6239b76228bcd99f0273a823.mockapi.io/api/v1/publications/${route.params.id}`,
                            {
                                comments: filteredComments
                            }
                        )
                        await getPublication()
                        commentContent.value = ''
                    } catch {
                        useNotificationWithIcon(
                            'error',
                            'При выполнении действия произошла ошибка. Попоробуйте снова'
                        )
                    }
                }
                removeComment()
            }

            return {
                publication,
                publicationIsDeleted,
                removePublication,
                confirm,
                cancel,
                editPublication,
                editor,
                addComment,
                commentContent,
                currentUser,
                removeComment
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
            margin-bottom: 50px;
        }
    }

    .comments {
        &__list {
            display: grid;
            gap: 30px;
            margin-bottom: 100px;
        }

        &__field {
            margin-bottom: 20px;
        }
    }

    .detail-comment {
        position: relative;
        display: grid;
        grid-template-columns: 150px 1fr;
        gap: 20px;

        &__top {
            border-bottom: 1px solid gray;
            margin-bottom: 20px;
        }

        &__remove-btn {
            @include btn-reset;
            position: absolute;
            right: 20px;
            top: 0;
            font-size: 30px;
        }
    }
</style>
