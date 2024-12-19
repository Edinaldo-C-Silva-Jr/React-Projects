import { InputContainer } from "./styles";
import { InputProperties } from "./types";

// A standard input component for inputting text.
const Input = ({value, onChange}: InputProperties) => {
    return (
        <InputContainer>
            <input value={value} onChange={onChange}/>
        </InputContainer>
    );
};

export default Input;
