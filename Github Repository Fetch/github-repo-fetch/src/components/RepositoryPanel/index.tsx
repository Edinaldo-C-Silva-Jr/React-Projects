import {
    Container,
    LanguagesContainer,
    LanguageTooltip,
    RepoDescription,
    RepoTitle,
} from "./styles";

const RepositoryPanel = () => {
    return (
        <Container>
            <RepoTitle>Example Repository</RepoTitle>
            <RepoDescription>
                Description of the Example Repository.
            </RepoDescription>
            <LanguagesContainer>
                <LanguageTooltip>C#</LanguageTooltip>
                <LanguageTooltip>JavaScript</LanguageTooltip>
                <LanguageTooltip>HTML</LanguageTooltip>
                <LanguageTooltip>CSS</LanguageTooltip>
                <LanguageTooltip>Typescript</LanguageTooltip>
            </LanguagesContainer>
        </Container>
    );
};

export default RepositoryPanel;
