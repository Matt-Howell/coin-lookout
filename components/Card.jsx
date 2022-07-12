import {
    Box,
    Heading,
    Text,
    Badge,
    IconButton,
    Button,
    Link
  } from '@chakra-ui/react';
  import { FaArrowDown, FaArrowUp, FaFlag, FaShare } from 'react-icons/fa'
  
  export default function postCard(props) {
    return (
      <Box className='mb-4 d-flex flex-row w-100' backgroundColor={'hsla(240,4%,46%,.2)'} borderRadius='7.5px' border='1px solid hsla(240,4%,46%,.3)'>
        <Box borderRadius='7.5px 0px 0px 7.5px' display={'flex'} justifyContent='center' flexDirection='column' backgroundColor={'hsla(240,4%,46%,.5)'} p={6}>
           <Box display={'flex'} justifyContent='center' flexDirection='column' width={'fit-content'}>
            <IconButton icon={<FaArrowUp />} />
            <Text as="span" textAlign={'center'} fontWeight={600} fontSize='lg' my={3}>{props.score}</Text>
            <IconButton icon={<FaArrowDown />} />
           </Box>
        </Box>
        <Box flex={2} p={6}>
            <Box display={'flex'} flexDirection='column'>
                <Text mb={1} opacity='0.6' fontSize={'sm'}>{props.date}</Text>
                <Heading display={'flex'} justifyContent='start' alignItems={'center'} fontSize={'xl'} lineHeight='1.5' fontWeight={500}>
                    <Link className='remainHover' href='/posts/8894'>{props.title}</Link> <Badge fontSize={'md'} fontWeight={500} letterSpacing={'0.5px'} ml={2} colorScheme={props.chain == "BSC" ? 'yellow' : props.chain == "ETH" ? 'blue' : props.chain == "AVAX" ? 'red' : props.chain == "Polygon" ? 'purple' : null}>{props.chain}</Badge>
                </Heading>
                <Text mt={2} opacity='0.8' fontSize={'md'}>{props.description}</Text>
                <Box mt={4} className="d-flex flex-row">
                    <Box>
                        <Button fontSize={'md'} fontWeight={500} leftIcon={<FaShare />}>
                            Share
                        </Button>
                    </Box>
                    <Box ml={2}>
                        <Button fontSize={'md'} fontWeight={500} leftIcon={<FaFlag />}>
                            Report
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
      </Box>
    );
  }