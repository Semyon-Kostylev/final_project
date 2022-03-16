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
      <li class="list__item">

        <article class="list__article publication">
          <div class="publication__img">Изображение</div>

          <div class="publication__content">
            <h2 class="publication__title">title</h2>
            <div class="publication__wrapper">
              <span class="publication__date">date</span>
              <button>
                <img src="@/assets/img/svg/edit-publication.svg" alt="edit  ">
              </button>
            </div>
          </div>
        </article>

      </li>
    </ul>
  </div>
</template>

<script>
import { searchOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    searchOutlined,
  },
});

</script>

<style lang="scss" scoped>
  .publications {
    position: relative;

    &__top {
      display: inline-flex;
      align-items: center;
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
      font-size: 13px;
      width: 103px;
      height: 45px;
      text-align: center;
      color: $main-bg-color;
      background-color: $dark-black-color;
    }

    &__search {
      position: absolute;
      top: 5px;
      right: 0px;
    }

    .search {
      &__input {
        padding: 5px 20px;
        width: 123px;
        height: 45px;
      }

      &__icon  {
        width: 16px;
        height: 16px;
      }
    }
  }
</style>
