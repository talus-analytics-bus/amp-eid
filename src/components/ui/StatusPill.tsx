import styled from 'styled-components'

export enum Status {
  Party = 'Party',
  Member = 'Member',
  Observer = 'Observer',
  Signatory = 'Signatory',
  'Non-party' = 'Non-party',
  'Associate Member' = 'Associate Member',
}

export function isStatus(status: string | null | undefined): status is Status {
  return Object.values(Status).includes(status as Status)
}

const StatusPill = styled.span<{ status: Status }>`
  padding: 2px 10px;
  border-radius: 15px;
  background: ${({ theme, status }) =>
    ({
      [Status.Party]: theme.option3Lighter,
      [Status.Member]: theme.option1Lighter,
      [Status.Observer]: theme.option1Lighter,
      [Status.Signatory]: theme.option4Lighter,
      [Status['Non-party']]: theme.option5Lighter,
      [Status['Associate Member']]: theme.option2Lighter,
    }[status] ?? theme.veryLightGray)};
`

export default StatusPill
