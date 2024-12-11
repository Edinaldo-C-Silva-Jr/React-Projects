import { Container, PageNumber, PageText } from "./styles";

const PageList = () => {
    return (
        <Container>
            <PageText>Pages:</PageText>
            <PageNumber href="#">1</PageNumber>
            <PageNumber href="#">2</PageNumber>
            <PageNumber href="#">3</PageNumber>
            <PageNumber href="#">4</PageNumber>
            <PageNumber href="#">5</PageNumber>
            <PageNumber href="#">6</PageNumber>
            <PageNumber href="#">7</PageNumber>
            <PageNumber href="#">8</PageNumber>
        </Container>
    );
};

export default PageList;
