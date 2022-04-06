<template>
    <div class="edit-user">
        <h1 class="edit-user__title">Мой профиль</h1>

        <div class="edit-user__wrapper">
            <a-form
                :model="formState"
                name="nest-messages"
                class="edit-user__form form"
                @finish="onFinish"
            >
                <a-form-item class="form__input form-input" name="firstname">
                    <a-input
                        class="form-input__input input-base"
                        v-model:value="formState.lastname"
                    >
                    </a-input>
                    <div
                        class="form-input__placeholder"
                        :class="{ 'input-base__valid': formState.lastname }"
                    >
                        Фамилия
                    </div>
                </a-form-item>

                <a-form-item class="form__input form-input" name="middlename">
                    <a-input
                        class="form-input__input input-base"
                        v-model:value="formState.firstname"
                    >
                    </a-input>
                    <div
                        class="form-input__placeholder"
                        :class="{ 'input-base__valid': formState.firstname }"
                    >
                        Имя
                    </div>
                </a-form-item>

                <a-form-item class="form__input form__input-last form-input" name="lastname">
                    <a-input
                        class="form-input__input input-base"
                        v-model:value="formState.middlename"
                    >
                    </a-input>
                    <div
                        class="form-input__placeholder"
                        :class="{ 'input-base__valid': formState.middlename }"
                    >
                        Отчество
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

            <div class="edit-user__photo photo">
                <img
                    class="photo__image"
                    src="@/assets/img/svg/user-photo.svg"
                    alt="@/assets/img/svg/user-photo.svg"
                />
                <a class="photo__link link-black" href="#">Изменить</a>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, reactive } from 'vue'
import axios from 'axios'
import openNotificationWithIcon from '@/composables/openNotificationWithIcon'

export default defineComponent({
    setup() {
        const currentUser = reactive(JSON.parse(localStorage['currentUser']))

        const formState = reactive({
            firstname: currentUser.firstname,
            middlename: currentUser.middlename,
            lastname: currentUser.lastname
        })

        const onFinish = () => {
            if (
                currentUser.firstname === formState.firstname &&
                currentUser.middlename === formState.middlename &&
                currentUser.lastname === formState.lastname
            ) {
                return
            }

            if (formState.firstname) {
                currentUser.firstname = formState.firstname
            }

            if (formState.middlename) {
                currentUser.middlename = formState.middlename
            }

            if (formState.lastname) {
                currentUser.lastname = formState.lastname
            }

            axios
                .put(
                    `https://6239b76228bcd99f0273a823.mockapi.io/api/v1/users/${+currentUser.id}`,
                    {
                        firstname: currentUser.firstname,
                        middlename: currentUser.middlename,
                        lastname: currentUser.lastname
                    }
                )
                .then(() => {
                    localStorage.setItem('currentUser', JSON.stringify(currentUser))
                    openNotificationWithIcon('success', 'Данные успешно изменены! Ожидайте...')
                    setTimeout(() => location.reload(), 2000)
                })
                .catch(() => {
                    console.log('ошибка')
                })
        }

        return {
            currentUser,
            formState,
            onFinish
        }
    }
})
</script>

<style lang="scss" scoped>
.edit-user {
    width: 541px;

    &__title {
        margin-bottom: 40px;
        font-size: 30px;
        font-weight: 700;
        line-height: normal;
        color: $black-color;
    }

    &__wrapper {
        display: flex;
        justify-content: space-between;
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

.form-input {
    position: relative;
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
