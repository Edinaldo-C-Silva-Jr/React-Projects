import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    margin-left: 30px;
    padding-bottom: 10px;
    border-top: 1px solid #ffffff;

    display: flex;
    align-items: flex-start;
    flex-direction: column;

    &:hover {
        background-color: #283038;
    }
`;

export const ItemTitle = styled.h2`
    font-size: 22px;
    font-weight: 700;
    margin-left: 20px;

    color: #80b0f0;

    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

export const ItemDescription = styled.p`
    font-size: 12px;
    font-weight: 400;

    color: #ffffff;
`;
