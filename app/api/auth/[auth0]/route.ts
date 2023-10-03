import {handleAuth, handleLogin} from '@auth0/nextjs-auth0';

export const GET = handleAuth({
    login: handleLogin({
        returnTo: "/private",
        authorizationParams: {
            audience: 'http://localhost:3005', // or YOUR AUTH0_AUDIENCE
            // IS CRUCIAL FOR THE CORRECT FUNCTIONING OF THE AUTH0 TOKEN
        },
    })
});