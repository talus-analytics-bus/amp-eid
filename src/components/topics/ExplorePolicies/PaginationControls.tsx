import React from 'react'
import styled from 'styled-components'

const PageControlSection = styled.div`
  display: flex;
  width: 100%;
`
const Select = styled.select`
  border: none;
  background: none;
  padding: 2px 4px;
  border: 1px solid ${({ theme }) => theme.medGray};
  margin-right: 10px;
`
const PageDescription = styled.div`
  margin-right: auto;
`

interface PaginationControlsProps {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  total: number
}

const PaginationControls = ({
  page,
  setPage,
  pageSize,
  setPageSize,
  total,
}: PaginationControlsProps) => {
  const lastPage = Math.floor((total - 1) / pageSize)

  let maxShown = page * pageSize + pageSize
  if (maxShown > total) maxShown = total

  let nearButtons: number[]
  switch (true) {
    case lastPage < 3:
      nearButtons = [1]
      break
    case page > lastPage - 3:
      nearButtons = [lastPage - 3, lastPage - 2, lastPage - 1]
      break
    case page > 3:
      nearButtons = [page - 1, page, page + 1]
      break
    default:
      nearButtons = [1, 2, 3]
      break
  }

  return (
    <PageControlSection>
      <Select
        onChange={e => {
          setPage(0)
          setPageSize(Number(e.target.value))
        }}
        value={pageSize}
      >
        <option value="5">5</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="150">150</option>
        <option value={total}>All</option>
      </Select>
      <PageDescription>
        Showing {page * pageSize + 1} to {maxShown} of {total} countries
      </PageDescription>
      {lastPage >= 1 && (
        <>
          <button disabled={page === 0} onClick={() => setPage(0)}>
            1
          </button>
          {nearButtons[0] !== 1 && <span>...</span>}
          {lastPage > 1 &&
            nearButtons.map(number => (
              <button
                disabled={number === page}
                onClick={() => setPage(number)}
              >
                {number + 1}
              </button>
            ))}
          {lastPage > 1 && nearButtons.at(-1)! + 1 !== lastPage && (
            <span>...</span>
          )}
          <button
            disabled={lastPage === page}
            onClick={() => setPage(lastPage)}
          >
            {lastPage + 1}
          </button>
          <button
            disabled={page === lastPage}
            onClick={() => setPage(prev => prev + 1)}
          >
            Next page
          </button>
        </>
      )}
    </PageControlSection>
  )
}

export default PaginationControls
