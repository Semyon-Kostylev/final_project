<template>
    <div class="forget-password">
        <div class="forget-password__logo logo">
            <img class="logo__name" src="@/assets/img/svg/logo-img.svg" alt="Logo" />
        </div>

        <a-form
            :model="formState"
            name="normal_login"
            class="forget-password__form login-form"
            @finish="onFinish"
        >
            <h1 class="login-form__title">Восстановление пароля</h1>

            <p class="login-form__description description">
                Для восстановления пароля введите номер телефона, который был указан при регистрации
            </p>

            <a-form-item
                class="login-form__input form-input"
                name="userEmail"
                :rules="[{ required: true, message: 'Введите e-mail', type: 'email' }]"
            >
                <a-input class="form-input__input input-base" v-model:value="formState.userEmail">
                </a-input>
                <div
                    class="form-input__placeholder"
                    :class="{ 'input-base__valid': formState.userEmail }"
                >
                    Email
                </div>
            </a-form-item>

            <a-form-item class="login-form__submit submit">
                <a-button
                    type="primary"
                    html-type="submit"
                    class="submit__button login-form-button btn"
                >
                    Сбросить пароль
                </a-button>
            </a-form-item>

            <a-form-item class="login-form__link forget-password-link">
                <router-link class="link-black" :to="{ name: 'authorization' }"
                    >Вернуться</router-link
                >
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
import { defineComponent, reactive } from 'vue'
import openNotificationWithIcon from '@/composables/openNotificationWithIcon'

export default defineComponent({
    setup() {
        const formState = reactive({
            userEmail: '',
            formMessage: ''
        })

        const onFinish = () => {
            formState.formMessage =
                'На указанный адрес электронной почты отправлена инструкция о восстановлении пароля'
            openNotificationWithIcon('success', formState.formMessage)
        }

        return {
            formState,
            onFinish
        }
    }
})
</script>

<style lang="scss" scoped>
.forget-password {
    padding: 100px;

    &__logo {
        margin: 0 auto 44px;
    }

    &__form {
        margin: 0 auto;
    }
}

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 155px;
    height: 60px;
    border: 1px solid $main-border-color;
    text-align: center;
    font-size: 13px;
}

.login-form {
    display: flex;
    flex-direction: column;
    padding: 52px 39px 51px 43px;
    width: 469px;
    border: 1px solid $main-border-color;

    &__title {
        text-align: center;
        margin-bottom: 1em;
        font-size: 26px;
        font-weight: 700;
    }

    &__input {
        margin: 0 auto 31px;
    }

    &__description {
        margin-bottom: 29px;
    }

    &__message {
        margin-bottom: 20px;
        text-align: center;
        color: green;
    }

    &__submit {
        margin: 0 auto 19px;
    }

    &__link {
        margin: 0 auto;
    }
}

.description {
    font-size: 14px;
    text-align: center;
    line-height: 19px;
    color: $black-color;
}

.submit {
    width: max-content;
}

.forget-password-link {
    width: max-content;
}

.form-input {
    position: relative;
}
</style>
