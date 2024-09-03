<<<<<<< HEAD
import React from 'react';
import ReactPaginate from 'react-paginate';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

type PaginationProps = {
    totalPages: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ totalPages, page, setPage }: PaginationProps) => {
    return (
        <>
            <ReactPaginate
                className="pagination justify-content-center gap-4 mb-4"
                previousLabel="Prev"
                previousLinkClassName="btn btn-primary"
                nextLabel="Next"
                nextLinkClassName="btn btn-primary"
                pageCount={totalPages ? totalPages : totalPages}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                onPageChange={(page) => { setPage(page.selected + 1); }}  />
        </>
    );
};

export default Pagination;
=======
import React from 'react';
import ReactPaginate from 'react-paginate';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

type PaginationProps = {
    totalPages: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ totalPages, page, setPage }: PaginationProps) => {
    return (
        <>
            <ReactPaginate
                className="pagination justify-content-center gap-4 mb-4"
                previousLabel="Prev"
                previousLinkClassName="btn btn-primary"
                nextLabel="Next"
                nextLinkClassName="btn btn-primary"
                pageCount={totalPages ? totalPages : totalPages}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                onPageChange={(page) => { setPage(page.selected + 1); }}  />
        </>
    );
};

export default Pagination;
>>>>>>> dba47c2ce42c263ee9846ea648aed5d3474b3aae
