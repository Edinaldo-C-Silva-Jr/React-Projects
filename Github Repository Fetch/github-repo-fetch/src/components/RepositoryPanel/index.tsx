import {
    Container,
    LanguagesContainer,
    LanguageTooltip,
    RepoDescription,
    RepoTitle,
} from "./styles";
import { RepositoryProperty } from "./types";

const RepositoryPanel = ({ repository }: RepositoryProperty) => {
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
