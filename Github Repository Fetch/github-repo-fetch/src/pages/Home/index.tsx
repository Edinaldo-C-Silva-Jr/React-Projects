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
import { LanguageData, LanguageDataFromFetch, CachedItemData } from "./types";
import { LanguageInformation } from "../../components/LanguageTag/types";
import PageList from "../../components/PageList";

const App = () => {
    // The username entered in the Input component.
    const [usernameInput, setUsernameInput] = useState<string>("");
    // The information about the Github user retrieved from a search.
    const [githubUser, setGithubUser] = useState<GithubUserInfo | null>(null);
    // The detailed information of a Github repository retrieved from a search when clicking the ListItem.
    const [repoInfo, setRepoInfo] = useState<RepositoryExtraInfo | null>(null);
    // The language colors used by Github.
    const [languageColors, setLanguageColors] = useState<LanguageData>({});
    // The number of the page currently selected to be displayed.
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Saves an item to the local storage.
    const setCachedItem = (key: string, item: string) => {
        if (localStorage.getItem(key) === null) {
            // Sets the expiration date to 3 days from now.
            const futureDate: Date = new Date();
            futureDate.setDate(futureDate.getDate() + 3);

            // Adds the expiration date to the item before saving it.
            const cachedItem: CachedItemData = {
                item: item,
                expirationDate: futureDate,
            };
            const cachedString: string = JSON.stringify(cachedItem);
            localStorage.setItem(key, cachedString);
        }
    };

    // Retrieves an item from the local storage, if it exists.
    const getCachedItem = (key: string) => {
        const cachedItem: string = localStorage.getItem(key) ?? "";
        if (cachedItem) { // Checks if the cached item with the given key exists.
            const parsedCachedItem: CachedItemData = JSON.parse(cachedItem);

            if (
                parsedCachedItem &&
                new Date() > parsedCachedItem.expirationDate
            ) { // If the current date is higher than the expiration date, remove the item from the storage.
                localStorage.removeItem(key);
                return null;
            } else { // Otherwise, return the item.
                return parsedCachedItem.item;
            }
        } else {
            return null;
        }
    };

    // UseEffect hook to trigger when the application loads. Retrieves the language names and colors used by Github.
    useEffect(() => {
        const getLanguageColors = async () => {
            try {
                // Gets the language data fromt he Github API.
                const { data } = await axios.get<LanguageDataFromFetch>(
                    `https://raw.githubusercontent.com/ozh/github-colors/master/colors.json`
                );

                // Formats the language data to contain the language name and color.
                const languageColors: LanguageData = Object.keys(data).reduce(
                    (acc: LanguageData, language: string) => {
                        acc[language] = data[language].color;
                        return acc;
                    },
                    {}
                );

                setLanguageColors(languageColors);
            } catch (error) {
                alert("An error occurred!");
            }
        };
        getLanguageColors();
    }, []);

    // Retrieves a Github user using the Github API with the username entered in the Input component.
    const getUserFromGithub = async () => {
        // Resets the page and repository panel.
        setRepoInfo(null);
        setCurrentPage(1);

        if (!usernameInput) { // If the input is invalid (such as an empty string), erase the user and return.
            alert("Invalid search!");
            setGithubUser(null);
            return;
        }

        const cachedUser = getCachedItem(usernameInput);
        if (cachedUser) { // Checks if the user exists in the local storage, and use it if it exists.
            const parsedUser: GithubUserInfo = JSON.parse(cachedUser);
            setGithubUser(parsedUser);
        } else {
            try {
                // Gets the user from the Github API.
                const { data } = await api.get<GithubUserInfo>(
                    `/users/${usernameInput}`
                );

                if (data.id) {
                    // Gets the user's repositories from the Github API.
                    const userRepos = await getReposFromUser();

                    // Formats the user to the GithubUserInfo format, including all their repositories.
                    const fetchedUser: GithubUserInfo = {
                        id: data.id,
                        avatar_url: data.avatar_url,
                        name: data.name,
                        login: data.login,
                        html_url: data.html_url,
                        repos: userRepos ? userRepos : [],
                    };
                    setGithubUser(fetchedUser);

                    // Caches the user to local storage after fetching.
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

    // Retrieves all repositories from the Github user using the Github API.
    const getReposFromUser = async () => {
        try {
            // Gets all repositories from the specific Github user.
            const { data } = await api.get<RepositoryBasicInfo[]>(
                `/users/${usernameInput}/repos`
            );

            if (data.length > 0) {
                // Creates an array with all repositories using the RepositoryBasicInfo format.
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

    // Method that handles the click in a ListItem component, getting more information on that ListItem's repository.
    const handleListItemClick = (repo: string) => {
        if (githubUser) {
            getExtraInfoFromRepo(githubUser.login, repo);
        }
    };

    // Retrieves the extra information from the selected repository from the Github API.
    const getExtraInfoFromRepo = async (name: string, repo: string) => {
        const cachedData = getCachedItem(`${name}/${repo}`);
        if (cachedData) { // Checks if the repository exists in local storage, and uses it if it exists.
            const parsedData: RepositoryExtraInfo = JSON.parse(cachedData);
            // Parses the date strings into Date format.
            parsedData.created_at = new Date(parsedData.created_at);
            parsedData.updated_at = new Date(parsedData.updated_at);
            setRepoInfo(parsedData);
        } else {
            try {
                // Gets the repository information from the Github API.
                const { data } = await api.get<RepositoryExtraInfo>(
                    `/repos/${name}/${repo}`
                );

                if (data.full_name) {
                    // Formats the data into the RepositoryExtraInfo format, including a list of languages used.
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

                    // Caches the repository into the local storage. 
                    setCachedItem(repoInfo.full_name, JSON.stringify(repoInfo));
                }
            } catch (error) {
                alert("An error occurred!");
            }
        }
    };

    // Gets the languages used in the selected repository and returns a list of LanguageInformation.
    const getLanguageInfoFromRepo = async (name: string, repo: string) => {
        try {
            // Gets the languages used in the repository from the Github API.
            const { data } = await api.get<string[]>(
                `/repos/${name}/${repo}/languages`
            );

            // Turns the data into an array of strings.
            const languageNames: string[] = Object.keys(data);
            // Creates an array of LanguageInformation, containing the name and color of every language used in the repository.
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

    // Gets the repositories in the currently selected page to be displayed.
    const getCurrentPageRepos = () => {
        // Finds the index of the first and last repositories to display.
        const firstRepoIndex: number = (currentPage - 1) * 5;
        const lastRepoIndex: number = currentPage * 5;
        // Slices the array of repositories to return only the repositories in the current page.
        return githubUser?.repos?.slice(firstRepoIndex, lastRepoIndex) ?? [];
    };

    // Changes the displayed page.
    const changePage = (page: number) => {
        setCurrentPage(page);
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
                    {githubUser?.repos?.length ? (
                        <PageList
                            itemsPerPage={5}
                            repositoryAmount={githubUser?.repos.length}
                            changePage={changePage}
                        />
                    ) : null}
                    <SearchResults>
                        {getCurrentPageRepos().map(
                            (repository: RepositoryBasicInfo) => (
                                <ListItem
                                    key={repository.name}
                                    repository={repository}
                                    clickMethod={handleListItemClick}
                                />
                            )
                        )}
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
