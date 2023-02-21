import styled from 'styled-components'

const ThumbnailHolder = styled.div`
  background: ${({ theme }) => theme.lightGray};
  border-radius: 5px;
  padding: 20px;
  max-height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default ThumbnailHolder
