<template>
    <div class="home">
        <div class="container">
            <search-form class="home__searchForm"
                         :error="error"
                         @submit="search($event)"/>

            <template v-if="jokes">
                <jokes-view class="home__jokesView"
                            :items="jokes"/>
            </template>

            <template v-else-if="randomJoke">
                <random-joke class="home__randomJoke"
                             :categories="categories"
                             @change="changeCategory($event)"
                             :item="randomJoke"/>
            </template>
        </div>
    </div>
</template>

<script>
    import SearchForm from '../components/searchForm/index'
    import JokesView from '../components/jokesView/index'
    import RandomJoke from '../components/randomJoke/index'

    export default {
        components: {
            SearchForm,
            JokesView,
            RandomJoke,
        },

        async asyncData({store, query, app}) {
            if (query.hasOwnProperty('q') && query.q !== '') {
                await store.dispatch('jokes/getData', `query=${query.q}`);
            } else {
                let category = '';

                if (query.hasOwnProperty('category') && query.category !== '') {
                    category = `category=${query.category}`
                }

                await store.dispatch('jokes/getRandom', category);
            }
        },

        methods: {
            async search(e) {
                if (e.hasOwnProperty('search')) {
                    await this.$store.dispatch('jokes/getData', `query=${e.search}`);

                    this.$router.push({query: {q: e.search}});
                }
            },

            async changeCategory(e) {
                await this.$store.dispatch('jokes/getRandom', `category=${e}`);

                this.$router.push({query: {category: e}});
            },

            mergeQuery() {

            }
        },

        computed: {
            jokes() {
                return this.$store.getters['jokes/getJokes'];
            },

            error() {
                return this.$store.getters['jokes/getError'];
            },

            randomJoke() {
                return this.$store.getters['jokes/getRandomJoke'];
            },

            categories() {
                return this.$store.getters['jokes/getCategories'];
            }
        }
    }
</script>

<style lang="scss">
    .home {
        padding: 50px 0;

        &__searchForm {
            margin-bottom: 40px;
        }
    }
</style>
