import styled from "styled-components";

export const InputContainer = styled.div`
    border: 1px solid #bfdfff;
    border-radius: 30px;

    height: 50px;
    width: 90%;
    margin: 5px 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #202830;

    &:focus-within {
        border: 2px solid #bfdfff;
    }
    
    // Styles the inner input to leave a few pixels between the border and the text.
    input {
        width: 96%;
        height: 100%;
        border: 0;

        font-size: 24px;
        background: transparent;
        color: #ffffff;

        &:focus {
            outline: none;
        }
    }
`;
