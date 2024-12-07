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
    const [repoInfo, setRepoInfo] = useState<RepositoryExtraInfo | null>(null);
    const [languageColors, setLanguageColors] = useState<FormattedLanguageData>(
        {}
    );

    const setCachedItem = (key: string, item: string) => {
        if (localStorage.getItem(key) === null) {
            localStorage.setItem(key, item);
        }
    };

    const getCachedItem = (key: string) => {
        return localStorage.getItem(key);
    };

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
                alert("An error occurred!");
            }
        };

        getLanguageColors();
    }, []);

    const getUserFromGithub = async () => {
        setRepoInfo(null);
        if (!usernameInput) {
            alert("Invalid search!");
            setGithubUser(null);
            return;
        }

        const cachedUser = getCachedItem(usernameInput);
        if (cachedUser) {
            const parsedUser: GithubUserInfo = JSON.parse(cachedUser);
            setGithubUser(parsedUser)
        } else {
            try {
                const { data } = await api.get<GithubUserInfo>(
                    `/users/${usernameInput}`
                );

                if (data.id) {
                    const userRepos = await getReposFromUser();

                    const fetchedUser: GithubUserInfo = {
                        id: data.id,
                        avatar_url: data.avatar_url,
                        name: data.name,
                        login: data.login,
                        html_url: data.html_url,
                        repos: userRepos ? userRepos : [],
                    };
                    setGithubUser(fetchedUser);
                    setCachedItem(
                        fetchedUser.login,
                        JSON.stringify(fetchedUser)
                    );
                } else {
                    setGithubUser(null);
                }
            } catch (error) {
                if (isAxiosError(error) && error.response?.status === 404) {
                    alert("User not found!");
                    setGithubUser(null);
                } else {
                    alert("An error occurred!");
                }
            }
        }
    };

    const getReposFromUser = async () => {
        try {
            const { data } = await api.get<RepositoryBasicInfo[]>(
                `/users/${usernameInput}/repos`
            );

            if (data.length > 0) {
                const basicRepos: RepositoryBasicInfo[] = data.map((repo) => ({
                    name: repo.name,
                    description: repo.description,
                }));
                return basicRepos;
            }
        } catch (error) {
            alert("An error occurred!");
        }
    };

    const handleListItemClick = (repo: string) => {
        if (githubUser) {
            getExtraInfoFromRepo(githubUser.login, repo);
        }
    };

    const getExtraInfoFromRepo = async (name: string, repo: string) => {
        const cachedData = getCachedItem(`${name}/${repo}`);

        if (cachedData) {
            const parsedData: RepositoryExtraInfo = JSON.parse(cachedData);
            parsedData.created_at = new Date(parsedData.created_at);
            parsedData.updated_at = new Date(parsedData.updated_at);
            setRepoInfo(parsedData);
        } else {
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
                    setCachedItem(repoInfo.full_name, JSON.stringify(repoInfo));
                }
            } catch (error) {
                alert("An error occurred!");
            }
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
            alert("An error occurred!");
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
                        {githubUser?.repos.length
                            ? githubUser.repos.map(
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
