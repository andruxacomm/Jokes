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
            if (query.hasOwnProperty('search') && query.search !== '') {
                await store.dispatch('jokes/getData', `query=${query.search}`);
                return;
            }

            let category = '';
            if (query.hasOwnProperty('category') && query.category !== '') {
                category = `category=${query.category}`
            }

            await store.dispatch('jokes/getRandom', category);
        },

        methods: {
            async search(e) {
                if (e.hasOwnProperty('search') && e.search !== '') {
                    await this.$store.dispatch('jokes/getData', `query=${e.search}`);

                    this.pushQuery(e);
                } else {
                    this.$router.push({query: {}});
                    await this.$store.dispatch('jokes/getRandom');
                    this.$store.commit('jokes/setJokes', null);
                }
            },

            async changeCategory(e) {
                if (e !== '') {
                    await this.$store.dispatch('jokes/getRandom', `category=${e}`);
                    this.pushQuery({category: e});
                } else {
                    this.$router.push({query: {}});
                }

            },

            pushQuery(pushedQuery) {
                this.$router.push({query: pushedQuery});
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
