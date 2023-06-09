import React, { memo } from 'react'
import Papa from 'papaparse'

interface CSVDownloadLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  csvData: { [key: string]: string }[]
}

const CSVDownloadLink = memo(({ csvData, ...props }: CSVDownloadLinkProps) => {
  const csv = Papa.unparse(csvData)

  return (
    <a
      href={`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`}
      download="data.csv"
      {...props}
    >
      Download CSV
    </a>
  )
})

export default CSVDownloadLink
