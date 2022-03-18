<template>
  <div class="profile">
    <header class="profile__header header">
      <div class="header__container container">

        <a href="#" class="header__logo logo">
          <img class="logo__img" src="@/assets/img/svg/logo-img.svg" alt="Logo">
        </a>

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
          <div class="user__photo" @click="openUserModal" @keydown="openUserModal">
            <img class="user__img"
              src="@/assets/img/svg/user-photo.svg"
              alt="@/assets/img/svg/user-photo.svg"
            >
          </div>
          <div class="user__link" @click="openUserModal" @keydown="openUserModal">John Smith</div>

          <div v-if="userModal" class="user__modal user-modal">
            <a href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
          </div>
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
import { ref } from 'vue';
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

    const userModal = ref(false);

    const openUserModal = () => {
      userModal.value = !userModal.value;
    };

    return {
      siderNavLinks,
      headerNavLinks,
      goTolink,
      userModal,
      openUserModal,
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
    &__img {
      width: 155px;
      height: 60px;
    }
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
      margin-right: 15px;
      cursor: pointer;
    }

    &__img {
      width: 46px;
      height: 42px;
    }

    &__link {
      font-size: 15px;
      height: max-content;
      text-decoration: underline;
      cursor: pointer;
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
