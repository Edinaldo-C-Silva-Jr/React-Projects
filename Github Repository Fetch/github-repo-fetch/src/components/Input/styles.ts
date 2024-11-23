import styled from "styled-components";

export const InputContainer = styled.div`
    border: 1px solid #c0d0e0;
    border-radius: 30px;
    height: 60px;
    width: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    &:focus-within {
        border: 2px solid #c0d0e0;
    }

    input {
        width: 96%;
        height: 60px;
        border: 0;

        font-size: 32px;
        background: transparent;
        color: #ffffff;

        &:focus {
            outline: none;
        }
    }
`;
