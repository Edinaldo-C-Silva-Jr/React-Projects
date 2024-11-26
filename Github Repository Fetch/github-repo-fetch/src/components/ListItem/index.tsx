import { Container, ItemDescription, ItemTitle } from "./styles";
import { ListItemProperties } from "./types";

const ListItem = ({ repository, clickMethod }: ListItemProperties) => {
    const onClick = () => {
        clickMethod(repository.name)
    }

    return (
        <Container>
            <ItemTitle onClick={onClick}>{repository.name}</ItemTitle>
            <ItemDescription>{repository.description}</ItemDescription>
        </Container>
    );
};

export default ListItem;
