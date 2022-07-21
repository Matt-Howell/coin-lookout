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
  MenuList,
  MenuButton,
  Menu,
  FormLabel,
  useToast,
  Select,
  AlertIcon,
  Link,
  Spinner,
  MenuItemOption,
  MenuOptionGroup,
  Skeleton
} from '@chakra-ui/react'
import { FaArrowCircleUp, FaCheckCircle, FaClock, FaFileUpload, FaFilter, FaFire, FaPlusCircle, FaSearch } from 'react-icons/fa'
import { useRef, useState, useEffect } from 'react'
import useWindowSize from '../components/getWindowSize.js'
import Confetti from 'react-confetti'
import Footer from '../components/Footer.jsx'
import PostCard from '../components/Card.jsx'
import { supabase } from '../components/Supabase.js'
import InfiniteScroll from 'react-infinite-scroll-component';
import Head from 'next/head'

export default function Home() {

  const [loading, setLoading] = useState()
  const [loadingMenus, setLoadingMenus] = useState()
  const [unchanged, setUnchanged] = useState(false)
  const [viewState, setViewState] = useState("new")
  const [posts, setPosts] = useState([])
  const [postsTrending, setPostsTrending] = useState([])
  const [postsNew, setPostsNew] = useState([])
  const [postsHighest, setPostsHighest] = useState([])

  useEffect( async () => {
    setLoading(true)
    setLoadingMenus(true)

    if (!supabase) return;

    let { data: menuTrending, errorTrending } = await supabase
    .from('posts')
    .select('*')
    .range(0, 2)
    .gte("posted_at", String(parseInt(Date.now()) - 259200000))
    .order("votes", { ascending: false }) 
    .then( async (posts) => {
      setPostsTrending(posts.body)
      let { data: menuHighest, errorHighest } = await supabase
      .from('posts')
      .select('*')
      .range(0, 2)
      .order("votes", { ascending: false })
      .then( async (postsB) => {
        setPostsHighest(postsB.body)
        let { data: menuNew, errorNew } = await supabase
        .from('posts')
        .select('*')
        .range(0, 2)
        .order("posted_at", { ascending: false }) 
        .then( async (postsC) => {
          setPostsNew(postsC.body)
          setLoadingMenus(false)
          let { data: postsD, error } = await supabase
          .from('posts')
          .select('*')
          .range(0, 9)
          .order("posted_at", { ascending: false }) 
          .then((postsD) => {
            setPosts(postsD.body)
            setLoading(false)
            setUnchanged(false)
          })
        })
       })
     })
  }, [])

  async function recall() {
    setLoading(true)

    if (!supabase) return;

    let { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .range(0, 9)
    .order("posted_at", { ascending: false }) 
    .then((posts) => {
      setPosts(posts.body)
      setLoading(false)
      setUnchanged(false)
    })
  }

  async function addData() {
    if (!supabase) return;

    if(viewState == "new"){
      let { data: fetched, error } = await supabase
      .from('posts')
      .select('*')
      .range(posts.length - 1, posts.length + 8)
      .order("posted_at", { ascending: false }) 
      .then((fetched) => {
        let postsBefore = posts.length;
        let newArray = []
        for (let index = 0; index < fetched.body.length; index++) {
          newArray.push(fetched.body[index])
        }
        setPosts(posts.concat(newArray))
        let postsAfter = posts.length;
        if (postsAfter == postsBefore) {
          setUnchanged(true)
        }
      })
    } else if(viewState == "trending"){
      let { data: fetched, error } = await supabase
      .from('posts')
      .select('*')
      .range(posts.length - 1, posts.length + 8)
      .order("votes", { ascending: false }) 
      .then((fetched) => {
        let postsBefore = posts.length;
        let newArray = []
        for (let index = 0; index < fetched.body.length; index++) {
          newArray.push(fetched.body[index])
        }
        setPosts(posts.concat(newArray))
        let postsAfter = posts.length;
        if (postsAfter == postsBefore) {
          setUnchanged(true)
        }
      })
    }
  }

  async function setView(view) {
    setLoading(true)
    setViewState(view)

    if (!supabase) return;

    if(view == "trending"){
      let { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .range(0, 9)
      .order("votes", { ascending: false }) 
      .then((posts) => {
        setPosts(posts.body)
        setLoading(false)
        setUnchanged(false)
      })
    }
    if(view == "new"){
      let { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .range(0, 9)
      .order("posted_at", { ascending: false }) 
      .then((posts) => {
        setPosts(posts.body)
        setLoading(false)
        setUnchanged(false)
      })
    }
  }

  async function searchPosts(query){
    console.log(query)
    let { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .textSearch("title", `'${query}' & '${String(query).toLowerCase()}'`)
    .order("posted_at", { ascending: false }) 
    .then((posts) => {
      if(query == ""){
        recall();
      } else {
        setPosts(posts.body)
        console.log(posts.body)
      }
    })
  }

  async function uploadLogo() {
    setImageLogo(formInputFile.current.files[0].name)
    setImageId(String(Date.now())+"_"+formInputFile.current.files[0].name)

    const options = {
      method: 'PUT',
      headers: {
        AccessKey: '2a10768f-558b-4067-aaba68024571-abad-4027',
        'Content-Type': 'application/octet-stream'
      },
      body: formInputFile.current.files[0]
    };
 
    fetch(`https://storage.bunnycdn.com/clookout/posts/${String(Date.now())+"_"+formInputFile.current.files[0].name}`, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

  }
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [imageLogo, setImageLogo] = useState("")
  const [imageId, setImageId] = useState("")
  const [confetti, setConfetti] = useState(false)
  const [postBody, setPostBody] = useState("")
  const [step, setStep] = useState(0)
  const [chain, setChain] = useState("BSC")
  const [title, setTitle] = useState("")
  const formInputFile = useRef()
  const toast = useToast();
  const { width, height } = useWindowSize();

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
        <meta charSet='utf-8' />
        <meta name="theme-color" content="#1A202C" />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />

        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white-translucent" />

        <title>CoinLookout - Find New Gems, Share Your Token, and More!</title>
        <meta name="description" content="Find new gems in the market daily, share your token for all of our users to see, or check what's trending today - all on CoinLookout!" />
        
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

        <link rel="canonical" href="https://coinlookout.app/" />

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-193733109-8"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'UA-193733109-8');
            `
          }}
        />
      </Head>
      <Header />
      {confetti ? <Confetti
          width={width}
          recycle={false}
          onConfettiComplete={() => setConfetti(false)}
          height={height}
        /> : null}
      <main className='container px-3 d-flex flex-column justify-content-center align-items-center py-5'>
        {typeof window === 'undefined' || width>992 ? <iframe data-aa='2049277' src='//ad.a-ads.com/2049277?size=728x90' style={{ width:728, height:90, border:0, padding:0, overflow:'hidden', backgroundColor: 'transparent' }}></iframe> : null}
        {typeof window === 'undefined' || width<992? <iframe data-aa='2049286' src='//ad.a-ads.com/2049286?size=300x250' style={{ width:300, height:250, border:0, padding:0, overflow:'hidden', backgroundColor: 'transparent' }}></iframe> : null}
        <div className='d-flex flex-xl-row flex-column justify-content-xl-between mt-4 pt-5 w-100'>
        <div className='col-xl-4 col-12 pr-xl-3 pr-0 mb-3 mb-xl-0'>
            <Skeleton minHeight={195} borderRadius={'7.5px'} isLoaded={!loadingMenus}><Box minHeight={195} p={6} w='100%' borderRadius='7.5px' border={'1px solid hsla(240,4%,46%,.3)'} backgroundColor={'hsla(240,4%,46%,.2)'}>
              <Heading as="h2" fontSize={'xl'} fontWeight='500'>
                🔥 Trending
              </Heading>
              <OrderedList className='mt-3 pl-0 ml-2' listStyleType={'none'}>
                {postsTrending.length > 0 ? postsTrending.map((value, index, array) => <ListItem key={index} fontSize={'large'} className="mb-2"><span className='d-flex flex-row w-100 mt-2 align-items-center justify-content-between'><div><span className='mr-3'>{String(index + 1)}</span><span className='mr-3'><Link color={'blue.300'} href={`/posts/${value['slug']}`}>{String(value["title"]).substring(0, 11)}...</Link></span></div><div className='d-flex align-items-center'><ListIcon as={FaFire} fontSize='15px' /><span className='ml-1'>{value["votes"]}</span></div></span></ListItem>) : null}
              </OrderedList>
            </Box>
          </Skeleton></div>
          <div className='col-xl-4 col-12 pr-xl-3 pr-0 mb-3 mb-xl-0'><Skeleton minHeight={195} borderRadius={'7.5px'} isLoaded={!loadingMenus}>
            <Box minHeight={195} p={6} w='100%' borderRadius='7.5px' border={'1px solid hsla(240,4%,46%,.3)'} backgroundColor={'hsla(240,4%,46%,.2)'}>
              <Heading as="h2" fontSize={'xl'} fontWeight='500'>
                🔝 Most Upvoted
              </Heading>
              <OrderedList className='mt-3 pl-0 ml-2' listStyleType={'none'}>
                {postsHighest.length > 0 ? postsHighest.map((value, index, array) => <ListItem key={index} fontSize={'large'} className="mb-2"><span className='d-flex flex-row w-100 mt-2 align-items-center justify-content-between'><div><span className='mr-3'>{String(index + 1)}</span><span className='mr-3'><Link color={'blue.300'} href={`/posts/${value['slug']}`}>{String(value["title"]).substring(0, 11)}...</Link></span></div><div className='d-flex align-items-center'><ListIcon as={FaArrowCircleUp} fontSize='15px' /><span className='ml-1'>{value["votes"]}</span></div></span></ListItem>) : null}
              </OrderedList>
            </Box>
          </Skeleton></div>
          <div className='col-xl-4 col-12 pr-0 mb-3 mb-xl-0'><Skeleton minHeight={195} borderRadius={'7.5px'} isLoaded={!loadingMenus}>
            <Box minHeight={195} p={6} w='100%' borderRadius='7.5px' border={'1px solid hsla(240,4%,46%,.3)'} backgroundColor={'hsla(240,4%,46%,.2)'}>
              <Heading as="h2" fontSize={'xl'} fontWeight='500'>
                🆕 New Posts
              </Heading>
              <OrderedList className='mt-3 pl-0 ml-2' listStyleType={'none'}>
                {postsNew.length > 0 ? postsNew.map((value, index, array) => <ListItem key={index} fontSize={'large'} className="mb-2"><span className='d-flex flex-row w-100 mt-2 align-items-center justify-content-between'><div><span className='mr-3'>{String(index + 1)}</span><span className='mr-3'><Link color={'blue.300'} href={`/posts/${value['slug']}`}>{String(value["title"]).substring(0, 11)}...</Link></span></div><div className='d-flex align-items-center'><ListIcon as={FaClock} fontSize='15px' /><span className='ml-1'>{parseInt(Date.now() - value["posted_at"]) / 1000 / 60 / 60 < 1 ? `${String(Math.floor(parseInt(Date.now() - value["posted_at"]) / 1000 / 60))} Mins` : parseInt(Date.now() - value["posted_at"]) / 1000 / 60 / 60 < 24 ? `${String(Math.floor(parseInt(Date.now() - value["posted_at"]) / 1000 / 60 / 60))} Hours` : Math.floor(parseInt(Date.now() - value["posted_at"]) / 1000 / 60 / 60 / 24) == 1 ? `${String(Math.floor(parseInt(Date.now() - value["posted_at"]) / 1000 / 60 / 60 / 24))} Day` : `${String(Math.floor(parseInt(Date.now() - value["posted_at"]) / 1000 / 60 / 60 / 24))} Days`}</span></div></span></ListItem>) : null}
              </OrderedList>
            </Box>
          </Skeleton></div>
          </div>
        <div className='w-100 mt-4 mb-4'><Divider height={0} orientation='horizontal' /></div>
        <div className='d-flex w-100 flex-row justify-content-start'>
          <Box flex={9}>
            <InputGroup w='100%'>
              <Input onChange={(e) => searchPosts(e.target.value)} placeholder='Search for a post...' />
              <InputRightElement><FaSearch /></InputRightElement>
            </InputGroup>
          </Box>
          <Box flex={2} flexDirection='row' display={'flex'}><Box className='mx-3' style={{ width:'fit-content' }}>
            <Menu closeOnSelect={false}>
              <MenuButton
                as={IconButton}
                className="noHover"
                icon={<FaFilter />}
              />
              <MenuList minWidth='240px'>
                <MenuOptionGroup defaultValue='new' onChange={(e) => setView(e)} title='View' type='radio'>
                  <MenuItemOption className='noHover' value='new'>New</MenuItemOption>
                  <MenuItemOption className='noHover' value='trending'>Trending</MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
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
                          Your listing will shared instantly in our Telegram channel with <Text as="span" fontWeight={600}>active members</Text>!
                        </ListItem>
                      </UnorderedList>
                    </AlertDescription>
                  </Alert>
                  <div className="w-100 px-3"><Divider height={'0px!important'} my={8} /></div>
                <form style={{ pointerEvents: step == 0 ? 'auto' : 'none', opacity: step == 0 ? '1' : '0.5' }} onSubmit={(e) => { e.preventDefault(); setStep(1)}} id="postFormValidate">
                  <FormControl isRequired>
                    <FormLabel mb={2}>Post Image:</FormLabel>
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
                      <Button htmlFor="formInputFile" as={"label"} rightIcon={<FaFileUpload />} type="button" colorScheme={'blue'}>
                        Upload Image
                      </Button>
                      {imageLogo.length > 0 ? <Text fontSize={'small'} mt={3} opacity='0.75'>{imageLogo}</Text> : <Text fontSize={'small'} color='yellow.300' mt={3} opacity='0.75'>Make sure you add an image for your post!</Text>}
                  </FormControl>
                  <FormControl mt={6} isRequired>
                    <FormLabel mb={2}>Post Title:</FormLabel>
                      <Input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={"Post Title"}
                      />
                      <Text fontSize={'small'} mt={3} opacity='0.75' color={title.length > 120 ? 'red.300' : 'inherit'}>{title.length}/120</Text>
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
                        placeholder={"Post Body\n\nAdd token contracts, links, etc. here!"}
                        as="textarea" 
                        resize={'vertical'}
                        onChange={(e) => setPostBody(e.target.value)}
                        p={4}
                        minHeight={150}
                      />
                      <Text fontSize={'small'} mt={3} opacity='0.75' color={postBody.length > 1024 ? 'red.300' : 'inherit'}>{postBody.length}/1024</Text>
                  </FormControl>
                </form>
                <form action="https://checkout.8pay.network/" method='POST' id="postForm">
                  <input type="hidden" name="type" value="one_time" />
                  <input type="hidden" name="description" value="CoinLookout Post" />
                  <input type="hidden" name="token" value="BUSD" />
                  <input type="hidden" name="receivers[0]" value="0x81F3f5D43584676055c9924639bD60913Bd8B22e" />
                  <input type="hidden" name="amounts[0]" value="15" />
                  <input type="hidden" name="category" value="Business" />
                  <input type="hidden" name="webhook" value="https://coinlookout.org/webhook" />
                  <input type="hidden" name="extra[post]" value={String(postBody)} />
                  <input type="hidden" name="extra[chain]" value={String(chain)} />
                  <input type="hidden" name="extra[title]" value={String(title)} />
                  <input type="hidden" name="extra[image]" value={"https://cdn.coinlookout.app/posts/"+String(imageId)} />
                  <input type="hidden" name="callbackSuccess" value="https://coinlookout.app/" />
                  <input type="hidden" name="callbackError" value="https://coinlookout.app/" />
              </form>
                </ModalBody>
                <ModalFooter justifyContent={'space-between'}>
                  {step == 0 ? <><Text fontSize={'lg'} display={'flex'} flexDirection={width > 576 ? 'row' : 'column'}><Text as="span" fontWeight={600}>Posting Fee:&nbsp;</Text><Text as="span">15 BUSD</Text></Text>
                  <Button variant='solid' form='postFormValidate' type='submit' colorScheme={'yellow'}>Continue</Button></> : <>
                    <div className='d-flex flex-column'><div className="d-flex flex-row align-items-center justify-content-between"><Text fontSize={'lg'} display={'flex'} flexDirection={width > 576 ? 'row' : 'column'}><Text as="span" fontWeight={600}>Posting Fee:&nbsp;</Text><Text as="span"> 15 BUSD</Text></Text>
                    <Button className='pulsing' variant='solid' form='postForm' type="submit" colorScheme={'yellow'}>Pay and Post</Button></div>
                    <Alert status="warning" borderRadius={'0.375rem'} mt={4}><AlertDescription>If the &quot;Pay&quot; button on the next page is disabled, ensure you are using either <Link href="https://metamask.io/" color={'blue.300'} className="saveColor" rel="nofollow noreferrer">MetaMask</Link> or another connected wallet and you&apos;re <Link color={'blue.300'} className="saveColor" href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain" rel='nofollow noreferrer'>connected to Binance Smart Chain</Link>.</AlertDescription></Alert>
                    </div>
                  </>}
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        <div className="mt-4 w-100">
          {loading ? <div className="d-flex w-100 justify-content-center mt-4"><Spinner size="lg" mx="auto" /></div> : 
          <InfiniteScroll
          dataLength={posts.length}
          next={addData}
          hasMore={!unchanged}
          className='scroller'
          loader={posts.length > 0 ? <div className="d-flex w-100 justify-content-center mt-4"><Spinner size="lg" mx="auto" /></div> : null}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>That&apos;s it! You scrolled to the end - check back later for more posts 🚀</b>
            </p>
          }
        >
          {posts.length > 0 ? posts.map((item,i,array) => <div key={i}><PostCard slug={item["slug"]} alreadyVoted={supabase.auth.user() ? item["voted_by"] != null ? item["voted_by"].includes(String(supabase.auth.user().id)) : false : false} score={item["votes"]} chain={item["chain"]} title={item["title"]} date={parseInt(Date.now() - item["posted_at"]) / 1000 / 60 / 60 < 1 ? `${String(Math.floor(parseInt(Date.now() - item["posted_at"]) / 1000 / 60))} Minutes Ago` : parseInt(Date.now() - item["posted_at"]) / 1000 / 60 / 60 < 24 ? `${String(Math.floor(parseInt(Date.now() - item["posted_at"]) / 1000 / 60 / 60))} Hours Ago` : Math.floor(parseInt(Date.now() - item["posted_at"]) / 1000 / 60 / 60 / 24) == 1 ? `${String(Math.floor(parseInt(Date.now() - item["posted_at"]) / 1000 / 60 / 60 / 24))} Day Ago` : `${String(Math.floor(parseInt(Date.now() - item["posted_at"]) / 1000 / 60 / 60 / 24))} Days Ago`} description={String(item["body"]).substring(0, 230).trimEnd() + "..."} /></div>) : <Text color={'red.300'} style={{ textAlign: 'center' }}><b>No posts found - check back later for more posts 🚀</b></Text>}
        </InfiniteScroll>}
        </div>
        <Alert status='warning' borderRadius={'0.375rem'} className='mt-5 d-flex align-items-start'>
          <AlertIcon />
          <AlertDescription><strong>Warning:</strong>&nbsp;All listed posts are not vetted by the CoinLookout team and are not financial advice. Always do your own research.</AlertDescription>
        </Alert>
        <Alert status='info' borderRadius={'0.375rem'} fontSize='small' className='mt-3 mb-5 d-flex align-items-start'>
          <AlertIcon />
          <AlertDescription><strong>Disclaimer:</strong>&nbsp;All content provided herein our website, hyperlinked sites, associated applications, forums, blogs, social media accounts and other platforms (&quot;CoinLookout&quot;) is for your general information only, procured from third party sources. We make no warranties of any kind in relation to our content, including but not limited to accuracy and updatedness. No part of the content that we provide constitutes financial advice, legal advice or any other form of advice meant for your specific reliance for any purpose. Any use or reliance on our content is solely at your own risk and discretion. You should conduct your own research, review, analyse and verify our content before relying on them. Trading is a highly risky activity that can lead to major losses, please therefore consult your financial advisor before making any decision. No content on CoinLookout is meant to be a solicitation or offer.</AlertDescription>
        </Alert>
        {typeof window === 'undefined' || width>992? <iframe data-aa='2049286' src='//ad.a-ads.com/2049286?size=300x250' style={{ width:300, height:250, border:0, padding:0, overflow:'hidden', backgroundColor: 'transparent' }}></iframe> : null}
      </main>
      <Footer />
    </div>
  )
}