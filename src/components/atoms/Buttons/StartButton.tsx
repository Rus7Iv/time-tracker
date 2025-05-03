import { styled } from 'styled-components'

import { Square, Triangle } from '../Shapes'

type ToggleTimerVariants = 'start' | 'end'

interface ToggleTimerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ToggleTimerVariants
}

export const StartButton = ({
  variant = 'start',
  ...props
}: ToggleTimerProps) => {
  const isStartVariant = variant === 'start'
  return (
    <StyledStartButton $variant={variant} {...props}>
      {props.children || (isStartVariant ? <Triangle /> : <Square />)}
    </StyledStartButton>
  )
}

const StyledStartButton = styled.button<{ $variant: ToggleTimerVariants }>`
  min-width: 80px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ theme, $variant }) =>
    $variant === 'start' ? theme.colors.gradientpink : theme.colors.red};
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  position: relative;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px
      ${({ theme, $variant }) =>
        $variant === 'start' ? theme.colors.pink : theme.colors.red};
  }

  &:active {
    transform: scale(0.98);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover::after {
    opacity: 1;
  }
`
