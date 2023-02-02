import React from 'react'
import styled from 'styled-components'

const PageControlSection = styled.div`
  ${({ theme }) => theme.smallParagraph};
  color: ${({ theme }) => theme.veryDarkGray};
  display: flex;
  align-items: baseline;
  width: 100%;
`
const Select = styled.select`
  border: none;
  background: none;
  padding: 2px 4px;
  border: 1px solid ${({ theme }) => theme.lightGray};
  border-radius: 5px;
  margin-right: 10px;
  color: ${({ theme }) => theme.veryDarkGray};
`
const PageDescription = styled.span`
  margin-right: auto;
`
const Button = styled.button`
  ${({ theme }) => theme.smallParagraph};
  color: ${({ theme }) => theme.veryDarkGray};
  border: none;
  background: none;
  margin: 0px 2px;
  padding: 1px 6px;
  border-radius: 5px;
  min-width: 2.25em;

  transition: 250ms;
  border: 1px solid white;

  &:disabled {
    background-color: ${({ theme }) => theme.lightGray};
    border: 1px solid ${({ theme }) => theme.lightGray};

    &:hover {
      background-color: ${({ theme }) => theme.lightGray};
    }
  }
  &:hover {
    background-color: ${({ theme }) => theme.veryLightGray};
    border: 1px solid ${({ theme }) => theme.lightGray};
  }
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
          <Button disabled={page === 0} onClick={() => setPage(0)}>
            1
          </Button>
          {nearButtons[0] !== 1 && <span>...</span>}
          {lastPage > 1 &&
            nearButtons.map(number => (
              <Button
                disabled={number === page}
                onClick={() => setPage(number)}
              >
                {number + 1}
              </Button>
            ))}
          {lastPage > 1 && nearButtons.at(-1)! + 1 !== lastPage && (
            <span>...</span>
          )}
          <Button
            disabled={lastPage === page}
            onClick={() => setPage(lastPage)}
          >
            {lastPage + 1}
          </Button>
          <Button
            disabled={page === lastPage}
            onClick={() => setPage(prev => prev + 1)}
          >
            Next
          </Button>
        </>
      )}
    </PageControlSection>
  )
}

export default PaginationControls
