<template>
  <div class="forget-password">

    <div class="forget-password__logo logo">
      <span class="logo__name">Logo</span>
    </div>

    <a-form
      :model="formState"
      name="normal_login"
      class="forget-password__form login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >

      <h1 class="login-form__title">Восстановление пароля</h1>

      <p class="login-form__description description">
        Для восстановления пароля введите номер телефона,
        который был указан при регистрации
      </p>

      <a-form-item
        class="login-form__input form-input"
        name="username"
        :rules="[{ required: true, message: 'Введите e-mail' }]"
      >
        <a-input class="form-input__input" v-model:value="formState.username">
        </a-input>
      </a-form-item>

      <a-form-item class="login-form__submit submit">
        <a-button type="primary" html-type="submit"
        class="submit__button login-form-button">
          Сбросить пароль
        </a-button>
      </a-form-item>

      <a-form-item class="login-form__link forget-password-link">
        <router-link :to="{ name: 'authorization' }">Вернуться</router-link>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const formState = reactive({
      username: '',
      password: '',
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

  &__button {
    height: 45px;
    width: 154px;
    border-radius: 5px;
    border: none;
  }
}

.forget-password-link {
  width: max-content;
  text-decoration: underline;
  color: $dark-grey-color;
}

.form-input {
  width: 334px;
  &__input {
    padding: 5px 20px;
    height: 45px;
    border-radius: 5px;
    border: 1px solid $main-border-color;
    font-size: 14px;
  }
}
</style>
