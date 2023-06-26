import React from 'react'

enum SortStatus {
  selected,
  reverse,
  unselected,
}

interface SortIconProps extends React.SVGProps<SVGSVGElement> {
  status: SortStatus
}

const SortIcon = ({ status, ...props }: SortIconProps) => (
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
        fill={(() => {
          switch (status) {
            case SortStatus.selected:
              return '#D4D8DC'
            case SortStatus.reverse:
              return '#D4D8DC'
            default:
              return '#D4D8DC'
          }
        })()}
      />
      <path
        d="M14.1667 8.33337L10.0001 4.16671L5.83341 8.33337L14.1667 8.33337Z"
        fill="#D4D8DC"
      />
    </g>
    <defs>
      <clipPath id="clip0_1831_13593">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export default SortIcon
