<template>
    <div class="profile">
        <header class="profile__header header">
            <div class="header__container container">
                <a href="#" class="header__logo logo">
                    <img class="logo__img" src="@/assets/img/svg/logo-img.svg" alt="Logo" />
                </a>

                <nav class="header__nav nav">
                    <ul class="nav__list">
                        <li
                            class="nav__item"
                            v-for="headerNavLink in headerNavLinks"
                            :key="headerNavLink.id"
                        >
                            <router-link class="nav__link" :to="{ name: headerNavLink.urlName }">
                                {{ headerNavLink.title }}
                            </router-link>
                        </li>
                    </ul>
                </nav>

                <div class="header__user user">
                    <div class="user__photo" @click="openUserModal" @keydown="openUserModal">
                        <img
                            class="user__img"
                            src="@/assets/img/svg/user-photo.svg"
                            alt="@/assets/img/svg/user-photo.svg"
                        />
                    </div>
                    <div class="user__link" @click="openUserModal" @keydown="openUserModal">
                        {{ users[0].userFirstname }} {{ users[0].userSurname }}
                    </div>

                    <div v-if="userModal" class="user__modal user-modal">
                        <ul class="user-modal__list">
                            <li
                                class="user-modal__item"
                                v-for="userModalLink in userModalLinks"
                                :key="userModalLink.id"
                            >
                                <router-link
                                    class="user-modal__link link-black"
                                    @click="userModal = false"
                                    :to="{ name: userModalLink.urlName }"
                                >
                                    {{ userModalLink.title }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>

        <section class="main">
            <aside class="main__sider sider">
                <nav class="sider__nav sider-nav">
                    <ul class="sider-nav__list">
                        <li
                            class="sider-nav__item"
                            v-for="siderNavLink in siderNavLinks"
                            :key="siderNavLink.id"
                        >
                            <router-link
                                class="sider-nav__link"
                                :to="{ name: siderNavLink.urlName }"
                            >
                                <span class="sider-nav__mark">&times;</span>
                                {{ siderNavLink.title }}
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </aside>

            <div class="main__content content">
                <router-view />
                <router-view name="password" />
            </div>
        </section>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import users from '@/data/users'

export default {
    setup() {
        const headerNavLinks = [
            { title: 'Публикации', id: 1, urlName: 'publications' },
            { title: 'Авторы', id: 2, urlName: 'authors' }
        ]

        const siderNavLinks = [
            { title: 'Мои публикации', id: 1, urlName: 'my-publications' },
            { title: 'Мои лайки', id: 2, urlName: 'my-likes' },
            { title: 'Мои комментарии', id: 3, urlName: 'my-comments' }
        ]

        const userModalLinks = [
            { id: 1, title: 'Профиль', urlName: 'user' },
            { id: 2, title: 'Изменение пароля', urlName: 'password' },
            { id: 3, title: 'Выход', urlName: 'authorization' }
        ]

        const router = useRouter()

        const goTolink = (link) => {
            router.push(link.urlName)
        }

        const userModal = ref(false)

        const openUserModal = () => {
            userModal.value = !userModal.value
        }

        return {
            siderNavLinks,
            headerNavLinks,
            userModalLinks,
            goTolink,
            userModal,
            openUserModal,
            users
        }
    }
}
</script>

<style lang="scss" scoped>
.profile {
    display: grid;
    grid-template-rows: max-content 1fr;
    min-height: 100vh;
    color: $black-color;
}

.header {
    width: 100%;
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
        transition: opacity 0.2s ease-in-out;

        &:hover,
        &:focus,
        &:active {
            opacity: 0.6;
            color: $dark-grey-color;
        }
    }
}

.user {
    position: relative;
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

    &__modal {
        position: absolute;
        top: 138%;
        left: -15%;
        z-index: 1;
    }
}

.user-modal {
    width: 219px;
    padding: 15px 20px 9px;
    border: 1px solid $main-border-color;
    border-radius: 5px;
    background-color: $main-bg-color;

    &::before {
        content: '';
        position: absolute;
        left: 40px;
        top: -8px;
        width: 15px;
        height: 15px;
        border-top: 1px solid $main-border-color;
        border-left: 1px solid $main-border-color;
        transform: rotate(45deg);
        background-color: $main-bg-color;
    }

    &__list {
        @include list-reset;
    }

    &__item {
        margin-bottom: 15 px;
        &:last-child {
            margin-bottom: 0;
        }
    }

    &__link {
        font-size: 16px;
    }
}

.main {
    display: grid;
    grid-template-columns: 280px 1fr;
}

.sider {
    padding: 28px 44px;
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

    &__link {
        transition: opacity 0.2s ease-in-out;

        &:hover,
        &:focus,
        &:active {
            opacity: 0.6;
            color: $dark-grey-color;
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
