<template>
    <div class="publications">
        <div class="publications__top">
            <h1 class="publications__title">Публикации</h1>

            <div class="publications__search search">
                <div class="search__block">
                    <h3 class="search__info">Поиск по названию и содержанию</h3>
                    <a-input
                        v-model:value="searchTitleAndDescription"
                        placeholder="Введите название или текст публикации"
                    />
                </div>
                <div class="search__block">
                    <h3 class="search__info">Поиск по автору</h3>
                    <a-input v-model:value="searchAuthor" placeholder="Введите имя автора" />
                </div>
                <div class="search__block">
                    <h3 class="search__info">Поиск по дате публикации</h3>
                    <a-range-picker v-model:value="searchDate" :format="'DD/MM/YYYY'" />
                </div>
            </div>
        </div>
        <ul class="publications__list list">
            <li
                class="list__item"
                v-for="publication in paginatedPublications"
                :key="publication.id"
            >
                <article class="list__article publication">
                    <router-link
                        class="publication__link"
                        :to="{ name: 'publication', params: { id: publication.id } }"
                    >
                        <img
                            class="publication__img"
                            :src="publication.image"
                            :alt="publication.title"
                        />
                    </router-link>

                    <div class="publication__content">
                        <router-link
                            class="publication__title"
                            href="#"
                            :to="{ name: 'publication', params: { id: publication.id } }"
                        >
                            {{ publication.title }}
                        </router-link>
                        <div class="publication__wrapper">
                            <span class="publication__date">{{ publication.date }}</span>
                            <div class="publication__author">
                                Автор:
                                {{
                                    publication.author.firstname && publication.author.lastname
                                        ? `${publication.author.firstname} ${publication.author.lastname}`
                                        : publication.author.email
                                }}
                            </div>
                        </div>
                    </div>
                </article>
            </li>
        </ul>

        <a-pagination
            class="publications__pagination"
            v-if="filteredPublications.length > publicationPerPage"
            v-model:current="currentPage"
            :total="filteredPublications.length"
            show-less-items
            :defaultPageSize="publicationPerPage"
        />
    </div>
</template>

<script>
    import { defineComponent, ref, computed, reactive } from 'vue'
    import axios from 'axios'
    import useNotificationWithIcon from '@/composables/useNotificationWithIcon'

    export default defineComponent({
        setup() {
            const currentUser = reactive(JSON.parse(localStorage['currentUser']))

            const publications = ref([])

            async function getPublications() {
                try {
                    const response = await axios.get(
                        'https://6239b76228bcd99f0273a823.mockapi.io/api/v1/publications'
                    )
                    publications.value = response.data
                } catch {
                    useNotificationWithIcon('error', 'При загрузке страницы произошла ошибка')
                }
            }
            getPublications()

            const searchTitleAndDescription = ref()
            const searchAuthor = ref()
            const searchDate = ref()

            const currentPage = ref(1)
            const publicationPerPage = ref(9)

            const filteredPublications = computed(() => {
                let filtered = publications.value

                if (searchTitleAndDescription.value) {
                    filtered = filtered.filter(
                        publication =>
                            publication.title.includes(searchTitleAndDescription.value) ||
                            publication.description.includes(searchTitleAndDescription.value)
                    )
                }

                if (searchAuthor.value) {
                    filtered = filtered.filter(publication => {
                        const fullName = `${publication.author.firstname} ${publication.author.lastname}`
                        return fullName.includes(searchAuthor.value)
                    })
                }

                if (searchDate.value) {
                    filtered = filtered.filter(publication => {
                        const start =
                            Date.parse(searchDate.value[0]) -
                            (Date.parse(searchDate.value[0]) % 86400000)

                        const finish =
                            Date.parse(searchDate.value[1]) -
                            (Date.parse(searchDate.value[1]) % 86400000) +
                            86399999

                        return (
                            Date.parse(publication.oldDate) >= start &&
                            Date.parse(publication.oldDate) <= finish
                        )
                    })
                }

                return filtered
            })

            const paginatedPublications = computed(() => {
                const startIndex = (currentPage.value - 1) * publicationPerPage.value
                return filteredPublications.value.slice(
                    startIndex,
                    startIndex + publicationPerPage.value
                )
            })

            return {
                publications,
                currentPage,
                publicationPerPage,
                paginatedPublications,
                filteredPublications,
                currentUser,
                searchTitleAndDescription,
                searchAuthor,
                searchDate
            }
        }
    })
</script>

<style lang="scss" scoped>
    .publications {
        position: relative;
        display: grid;

        &__top {
            margin-bottom: 52px;
        }

        &__title {
            margin-bottom: 30px;
            font-size: 30px;
            color: $black-color;
            font-weight: 700;
            line-height: normal;
        }

        &__add-button {
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

        &__list {
            margin-bottom: 45px !important;
        }

        &__pagination {
            justify-self: center;
        }
    }

    .search {
        display: grid;
        grid-template-columns: repeat(3, 25%);
        gap: 80px;

        &__info {
            margin-bottom: 20px;
        }
    }

    .list {
        @include list-reset;
        display: grid;
        grid-template-columns: repeat(3, 366px);
        grid-row-gap: 30px;
        justify-content: space-between;
    }

    .publication {
        &__img {
            width: 366px;
            height: 218px;
            border: 1px solid $main-border-color;
        }

        &__content {
            padding-top: 20px;
        }

        &__title {
            display: block;
            margin: 0 0 10px;
            font-size: 16px;
            font-weight: 700;
            text-decoration: underline;
            line-height: 24px;
            color: $black-color;
            transition: opacity 0.2s ease-in-out;

            &:hover,
            &:focus {
                opacity: 0.8;
                outline: none;
            }
        }

        &__wrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        &__date {
            padding: 10px 20px;
            font-size: 11px;
            line-height: normal;
            text-align: center;
            color: $main-bg-color;
            background-color: $date-bg-color;
        }

        &__author {
            font-weight: bold;
            padding: 10px 20px;
            text-align: center;
            background-color: antiquewhite;
        }
    }
</style>
