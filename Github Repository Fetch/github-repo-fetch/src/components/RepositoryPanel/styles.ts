import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const RepoTitle = styled.h1`
    font-size: 36px;
    font-weight: 700;
    margin: 20px 0;

    color: #ffffff;
    border-bottom: 1px solid #ffffff;
`;

export const RepoDescription = styled.p`
    width: 90%;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;

    color: #ffffff;
`;

export const RepoLink = styled.a`
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 15px;

    color: #80d0f0;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

export const StatisticsContainer = styled.div`
    width: 80%;
    margin-bottom: 5px;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const RepoStatistics = styled.p`
    font-size: 16;
    font-weight: 700;

    color: #b0b0b0;
`;

export const LanguagesContainer = styled.div`
    width: 90%;
    height: 30px;
    margin: 10px 0;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;