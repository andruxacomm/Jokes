<template>

    <div class="jokesView">
        <template v-if="items.length > 0">
            <ul>
                <li class="jokesView__item"
                    v-for="item in items"
                    :key="item.id">
                    <div class="jokesView__head">
                        <template v-if="item.icon_url">
                            <img :src="item.icon_url"
                                 :alt="item.url"
                                 class="jokesView__icon">
                        </template>

                        <template v-if="item.updated_at">
                            <p class="jokesView__date">{{ parseDate(item.updated_at) }}</p>
                        </template>
                    </div>

                    <template v-if="item.value">
                        <p class="jokesView__text">
                            {{ item.value }}
                        </p>
                    </template>

                    <template v-if="item.url">
                        <a :href="item.url"
                           class="jokesView__link"
                           target="_blank"></a>
                    </template>
                </li>
            </ul>
        </template>

        <template v-else>
            <p class="jokesView__emptyText">Упс..</p>
        </template>
    </div>
</template>

<script>
    import date from '../../mixins/date'

    export default {
        name: "JokesView",

        mixins: [
            date,
        ],

        props: {
            items: {
                type: Array,
                required: true,
            }
        },
    }
</script>

<style lang="scss">
    .jokesView {
        &__item {
            position: relative;

            margin-bottom: 40px;
            padding-bottom: 20px;

            list-style: none;
            border-bottom: 1px solid $light-gray;

            &:last-child {
                margin-bottom: 0;
                padding-bottom: 0;
                border-bottom: 0;
            }
        }

        &__link {
            position: absolute;
            left: 0;
            top: 0;

            width: 100%;
            height: 100%;

            vertical-align: middle;
        }

        &__head {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 20px;
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

        &__emptyText {
            font-size: 28px;
            font-weight: 400;
        }
    }
</style>