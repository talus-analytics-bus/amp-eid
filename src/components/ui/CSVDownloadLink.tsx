import React, { memo } from 'react'
import Papa from 'papaparse'
import ButtonLink from './ButtonLink'

interface CSVDownloadLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  label: React.ReactNode
  csvData: { [key: string]: string }[]
}

const CSVDownloadLink = memo(
  ({ label, csvData, ...props }: CSVDownloadLinkProps) => {
    const csv = Papa.unparse(csvData)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })

    return (
      <ButtonLink
        href={URL.createObjectURL(blob)}
        download="data.csv"
        {...props}
      >
        {label} (CSV, {Math.round(blob.size / 1024)} kb)
      </ButtonLink>
    )
  }
)

export default CSVDownloadLink
