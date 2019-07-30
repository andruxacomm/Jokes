export const state = () => ({
    jokes: null,
    total: null,
    error: '',
    randomJoke: null,
    categories: null,
});

export const getters = {
    getJokes(state) {
        return state.jokes;
    },

    getTotal(state) {
        return state.total;
    },

    getError(state) {
        return state.error;
    },

    getRandomJoke(state) {
        return state.randomJoke;
    },

    getCategories(state) {
        return state.categories;
    }
};

export const mutations = {
    setJokes(state, data) {
        state.jokes = data;
    },

    setTotal(state, data) {
        state.total = data;
    },

    setError(state, data) {
        state.error = data;
    },

    setRandomJoke(state, data) {
        state.randomJoke = data;
    },

    setCategories(state, data) {
        state.categories = data;
    }
};


export const actions = {
    async getData(context, query) {
        await this.$axios.get(`jokes/search?${query}`)
            .then(async response => {
                if (response.data.total > 0) {
                    context.commit('setError', '');
                    context.commit('setJokes', response.data.result);
                    context.commit('setTotal', response.data.total);
                } else {
                    context.commit('setJokes', response.data.result);
                    context.commit('setTotal', null);
                }

            })
            .catch(error => {
                if (error.response && error.response.status === 400 && error.response.data.hasOwnProperty('violations') && error.response.data.violations.hasOwnProperty('search.query')) {
                    context.commit('setError', error.response.data.violations['search.query']);
                }
            });
    },

    async getRandom(context, query = '') {

        await this.$axios.get('jokes/categories')
            .then(response => {
                let categories = [
                    {
                        name: 'Ничего не выбрано',
                        value: ''
                    }
                ];

                response.data.forEach(item => {
                    categories.push({
                        name: item,
                        value: item,
                    })
                });

                context.commit('setCategories', categories)
            });


        await this.$axios.get(`jokes/random?${query}`)
            .then(response => {
                context.commit('setRandomJoke', response.data);
            });
    }
};

