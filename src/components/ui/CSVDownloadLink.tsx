import React, { memo } from 'react'
import Papa from 'papaparse'

interface CSVDownloadLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  csvData: { [key: string]: string }[]
}

const CSVDownloadLink = memo(({ csvData, ...props }: CSVDownloadLinkProps) => {
  const csv = Papa.unparse(csvData)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })

  return (
    <a href={URL.createObjectURL(blob)} download="data.csv" {...props}>
      Download CSV ({Math.round(blob.size / 1024)} kb)
    </a>
  )
})

export default CSVDownloadLink
