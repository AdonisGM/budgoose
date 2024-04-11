export const formatNumber = (value) => {
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}