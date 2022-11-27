export function onRequest(context) {
	const corsHeaders = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "*",
		"Access-Control-Allow-Headers": "*"
	}
	var name = null;
	var email = null
	try {
		const { request }  = context;
		const url = new URL(request.url);
		name = url.searchParams.get('name');
		email = url.searchParams.get('email');
		
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
	});}


