<template>
  <div class="profile">
    <header class="profile__header header">
      <div class="header__container container">

        <a href="#" class="header__logo logo">Logo</a>

        <nav class="header__nav nav">
          <ul class="nav__list">
            <li class="nav__item" v-for="headerNavLink in headerNavLinks" :key="headerNavLink.id">
              <a class="nav__link" @click.prevent="goTolink(headerNavLink)"
                href="#">{{ headerNavLink.title }}
              </a>
            </li>

          </ul>
        </nav>

        <div class="header__user user">
          <div class="user__photo">Фото</div>
          <router-link :to="{ name: 'user' }" class="user__link">John Smith</router-link>
        </div>

      </div>
    </header>

    <section class="main">

      <aside class="main__sider sider">
        <nav class="sider__nav sider-nav">
          <ul class="sider-nav__list">
            <li class="sider-nav__item"
              v-for="siderNavLink in siderNavLinks"
              :key="siderNavLink.id"
            >
              <a class="sider-nav__link" href="#"
                @click.prevent="goTolink(siderNavLink)"
              >
                <span class="sider-nav__mark">x</span>
                {{ siderNavLink.title }}
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <div class="main__content content">
        <router-view/>
        <router-view name="password"/>
      </div>
    </section>

  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const headerNavLinks = [
      { title: 'Публикации', id: 1, urlName: { name: 'publications' } },
      { title: 'Авторы', id: 2, urlName: { name: 'authors' } },
    ];

    const siderNavLinks = [
      { title: 'Мои публикации', id: 1, urlName: { name: 'my-publications' } },
      { title: 'Мои лайки', id: 2, urlName: { name: 'my-likes' } },
      { title: 'Мои комментарии', id: 3, urlName: { name: 'my-comments' } },
    ];

    const router = useRouter();

    const goTolink = (link) => {
      router.push(link.urlName);
    };

    return {
      siderNavLinks,
      headerNavLinks,
      goTolink,
    };
  },
};
</script>

<style lang="scss" scoped>
  .profile {
    display: grid;
    grid-template-rows: max-content 1fr;
    min-height: 100vh;
    color: $black-color;
  }

  .header {
    height: max-content;
    border: 2px solid $gray-border-color;
    background-color: $dark-white-color;

    &__container {
      display: flex;
      align-items: center;
      padding: 17px 98px 16px 26px;
    }

    &__logo {
      margin-right: 139px;
    }
  }

  .logo {
    width: 155px;
    height: 60px;
    border: 1px solid $main-border-color;
    text-align: center;
    text-decoration: none;
    background-color: $main-bg-color;
  }

  .nav {
    margin-right: auto;

    &__list {
      @include list-reset;
      display: flex;
      margin: 0;
    }

    &__item {
      margin-right: 46px;

      &:last-child {
        margin-right: 0;
      }
    }

    &__link {
      font-size: 16px;
      line-height: normal;
      text-decoration: underline;
    }
  }

  .user {
    display: flex;
    align-items: center;

    &__photo {
      width: 46px;
      height: 42px;
      margin-right: 15px;
      border: 1px solid $dark-black-color;
      text-align: center;
      line-height: 42px;
      background-color: $main-bg-color;
    }

    &__link {
      font-size: 15px;
      height: max-content;
      text-decoration: underline;
    }
  }

  .main {
    display: grid;
    grid-template-columns: 280px 1fr;
  }

  .sider {
    padding: 28px 44px ;
    background-color: $sider-bg-color;
  }

  .sider-nav {
    &__list {
      @include list-reset;
    }

    &__item {
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: 700;
      line-height: 37px;
      color: $dark-black-color;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__mark {
      text-align: center;
      margin-right: 3px;
    }
  }

  .content {
    padding: 47px 44px 50px;
  }
</style>
