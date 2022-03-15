<template>
  <div class="edit-user">

    <h1 class="edit-user__title">Мой профиль</h1>

    <div class="edit-user__wrapper">

      <a-form
        :model="formState"
        name="user-info"
        class="edit-user__form form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          class="form__input form-input"
          name="user-surname"
          :rules="[{ required: true, message: 'Введите фамилию' }]"
        >
          <a-input class="form-input__input"
            v-model:value="formState.userSurname">
          </a-input>
        </a-form-item>

        <a-form-item
          class="form__input form-input"
          name="user-firstname"
          :rules="[{ required: true, message: 'Введите имя' }]"
        >
          <a-input
            class="form-input__input"
            v-model:value="formState.userFirstname"
          >
          </a-input>
        </a-form-item>

        <a-form-item
          class="form__input form__input-last form-input"
          name="user-secondname"
          :rules="[{ required: true, message: 'Введите отчество' }]"
        >
          <a-input
            class="form-input__input"
            v-model:value="formState.userSecondname"
          >
          </a-input>
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
        <div class="photo__image">Фотография пользователя</div>
        <a class="photo__link" href="#">Изменить</a>
      </div>

    </div>
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
