<template>
    <div class="agreement">
        <div v-click-outside="onClickOutside" class="agreement__modal modal">
            <button @click="$emit('close-modal')" class="modal__close">×</button>
            <h1 class="modal__title">Пользовательское соглашение</h1>
            <div class="modal__content content">
                <p>
                    Настоящая Политика конфиденциальности персональных данных (далее – Политика
                    конфиденциальности) действует в отношении всей информации, которую сайт
                    «IDPowers.com», расположенный на доменном имени https://www.idpowers.com/, может
                    получить о Пользователе во время использования сайта.
                </p>

                <p>1. ОПРЕДЕЛЕНИЕ ТЕРМИНОВ</p>

                <p>1.1 В настоящей Политике конфиденциальности используются следующие термины:</p>

                <p>
                    1.1.1. «Администрация сайта (далее – Администрация сайта)» – уполномоченные
                    сотрудники на управления сайтом, действующие от имени ООО “Смарт Технолоджис”,
                    которые организуют и (или) осуществляет обработку персональных данных, а также
                    определяет цели обработки персональных данных, состав персональных данных,
                    подлежащих обработке, действия (операции), совершаемые с персональными данными.
                </p>

                <p>
                    1.1.2. «Персональные данные» — любая информация, относящаяся к прямо или
                    косвенно определенному или определяемому физическому лицу (субъекту персональных
                    данных).
                </p>

                <p>
                    1.1.3. «Обработка персональных данных» — любое действие (операция) или
                    совокупность действий (операций), совершаемых с использованием средств
                    автоматизации или без использования таких средств с персональными данными,
                    включая сбор, запись, систематизацию, накопление, хранение, уточнение
                    (обновление, изменение), извлечение, использование, передачу (распространение,
                    предоставление, доступ), обезличивание, блокирование, удаление, уничтожение
                    персональных данных.
                </p>
            </div>
            <a-button
                type="primary"
                html-type="button"
                @click="$emit('close-modal')"
                class="modal__button btn-black"
            >
                Понятно
            </a-button>
        </div>
    </div>
</template>

<script>
import vClickOutside from 'click-outside-vue3'

export default {
    props: {
        modal: Boolean
    },

    emits: ['close-modal'],

    directives: {
        clickOutside: vClickOutside.directive
    },

    setup(props, { emit }) {
        const onClickOutside = () => {
            emit('close-modal')
        }

        return {
            onClickOutside
        }
    }
}
</script>

<style lang="scss" scoped>
.agreement {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100vh;
    padding: 100px 30px;
    background-color: $gray-bg-color;
    z-index: 1;
}

.modal {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 47px 43px 30px 37px;
    width: 906px;
    height: 100%;
    margin: 0 auto;
    background-color: $main-bg-color;

    &__close {
        position: absolute;
        top: 8px;
        right: 19px;
        padding: 0;
        margin: 0;
        border: none;
        font-size: 35px;
        line-height: normal;
        color: $black-color;
        background-color: inherit;
        cursor: pointer;
    }

    &__title {
        margin-bottom: 30px;
        font-weight: 700;
        color: $dark-black-color;
        text-align: center;
    }

    &__content {
        margin-bottom: 39px;
        color: $black-color;
        text-align: left;
        line-height: 25px;

        & p {
            margin-bottom: 15px;
        }
    }

    &__button {
        margin: auto auto 0;
        width: 204px;
        height: 45px;
        border-radius: 5px;
        font-weight: 700;
        line-height: normal;
    }
}
</style>
