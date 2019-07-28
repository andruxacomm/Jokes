export default {
    methods: {
        parseDate(date){
            date = new Date(date);

            return (date.getDate().toString().length === 1 ? '0' : '') + date.getDate() + '.' + (date.getMonth().toString().length === 1 ? '0' : '') + date.getMonth() + '.' + date.getFullYear()
        }
    }
}