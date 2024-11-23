import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";
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
                    <SearchResults>
                        <p>Example</p>
                        <p>Example</p>
                        <p>Example</p>
                        <p>Example</p>
                        <p>Example</p>
                        <p>Example</p>
                    </SearchResults>
                </LeftColumn>
                <RightColumn></RightColumn>
            </Page>
        </Container>
    );
};

export default App;
