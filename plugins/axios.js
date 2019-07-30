export default function ({$axios, redirect, route, error}) {
    $axios.onError(err => {
        const code = parseInt(err.response.status);

        if (code === 404) {
            redirect('/error');
        }

        if (code === 400) {
            console.log(err);
        }
    });
}