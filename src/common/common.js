import moment from 'moment'

export const formatNumber = (value) => {
	return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const revertFormatNumber = (value) => {
	return Number(String(value).replaceAll(',', ''))
}

export const formatDate = (date) => {
	return moment(date).format('DD/MM/YYYY HH:mm:ss')
}

export const formatZoneTimeToString = (date) => {
	return moment(date.toDate()).format('DD/MM/YYYY HH:mm:ss')
}

export const convertStringToDate = (str) => {
	return moment(str).format('DD/MM/YYYY HH:mm:ss')
}