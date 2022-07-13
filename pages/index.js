import Head from 'next/head'
import Header from '../components/Header.jsx'
import {
  Box, 
  Heading,
  Text,
  OrderedList,
  ListItem,
  ListIcon,
  Divider,
  Input,
  InputRightElement,
  InputGroup,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Alert,
  AlertTitle,
  AlertDescription,
  UnorderedList,
  FormControl,
  MenuItem,
  MenuList,
  MenuButton,
  Menu,
  FormLabel,
  useToast,
  Select,
  AlertIcon,
  Link,
  Spinner
} from '@chakra-ui/react'
import { FaArrowCircleUp, FaCheckCircle, FaClock, FaEye, FaFileUpload, FaFilter, FaPlusCircle, FaSearch } from 'react-icons/fa'
import { useRef, useState, useEffect } from 'react'
import useWindowSize from '../components/getWindowSize.js'
import Confetti from 'react-confetti'
import PostCard from '../components/Card.jsx'
import { supabase } from '../components/Supabase.js'

export default function Home() {

  const [loading, setLoading] = useState()
  const [posts, setPosts] = useState([])

  useEffect( async () => {
    setLoading(true)

    if (!supabase) return;

    let { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .then((posts) => {
      setPosts(posts.body)
      setLoading(false)
    })
  }, [])
  

  async function uploadLogo() {
    setImageLogo(formInputFile.current.files[0].name)
    setImageId(String(formInputFile.current.files[0].name)+"_"+Date.now())

    const options = {
      method: 'PUT',
      headers: {
        AccessKey: '8013554c-b72f-4f8c-b145e743902f-13fb-4829',
        'Content-Type': 'application/octet-stream'
      }
    };
    
    fetch(`https://storage.bunnycdn.com/coinlookout/post-images/${imageId}`, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [imageLogo, setImageLogo] = useState("")
  const [imageId, setImageId] = useState("")
  const [confetti, setConfetti] = useState(false)
  const [validating, setValidating] = useState(false)
  const [postBody, setPostBody] = useState("")
  const [step, setStep] = useState(0)
  const [chain, setChain] = useState("")
  const [title, setTitle] = useState("")
  const postForm = useRef()
  const formInputFile = useRef()
  const toast = useToast();
  const { width, height } = useWindowSize();

  function submitForm() {
    console.log("submitted")
  }

  useEffect(() => {
    let param = new URL(window.location.href).searchParams.get("transactionHash")
    if (param != null) {
      toast({
        title: "Congratulations 🎉",
        description: "Your post will go live in our Telegram channel and on this page within the next 60 seconds!",
        status: "success",
        position: "top-end",
        duration: 15000,
        isClosable: true,
      })
      setConfetti(true)
    }
  }, [])
  

  return (
    <div>
      <Head>
        <title>CoinLookout - Find New Gems, Share Your Token, and More!</title>
        <meta name="description" content="Find new gems in the market daily, share your token for all of our users to see, or check what's trending today - all on CoinLookout!" />
        <meta name="keywords" content="pseudocode editor,pseudocode editor online,pseudo code editor software,write pseudocode editor,pseudocode text editor,download pseudo code editor,editor for pseudocode,pseudo code editor for mac,pseudocode editor free,pseudo code editor download free" />
        
        <meta name="twitter:title" content="CoinLookout - Find New Gems, Share Your Token, and More!" />
        <meta name="twitter:description" content="Find new gems in the market daily, share your token for all of our users to see, or check what's trending today - all on CoinLookout!" />
        <meta name="twitter:image" content="/CL-512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        
        <meta property="og:title" content="CoinLookout - Find New Gems, Share Your Token, and More!" />
        <meta property="og:description" content="Find new gems in the market daily, share your token for all of our users to see, or check what's trending today - all on CoinLookout!" />
        <meta property="og:image" content="/CL-512.png" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta property='og:locale' content='en_US' />
        
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="canonical" href="https://coinlookout.app/" />

        <meta charSet='utf-8' />
        <meta name="theme-color" content="#1A202C" />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />

        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white-translucent" />

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Header />
      {confetti ? <Confetti
          width={width}
          recycle={false}
          onConfettiComplete={() => setConfetti(false)}
          height={height}
        /> : null}
      <main className='container px-3 d-flex flex-column justify-content-center align-items-center pt-5'>
        <Box width={728} height={90} display='flex' justifyContent={'center'} alignItems='center' border={'1px solid hsla(240,4%,46%,.3)'}>Ad</Box>
        <div className='d-flex flex-xl-row flex-column justify-content-xl-between mt-4 pt-5 w-100'>
          <div className='col-xl-4 col-12 pr-xl-3 pr-0 mb-3 mb-xl-0'>
            <Box p={6} w='100%' borderRadius='7.5px' border={'1px solid hsla(240,4%,46%,.3)'} backgroundColor={'hsla(240,4%,46%,.2)'}>
              <Heading as="h2" fontSize={'xl'} fontWeight='500'>
                🔥 Trending
              </Heading>
              <OrderedList className='mt-3 pl-0 ml-2' listStyleType={'none'}>
                <ListItem fontSize={'large'} className="mb-2">
                  <span className='d-flex flex-row w-100 mt-2 align-items-center justify-content-between'><div><span className='mr-3'>1</span><span className='mr-3'>Farm The Dip</span></div><div className='d-flex align-items-center'><ListIcon as={FaEye} fontSize='15px' /><span className='ml-1'>434</span></div></span>
                </ListItem>
                <ListItem fontSize={'large'} className="mb-2">
                  <span className='d-flex flex-row w-100 mt-2 align-items-center justify-content-between'><div><span className='mr-3'>2</span><span className='mr-3'>Volcano Token</span></div><div className='d-flex align-items-center'><ListIcon as={FaEye} fontSize='15px' /><span className='ml-1'>234</span></div></span>
                </ListItem>
                <ListItem fontSize={'large'} className="mb-2">
                <span className='d-flex flex-row w-100 mt-2 align-items-center justify-content-between'><div><span className='mr-3'>3</span><span className='mr-3'>Trident Token</span></div><div className='d-flex align-items-center'><ListIcon as={FaEye} fontSize='15px' /><span className='ml-1'>87</span></div></span>
                </ListItem>
              </OrderedList>
            </Box>
          </div>
          <div className='col-xl-4 col-12 pr-xl-3 pr-0 mb-3 mb-xl-0'>
            <Box p={6} w='100%' borderRadius='7.5px' border={'1px solid hsla(240,4%,46%,.3)'} backgroundColor={'hsla(240,4%,46%,.2)'}>
              <Heading as="h2" fontSize={'xl'} fontWeight='500'>
                🔝 Most Upvoted
              </Heading>
              <OrderedList className='mt-3 pl-0 ml-2' listStyleType={'none'}>
                <ListItem fontSize={'large'} className="mb-2">
                  <span className='d-flex flex-row w-100 mt-2 align-items-center justify-content-between'><div><span className='mr-3'>1</span><span className='mr-3'>Farm The Dip</span></div><div className='d-flex align-items-center'><ListIcon as={FaArrowCircleUp} fontSize='15px' /><span className='ml-1'>434</span></div></span>
                </ListItem>
                <ListItem fontSize={'large'} className="mb-2">
                  <span className='d-flex flex-row w-100 mt-2 align-items-center justify-content-between'><div><span className='mr-3'>2</span><span className='mr-3'>Volcano Token</span></div><div className='d-flex align-items-center'><ListIcon as={FaArrowCircleUp} fontSize='15px' /><span className='ml-1'>234</span></div></span>
                </ListItem>
                <ListItem fontSize={'large'} className="mb-2">
                <span className='d-flex flex-row w-100 mt-2 align-items-center justify-content-between'><div><span className='mr-3'>3</span><span className='mr-3'>Trident Token</span></div><div className='d-flex align-items-center'><ListIcon as={FaArrowCircleUp} fontSize='15px' /><span className='ml-1'>87</span></div></span>
                </ListItem>
              </OrderedList>
            </Box>
          </div>
          <div className='col-xl-4 col-12 pr-0 mb-3 mb-xl-0'>
            <Box p={6} w='100%' borderRadius='7.5px' border={'1px solid hsla(240,4%,46%,.3)'} backgroundColor={'hsla(240,4%,46%,.2)'}>
              <Heading as="h2" fontSize={'xl'} fontWeight='500'>
                🆕 New Posts
              </Heading>
              <OrderedList className='mt-3 pl-0 ml-2' listStyleType={'none'}>
                <ListItem fontSize={'large'} className="mb-2">
                  <span className='d-flex flex-row w-100 mt-2 align-items-center justify-content-between'><div><span className='mr-3'>1</span><span className='mr-3'>Farm The Dip</span></div><div className='d-flex align-items-center'><ListIcon as={FaClock} fontSize='15px' /><span className='ml-1'>15 Mins</span></div></span>
                </ListItem>
                <ListItem fontSize={'large'} className="mb-2">
                  <span className='d-flex flex-row w-100 mt-2 align-items-center justify-content-between'><div><span className='mr-3'>2</span><span className='mr-3'>Volcano Token</span></div><div className='d-flex align-items-center'><ListIcon as={FaClock} fontSize='15px' /><span className='ml-1'>2 Hours</span></div></span>
                </ListItem>
                <ListItem fontSize={'large'} className="mb-2">
                <span className='d-flex flex-row w-100 mt-2 align-items-center justify-content-between'><div><span className='mr-3'>3</span><span className='mr-3'>Trident Token</span></div><div className='d-flex align-items-center'><ListIcon as={FaClock} fontSize='15px' /><span className='ml-1'>9 Hours</span></div></span>
                </ListItem>
              </OrderedList>
            </Box>
          </div>
        </div>
        <div className='w-100 mt-4 mb-4'><Divider height={0} orientation='horizontal' /></div>
        <div className='d-flex w-100 flex-row justify-content-start'>
          <Box flex={9}>
            <InputGroup w='100%'>
              <Input placeholder='Search for a post...' />
              <InputRightElement><FaSearch /></InputRightElement>
            </InputGroup>
          </Box>
          <Box flex={2} flexDirection='row' display={'flex'}><Box className='mx-3' style={{ width:'fit-content' }}>
            <IconButton icon={<FaFilter />} />
          </Box>
          <Box>
          <Button id="Post" onClick={onOpen} leftIcon={<FaPlusCircle />} borderRadius={'50px'} colorScheme='blue'>
            Create Post
          </Button> 
          </Box></Box> 
            <Modal scrollBehavior='inside' size={'lg'} isCentered isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent mx={{ base:5, md:0 }} backgroundColor={'#3f3f46'}>
                <ModalHeader>Create a Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody id='modal-post'>
                  <Alert borderRadius={'0.375rem'} className="d-flex flex-column align-items-start justify-content-start">
                    <AlertTitle fontWeight={600} mb={3} as="h3">
                      Why post on CoinLookout?
                    </AlertTitle>
                    <AlertDescription>
                      <UnorderedList className='mx-0 pl-0' listStyleType={'none'}>
                        <ListItem lineHeight={6} fontSize='md'>
                          <ListIcon as={FaCheckCircle} mb={'2px'} color={'blue.200'} fontSize='md' mr={3} />
                          Promote your project to <Text as="span" fontWeight={600}>100s of daily users</Text> waiting for new posts.
                        </ListItem>
                        <ListItem lineHeight={6} mt={2} fontSize='md'>
                          <ListIcon as={FaCheckCircle} mb={'3px'} color={'blue.200'} fontSize='md' mr={3} />
                          List your post <Text as="span" fontWeight={600}>instantly</Text>, increasing your project&apos;s reach!
                        </ListItem>
                        <ListItem lineHeight={6} mt={2} fontSize='md'>
                          <ListIcon as={FaCheckCircle} mb={'3px'} color={'blue.200'} fontSize='md' mr={3} />
                          Your listing will shared instantly in our Telegram group with over <Text as="span" fontWeight={600}>1,000 members</Text>!
                        </ListItem>
                      </UnorderedList>
                    </AlertDescription>
                  </Alert>
                  <div className="w-100 px-3"><Divider height={'0px!important'} my={8} /></div>
                <form style={{ pointerEvents: step == 0 ? 'auto' : 'none', opacity: step == 0 ? '1' : '0.5' }} onSubmit={(e) => { e.preventDefault(); setStep(1)}} id="postFormValidate">
                  <FormControl isRequired>
                    <FormLabel mb={2}>Post Image:</FormLabel>
                      <Button rightIcon={<FaFileUpload />} onClick={() => { typeof window !== "undefined" ? document.getElementById("formInputFile").click() : null }} type="button" colorScheme={'blue'}>
                        Upload Image
                      </Button>
                      {imageLogo.length > 0 ? <Text fontSize={'small'} mt={3} opacity='0.75'>{imageLogo}</Text> : <Text fontSize={'small'} color='yellow.300' mt={3} opacity='0.75'>Make sure you add an image for your post!</Text>}
                      <Input
                        type="file"
                        id='formInputFile'
                        display={'none'}
                        onChange={uploadLogo}
                        ref={formInputFile}
                        accept=".jpg, .jpeg, .png"
                        height={0}
                        width={0}
                        opacity={0}
                      />
                  </FormControl>
                  <FormControl mt={6} isRequired>
                    <FormLabel mb={2}>Post Title:</FormLabel>
                      <Input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={"Post Title..."}
                      />
                  </FormControl>
                  <FormControl mt={6} isRequired>
                    <FormLabel mb={2}>Chain:</FormLabel>
                    <Select onChange={(e) => setChain(e.target.value)}>
                      <option value='option1'>BSC</option>
                      <option value='option2'>Ethereum</option>
                      <option value='option3'>Avalanche</option>
                      <option value='option4'>Polygon</option>
                    </Select>
                  </FormControl>
                  <FormControl mt={6} isRequired>
                    <FormLabel mb={2}>Post Body:</FormLabel>
                    <Input
                        type="text"
                        placeholder={"Post Body..."}
                        as="textarea" 
                        resize={'vertical'}
                        onChange={(e) => setPostBody(e.target.value)}
                        p={4}
                        minHeight={150}
                      />
                  </FormControl>
                </form>
                <form action="https://checkout.8pay.network/" method='POST' id="postForm">
                  <input type="hidden" name="type" value="one_time" />
                  <input type="hidden" name="description" value="CoinLookout Post" />
                  <input type="hidden" name="token" value="BUSD" />
                  <input type="hidden" name="receivers[0]" value="0x96f06F35342db05C27Bc6426fD2B1402356aF34F" />
                  <input type="hidden" name="amounts[0]" value="1" />
                  <input type="hidden" name="category" value="Business" />
                  <input type="hidden" name="webhook" value="http://localhost:4242/webhook" />
                  <input type="hidden" name="extra[body]" value={JSON.stringify(postBody)} />
                  <input type="hidden" name="extra[chain]" value={String(chain)} />
                  <input type="hidden" name="extra[title]" value={String(title)} />
                  <input type="hidden" name="extra[image]" value={String(imageId)} />
                  <input type="hidden" name="callbackSuccess" value="http://localhost:3000/" />
                  <input type="hidden" name="callbackError" value="http://localhost:3000/" />
              </form>
                </ModalBody>
                <ModalFooter justifyContent={'space-between'}>
                  {step == 0 ? <><Text fontSize={'lg'}><Text as="span" fontWeight={600}>Posting Fee:</Text> 15 BUSD</Text>
                  <Button variant='solid' form='postFormValidate' type='submit' colorScheme={'yellow'}>Continue</Button></> : <>
                    <div className='d-flex flex-column'><div className="d-flex flex-row align-items-center justify-content-between"><Text fontSize={'lg'}><Text as="span" fontWeight={600}>Posting Fee:</Text> 15 BUSD</Text>
                    <Button className='pulsing' variant='solid' form='postForm' type="submit" colorScheme={'yellow'}>Pay and Post</Button></div>
                    <Alert status="warning" borderRadius={'0.375rem'} mt={4}><AlertDescription>If the &quot;Pay&quot; button on the next page is disabled, ensure you are using either <Link href="https://metamask.io/" color={'blue.300'} className="saveColor" rel="nofollow noreferrer">MetaMask</Link> or another connected wallet and you&apos;re <Link color={'blue.300'} className="saveColor" href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain" rel='nofollow noreferrer'>connected to Binance Smart Chain</Link>.</AlertDescription></Alert>
                    </div>
                  </>}
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        <div className="mt-4 w-100">
          {loading ? <div className="d-flex w-100 justify-content-center mt-4"><Spinner size="lg" mx="auto" /></div> : posts.map((item,i,array) => <div key={i}><PostCard slug={item["slug"]} score={item["votes"]} chain={item["chain"]} title={item["title"]} date={parseInt(Date.now() - item["posted_at"]) / 1000 / 60 / 60 < 24 ? `${String(parseInt(Date.now() - item["posted_at"]) / 1000 / 60 / 60)} Hours Ago` : Math.floor(parseInt(Date.now() - item["posted_at"]) / 1000 / 60 / 60 / 24) == 1 ? `${String(Math.floor(parseInt(Date.now() - item["posted_at"]) / 1000 / 60 / 60 / 24))} Day Ago` : `${String(Math.floor(parseInt(Date.now() - item["posted_at"]) / 1000 / 60 / 60 / 24))} Days Ago`} description={String(item["body"]).substring(0, 230).trimEnd() + "..."} /></div>)}
        </div>
      </main>
    </div>
  )
}