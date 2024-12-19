import { Container, ItemDescription, ItemTitle } from "./styles";
import { ListItemProperties } from "./types";

// An item component used to build a list of repositories.
const ListItem = ({ repository, clickMethod }: ListItemProperties) => {
    // The onClick method of the ItemTitle changes the currently selected repository to the one on this ItemList.
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
