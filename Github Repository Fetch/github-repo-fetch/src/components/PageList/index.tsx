import { Container, PageNumber, PageText } from "./styles";
import { PaginationInfo } from "./types";

const PageList = ({ itemsPerPage, repositoryAmount, changePage }: PaginationInfo) => {
    const numberOfPages: number = Math.ceil(repositoryAmount / itemsPerPage);
    const pages: number[] = [];

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
