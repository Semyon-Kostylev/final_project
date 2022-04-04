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
                <a-form-item class="form__input form-input" name="userSurname">
                    <a-input
                        class="form-input__input input-base"
                        v-model:value="formState.userSurname"
                    >
                    </a-input>
                    <div
                        class="form-input__placeholder"
                        :class="{ 'input-base__valid': formState.userSurname }"
                    >
                        Фамилия
                    </div>
                </a-form-item>

                <a-form-item class="form__input form-input" name="userFirstname">
                    <a-input
                        class="form-input__input input-base"
                        v-model:value="formState.userFirstname"
                    >
                    </a-input>
                    <div
                        class="form-input__placeholder"
                        :class="{ 'input-base__valid': formState.userFirstname }"
                    >
                        Имя
                    </div>
                </a-form-item>

                <a-form-item class="form__input form__input-last form-input" name="userSecondname">
                    <a-input
                        class="form-input__input input-base"
                        v-model:value="formState.userSecondname"
                    >
                    </a-input>
                    <div
                        class="form-input__placeholder"
                        :class="{ 'input-base__valid': formState.userSecondname }"
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
import users from '@/data/users'

export default defineComponent({
    setup() {
        const formState = reactive({
            userSurname: users[0].userSurname,
            userFirstname: users[0].userFirstname,
            userSecondname: users[0].userSecondname
        })

        const onFinish = () => {
            if (formState.userSurname) {
                users[0].userSurname = formState.userSurname
            }

            if (formState.userFirstname) {
                users[0].userFirstname = formState.userFirstname
            }

            if (formState.userSecondname) {
                users[0].userSecondname = formState.userSecondname
            }

            alert('Данные успешно обновлены')
        }

        return {
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
