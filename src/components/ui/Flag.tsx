import React from 'react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'

interface FlagProps {
  country: {
    data: {
      Country_name: string | null | undefined
    } | null
    flag: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      } | null
    } | null
  } | null
}

const Flag = ({ country }: FlagProps) => {
  const imageData = country?.flag?.childImageSharp?.gatsbyImageData
  const countryName = country?.data?.Country_name

  if (!imageData) throw new Error(`Flag not found for ${countryName}`)

  return (
    <GatsbyImage
      image={imageData}
      alt={`Flag of ${countryName} `}
      style={{
        filter: 'drop-shadow(.5px 0.5px 1px rgba(0, 0, 0, 0.35))',
      }}
    />
  )
}

export default Flag
