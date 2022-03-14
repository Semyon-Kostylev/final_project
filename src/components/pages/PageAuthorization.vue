<template>
  <div class="authorization">

    <div class="authorization__logo logo">
      <span class="logo__name">Logo</span>
    </div>

    <a-form
      :model="formState"
      name="normal_login"
      class="authorization__form login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >

      <h1 class="login-form__title">Вход</h1>

      <a-form-item
        class="login-form__input form-input"
        name="username"
        :rules="[{ required: true, message: 'Введите e-mail' }]"
      >
        <a-input class="form-input__input" v-model:value="formState.username">
        </a-input>
      </a-form-item>

      <a-form-item
        class="login-form__input form-input"
        name="password"
        :rules="[{ required: true, message: 'Введите пароль' }]"
      >
        <a-input-password class="form-input__input" v-model:value="formState.password">
        </a-input-password>
      </a-form-item>

      <a-form-item class="login-form__forget forget-link">
        <router-link :to="{ name: 'restore-password' }">Забыли пароль?</router-link>
      </a-form-item>

      <a-form-item class="login-form__submit submit">
        <a-button type="primary" html-type="submit"
        class="submit__button login-form-button">
          Войти
        </a-button>
      </a-form-item>

      <a-form-item class="login-form__link authorization-link">
        <router-link :to="{ name: 'registration' }">Ещё нет учётной записи?</router-link>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const formState = reactive({
      username: '',
      password: '',
    });

    const router = useRouter();

    const onFinish = () => {
      router.push({ name: 'profile-main' });
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
  border: 1px solid #d9d9d9;
  text-align: center;
  font-size: 13px;
}

.login-form {
  padding: 52px 67px 51px 68px;
  width: 469px;
  border: 1px solid #d9d9d9;

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

  &__link {
    margin: 0 auto;
  }
}

.forget-link {
  width: max-content;
  text-decoration: underline;
}

.submit {
  width: max-content;

  &__button {
    height: 45px;
    width: 175px;
    border-radius: 5px;
    border: none;
  }
}

.authorization-link {
  width: max-content;
  text-decoration: underline;
  color: #4d4d4d;
}

.form-input {
  &__input {
    padding: 5px 20px;
    height: 45px;
    border-radius: 5px;
    border: 1px solid #d9d9d9;
    font-size: 14px;
  }
}
</style>
