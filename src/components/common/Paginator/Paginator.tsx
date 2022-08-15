import React, {useState} from 'react';
import s from './Paginator.module.css';

type PaginatorPropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    portionSize: number
    onClickSetPageHandler: (page: number) => void
}

const Paginator: React.FC<PaginatorPropsType> = React.memo(({pageSize, currentPage, totalCount, onClickSetPageHandler, portionSize}) => {
    let pagesCount = Math.ceil(totalCount / pageSize)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className={s.paginator}>
            {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber((portionNumber - 1))
            }}>Previous
            </button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span
                        className={p === currentPage ? s.selectedPage: s.pageNumber}
                        onClick={e => onClickSetPageHandler(p)}>{p}</span>
                })}
            {portionCount > portionNumber &&
            <button onClick={() => {setPortionNumber(portionNumber + 1)}}>Next</button>}
        </div>
    )
})

export default Paginator;