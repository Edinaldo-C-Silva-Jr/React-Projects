import { StyledButton } from "./styles";
import { ButtonProperties } from "./types";

// A standard button component that can have its onClick event customized.
const Button = ({ onClick }: ButtonProperties) => {
    return <StyledButton onClick={onClick}>Search</StyledButton>;
};

export default Button;
