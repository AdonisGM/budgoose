export const handleValidate = (arr) => {
	let result = {}

	arr.forEach((item, index) => {
		result[`validate${index}`] = item
	})

	return result
}

export const required = () => {
	const required = (value) => {
		if (value !== undefined && value !== null) {
			if (typeof value === 'string' && value.trim().length === 0) {
				return `Field is required`;
			}

			if (Array.isArray(value) && value.length === 0) {
				return `Field is required`;
			}
		} else {
			return `Field is required`;
		}
	}

	return required
}

export const range = (min, max) => {
	return (value) => {
		const number = Number(value)

		if (number < min || number > max) {
			return `Range must be [${min}, ${max}]`
		}
	}
}

export const lessThanOrEqual = (min) => {
	return (value) => {
		const number = Number(value)

		if (number > min) {
			return `Less than or equal ${number}`
		}
	}
}

export const largerThanOrEqual = (max) => {
	return (value) => {
		const number = Number(value)

		if (number < max) {
			return `Larger than or equal ${number}`
		}
	}
}