import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 90vh;
`;

export const Page = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
`;

export const LeftColumn = styled.div`
    width: 40%;
    height: 100%;
    margin-right: 10px;

    display: flex;
    flex-direction: column;
`;

export const SearchArea = styled.div`
    width: 100%;
    flex: 1;

    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const SearchResults = styled.div`
    width: 100%;
    flex: 4;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
`;

export const RightColumn = styled.div`
    margin-left: 10px;
    width: 60%;
`;
