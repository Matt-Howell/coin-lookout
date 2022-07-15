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
  const userEmail = useRef('')
  const userPass = useRef('')
  const rememberMe = useRef('')
  const router = useRouter()
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const toast = useToast()
  
  const signInEP = async () => {
    try {
      let email = String(userEmail.current.value)
      let password = String(userPass.current.value)
      const { error, user } = await supabase.auth.signIn({ email, password }, { redirectTo:"http://localhost:300/" })
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
      if (user) {
        toast({
          title: "Signed In!",
          description: "You are now signed into your account.",
          status: "success",
          position: "top-end",
          duration: 7500,
          isClosable: true,
        })
        router.push("/")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Head>
        <title>Sign In - CoinLookout</title>
        <meta name="description" content="Sign into your CoinLookout account to vote for your favorite projects!" />
        
        <meta name="twitter:title" content="Sign In - CoinLookout" />
        <meta name="twitter:description" content="Sign into your CoinLookout account to vote for your favorite projects!" />
        <meta name="twitter:image" content="/CL-512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        
        <meta property="og:title" content="Sign In - CoinLookout" />
        <meta property="og:description" content="Sign into your CoinLookout account to vote for your favorite projects!" />
        <meta property="og:image" content="/CL-512.png" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta property='og:locale' content='en_US' />
        
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="canonical" href="https://coinlookout.app/sign-in" />

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
          <Heading textAlign="center" fontSize={'4xl'}>Sign in to your account</Heading>
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
              <InputGroup><Input placeholder="Password" type={show ? "text" : "password"} ref={userPass} />
              <InputRightElement w={'fit-content'} mr={2}>
                <Button size="sm" background={'none'} onClick={handleClick}>
                  {show ? <FaEyeSlash size={15} opacity={1} /> : <FaEye size={15} opacity={1} /> }
                </Button>
              </InputRightElement></InputGroup>
            </FormControl>
            <Stack spacing={7}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox ref={rememberMe}>Remember me</Checkbox>
                <Link href="/reset-password" color={'blue.400'}>Forgotten password?</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                onClick={signInEP}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
              <Text textAlign='center'>Don&apos;t have an account? <Link href="/sign-up" color={'blue.400'}>Sign Up</Link></Text>
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