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

// A page component that holds the detailed information about a specific Github repository.
const RepositoryPanel = ({ repository }: RepositoryPanelProperties) => {
    return (
        <Container>
            <RepoTitle>{repository.name}</RepoTitle>
            <RepoDescription>{repository.description}</RepoDescription>
            <RepoLink href={repository.html_url}>
                Go to this repository
            </RepoLink>
            <StatisticsContainer>
                <RepoStatistics key="stars" >
                    Stars: {repository.stargazers_count}
                </RepoStatistics>
                <RepoStatistics key="created at" >
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
                <RepoStatistics key="archived" >
                    {repository.archived
                        ? "Archived Repository"
                        : "Active Repository"}
                </RepoStatistics>
                <RepoStatistics key="updated at" >
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
                {repository.languageInfo.length > 0
                    ? repository.languageInfo.map((info) => (
                          <LanguageTag languageProperty={info} />
                      ))
                    : null}
            </LanguagesContainer>
        </Container>
    );
};

export default RepositoryPanel;
