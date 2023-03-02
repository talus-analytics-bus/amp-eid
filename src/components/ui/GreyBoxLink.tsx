import styled from 'styled-components'
import { Link } from 'gatsby'

const GreyBoxLink = styled(Link)`
  ${({ theme }) => theme.h4};
  border-radius: 5px;
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.veryLightGray};
  transition: 150ms ease;
  color: ${({ theme }) => theme.black};
  display: flex;
  align-items: center;
  gap: 0.5em;

  // > span {
  //   margin-top: 0.25em;
  // }

  &:hover {
    background-color: ${({ theme }) => theme.lightGray};
    transition: 250ms ease;
  }
`

export default GreyBoxLink
