import styled from 'styled-components'

const ButtonLink = styled.a`
  ${({ theme }) => theme.paragraph};
  color: ${({ theme }) => theme.white} !important;
  text-decoration: none;
  background: linear-gradient(
    180deg,
    rgba(69, 128, 162, 0.85) 0%,
    #4580a2 100%
  );
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 20px;
  display: block;

  transition: 150ms ease;

  &:hover {
    transition: 250ms ease;
    background: linear-gradient(
      180deg,
      rgba(143, 183, 207, 0.85) 0%,
      #8fb7cf 100%
    );
  }
`

export default ButtonLink
