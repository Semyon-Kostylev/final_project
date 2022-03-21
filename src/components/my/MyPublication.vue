<template>
  <div class="publication">
    <router-link class="publication__link-back" :to="{ name: 'my-publications' }">
      <img src="@/assets/img/svg/back-arrow.svg" alt="">
      вернуться к публикациям
    </router-link>
    <h1 class="publication__title">{{ publication.title }}</h1>
    <div class="publication__date">{{ publication.date }}</div>
    <div class="publication__wrapper">
      <img class="publication__image" src="@/assets/img/svg/publication-test.svg"
      alt="@/assets/img/svg/publication-test.svg"
    >
      <div class="publication__btn-group">
        <button class="publication__btn">Редактировать</button>
        <button class="publication__btn" @click="removePublication">Удалить</button>
      </div>
    </div>
    <div class="publication__description" v-html="publication.description"></div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import publications from '@/data/publications';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const findPublication = publications.find((element) => element.id === +route.params.id);
    const publication = reactive(findPublication);

    const removePublication = () => {
      // eslint-disable-next-line no-alert
      if (window.confirm('Вы уверены?')) {
        // eslint-disable-next-line no-import-assign
        publications = publications.filter((item) => publication.id !== item.id);
        router.push({ name: 'my-publications' });
      }
    };

    return {
      publication,
      removePublication,
    };
  },
};
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
      @include btn-reset;
      height: max-content;
      width: max-content;
      padding: 15px 20px;
      border-radius: 5px;
      font-size: 13px;
      text-align: center;
      color: #ffffff;
      background-color: #000000;
    }

    &__description {
      max-width: 682px;
    }
  }
</style>
