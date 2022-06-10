import {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {getConfig} from "../config";


function useUser()
{
    const { user, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
            const config = getConfig();

            try {
                const accessToken = await getAccessTokenSilently({
                    audience: config.audience,
                    scope: "read:current_user",
                });

                const userDetailsByIdUrl = `${config.audience}users/${user.sub}`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const { app_metadata } = await metadataResponse.json();

                setUserMetadata(app_metadata);
            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently, user?.sub]);

    const newUser = {...user, ...{role: userMetadata?.role}};
    return {user: newUser, isAdmin: newUser.role === 'admin', isSupport: newUser.role === 'support'};
}

export default useUser;