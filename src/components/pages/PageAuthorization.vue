<template>
    <div class="authorization">
        <div class="authorization__logo logo">
            <img class="logo__name" src="@/assets/img/svg/logo-img.svg" alt="Logo" />
        </div>

        <a-form
            :model="formState"
            name="normal_login"
            class="authorization__form login-form"
            @finish="onFinish"
        >
            <h1 class="login-form__title">Вход</h1>

            <a-form-item
                class="login-form__input form-input"
                name="email"
                :rules="[{ required: true, message: 'Введите e-mail', type: 'email' }]"
            >
                <a-input class="form-input__input input-base" v-model:value="formState.email">
                </a-input>
                <div
                    class="form-input__placeholder"
                    :class="{ 'input-base__valid': formState.email }"
                >
                    Email
                </div>
            </a-form-item>

            <a-form-item
                class="login-form__input form-input"
                name="password"
                :rules="[{ required: true, message: 'Введите пароль' }]"
            >
                <a-input-password
                    class="form-input__input input-base"
                    v-model:value="formState.password"
                >
                </a-input-password>
                <div
                    class="form-input__placeholder"
                    :class="{ 'input-base__valid': formState.password }"
                >
                    Пароль
                </div>
            </a-form-item>

            <a-form-item class="login-form__forget forget-link">
                <router-link class="link-black" :to="{ name: 'forget-password' }">
                    Забыли пароль?
                </router-link>
            </a-form-item>

            <a-form-item class="login-form__submit submit">
                <a-button
                    type="primary"
                    html-type="submit"
                    class="submit__button login-form-button btn"
                >
                    Войти
                </a-button>
            </a-form-item>

            <a-form-item class="login-form__link authorization-link">
                <router-link class="link-black" :to="{ name: 'registration' }">
                    Ещё нет учётной записи?
                </router-link>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { defineComponent, reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import openNotificationWithIcon from '@/composables/openNotificationWithIcon'
    import getUsers from '@/composables/getUsers'

    export default defineComponent({
        setup() {
            const router = useRouter()

            const formState = reactive({
                email: '',
                password: ''
            })

            const invalidMessage = ref('')

            const { users } = getUsers()

            const currentUser = localStorage['currentUser']
                ? reactive(JSON.parse(localStorage['currentUser']))
                : null

            if (currentUser) {
                router.push({ name: 'user' })
            }

            const onFinish = values => {
                let currentUser

                const findUser = users.value.find(user => {
                    const valid = user.email === values.email && user.password === values.password
                    currentUser = user
                    return valid
                })

                if (findUser) {
                    localStorage.setItem('currentUser', JSON.stringify(currentUser))
                    router.push({ name: 'user' })
                } else {
                    invalidMessage.value = 'Неверный Email или пароль'
                    openNotificationWithIcon('error', invalidMessage.value)
                }
            }

            return {
                formState,
                onFinish,
                users
            }
        }
    })
</script>

<style lang="scss" scoped>
    .authorization {
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
        padding: 52px 67px 51px 68px;
        width: 469px;
        border: 1px solid $main-border-color;

        &__title {
            text-align: center;
            margin-bottom: 1em;
            font-size: 26px;
            font-weight: 700;
        }

        &__input {
            margin-bottom: 15px;
        }

        &__forget {
            margin-left: auto;
            margin-bottom: 27px;
        }

        &__submit {
            margin: 0 auto 20px;
        }

        &__invalid {
            margin-bottom: 20px;
            text-align: center;
            color: red;
        }

        &__link {
            margin: 0 auto;
        }
    }

    .forget-link {
        width: max-content;
    }

    .submit {
        width: max-content;
    }

    .authorization-link {
        width: max-content;
    }

    .form-input {
        position: relative;
    }
</style>
