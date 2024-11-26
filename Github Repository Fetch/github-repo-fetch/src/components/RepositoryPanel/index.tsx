import {
    Container,
    LanguagesContainer,
    LanguageTooltip,
    RepoDescription,
    RepoTitle,
} from "./styles";
import { RepositoryPanelProperties } from "./types";

const RepositoryPanel = ({ repository }: RepositoryPanelProperties) => {
    return (
        <Container>
            <RepoTitle>{repository.name}</RepoTitle>
            <RepoDescription>{repository.description}</RepoDescription>
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
