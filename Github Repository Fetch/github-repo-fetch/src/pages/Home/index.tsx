import { ChangeEvent, useState } from "react";

import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";
import ListItem from "../../components/ListItem";
import ProfileInfo from "../../components/ProfileInfo";
import {
    Container,
    LeftColumn,
    Page,
    RightColumn,
    SearchArea,
    SearchResults,
} from "./styles";
import { api } from "../../services/api";
import { GithubUserInfo } from "../../components/ProfileInfo/types";
import { isAxiosError } from "axios";
import { RepositoryBasicInfo } from "../../components/ListItem/types";
import RepositoryPanel from "../../components/RepositoryPanel";
import { RepositoryExtraInfo } from "../../components/RepositoryPanel/types";

const App = () => {
    const [usernameInput, setUsernameInput] = useState("");
    const [githubUser, setGithubUser] = useState<GithubUserInfo | null>(null);
    const [userRepos, setUserRepos] = useState<RepositoryBasicInfo[] | []>([]);
    const [repoInfo, setRepoInfo] = useState<RepositoryExtraInfo | null>(null);

    const getUserFromGithub = async () => {
        try {
            const { data } = await api.get<GithubUserInfo>(
                `/users/${usernameInput}`
            );

            if (data.id) {
                setGithubUser(data);
                getReposFromUser();
            }
        } catch (error) {
            if (isAxiosError(error) && error.response?.status === 404) {
                alert("Usuário não encontrado!");
            } else {
                alert("Ocorreu um erro!");
            }
        }
    };

    const getReposFromUser = async () => {
        try {
            const { data } = await api.get<RepositoryBasicInfo[]>(
                `/users/${usernameInput}/repos`
            );

            if (data.length > 0) {
                setUserRepos(data);
            }
        } catch (error) {
            alert("Ocorreu um erro!");
        }
    };

    const getInfoFromRepo = async (name: string, repo: string) => {
        try {
            const { data } = await api.get<RepositoryExtraInfo>(
                `/repos/${name}/${repo}`
            );

            if (data.full_name) {
                data.created_at = new Date(data.created_at);
                data.updated_at = new Date(data.updated_at);
                setRepoInfo(data);
            }
        } catch (error) {
            alert("Ocorreu um erro!");
        }
    };

    const handleListItemClick = (repo: string) => {
        if (githubUser) {
            getInfoFromRepo(githubUser.login, repo);
        }
    };

    return (
        <Container>
            <Header />
            <Page>
                <LeftColumn>
                    <SearchArea>
                        <Input
                            value={usernameInput}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setUsernameInput(e.target.value)
                            }
                        />
                        <Button onClick={getUserFromGithub} />
                    </SearchArea>
                    {githubUser && <ProfileInfo githubUser={githubUser} />}
                    <SearchResults>
                        {userRepos.length
                            ? userRepos.map(
                                  (repository: RepositoryBasicInfo) => (
                                      <ListItem
                                          repository={repository}
                                          clickMethod={handleListItemClick}
                                      />
                                  )
                              )
                            : null}
                    </SearchResults>
                </LeftColumn>
                <RightColumn>
                    {repoInfo && <RepositoryPanel repository={repoInfo} />}
                </RightColumn>
            </Page>
        </Container>
    );
};

export default App;
