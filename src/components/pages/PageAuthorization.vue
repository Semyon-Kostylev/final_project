<template>
  <div class="authorization">

    <div class="authorization__logo logo">
      <img class="logo__name" src="@/assets/img/svg/logo-img.svg" alt="Logo">
    </div>

    <a-form novalidate
      :model="formState"
      name="normal_login"
      class="authorization__form login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >

      <h1 class="login-form__title">Вход</h1>

      <a-form-item
        class="login-form__input form-input"
        name="userEmail"
        :rules="[{ required: true, message: 'Введите e-mail', type: 'email' }]"
      >
        <a-input class="form-input__input input-base" required v-model:value="formState.userEmail">
        </a-input>
        <div class="form-input__placeholder">Email</div>
      </a-form-item>

      <a-form-item
        class="login-form__input form-input"
        name="password"
        :rules="[{ required: true, message: 'Введите пароль' }]"
      >
        <a-input-password
        class="form-input__input input-base"
        v-model:value="formState.password"
        placeholder="Пароль"
        >
        </a-input-password>
      </a-form-item>

      <a-form-item class="login-form__forget forget-link">
        <router-link class="link-black"
          :to="{ name: 'forget-password' }"
        >
          Забыли пароль?
        </router-link>
      </a-form-item>

      <a-form-item class="login-form__submit submit">
        <a-button type="primary" html-type="submit"
        class="submit__button login-form-button btn-black">
          Войти
        </a-button>
      </a-form-item>

      <p class="login-form__invalid" v-if="isInvalid">Неверный Email или пароль</p>

      <a-form-item class="login-form__link authorization-link">
        <router-link class="link-black"
          :to="{ name: 'registration' }"
        >
          Ещё нет учётной записи?
        </router-link>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import users from '@/data/users';

export default defineComponent({
  setup() {
    const router = useRouter();

    const formState = reactive({
      userEmail: '',
      password: '',
    });

    const isInvalid = ref(false);

    const onFinish = (values) => {
      // eslint-disable-next-line max-len
      const findUser = users.find((user) => user.userEmail === values.userEmail && user.password === values.password);
      // eslint-disable-next-line no-unused-expressions
      findUser ? router.push({ name: 'user' }) : isInvalid.value = true;
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    return {
      formState,
      isInvalid,
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

  &__placeholder {
    position: absolute;
    padding: 1px;
    cursor: text;
    transform: translate(20px, -34px);
    transition: all 0.3s;
    color: gray;
    background-color: $main-bg-color;
    z-index: 1;
  }
}
</style>
