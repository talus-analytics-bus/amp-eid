import styled from 'styled-components'

const ColumnSection = styled.section`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 30px;

  padding-top: 30px;
  border-top: 3px solid ${({ theme }) => theme.lightGray};

  @media (max-width: 1000px) {
    flex-direction: column;
  }

  & > :nth-child(1) {
    min-width: 350px;
    @media (max-width: 1000px) {
      min-width: auto;
    }
  }

  & > :nth-child(2) {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: 20px;
  }
`

export default ColumnSection
