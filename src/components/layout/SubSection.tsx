import styled from 'styled-components'

const SubSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 3px solid ${({ theme }) => theme.lightGray};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
`

export default SubSection
