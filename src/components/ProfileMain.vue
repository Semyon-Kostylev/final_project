<template>
  <a-layout class="profile">
    <a-layout-header class="profile__header header">
      <div class="header__container container">

        <a href="#" class="header__logo logo">Logo</a>

        <nav class="header__nav nav">
          <ul class="nav__list">
            <li class="nav__item">
              <a class="nav__link" href="#">Публикации</a>
            </li>
            <li class="nav__item">
              <a class="nav__link" href="#">Авторы</a>
            </li>
          </ul>
        </nav>

        <div class="header__user user">
          <div class="user__photo">Фото</div>
          <a class="user__link" href="#">John Smith</a>
        </div>

      </div>
    </a-layout-header>

    <a-layout>
      <a-layout-sider>Sider</a-layout-sider>
      <a-layout-content>Content</a-layout-content>
    </a-layout>

  </a-layout>
</template>

<style lang="scss" scoped>
  a {
    color: #333333;
  }

  .profile {
    color: #333333;
  }

  .header {
    height: max-content;
    border: 2px solid #d7d7d7;
    background-color: #f6f6f6;

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
    background-color: #ffffff;
    text-align: center;
    text-decoration: none;
  }

  .nav {
    margin-right: auto;

    &__list {
      display: flex;
      margin: 0;
      list-style: none;
    }

    &__item {
      margin-right: 46px;

      &:last-child {
        margin-right: 0;
      }
    }

    &__link {
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
      border: 1px solid black;
      background-color: #ffffff;
    }

    &__link {
      height: max-content;
      text-decoration: underline;
    }
  }
</style>
