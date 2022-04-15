<template>
    <div class="edit-password">
        <h1 class="edit-password__title">Изменение пароля</h1>

        <a-form
            class="edit-password__form form"
            :model="formState"
            name="password"
            @finish="onFinish"
        >
            <a-form-item
                class="form__input form-input"
                name="oldPassword"
                :rules="[{ required: true, message: 'Введите текущий пароль' }]"
            >
                <a-input-password
                    class="form-input__input input-base"
                    v-model:value="formState.oldPassword"
                >
                </a-input-password>
                <div
                    class="form-input__placeholder"
                    :class="{ 'input-base__valid': formState.oldPassword }"
                >
                    Текущий пароль
                </div>
            </a-form-item>

            <a-form-item
                class="form__input form-input"
                name="newPassword"
                :rules="[{ required: true, message: 'Введите новый пароль' }]"
            >
                <a-input-password
                    class="form-input__input input-base"
                    v-model:value="formState.newPassword"
                >
                </a-input-password>
                <div
                    class="form-input__placeholder"
                    :class="{ 'input-base__valid': formState.newPassword }"
                >
                    Новый пароль
                </div>
            </a-form-item>

            <a-form-item
                class="form__input form__input-last form-input"
                name="repeatNewPassword"
                :rules="[{ required: true, message: 'Повторите новый пароль' }]"
            >
                <a-input-password
                    class="form-input__input input-base"
                    v-model:value="formState.repeatNewPassword"
                >
                </a-input-password>
                <div
                    class="form-input__placeholder"
                    :class="{ 'input-base__valid': formState.repeatNewPassword }"
                >
                    Повторите новый пароль
                </div>
            </a-form-item>

            <a-form-item class="form__submit submit">
                <a-button
                    class="submit__button login-form-button btn"
                    type="primary"
                    html-type="submit"
                >
                    Сохранить
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { defineComponent, reactive } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    import openNotificationWithIcon from '@/composables/openNotificationWithIcon'

    export default defineComponent({
        setup() {
            const router = useRouter()
            const currentUser = reactive(JSON.parse(localStorage['currentUser']))

            if (!currentUser) {
                router.push({ name: 'authorization' })
            }

            const formState = reactive({
                oldPassword: '',
                newPassword: '',
                repeatNewPassword: '',
                formMessage: ''
            })

            const onFinish = () => {
                if (formState.oldPassword !== currentUser.password) {
                    formState.formMessage = 'Вы ввели неверный текущий пароль'
                    openNotificationWithIcon('error', formState.formMessage)
                    return
                }

                if (formState.oldPassword === formState.newPassword) {
                    formState.formMessage = 'Текущий пароль и новый пароль не должны совпадать'
                    openNotificationWithIcon('error', formState.formMessage)
                    return
                }

                if (formState.newPassword.length < 5) {
                    formState.formMessage = 'Длина нового пароля должна быть не менее 5 символов'
                    openNotificationWithIcon('error', formState.formMessage)
                    return
                }

                if (formState.newPassword !== formState.repeatNewPassword) {
                    formState.formMessage = 'Вы ввели два разных новых пароля'
                    openNotificationWithIcon('error', formState.formMessage)
                    return
                }

                currentUser.password = formState.repeatNewPassword

                axios
                    .put(
                        `https://6239b76228bcd99f0273a823.mockapi.io/api/v1/users/${+currentUser.id}`,
                        {
                            password: currentUser.password
                        }
                    )
                    .then(() => {
                        localStorage.setItem('currentUser', JSON.stringify(currentUser))
                        formState.formMessage = 'Пароль успешно изменён!'
                        openNotificationWithIcon('success', formState.formMessage)
                        formState.oldPassword = ''
                        formState.newPassword = ''
                        formState.repeatNewPassword = ''
                    })
                    .catch()
            }

            return {
                formState,
                onFinish,
                currentUser
            }
        }
    })
</script>

<style lang="scss" scoped>
    .edit-password {
        width: 541px;

        &__title {
            margin-bottom: 40px;
            font-size: 30px;
            font-weight: 700;
            line-height: normal;
            color: $black-color;
        }
    }

    .form {
        width: 324px;

        &__input {
            margin-bottom: 15px;
        }

        &__input-last {
            margin-bottom: 20px;
        }
    }

    .photo {
        display: flex;
        flex-direction: column;

        &__image {
            width: 183px;
            height: 171px;
            border: 1px solid $main-border-color;
            margin-bottom: 9px;
        }

        &__link {
            align-self: center;
            width: max-content;
            text-align: center;
        }
    }
</style>
