import CMS from '@talus-analytics/library.airtable-cms'
import useFooterData from 'cmsHooks/useFooterData'
import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.div`
  width: 100%;
  height: 300px;
  background: ${({ theme }) => theme.veryLightGray};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`
const FooterContent = styled.div`
  width: 1100px;
  max-width: 100%;
`
const Logos = styled.div`
  margin-top: 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
`
const Links = styled.div`
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  margin-left: 85px;

  @media (max-width: 720px) {
    margin-left: 0;
    justify-content: center;
  }
`
const SocialLink = styled.a`
  background-color: ${({ theme }) => theme.ampEidDarkBlue};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  padding: 15px;
`
const NewsletterLink = styled.a`
  background-color: ${({ theme }) => theme.ampEidDarkBlue};
  border-radius: 5px;
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  margin-bottom: 70px;

  &:hover {
    background-color: ${({ theme }) => theme.ampEidMedBlue};
  }
`
const LogoLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`
const GHSSLogo = styled(CMS.Image)`
  height: 70px;
  width: 90%;
  max-width: 590px;
`
const IDEALogo = styled(CMS.Image)`
  height: 84px;
  width: 288px;
`

const Footer = (): JSX.Element => {
  const cmsData = useFooterData()

  const ghssLink = CMS.getText(cmsData, 'GHSS logo link')
  const ideaLink = CMS.getText(cmsData, 'IDEA logo link')
  const twitterLink = CMS.getText(cmsData, 'GHSS twitter link')
  const linkedInLink = CMS.getText(cmsData, 'GHSS linkedin link')
  const newsletterLink = CMS.getText(cmsData, 'GHSS newsletter link')

  return (
    <FooterContainer>
      <FooterContent>
        <Logos>
          <LogoLink href={ghssLink} target="_blank" rel="noreferrer">
            <GHSSLogo
              name="GHSS logo"
              data={cmsData}
              imgStyle={{ objectFit: 'contain' }}
            />
          </LogoLink>
          <LogoLink href={ideaLink} target="_blank" rel="noreferrer">
            <IDEALogo
              name="IDEA logo"
              data={cmsData}
              imgStyle={{ objectFit: 'contain' }}
            />
          </LogoLink>
        </Logos>
        <Links>
          <SocialLink href={twitterLink} target="_blank" rel="noreferrer">
            <CMS.Image
              name="GHSS twitter image"
              data={cmsData}
              imgStyle={{ objectFit: 'contain' }}
            />
          </SocialLink>
          <SocialLink href={linkedInLink} target="_blank" rel="noreferrer">
            <CMS.Image
              name="GHSS linkedin image"
              data={cmsData}
              imgStyle={{ objectFit: 'contain' }}
            />
          </SocialLink>
          <NewsletterLink
            href={newsletterLink}
            target="_blank"
            rel="noreferrer"
          >
            <CMS.Text name="GHSS newsletter text" data={cmsData} />
          </NewsletterLink>
        </Links>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer
