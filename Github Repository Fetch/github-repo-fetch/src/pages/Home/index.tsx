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

const App = () => {
    const [usernameInput, setUsernameInput] = useState("");
    const [githubUser, setGithubUser] = useState<GithubUserInfo | null>(null);

    const getUserFromGithub = async () => {
        try {
            const { data } = await api.get<GithubUserInfo>(
                `/users/${usernameInput}`
            );

            if (data.id) {
                setGithubUser(data);
            }
        } catch (error) {
            if (isAxiosError(error) && error.response?.status === 404) {
                alert("Usuário não encontrado!");
            } else {
                alert("Ocorreu um erro!");
            }
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
                        <ListItem />
                        <ListItem />
                        <ListItem />
                        <ListItem />
                        <ListItem />
                        <ListItem />
                    </SearchResults>
                </LeftColumn>
                <RightColumn></RightColumn>
            </Page>
        </Container>
    );
};

export default App;
