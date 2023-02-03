import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'

const Thumbnail = styled(GatsbyImage)`
  flex-shrink: 0;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 2px;
`
export default Thumbnail
