export function onRequest(context) {
	const corsHeaders = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "*",
		"Access-Control-Allow-Headers": "*"
	}

	try {
		obj = await ctx.request.json();
	} catch (e) {
		return new Response('Invalid JSON body!', {
			status: 400,
			headers: corsHeaders
		});
	}

	// Validate the JSON
	if (!obj.name || !obj.email ) {
		return new Response('Invalid body', {
			status: 400,
			headers: corsHeaders
		});
	}

	if (discordResp.status === 200 || discordResp.status === 204) {
		// Success
		return new Response('Success.', {
			status: 200,
			headers: corsHeaders
		});
	} else {
		return new Response('An error ocurred while sending the message.', {
			status: 500,
			headers: corsHeaders
		})
	}


	return new Response("Hello, world!")
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
				'api_key': 'API_KEY',
			}),
		});
}
