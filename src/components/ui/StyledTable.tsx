import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 100%;
  overflow-x: scroll;
`

const Table = styled.table`
  width: 100%;
  min-width: 700px;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid ${({ theme }) => theme.medGray};
    padding: 10px;

    a {
      color: ${({ theme }) => theme.link};
      text-decoration: none;

      &:hover {
        color: ${({ theme }) => theme.link};
        text-decoration: underline;
      }
    }
  }
  td {
    width: 15%;
  }
  td:nth-child(1) {
    width: 40%;
  }
  tr:nth-child(odd) {
    background: ${({ theme }) => theme.ampEidVeryLightBlue};
  }
  thead {
    tr:nth-child(odd) {
      background: white;
    }
    th {
      text-align: left;
    }
  }
`

export const StyledTableHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

interface StyledTableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
}

const StyledTable = ({ children, ...props }: StyledTableProps) => (
  <Container>
    <Table {...props}>{children}</Table>
  </Container>
)

export default StyledTable
