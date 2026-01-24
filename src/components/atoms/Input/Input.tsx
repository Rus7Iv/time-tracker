import { styled } from 'styled-components'

import { ReactComponent as CrossIcon } from '@/assets/icons/cross.svg'

export const Input = ({
  onChange,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event)
    }
  }

  const handleClear = () => {
    if (onChange) {
      onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
    }
  }

  return (
    <Wrapper className={props.className}>
      <StyledInput {...props} value={props.value} onChange={handleChange} />
      {props.value && (
        <ClearButton
          type="button"
          aria-label="Очистить поле ввода"
          onClick={handleClear}
        >
          <CrossIcon />
        </ClearButton>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledInput = styled.input`
  font-size: 30px;
  border: none;
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.linen};
  color: ${({ theme }) => theme.colors.navyblue};
  border-radius: 100px;
  padding: 0 50px 0 30px;

  &:hover {
    border: none;
    background-color: ${({ theme }) => theme.colors.parchment};
  }

  &:focus-visible {
    outline: none;
    background-color: ${({ theme }) => theme.colors.palegray};
  }
`

const ClearButton = styled.button`
  border: none;
  border-radius: 100px;
  background: none;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 30px;
  top: 50%;
  width: 30px;
  height: 30px;
  padding: 2px;
  transform: translateX(50%) translateY(-50%);
  color: ${({ theme }) => theme.colors.navyblue};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.cream};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.parchment};
  }
`
