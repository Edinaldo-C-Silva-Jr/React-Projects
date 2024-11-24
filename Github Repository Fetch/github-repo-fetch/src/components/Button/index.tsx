import { StyledButton } from "./styles";
import { ButtonProperties } from "./types";

const Button = ({ onClick }: ButtonProperties) => {
    return <StyledButton onClick={onClick}>Search</StyledButton>;
};

export default Button;
