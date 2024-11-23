import {
    ProfileContainer,
    ProfileInformation,
    ProfileLink,
    ProfileName,
    ProfilePicture,
    ProfileUser,
} from "./styles";

const ProfileInfo = () => {
    return (
        <ProfileContainer>
            <ProfilePicture src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"></ProfilePicture>
            <ProfileInformation>
                <ProfileName>Github Test User</ProfileName>
                <ProfileUser>@TestUserInformation</ProfileUser>
                <ProfileLink href="https://github.com/">Profile Link</ProfileLink>
            </ProfileInformation>
        </ProfileContainer>
    );
};

export default ProfileInfo;
