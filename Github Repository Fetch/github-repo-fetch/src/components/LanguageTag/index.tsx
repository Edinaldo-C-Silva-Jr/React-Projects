import { LanguageIcon, LanguageName, TagContainer } from "./styles";
import { LanguageTagProperties } from "./types";

// A tag used to display the language used in a repository, with the language name and a colored icon.
const LanguageTag = ({languageProperty}: LanguageTagProperties) => {
    return <TagContainer>
        <LanguageIcon color={languageProperty.color}/>
        <LanguageName>{languageProperty.language}</LanguageName>
    </TagContainer>;
};

export default LanguageTag;
