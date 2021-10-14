export default function verifyUserAuth(token) {
	if(token===undefined)
		return false;

	return fetch('/is_valid_token', {
		method: 'GET',
		credentials: 'same-origin',
		headers: {
			'X-CSRF-TOKEN': token
		}
	}).then(response => {
		return response.status === 200;
	})
}
