import { Container, ItemDescription, ItemTitle } from "./styles";
import { RepositoryProperty } from "./types";

const ListItem = ({ repository }: RepositoryProperty) => {
    return (
        <Container>
            <ItemTitle>{repository.name}</ItemTitle>
            <ItemDescription>{repository.description}</ItemDescription>
        </Container>
    );
};

export default ListItem;
