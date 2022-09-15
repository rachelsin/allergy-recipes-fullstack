import React from 'react'
import Pagination from 'react-bootstrap/Pagination';


export default function PaginationPage({ gotoPrevious, gotoNext, gotoStart, gotoEnd, active, pages, setPageNumber }) {
    return (
        <nav aria-label="Page navigation example mt-5">
            <ul className="pagination justify-content-center mt-5">
                <Pagination.First onClick={gotoStart} />
                <Pagination.Prev onClick={gotoPrevious} />
                {pages.map(pageIndex => (
                    <Pagination.Item
                        className={active(pageIndex)}
                        key={pageIndex}
                        onClick={() => setPageNumber(pageIndex)}>
                        {pageIndex + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={gotoNext} />
                <Pagination.Last onClick={gotoEnd} />
            </ul>
        </nav>
    )
}
