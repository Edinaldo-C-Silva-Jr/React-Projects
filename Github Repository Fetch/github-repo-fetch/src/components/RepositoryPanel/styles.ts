import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const RepoTitle = styled.h1`
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 20px;

    color: #ffffff;
    border-bottom: 1px solid #ffffff;
`;

export const RepoDescription = styled.p`
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;

    color: #ffffff;
`;

export const LanguagesContainer = styled.div`
    width: 100%;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

export const LanguageTooltip = styled.p`
    font-size: 16;
    font-weight: 400;
    color: #a0a0a0;
`;