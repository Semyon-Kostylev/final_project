<template>
  <div class="edit-password">

    <h1 class="edit-password__title">Изменение пароля</h1>

      <a-form
        class="edit-password__form form"
        :model="formState"
        name="password"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          class="login-form__input form-input"
          name="oldPassword"
          :rules="[{ required: true, message: 'Введите текущий пароль' }]"
        >
          <a-input-password
            class="form-input__input input-base"
            placeholder="Текущий пароль"
            v-model:value="formState.oldPassword"
          >
          </a-input-password>
        </a-form-item>

        <a-form-item
          class="login-form__input form-input"
          name="newPassword"
          :rules="[{ required: true, message: 'Введите новый пароль' }]"
        >
          <a-input-password
            class="form-input__input input-base"
            placeholder="Новый пароль"
            v-model:value="formState.newPassword"
          >
          </a-input-password>
        </a-form-item>

        <a-form-item
          class="login-form__input login-form__input-last form-input"
          name="repeatNewPassword"
          :rules="[{ required: true, message: 'Повторите новый пароль' }]"
        >
          <a-input-password
            class="form-input__input input-base"
            placeholder="Повторите новый пароль"
            v-model:value="formState.repeatNewPassword"
          >
          </a-input-password>
        </a-form-item>

        <a-form-item class="form__submit submit">
          <a-button
            class="submit__button login-form-button btn-black"
            type="primary"
            html-type="submit"
          >
            Сохранить
          </a-button>
        </a-form-item>

        <p class="form__message">{{ formState.formMessage }}</p>

      </a-form>
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue';
import users from '@/data/users';

export default defineComponent({

  setup() {
    const formState = reactive({
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: '',
      formMessage: '',
    });

    const onFinish = () => {
      if (formState.oldPassword !== users[0].password) {
        formState.formMessage = 'Вы ввели неверный текущий пароль';
        return;
      }

      if (formState.oldPassword === formState.newPassword) {
        formState.formMessage = 'Текущий пароль и новый пароль не должны совпадать';
        return;
      }

      if (formState.newPassword.length < 5) {
        formState.formMessage = 'Длина нового пароля должна быть не менее 5 символов';
        return;
      }

      if (formState.newPassword !== formState.repeatNewPassword) {
        formState.formMessage = 'Вы ввели два разных новых пароля';
        return;
      }

      document.querySelector('.form__message').style.color = 'green';

      formState.formMessage = 'Пароль успешно изменён!';
      users[0].password = formState.newPassword;
      console.log(users[0]);
    };

    const onFinishFailed = () => {
      console.log('no');
    };

    return {
      formState,
      onFinish,
      onFinishFailed,
    };
  },
});
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

    &__message {
      color: red;
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
