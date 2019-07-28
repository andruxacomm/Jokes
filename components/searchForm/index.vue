<template>
    <form class="searchForm" @submit.prevent="submit(form)">
        <label class="searchForm__label">
            Шутить лучше вместе с Чаком
            <input type="text"
                   class="searchForm__input"
                   placeholder="Начните вводить тут!"
                   v-model="form.search"
                   @input="submit(form)">

            <template v-if="error">
                <span class="searchForm__errorMessage">{{ error }}</span>
            </template>
        </label>

        <btn class="searchForm__submit"
             type="submit">
            Шутить!
        </btn>
    </form>
</template>

<script>
    export default {
        name: "SearchForm",

        props: {
            error: {
                type: String,
                required: true,
            }
        },

        data() {
            return {
                form: {
                    search: null,
                }
            }
        },

        methods: {
            submit(form) {
                this.$emit('submit', form);
            }
        }
    }
</script>

<style lang="scss">
    .searchForm {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 60%;
        padding: 20px;
        margin: 0 auto;

        box-shadow: 0 15px 17px 3px rgba(0,0,0,.15);
        background-color: $white;

        @include below($tablet) {
            max-width: 80%;
        }

        @include below($phone-wide) {
            flex-direction: column;
        }

        @include below($phone) {
            max-width: 100%;
        }

        &__label {
            position: relative;

            display: flex;
            flex-direction: column;
            padding-bottom: 20px;

            text-align: center;

            @include below($phone-wide) {
                margin-bottom: 20px;
            }
        }

        &__label > &__input {
            margin-top: 10px;
        }

        &__input {
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 350px;
            width: 100%;
            height: 40px;
            padding: 0 10px;

            overflow: hidden;
            text-overflow: ellipsis;
        }

        &__errorMessage {
            position: absolute;
            bottom: 0;

            max-width: 100%;
            text-align: left;
            font-size: 12px;
            color: $red;
        }
    }
</style>