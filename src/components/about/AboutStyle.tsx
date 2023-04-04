import styled from 'styled-components'
import CMS from '@talus-analytics/library.airtable-cms'

export const H1 = styled.h1`
  ${({ theme }) => theme.h1};
  color: ${({ theme }) => theme.black};
`
export const AboutStyle = styled(CMS.RichText)`
  > h2 {
    ${({ theme }) => theme.h2};
    color: ${({ theme }) => theme.ampEidMedBlue};
  }
  > h3 {
    ${({ theme }) => theme.paragraphMedium};
    color: ${({ theme }) => theme.black};
  }
  > p {
    ${({ theme }) => theme.paragraph};
    color: ${({ theme }) => theme.black};
    margin-bottom: 0;
  }
  > ol {
    margin-top: 0;
    li {
      ${({ theme }) => theme.paragraph};
      color: ${({ theme }) => theme.black};
      ol {
        list-style-type: lower-alpha;
      }
    }
  }
  a {
    color: ${({ theme }) => theme.link};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`
