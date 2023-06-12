import React, { memo } from 'react'
import Papa from 'papaparse'
import ButtonLink from './ButtonLink'

interface CSVDownloadLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  filename: string
  label: React.ReactNode
  data: { [key: string]: string }[]
}

const DownloadIcon = () => (
  <svg
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: '0.5rem' }}
  >
    <path
      d="M11.25 4.75H8.25V0.25H3.75V4.75H0.75L6 10L11.25 4.75ZM0.75 11.5V13H11.25V11.5H0.75Z"
      fill="white"
    />
  </svg>
)

const CSVDownloadLink = memo(
  ({ filename, label, data, ...props }: CSVDownloadLinkProps) => {
    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })

    return (
      <ButtonLink
        href={URL.createObjectURL(blob)}
        download={filename + '.csv'}
        {...props}
      >
        <DownloadIcon />
        {label} (CSV, {Math.round(blob.size / 1024)} kb)
      </ButtonLink>
    )
  }
)

export default CSVDownloadLink
