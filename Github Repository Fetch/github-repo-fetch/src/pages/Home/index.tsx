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

const App = () => {
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
