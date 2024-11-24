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

const App = () => {
    const [usernameInput, setUsernameInput] = useState("");
    const [user, setUser] = useState(null);

    const getUserFromGithub = async () => {
        try {
            const { data } = await api.get(`/users/${usernameInput}`);
            
            if (data.id) {
                setUser(data);
            }

        } catch (error) {
            alert("Usuário não encontrado!");
        }
    }

    return (
        <Container>
            <Header />
            <Page>
                <LeftColumn>
                    <SearchArea>
                        <Input />
                        <Button />
                    </SearchArea>
                    <ProfileInfo />
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
