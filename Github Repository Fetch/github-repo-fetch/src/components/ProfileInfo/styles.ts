import styled from "styled-components";

export const ProfileContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ProfilePicture = styled.img`
    width: 96px;
    height: 96px;
    border-radius: 48px;
    margin-right: 20px;;
`;

export const ProfileInformation = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const ProfileName = styled.h2`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 5px;

    color: #f0f0f0;
`;

export const ProfileUser = styled.h3`
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;

    color: #f0f0f080;
`;

export const ProfileLink = styled.a`
    font-size: 16px;
    font-weight: 400;

    color: #60d0f0;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;