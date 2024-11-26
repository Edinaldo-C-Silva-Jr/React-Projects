import {
    Container,
    LanguagesContainer,
    LanguageTooltip,
    RepoDescription,
    RepoLink,
    RepoStatistics,
    RepoTitle,
    StatisticsContainer,
} from "./styles";
import { RepositoryPanelProperties } from "./types";

const RepositoryPanel = ({ repository }: RepositoryPanelProperties) => {
    return (
        <Container>
            <RepoTitle>{repository.name}</RepoTitle>
            <RepoDescription>{repository.description}</RepoDescription>
            <RepoLink href={repository.html_url}>Go to this repository</RepoLink>
            <StatisticsContainer>
                <RepoStatistics>
                    Stars: {repository.stargazers_count}
                </RepoStatistics>
                <RepoStatistics>
                    {`Last updated - ${repository.updated_at.toLocaleDateString(
                        "en-US",
                        {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }
                    )}`}
                </RepoStatistics>
            </StatisticsContainer>
            <StatisticsContainer>
                <RepoStatistics>
                    {repository.archived
                        ? "Archived Repository"
                        : "Active Repository"}
                </RepoStatistics>
                <RepoStatistics>
                    {`Created at - ${repository.created_at.toLocaleDateString(
                        "en-US",
                        {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }
                    )}`}
                </RepoStatistics>
            </StatisticsContainer>
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
