import styled from 'styled-components'

const MainHeader = styled.header`
  > h2 {
    ${({ theme }) => theme.paragraph};
    color: ${({ theme }) => theme.darkGray};
    margin: 0;
  }

  > h1 {
    ${({ theme }) => theme.h1};
    color: ${({ theme }) => theme.black};
    margin: 0;
    display: flex;
    align-items: flex-start;
    gap: 15px;
  }
`

export default MainHeader
