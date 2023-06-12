import React, { memo } from 'react'
import Papa from 'papaparse'
import ButtonLink from './ButtonLink'

interface CSVDownloadLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  filename: string
  label: React.ReactNode
  data: { [key: string]: string }[]
}

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
        {label} (CSV, {Math.round(blob.size / 1024)} kb)
      </ButtonLink>
    )
  }
)

export default CSVDownloadLink
