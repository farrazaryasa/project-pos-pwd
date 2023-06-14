import axios from "axios"

export function getChartData() {
    return axios.get(
        process.env.REACT_APP_API + '/reports/chart'
    )
}

export function getTransactionData() {
    return axios.get(
        process.env.REACT_APP_API + '/reports/sales'
    )
}