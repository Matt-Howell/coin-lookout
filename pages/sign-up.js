import Head from 'next/head'
import Header from '../components/Header.jsx'
import {
  Container,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Divider,
  useToast,
  InputRightElement,
  InputGroup,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import { useRouter } from 'next/router'
import Footer from '../components/Footer.jsx'
import { FaGithub, FaEye, FaEyeSlash } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useRef, useState, useEffect } from 'react';
import { supabase } from '../components/Supabase.js'

export default function Home() {
  const router = useRouter()
  const userEmail = useRef('')
  const userPass = useRef('')
  const userPass2 = useRef('')
  const rememberMe = useRef('')
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const toast = useToast()

  useEffect(() => {
    if (!supabase.auth.user()) return;
    if (supabase.auth.user()) {
      toast({
        title: "Redirecting...",
        description: "You are already signed in!",
        status: "warning",
        position: "top-end",
        duration: 7500,
        isClosable: true,
      })
      router.push('/')
    }
  }, [supabase.auth.user()])
  
  const signUpEP = async () => {
      if (userPass.current.value != userPass2.current.value) {
        toast({
          title: "Passwords Do Not Match!",
          description: "Please make sure your passwords match, and try again.",
          status: "error",
          position: "top-end",
          duration: 7500,
          isClosable: true,
        })
        return;
      }
      let email = String(userEmail.current.value)
      let password = String(userPass.current.value)
      const { error, user } = await supabase.auth.signUp({ email, password })
      if (!error) {
        toast({
          title: "Account Created!",
          description: "Please sign into your new account here to start voting!",
          status: "success",
          position: "top-end",
          duration: 7500,
          isClosable: true,
        })
        router.push("/sign-in")
      }
      if (error) {
        toast({
          title: "Whoops!",
          description: String(error.message),
          status: "error",
          position: "top-end",
          duration: 7500,
          isClosable: true,
        })
      }
    }

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
      <main className='container px-3 d-flex flex-column justify-content-center align-items-center py-5'>
      <Flex
      align={'center'}
      maxW="650px"
      w="100%"
      justify={'center'}>
      <Stack spacing={8} mx={'auto'} w="100%" py={12} px={6}>
        <Stack mb={3} align={'center'}>
          <Heading textAlign="center" fontSize={'4xl'}>Create an account</Heading>
          <Text fontSize={'lg'}>
            to vote for your favorite projects! 🔝
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          w="100%"
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input placeholder="Email" defaultValue={typeof window !== 'undefined' ? localStorage.getItem('emailPref') ? localStorage.getItem('emailPref') : '' : ''} ref={userEmail} type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup><Input placeholder="Password (Min. 8 Characters)" type={show ? "text" : "password"} ref={userPass} />
              <InputRightElement w={'fit-content'} mr={2}>
                <Button size="sm" background={'none'} onClick={handleClick}>
                  {show ? <FaEyeSlash size={15} opacity={1} /> : <FaEye size={15} opacity={1} /> }
                </Button>
              </InputRightElement></InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup><Input placeholder="Confirm Password" type={show ? "text" : "password"} ref={userPass2} />
              <InputRightElement w={'fit-content'} mr={2}>
                <Button size="sm" background={'none'} onClick={handleClick}>
                  {show ? <FaEyeSlash size={15} opacity={1} /> : <FaEye size={15} opacity={1} /> }
                </Button>
              </InputRightElement></InputGroup>
            </FormControl>
            <Stack spacing={7}>
              <Button
                bg={'blue.400'}
                color={'white'}
                onClick={signUpEP}
                mt={1}
                _hover={{
                  bg: 'blue.500',
                }}>
                Create Account
              </Button>
              <Text textAlign='center'>Already have an account? <Link href="/sign-in" color={'blue.400'}>Sign In</Link></Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
      </main>
      <Footer />
    </div>
  )
}