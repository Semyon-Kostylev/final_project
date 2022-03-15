<template>
  <div class="edit-password">

    <h1 class="edit-password__title">Изменение пароля</h1>

      <a-form
        :model="formState"
        name="password"
        class="edit-password__form form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          class="login-form__input form-input"
          name="old-password"
          :rules="[{ required: true, message: 'Введите текущий пароль' }]"
        >
          <a-input-password
            class="form-input__input"
            v-model:value="formState.oldPassword"
          >
          </a-input-password>
        </a-form-item>

        <a-form-item
          class="login-form__input form-input"
          name="new-password"
          :rules="[{ required: true, message: 'Введите новый пароль' }]"
        >
          <a-input-password
            class="form-input__input"
            v-model:value="formState.newPassword"
          >
          </a-input-password>
        </a-form-item>

        <a-form-item
          class="login-form__input login-form__input-last form-input"
          name="repeat-new-password"
          :rules="[{ required: true, message: 'Повторите новый пароль' }]"
        >
          <a-input-password
            class="form-input__input"
            v-model:value="formState.repeatNewPassword"
          >
          </a-input-password>
        </a-form-item>

        <a-form-item class="form__submit submit">
          <a-button
            type="primary"
            html-type="submit"
            class="submit__button login-form-button"
          >
            Сохранить
          </a-button>
        </a-form-item>

      </a-form>
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({

  setup() {
    const formState = reactive({
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    });

    const onFinish = (values) => {
      console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
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
  }

  .submit {
    &__button {
      width: 110px;
      height: 45px;
    }
  }

  .form-input {
    &__input {
      padding: 5px 20px;
      height: 45px;
      border-radius: 5px;
      border: 1px solid $main-border-color;
      font-size: 14px;
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
      font-size: 14px;
      text-decoration: underline;
      text-align: center;
      line-height: normal;
      color: $dark-grey-color;
    }

  }
</style>
