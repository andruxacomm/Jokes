<template>
    <div class="randomJoke">
        <div class="randomJoke__head">
            <template v-if="item.icon_url">
                <img :src="item.icon_url"
                     :alt="item.url"
                     class="randomJoke__icon">
            </template>

            <template v-if="item.updated_at">
                <p class="randomJoke__date">{{ parseDate(item.updated_at) }}</p>
            </template>

            <select name="type"
                    class="randomJoke__select"
                    v-model="value"
                    @change="change(value)">
                <option v-for="(item, index) in categories"
                        :key="index"
                        :value="item.value">
                    {{ item.name }}
                </option>
            </select>
        </div>

        <template v-if="item.value">
            <p class="randomJoke__text">
                {{ item.value }}
            </p>
        </template>

        <template v-if="item.url">
            <a :href="item.url"
               class="randomJoke__link"
               target="_blank"></a>
        </template>
    </div>
</template>

<script>
    import date from '../../mixins/date';

    export default {
        name: "RandomJoke",

        mixins: [
            date,
        ],

        mounted() {
            if (this.$route.query.hasOwnProperty('category') && this.$route.query.category !== '') {
                this.categories.forEach(item => {
                    if (item.value === this.$route.query.category) {
                        this.$set(this, 'value', item.value);
                    }
                })
            } else {
                this.$set(this, 'value', this.categories[0].value);
            }
        },

        data() {
            return {
                value: null,
            }
        },

        props: {
            item: {
                type: Object,
                required: true,
            },

            categories: {
                type: Array,
                required: true,
            }
        },

        methods: {
            change(e) {
                this.$emit('change', e);
            }
        }
    }
</script>

<style lang="scss">
    .randomJoke {
        &__head {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 20px;

            @include below($phone-wide) {
                flex-direction: column-reverse;
                align-items: flex-start;
            }
        }

        &__icon {
            display: block;
            width: auto;
            height: auto;
            margin-right: 20px;
        }

        &__date {
            font-size: 14px;
            font-weight: 300;
        }

        &__select {
            margin-left: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 350px;
            width: 100%;
            height: 40px;
            padding: 0 10px;

            overflow: hidden;
            text-overflow: ellipsis;

            @include below($phone-wide) {
                margin-left: 0;
                margin-bottom: 10px;
            }
        }
    }
</style>