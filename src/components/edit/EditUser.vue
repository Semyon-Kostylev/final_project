<template>
  <div class="edit-user">

    <h1 class="edit-user__title">Мой профиль</h1>

    <div class="edit-user__wrapper">

      <a-form novalidate
        :model="formState"
        name="nest-messages"
        class="edit-user__form form"
        @finish="onFinish"
      >
        <a-form-item
          class="form__input form-input"
          name="user-surname"
        >
          <a-input class="form-input__input"
            required
            v-model:value="formState.userSurname">
          </a-input>
          <div class="form-input__placeholder">Фамилия</div>
        </a-form-item>

        <a-form-item
          class="form__input form-input"
          name="user-firstname"
        >
          <a-input
            class="form-input__input"
            required
            v-model:value="formState.userFirstname"
          >
          </a-input>
          <div class="form-input__placeholder">Имя</div>
        </a-form-item>

        <a-form-item
          class="form__input form__input-last form-input"
          name="user-secondname"
        >
          <a-input
            class="form-input__input"
            required
            v-model:value="formState.userSecondname"
          >
          </a-input>
          <div class="form-input__placeholder">Отчество</div>
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

      <div class="edit-user__photo photo">
        <img class="photo__image"
          src="@/assets/img/svg/user-photo.svg"
          alt="@/assets/img/svg/user-photo.svg"
        >
        <a class="photo__link" href="#">Изменить</a>
      </div>

    </div>
    <router-link :to="{ name: 'password' }">Изменить пароль</router-link>
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({

  setup() {
    const formState = reactive({
      userSurname: '',
      userFirstname: '',
      userSecondname: '',
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

  .submit {
    &__button {
      width: 110px;
      height: 45px;
      border: none;
      border-radius: 5px;
      background-color: $black-color;
    }
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
