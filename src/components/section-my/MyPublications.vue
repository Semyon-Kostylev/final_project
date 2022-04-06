<template>
    <div class="publications">
        <div class="publications__top">
            <h1 class="publications__title">Мои публикации</h1>
            <a-button class="publications__add-button btn" type="primary">
                Добавить
                <my-publication-add class="publications__edit" />
            </a-button>
        </div>

        <label class="publications__search search" for="search">
            <input
                class="search__input"
                :class="{ 'search__input-open': isSearchInputOpen }"
                name="search"
                type="text"
                v-model="searchInput"
                @click="isSearchInputOpen = true"
            />
            <search-outlined class="search__icon" />
            <span
                class="search__mark"
                v-if="isSearchInputOpen"
                @click="isSearchInputOpen = false"
                @keydown="isSearchInputOpen = false"
            >
                &times;
            </span>
        </label>

        <ul class="publications__list list">
            <li
                class="list__item"
                v-for="publication in paginatedPublications"
                :key="publication.id"
            >
                <article class="list__article publication">
                    <router-link
                        class="publication__link"
                        :to="{ name: 'my-publication', params: { id: publication.id } }"
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
                            :to="{ name: 'my-publication', params: { id: publication.id } }"
                        >
                            {{ publication.title }} "Лучшее...
                        </router-link>
                        <div class="publication__wrapper">
                            <span class="publication__date">{{ publication.date }}</span>
                            <button class="publication__button">
                                <my-publication-edit
                                    class="publications__edit"
                                    :publication="publication"
                                />
                                <form-outlined class="publication__icon" />
                            </button>
                        </div>
                    </div>
                </article>
            </li>
        </ul>

        <a-pagination
            class="publications__pagination"
            v-if="filteredPublications.length >= publicationPerPage"
            v-model:current="currentPage"
            :total="filteredPublications.length"
            show-less-items
            :defaultPageSize="publicationPerPage"
        />
    </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { SearchOutlined, FormOutlined } from '@ant-design/icons-vue'
import axios from 'axios'
import MyPublicationAdd from '@/components/publication-events/MyPublicationAdd.vue'
import MyPublicationEdit from '@/components/publication-events/MyPublicationEdit.vue'

export default defineComponent({
    components: {
        SearchOutlined,
        FormOutlined,
        MyPublicationAdd,
        MyPublicationEdit
    },

    setup() {
        const publications = ref([])
        axios
            .get('https://6239b76228bcd99f0273a823.mockapi.io/api/v1/publications')
            .then((response) => (publications.value = response.data.reverse()))
            .catch(() => console.log('ошибка'))

        const searchInput = ref('')
        const isSearchInputOpen = ref(false)

        const currentPage = ref(1)
        const publicationPerPage = ref(9)

        const filteredPublications = computed(() => {
            if (searchInput.value) {
                return publications.value.filter((publication) =>
                    publication.title.includes(searchInput.value)
                )
            }
            return publications.value
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
            searchInput,
            isSearchInputOpen,
            currentPage,
            publicationPerPage,
            paginatedPublications,
            filteredPublications
        }
    }
})
</script>

<style lang="scss" scoped>
.publications {
    position: relative;
    display: grid;

    &__top {
        display: inline-flex;
        align-items: center;
        margin-bottom: 52px;
    }

    &__title {
        margin-right: 32px;
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

    &__search {
        position: absolute;
        top: 5px;
        right: 0px;
    }

    &__list {
        margin-bottom: 45px !important;
    }

    &__pagination {
        justify-self: center;
    }
}

.search {
    &__input {
        padding: 5px 20px 5px 40px;
        width: 123px;
        height: 45px;
        border: 1px solid $main-border-color;
        border-radius: 5px;
        transition: width 0.2s ease-in-out;
    }

    &__input-open {
        width: 800px;
    }

    &__icon {
        position: absolute;
        left: 13px;
        top: 14px;
        width: 20px;
        height: 20px;
        font-size: 16px;
    }

    &__mark {
        position: absolute;
        right: 20px;
        top: 50%;
        font-size: 18px;
        font-weight: 700;
        transform: translateY(-50%);
        cursor: pointer;
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
        justify-content: space-between;
        align-items: center;
    }

    &__date {
        padding: 10px 20px;
        font-size: 11px;
        line-height: normal;
        text-align: center;
        color: $main-bg-color;
        background-color: $date-bg-color;
    }

    &__button {
        @include btn-reset;
        position: relative;
    }

    &__icon {
        font-size: 20px;
    }
}
</style>
