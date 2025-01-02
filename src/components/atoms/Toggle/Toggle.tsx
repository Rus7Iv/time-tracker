import { useState } from 'react'
import styled, { css } from 'styled-components'

type ToggleVariant = 'default' | 'borderless'

export interface IToggleProps {
  variant?: ToggleVariant
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  leftLabel?: React.ReactNode
  rightLabel?: React.ReactNode
  className?: string
}

export const Toggle = ({
  variant = 'default',
  checked = false,
  onChange,
  disabled = false,
  leftLabel = 'Off',
  rightLabel = 'On',
  className,
}: IToggleProps) => {
  const [isChecked, setIsChecked] = useState(checked)

  const handleToggle = () => {
    if (!disabled) {
      const newCheckedState = !isChecked
      setIsChecked(newCheckedState)
      if (onChange) onChange(newCheckedState)
    }
  }

  return (
    <Wrapper className={className}>
      <TextContainer onClick={handleToggle} $disabled={disabled}>
        <Text $position="left">{leftLabel}</Text>
        <Text $position="right">{rightLabel}</Text>
      </TextContainer>
      <ToggleContainer>
        <ToggleSwitch
          $checked={isChecked}
          $disabled={disabled}
          $variant={variant}
        >
          <Slider $checked={isChecked} />
        </ToggleSwitch>
      </ToggleContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 30px;
  width: 100%;
`

const TextContainer = styled.div<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  z-index: 2;
  user-select: none;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
`

const ToggleContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`

const ToggleSwitch = styled.div<{
  $checked: boolean
  $disabled: boolean
  $variant: ToggleVariant
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  transition: background-color 0.3s;

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.6;
    `}

  ${({ $variant }) =>
    $variant === 'default' &&
    css`
      background-color: ${({ theme }) => theme.colors.palegray};
      box-shadow: inset 0 4px 4px 4px ${({ theme }) => theme.colors.creamshadow};
    `}

  ${({ $variant }) =>
    $variant === 'borderless' &&
    css`
      background-color: transparent;
    `}
`

const Slider = styled.div<{ $checked: boolean }>`
  position: absolute;
  width: 50%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.cream};
  border-radius: 15px;
  transition: transform 0.3s;
  z-index: 1;
  transform: ${({ $checked }) =>
    $checked ? 'translateX(100%)' : 'translateX(0)'};
`

const Text = styled.div<{ $position: 'left' | 'right' }>`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.navyblue};
  width: 50%;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  line-height: 30px;
  z-index: 2;

  ${({ $position }) =>
    $position === 'left' &&
    css`
      left: 0;
    `}

  ${({ $position }) =>
    $position === 'right' &&
    css`
      right: 0;
    `}
`
