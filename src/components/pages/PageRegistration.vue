<template>
    <transition name="show">
        <base-agreement
            class="modal-show"
            v-if="modalState"
            :modal="modalState"
            @close-modal="modalState = false"
        />
    </transition>

    <div class="registration">
        <div class="registration__logo logo">
            <img class="logo__name" src="@/assets/img/svg/logo-img.svg" alt="Logo" />
        </div>

        <a-form
            :model="formState"
            name="normal_login"
            class="registration__form login-form"
            @finish="onFinish"
        >
            <h1 class="login-form__title">Регистрация</h1>

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
                class="login-form__input login-form__input-password form-input"
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

            <a-form-item class="login-form__description description-block">
                <p class="description-block__description">
                    Регистрируясь вы соглашаетесь с&nbsp;<a
                        @click.prevent="modalState = true"
                        class="description-block__link link-black"
                        href="#"
                        >Пользовательским соглашением</a
                    >&nbsp;и&nbsp;<a
                        class="description-block__link link-black"
                        @click.prevent="modalState = true"
                        href="#"
                        >Условиями обработки персональных данных</a
                    >
                </p>
            </a-form-item>

            <a-form-item class="login-form__submit submit">
                <a-button
                    type="primary"
                    html-type="submit"
                    class="submit__button login-form-button btn"
                >
                    Зарегистрироваться
                </a-button>
            </a-form-item>

            <a-form-item class="login-form__link authorization-link">
                <router-link class="link-black" :to="{ name: 'authorization' }"
                    >Уже регистрировались?
                </router-link>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { defineComponent, reactive, ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    import BaseAgreement from '@/components/agreements/BaseAgreement.vue'
    import useNotificationWithIcon from '@/composables/useNotificationWithIcon'
    import useUsers from '@/composables/useUsers'

    export default defineComponent({
        components: {
            BaseAgreement
        },

        setup() {
            const router = useRouter()

            const modalState = ref(false)

            const formState = reactive({
                email: '',
                password: ''
            })

            const invalidMessage = ref('')

            const users = ref()
            const { getUsers } = useUsers()

            onMounted(async () => (users.value = await getUsers()))

            const onFinish = values => {
                const findUser = users.value.find(user => user.email === values.email)

                if (findUser) {
                    invalidMessage.value = 'Пользователь с таким Email уже существует'
                    useNotificationWithIcon('error', invalidMessage.value)
                    return
                }

                if (values.password.length < 5) {
                    invalidMessage.value = 'Длина пароля должна быть не менее 5 символов'
                    useNotificationWithIcon('error', invalidMessage.value)
                    return
                }

                const postNewUser = async () => {
                    try {
                        await axios.post(
                            'https://6239b76228bcd99f0273a823.mockapi.io/api/v1/users',
                            {
                                firstname: '',
                                middlename: '',
                                lastname: '',
                                email: formState.email,
                                password: formState.password
                            }
                        )
                        invalidMessage.value = 'Вы успешно зарегистрировались! Ожидайте...'
                        useNotificationWithIcon('success', invalidMessage.value)
                        setTimeout(() => router.push({ name: 'authorization' }), 2000)
                    } catch {
                        useNotificationWithIcon(
                            'error',
                            'При выполнении действия произошла ошибка. Попоробуйте снова'
                        )
                    }
                }

                postNewUser()
            }

            return {
                formState,
                modalState,
                onFinish,
                invalidMessage,
                users
            }
        }
    })
</script>

<style lang="scss" scoped>
    .modal-show {
        z-index: 2;
    }

    .show-enter-active,
    .show-leave-active {
        transition: opacity 0.5s ease;
    }

    .show-enter-from,
    .show-leave-to {
        opacity: 0;
    }

    .registration {
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

        &__input-password {
            margin-bottom: 30px;
        }

        &__description {
            margin-bottom: 30px;
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

    .description-block {
        &__description {
            width: 270px;
            font-size: 12px;
        }

        &__link {
            font-size: 12px;
        }
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
