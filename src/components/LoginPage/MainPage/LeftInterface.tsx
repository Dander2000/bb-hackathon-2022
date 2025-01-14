import React from 'react'
import {
  FormControl,
  FormLabel,
  IconButton,
  Divider
} from '@chakra-ui/react'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  Button
} from '@chakra-ui/react'

import { FaSolarPanel } from 'react-icons/fa'
import { TbWindmill } from 'react-icons/tb'
interface IProps {
  areaType: string,
  quantity: number,
  yieldValue: number,
  handleChangeAreaType: (type: string) => void
  handleChangeQuantity: (e: any) => void
  handleChangeYield: (e: any) => void
}
//TODO retrieve data from backend to display 


const LeftInterface: React.FC<IProps> = ({ handleChangeAreaType, handleChangeQuantity, handleChangeYield, areaType, quantity, yieldValue }) => {
  const [showTooltip, setShowTooltip] = React.useState(false)
  return (
    <div className='fixed w-[300px] top-0 mt-[100px] z-10 flex flex-col mx-16 rounded-lg  bg-gradient-to-b from-white to-neutral-100 shadow-2xl bg-opacity-90'>
      <h1 className='font-semibold text-2xl text-neutral-800 mt-7 mb-5 ml-7'>ul. Jakaśtam 34</h1>
      <div className='flex flex-col justify-center'>
        <FormControl className='flex flex-col mb-7'>
          <FormLabel className='ml-7'>Area Type</FormLabel>
          <div className='flex ml-7 space-x-7'>
            <IconButton
              bgColor='blackAlpha.800'
              color='white'
              variant={'outline'}
              aria-label='Solar Panel'
              icon={<FaSolarPanel />}
              size='lg'
              onClick={() => handleChangeAreaType('solarPanel')}
              className=''
            />
            <IconButton
              bgColor='blackAlpha.800'
              color='white'
              aria-label='Windmill'
              icon={<TbWindmill />}
              size='lg'
              onClick={() => handleChangeAreaType('windmill')}
              className=''
            />
          </div>
        </FormControl>
        {areaType !== '' &&
          <div>
            <Divider className='mb-7' />
            <FormLabel className='ml-7'>{areaType === 'solarPanel' ? 'Surface Area in Square Meters ' : 'Quanity of Windmills'}</FormLabel>
            <NumberInput defaultValue={0} min={0} width={150} className='ml-7 mb-7' onChange={handleChangeQuantity}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </div>
        }
        {quantity > 0 &&
          <div>
            <Divider className='mb-7' />
            <FormLabel className='ml-7'>Yield Guarentee</FormLabel>
            <Slider
              id='slider'
              defaultValue={0}
              min={0}
              max={100}
              width={'80%'}
              className='ml-7 mb-7'
              colorScheme='null'//blackAlpha.800
              onChange={handleChangeYield}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
                25%
              </SliderMark>
              <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
                50%
              </SliderMark>
              <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
                75%
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <Tooltip
                hasArrow
                bg='blackAlpha.800'
                color='white'
                placement='top'
                isOpen={showTooltip}
                label={`${yieldValue}%`}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
          </div>
        }

        {
          yieldValue > 0 && 
          <Button color={'white'} bgColor={'teal.500'} borderTopRadius={0} className="mt-7">
          Add
          </Button>
        }

      </div>

    </div>
  )
}

export default LeftInterface