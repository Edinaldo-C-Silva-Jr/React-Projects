import LanguageTag from "../LanguageTag";
import {
    Container,
    LanguagesContainer,
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
            <RepoLink href={repository.html_url}>
                Go to this repository
            </RepoLink>
            <StatisticsContainer>
                <RepoStatistics>
                    Stars: {repository.stargazers_count}
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
            <StatisticsContainer>
                <RepoStatistics>
                    {repository.archived
                        ? "Archived Repository"
                        : "Active Repository"}
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
            <LanguagesContainer>
                {repository.languages.length > 0
                    ? repository.languages.map((language) => (
                          <LanguageTag language={language} />
                      ))
                    : null}
            </LanguagesContainer>
        </Container>
    );
};

export default RepositoryPanel;
