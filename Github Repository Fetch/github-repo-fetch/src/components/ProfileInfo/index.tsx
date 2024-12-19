import {
    ProfileContainer,
    ProfileInformation,
    ProfileLink,
    ProfileName,
    ProfilePicture,
    ProfileUser,
} from "./styles";
import { GithubUserProperty } from "./types";

// A component that holds all the information of the Github user's profile.
const ProfileInfo = ({ githubUser }: GithubUserProperty) => {
    return (
        <ProfileContainer>
            <ProfilePicture src={githubUser.avatar_url}></ProfilePicture>
            <ProfileInformation>
                <ProfileName>{githubUser.name}</ProfileName>
                <ProfileUser>@{githubUser.login}</ProfileUser>
                <ProfileLink href={githubUser.html_url}>
                    Go to this profile
                </ProfileLink>
            </ProfileInformation>
        </ProfileContainer>
    );
};

export default ProfileInfo;
