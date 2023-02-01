import styled from 'styled-components'

const ColumnSection = styled.section<{
  noBorder?: boolean
  columnReverse?: boolean
}>`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 30px;

  padding-top: 20px;

  @media (max-width: 1000px) {
    flex-direction: ${({ columnReverse }) =>
      columnReverse ? 'column-reverse' : 'column'};
  }

  & > :nth-child(1) {
    display: block;
    width: 350px;
    flex-shrink: 0;

    @media (max-width: 1000px) {
      min-width: auto;
      width: auto;
    }
  }

  & > :nth-child(2) {
    display: block;
    min-width: 350px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    gap: 20px;
  }

  ${({ theme, noBorder }) =>
    !noBorder && `border-top: 3px solid ${theme.lightGray};`};
`

export default ColumnSection
