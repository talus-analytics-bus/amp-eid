import React from 'react'
import Expander, { ExpanderProps } from '@talus-analytics/library.ui.expander'
import { DefaultTheme, StyledComponent } from 'styled-components'

interface AccordionProps extends Omit<ExpanderProps, 'open' | 'floating'> {
  renderButton: (
    open: boolean,
    animDuration: number
  ) => React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>
  openIndex?: number | null
  setOpenIndex?: React.Dispatch<React.SetStateAction<number | null>>
  index?: number
  animDuration?: number
}

const Accordion = ({
  openIndex,
  setOpenIndex,
  renderButton,
  animDuration = 250,
  index,
  ...props
}: AccordionProps) => {
  if (!setOpenIndex || typeof index === 'undefined')
    throw new Error(
      'Accordion component must be wrapped in <AccordionParent/> component'
    )

  const open = openIndex === index

  // render the renderButton render props function,
  // and clone it with the new props we need
  const Button = renderButton(open ?? false, animDuration)
  const buttonWithProps = React.cloneElement(Button, {
    'aria-expanded': open ? 'true' : 'false',
    key: index + 'button',
    onClick: () => {
      setOpenIndex(prev => (prev !== index ? index : null))
    },
    ...Button.props,
  })

  // check if we're being passed the right kind
  // of element in the render prop function
  if (
    // standard react elements will have type as a string
    (typeof buttonWithProps.type === 'string' &&
      buttonWithProps.type !== 'button') ||
    // styled components have type.target
    (typeof buttonWithProps.type === 'object' &&
      (buttonWithProps.type as StyledComponent<'button', DefaultTheme>)
        .target !== 'button')
  ) {
    const type =
      (typeof buttonWithProps.type === 'string' && buttonWithProps.type) ||
      (typeof buttonWithProps.type === 'object' &&
        (buttonWithProps.type as { target: string }).target)
    throw new Error(
      `renderButton render prop in dropdown ` +
        `must render a button element for accessibility. ` +
        `Element type found was ${type}.`
    )
  }

  return (
    <React.Fragment key={index}>
      {buttonWithProps}
      <Expander
        key={index + 'expander'}
        {...props}
        open={openIndex === index}
      />
    </React.Fragment>
  )
}

interface AccordionParentProps {
  children: ReturnType<typeof Accordion>[]
  openIndex: number | null
  setOpenIndex: React.Dispatch<React.SetStateAction<number | null>>
}

export const AccordionParent = ({
  children,
  openIndex,
  setOpenIndex,
}: AccordionParentProps) => {
  // const [openAccordion, setOpenAccordion] = useState<number | null>(0)

  const childrenWithProps = React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      openIndex,
      setOpenIndex,
      index,
      key: index,
      ...child.props,
    })
  )

  return <>{childrenWithProps}</>
}

export default Accordion