import { LanguageIcon, LanguageName, TagContainer } from "./styles";
import { LanguageTagProperties } from "./types";

const LanguageTag = ({languageProperty}: LanguageTagProperties) => {
    return <TagContainer>
        <LanguageIcon color={languageProperty.color}/>
        <LanguageName>{languageProperty.language}</LanguageName>
    </TagContainer>;
};

export default LanguageTag;
