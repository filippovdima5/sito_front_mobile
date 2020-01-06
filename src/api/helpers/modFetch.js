async function modFetch(path, body) {
	const fetchObj = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	};

	if (!!body) {
		fetchObj.method = 'POST';
		fetchObj.body = JSON.stringify(body)
	}

	return await fetch(path, fetchObj)
	.then(res => res.json())
	.then(res => {
		if (!!res.error) throw Error(res.error);
		else return res
	})
}

export {modFetch}