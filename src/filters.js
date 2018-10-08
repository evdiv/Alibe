import Vue from 'vue'
import moment from 'moment'


const formatDate = val => {
    if (!val) { return '-' }
    let date = val.toDate()
    return moment(date).fromNow()
}

const trimLength = val => {
    if (val.length < 200) { return val }
    return `${val.substring(0, 200)}...`
}

Vue.filter("formatDate", formatDate)
Vue.filter("trimLength", trimLength)