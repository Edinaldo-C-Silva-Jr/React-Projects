import styled from "styled-components";
import { LanguageColor } from "./types";

export const TagContainer = styled.p`
    display: flex;
    align-items: center;
`;

export const LanguageIcon = styled.span<LanguageColor>`
    width: 12px;
    height: 12px;
    margin-right: 5px;

    background-color: ${props => props.color || '#ffffff'};
`;

export const LanguageName = styled.p`
    font-size: 16;
    font-weight: 400;
    color: #a0a0a0;
`;
