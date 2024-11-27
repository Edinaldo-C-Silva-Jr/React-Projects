import { ChangeEvent, useState, useEffect } from "react";

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
import axios, { isAxiosError } from "axios";
import { RepositoryBasicInfo } from "../../components/ListItem/types";
import RepositoryPanel from "../../components/RepositoryPanel";
import { RepositoryExtraInfo } from "../../components/RepositoryPanel/types";
import { FormattedLanguageData } from "./types";
import { LanguageInformation } from "../../components/LanguageTag/types";

const App = () => {
    const [usernameInput, setUsernameInput] = useState<string>("");
    const [githubUser, setGithubUser] = useState<GithubUserInfo | null>(null);
    const [userRepos, setUserRepos] = useState<RepositoryBasicInfo[]>([]);
    const [repoInfo, setRepoInfo] = useState<RepositoryExtraInfo | null>(null);
    const [languageColors, setLanguageColors] = useState<FormattedLanguageData>(
        {}
    );

    useEffect(() => {
        const getLanguageColors = async () => {
            try {
                const { data } = await axios.get(
                    `https://raw.githubusercontent.com/ozh/github-colors/master/colors.json`
                );

                const languageColors: FormattedLanguageData = Object.keys(
                    data
                ).reduce((acc: FormattedLanguageData, language: string) => {
                    acc[language] = data[language].color;
                    return acc;
                }, {});

                setLanguageColors(languageColors);
            } catch (error) {
                alert("Ocorreu um erro!");
            }
        };

        getLanguageColors();
    }, []);

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

    const handleListItemClick = (repo: string) => {
        if (githubUser) {
            getExtraInfoFromRepo(githubUser.login, repo);
        }
    };

    const getExtraInfoFromRepo = async (name: string, repo: string) => {
        try {
            const { data } = await api.get<RepositoryExtraInfo>(
                `/repos/${name}/${repo}`
            );

            if (data.full_name) {
                const repoInfo: RepositoryExtraInfo = {
                    full_name: data.full_name,
                    name: data.name,
                    description: data.description,
                    html_url: data.html_url,
                    stargazers_count: data.stargazers_count,
                    archived: data.archived,
                    created_at: new Date(data.created_at),
                    updated_at: new Date(data.updated_at),
                    languageInfo: await getLanguageInfoFromRepo(name, repo),
                };
                setRepoInfo(repoInfo);
            }
        } catch (error) {
            alert("Ocorreu um erro!");
        }
    };

    const getLanguageInfoFromRepo = async (name: string, repo: string) => {
        try {
            const { data } = await api.get<string[]>(
                `/repos/${name}/${repo}/languages`
            );

            const languageNames: string[] = Object.keys(data);
            const languageInfo: LanguageInformation[] = languageNames.map(
                (name) => ({
                    language: name,
                    color: languageColors[name],
                })
            );

            return languageInfo;
        } catch (error) {
            alert("Ocorreu um erro!");
            return [];
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
