import React, { useState } from 'react'
import Expander, { ExpanderProps } from '@talus-analytics/library.ui.expander'
import styled from 'styled-components'

interface AccordionProps extends Omit<ExpanderProps, 'open'> {
  title: React.ReactNode
  className?: string
  buttonStyle?: React.CSSProperties
  expanderStyle?: React.CSSProperties
  activeButtonStyle?: React.CSSProperties
  buttonProps?: React.ComponentPropsWithoutRef<'button'>
  defaultOpen?: boolean
  openAccordion?: number | null
  setOpenAccordion?: React.Dispatch<React.SetStateAction<number | null>>
  index?: number
}

const Accordion = ({
  title,
  buttonProps,
  activeButtonStyle,
  expanderStyle,
  buttonStyle,
  defaultOpen,
  className,
  openAccordion,
  setOpenAccordion,
  index,
  ...props
}: AccordionProps) => {
  if (!setOpenAccordion || typeof index === 'undefined')
    throw new Error(
      'Accordion component must be wrapped in <AccordionParent/> component'
    )

  return (
    <div key={index}>
      <button
        key={index + 'button'}
        {...buttonProps}
        style={openAccordion === index ? activeButtonStyle : buttonStyle}
        className={className}
        onClick={() => {
          setOpenAccordion(prev => (prev !== index ? index : null))
        }}
      >
        {title}
      </button>
      <Expander
        key={index + 'expander'}
        {...props}
        open={openAccordion === index}
        style={expanderStyle}
      />
    </div>
  )
}

interface AccordionParentProps {
  children: ReturnType<typeof Accordion>[]
}

export const AccordionParent = ({ children }: AccordionParentProps) => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0)

  const childrenWithProps = React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      openAccordion,
      setOpenAccordion,
      index,
      key: index,
      ...child.props,
    })
  )

  return <>{childrenWithProps}</>
}

export default Accordion
