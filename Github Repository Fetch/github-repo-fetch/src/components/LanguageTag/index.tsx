import { LanguageIcon, LanguageName, TagContainer } from "./styles";
import { LanguageTagProperties } from "./types";

const LanguageTag = ({language}: LanguageTagProperties) => {
    return <TagContainer>
        <LanguageIcon />
        <LanguageName>{language}</LanguageName>
    </TagContainer>;
};

export default LanguageTag;
