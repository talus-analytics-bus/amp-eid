import styled from 'styled-components'

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid ${({ theme }) => theme.medGray};
    padding: 10px;

    a {
      color: ${({ theme }) => theme.black};
      text-decoration: none;

      &:hover {
        color: ${({ theme }) => theme.link};
      }
    }
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

export default StyledTable
