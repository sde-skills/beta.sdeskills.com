export function onRequest(context) {
	const corsHeaders = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "*",
		"Access-Control-Allow-Headers": "*"
	}
	const name,email
	try {
		const url = new URL(request.url);
		const name = url.searchParams.get('name');
		const email = url.searchParams.get('email');
		
	} catch (e) {
		return new Response('failed to decode url', {
			status: 400,
			headers: corsHeaders
		});
	}

	// Validate the JSON
	if (!name || !email ) {
		return new Response('Name/email not sent', {
			status: 400,
			headers: corsHeaders
		});
	}

	return new subscribeEmail(obj.name, obj.email);
}


async function subscribeEmail(name, email) {
		return fetch("http://sendy.sdeskills.com/subscribe", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({
				'list':'Tc0Ws84FsmX4HB4vgGeV4g',
				'name': name,
				'email':  email,
				'boolean': 'true',
				'api_key': API_KEY,
			}),
		});
}
