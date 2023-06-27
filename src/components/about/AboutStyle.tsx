import styled from 'styled-components'

const AboutStyle = styled.div`
  h1 {
    ${({ theme }) => theme.h1};
    color: ${({ theme }) => theme.black};
  }

  h2 {
    ${({ theme }) => theme.h2};
    color: ${({ theme }) => theme.ampEidMedBlue};
    padding: 30px 0 0 0;
    border-top: 3px solid ${({ theme }) => theme.lightGray};
    margin-top: 30px;
  }

  h3 {
    ${({ theme }) => theme.paragraphMedium};
    color: ${({ theme }) => theme.black};
  }

  p {
    ${({ theme }) => theme.paragraph};
    color: ${({ theme }) => theme.black};
    margin-bottom: 0;
  }

  ol {
    margin-top: 0;

    li {
      ${({ theme }) => theme.paragraph};
      color: ${({ theme }) => theme.black};

      ol {
        ${({ theme }) => theme.paragraph};
        list-style-type: lower-alpha;
      }
    }
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.link};

    &:hover {
      text-decoration: underline;
    }
  }

  em {
    display: block;
    padding-left: 30px;
    padding-right: 30px;
  }
`

export default AboutStyle
