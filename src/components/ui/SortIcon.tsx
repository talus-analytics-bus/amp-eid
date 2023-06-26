import React from 'react'

enum SortStatus {
  selected,
  reverse,
  unselected,
}

interface SortIconProps extends React.SVGProps<SVGSVGElement> {
  status: SortStatus
}

const SortIcon = ({ status, ...props }: SortIconProps) => {
  let upArrowFill, downArrowFill

  switch (status) {
    case SortStatus.selected:
      upArrowFill = '#D4D8DC'
      downArrowFill = '#D4D8DC'
      break
    case SortStatus.reverse:
      upArrowFill = '#D4D8DC'
      downArrowFill = '#D4D8DC'
      break
    case SortStatus.unselected:
      upArrowFill = '#D4D8DC'
      downArrowFill = '#D4D8DC'
      break
  }

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_1831_13593)">
        <path
          d="M5.83325 11.6666L9.99992 15.8333L14.1666 11.6666H5.83325Z"
          fill={upArrowFill}
        />
        <path
          d="M14.1667 8.33337L10.0001 4.16671L5.83341 8.33337L14.1667 8.33337Z"
          fill={downArrowFill}
        />
      </g>
      <defs>
        <clipPath id="clip0_1831_13593">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default SortIcon
