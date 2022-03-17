<template>
  <div class="publications">

    <div class="publications__top">
      <h1 class="publications__title">Мои публикации</h1>
      <button class="publications__add-button">Добавить</button>
    </div>

    <label class="publications__search search" for="search">
      <input class="search__input" name="search" type="text">
      <search-outlined class="search__icon" />
    </label>

    <ul class="publications__list list">
      <li class="list__item" v-for="publication in loadedPublications" :key="publication.id">

        <article class="list__article publication">

          <router-link class="publication__link"
            :to="{ name: 'my-publication', params: { id: publication.id }}"
          >
            <img class="publication__img" src="@/assets/img/svg/publication-test.svg"
            alt="@/assets/img/svg/publication-test.svg"
            >
          </router-link>

          <div class="publication__content">
            <router-link class="publication__title" href="#"
              :to="{ name: 'my-publication', params: { id: publication.id }}"
            >
              {{ publication.title }} "Лучшее...
            </router-link>
            <div class="publication__wrapper">
              <span class="publication__date">{{ publication.date }}</span>
              <button class="publication__button">
                <img class="publication__icon"
                src="@/assets/img/svg/edit-publication.svg" alt="edit"
                >
              </button>
            </div>
          </div>
        </article>
      </li>
    </ul>

    <button class="publications__more"
      v-show="buttonIsVisible"
      @click="publicationFilter"
    >
      Ещё
    </button>

  </div>
</template>

<script>
import { SearchOutlined } from '@ant-design/icons-vue';
import { defineComponent, onMounted, ref } from 'vue';
import publications from '@/data/publications';

export default defineComponent({
  components: {
    SearchOutlined,
  },

  setup() {
    const publicationIndex = ref(0);
    const publicationPerPage = ref(9);
    const loadedPublications = ref([]);
    const buttonIsVisible = ref(true);

    const publicationFilter = () => {
      // eslint-disable-next-line max-len
      loadedPublications.value = publications.slice(publicationIndex.value, publicationPerPage.value);
      publicationPerPage.value *= 2;

      if (publications.length <= loadedPublications.value.length) {
        buttonIsVisible.value = false;
      }
    };

    onMounted(() => {
      publicationFilter();
    });

    return {
      loadedPublications,
      publicationFilter,
      buttonIsVisible,
    };
  },
});

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
      @include btn-reset;
      width: 103px;
      height: 45px;
      border-radius: 5px;
      font-size: 13px;
      text-align: center;
      color: $main-bg-color;
      background-color: $dark-black-color;
    }

    &__search {
      position: absolute;
      top: 5px;
      right: 0px;
    }

    &__list {
      margin-bottom: 45px !important;
    }

    &__more {
      @include btn-reset;
      justify-self: center;
      width: 67px;
      height: 45px;
      border-radius: 5px;
      font-size: 13px;
      text-align: center;
      color: $main-bg-color;
      background-color: $dark-black-color;
    }
  }

  .search {
    &__input {
      padding: 5px 20px 5px 40px;
      width: 123px;
      height: 45px;
      border: 1px solid $main-border-color;
      border-radius: 5px;
    }

    &__icon  {
      position: absolute;
      left: 13px;
      top: 14px;
      width: 20px;
      height: 20px;
      font-size: 16px;
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
    }
  }
</style>
