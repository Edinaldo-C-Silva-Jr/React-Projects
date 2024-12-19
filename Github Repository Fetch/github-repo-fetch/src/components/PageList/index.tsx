import { Container, PageNumber, PageText } from "./styles";
import { PaginationInfo } from "./types";

// A component that displays a list of pages to choose for the pagination in the website.
const PageList = ({ itemsPerPage, repositoryAmount, changePage }: PaginationInfo) => {
    // Gets the number of pages from the total amount of repositories and the amount of items per page.
    const numberOfPages: number = Math.ceil(repositoryAmount / itemsPerPage);
    const pages: number[] = [];

    // Fills the array with the amount of pages defined above.
    for (let i = 0; i < numberOfPages; i++) {
        pages.push(i + 1);
    }

    return (
        <Container>
            <PageText>Pages</PageText>
            {pages?.length &&
                pages.map((page: number) => (
                    <PageNumber href="#" onClick={() => changePage(page)}>{page}</PageNumber>
                ))}
        </Container>
    );
};

export default PageList;
