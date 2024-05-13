import { createConfirmation } from 'react-confirm';
import CustomAlertConfirm from './CustomAlertConfirm';

// create confirm function
export const confirm = createConfirmation(CustomAlertConfirm);

// This is optional. But wrapping function makes it easy to use.
export function confirmWrapper(confirmation, options = {}) {
	return confirm({ confirmation, options });
}