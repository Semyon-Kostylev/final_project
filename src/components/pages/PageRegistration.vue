<template>

  <transition name="show">
    <agreement-base class="modal-show" v-if="modalState"
      :modal="modalState" @close-modal="modalClose"
    />
  </transition>

  <div class="registration">
    <div class="registration__logo logo">
      <img class="logo__name" src="@/assets/img/svg/logo-img.svg" alt="Logo">
    </div>

    <a-form novalidate
      :model="formState"
      name="normal_login"
      class="registration__form login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <h1 class="login-form__title">Регистрация</h1>

      <a-form-item
        class="login-form__input form-input"
        name="userEmail"
        :rules="[{ required: true, message: 'Введите e-mail', type: 'email' }]"
      >
        <a-input class="form-input__input" required v-model:value="formState.userEmail">
        </a-input>
        <div class="form-input__placeholder">Email</div>
      </a-form-item>

      <a-form-item
        class="login-form__input login-form__input-password form-input"
        name="password"
        :rules="[{ required: true, message: 'Введите пароль' }]"
      >
        <a-input-password
          class="form-input__input"
          v-model:value="formState.password"
          placeholder="Пароль"
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

      <p class="login-form__invalid" v-if="isInvalid.isActive">{{ isInvalid.message }}</p>

      <a-form-item class="login-form__link authorization-link">
        <router-link :to="{ name: 'authorization' }"
          >Уже регистрировались?</router-link
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import {
  defineComponent, reactive, ref,
} from 'vue';
import { useRouter } from 'vue-router';
import AgreementBase from '@/components/agreements/AgreementBase.vue';
import users from '@/data/users';

export default defineComponent({
  components: {
    AgreementBase,
  },

  setup() {
    const router = useRouter();
    // Модалка
    const modalState = ref(false);
    // eslint-disable-next-line no-return-assign
    const modalOpen = () => modalState.value = true;
    // eslint-disable-next-line no-return-assign
    const modalClose = () => modalState.value = false;

    // Данные форм
    const formState = reactive({
      userEmail: '',
      password: '',
    });

    const isInvalid = reactive({
      isActive: false,
      message: '',
    });

    // Методы регистрации
    const onFinish = (values) => {
      isInvalid.isActive = true;

      if (!values.userEmail.includes('@')) {
        isInvalid.message = 'Email должен содержать символ @';
        return;
      }

      const findUser = users.find((user) => user.userEmail === values.userEmail);

      if (findUser) {
        isInvalid.message = 'Пользователь с таким Email уже существует';
        return;
      }

      if (values.password.length < 5) {
        isInvalid.message = 'Длина пароля должна быть не менее 5 символов';
        return;
      }

      document.querySelector('.login-form__invalid').style.color = 'green';
      isInvalid.message = 'Вы успешно зарегистрировались! Ожидайте...';

      users.push(values);
      console.log(users);

      setTimeout(() => router.push({ name: 'authorization' }), 2000);
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    return {
      formState,
      isInvalid,
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
    color: $grey-color;
    font-size: 12px;
  }

  &__link {
    color: $grey-color;
    text-decoration: underline;
  }
}

.submit {
  width: max-content;

  &__button {
    height: 45px;
    width: 175px;
    border-radius: 5px;
    background-color: $black-color;
    border: none;
  }
}

.authorization-link {
  width: max-content;
  text-decoration: underline;
  color: $dark-grey-color;
}

.form-input {
  position: relative;
  &__input {
    padding: 5px 20px;
    height: 45px;
    border-radius: 5px;
    border: 1px solid $main-border-color;
    font-size: 14px;

    &:focus + .form-input__placeholder {
      font-size: 12px;
      transform: translate(20px, -55px);
    }

    &:valid + .form-input__placeholder {
      font-size: 12px;
      transform: translate(20px, -55px);
    }
  }

  .form-input__placeholder {
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
