import { InputContainer } from "./styles";
import { InputProperties } from "./types";

const Input = ({value, onChange}: InputProperties) => {
    return (
        <InputContainer>
            <input value={value} onChange={onChange}/>
        </InputContainer>
    );
};

export default Input;
