import React from 'react'
import styled from 'styled-components'

const PageControlSection = styled.div`
  display: flex;
  width: 100%;
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

  return (
    <PageControlSection>
      <select
        onChange={e => {
          setPage(0)
          setPageSize(Number(e.target.value))
        }}
        value={pageSize}
      >
        <option value="5">5</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="300">All</option>
      </select>
      <PageDescription>
        Showing {page * pageSize + 1} to {maxShown} of {total} countries
      </PageDescription>
      <button onClick={() => setPage(0)}>1</button>
      <button onClick={() => setPage(lastPage)}>{lastPage + 1}</button>
      <button
        disabled={page === lastPage}
        onClick={() => setPage(prev => prev + 1)}
      >
        Next page
      </button>
    </PageControlSection>
  )
}

export default PaginationControls
