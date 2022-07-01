import { Input } from '@chakra-ui/react'

const InputBox = ({ value, valueInput, placeholder }) => {
    return (
        <Input
            size='xs'
            placeholder={placeholder}
            variant='outline' 
            type="text"
            value={value}
            onChange={valueInput}
          />
    )
}

export default InputBox;