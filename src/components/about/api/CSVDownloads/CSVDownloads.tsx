import React from 'react'

import CMS from '@talus-analytics/library.airtable-cms'

import useDataAndAPIPageData from 'cmsHooks/useAboutDataAndAPIQuery'
import useTopics from 'queryHooks/useTopics'
import CSVDownloadSelector, { CSVOptions } from './CSVDownloadSelector'

const CSVDownloads = () => {
  const cmsData = useDataAndAPIPageData()
  const topics = useTopics()

  const topicOptions: CSVOptions = {
    'All topics': {
      name: 'All topics',
      link: '/csv/All topics.csv',
    },
  }

  topics.forEach(topic => {
    if (!topic.data?.Topic || topic.data.Disable) return
    topicOptions[topic.data?.Topic] = {
      name: topic.data?.Topic,
      link: `/csv/${topic.data?.Topic}.csv`,
    }
  })

  return (
    <>
      <h2>
        <CMS.Text name="H2 CSV downloads" data={cmsData} />
      </h2>
      <h3>
        <CMS.Text name="H3 topic data CSV" data={cmsData} />
      </h3>
      <CMS.RichText name="Topic data CSV paragraph" data={cmsData} />
      <h3>
        <CMS.Text name="H3 treaty data CSV" data={cmsData} />
      </h3>
      <CMS.RichText name="Treaty data CSV paragraph" data={cmsData} />
      <CSVDownloadSelector options={topicOptions} defaultOption="All topics" />
      <h3>
        <CMS.Text name="H3 document metadata CSV" data={cmsData} />
      </h3>
      <CMS.RichText name="Document metadata CSV paragraph" data={cmsData} />
      <h2>
        <CMS.Text name="H2 API documentation" data={cmsData} />
      </h2>
    </>
  )
}

export default CSVDownloads
