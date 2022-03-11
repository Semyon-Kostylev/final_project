/* eslint-disable max-len */
<template>
  <base-agreement v-if="modalState" :modal="modalState" @close-modal="modalClose"/>
  <div class="registration">
    <div class="registration__logo logo">
      <span class="logo__name">Logo</span>
    </div>

    <a-form
      :model="formState"
      name="normal_login"
      class="registration__form login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <h1 class="login-form__title">Регистрация</h1>

      <a-form-item
        class="login-form__input form-input"
        name="username"
        :rules="[{ required: true, message: 'Введите e-mail' }]"
      >
        <a-input class="form-input__input" v-model:value="formState.username">
        </a-input>
      </a-form-item>

      <a-form-item
        class="login-form__input login-form__input-password form-input"
        name="password"
        :rules="[{ required: true, message: 'Введите пароль' }]"
      >
        <a-input-password
          class="form-input__input"
          v-model:value="formState.password"
        >
        </a-input-password>
      </a-form-item>

      <a-form-item class="login-form__description description-block">
        <p class="description-block__description">
          Регистрируясь вы соглашаетесь с&nbsp;<a
            @click.prevent="modalOpen"
            class="description-block__link"
            href="#"
            >Пользовательским соглашением</a
          >&nbsp;и&nbsp;<a class="description-block__link"
            @click.prevent="modalOpen"
            href="#"
            >Условиями обработки персональных данных</a
          >
        </p>
      </a-form-item>

      <a-form-item class="login-form__submit submit">
        <a-button
          type="primary"
          html-type="submit"
          class="submit__button login-form-button"
        >
          Зарегистрироваться
        </a-button>
      </a-form-item>

      <a-form-item class="login-form__link authorization-link">
        <router-link :to="{ name: 'authorization' }"
          >Уже регистрировались?</router-link
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
import BaseAgreement from '@/components/BaseAgreement.vue';

export default defineComponent({
  components: {
    BaseAgreement,
  },

  setup() {
    const formState = reactive({
      username: '',
      password: '',
    });

    const modalState = ref(false);

    // eslint-disable-next-line no-return-assign
    const modalOpen = () => modalState.value = true;

    // eslint-disable-next-line no-return-assign
    const modalClose = () => modalState.value = false;

    const onFinish = (values) => {
      console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    return {
      formState,
      modalState,
      modalOpen,
      modalClose,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>

<style lang="scss" scoped>
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

  &__input-password {
    margin-bottom: 30px;
  }

  &__description {
    margin-bottom: 30px;
  }

  &__submit {
    margin: 0 auto 20px;
  }

  &__link {
    margin: 0 auto;
  }
}

.description-block {
  &__description {
    width: 270px;
    color: #666666;
    font-size: 12px;
  }

  &__link {
    color: #666666;
    text-decoration: underline;
  }
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
