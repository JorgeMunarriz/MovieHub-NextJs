import {handleAuth, handleLogin, handleLogout} from '@auth0/nextjs-auth0';

export const GET = handleAuth({
    login: handleLogin({
        returnTo: "/profile",
        authorizationParams: {
            audience: 'http://localhost:3005', // or YOUR AUTH0_AUDIENCE
            // IS CRUCIAL FOR THE CORRECT FUNCTIONING OF THE AUTH0 TOKEN
        },
        
    },
    ),
    logout: handleLogout({
        returnTo: "/"
    })
});