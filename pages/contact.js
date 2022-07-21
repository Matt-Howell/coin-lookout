import Head from 'next/head'
import Header from '../components/Header.jsx'
import {
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input, 
  Textarea,
  Button,
  Heading,
  Text
} from "@chakra-ui/react";
import Footer from '../components/Footer.jsx'
import ReCAPTCHA from "react-google-recaptcha";
import { FaPaperPlane } from 'react-icons/fa'
import { useState } from 'react';

export default function Home() {
  const [captchaComplete, setCaptchaComplete] = useState(false)
  function completeCaptcha(e) {
    e ? setCaptchaComplete(true) : setCaptchaComplete(false)
  }
  return (
    <div>
      <Head>
        <title>Contact Us - CoinLookout</title>
        <meta name="description" content="Have a question, need some help, or want to advertise on CoinLookout? Reach out to us here!" />
        
        <meta name="twitter:title" content="Contact Us - CoinLookout" />
        <meta name="twitter:description" content="Have a question, need some help, or want to advertise on CoinLookout? Reach out to us here!" />
        <meta name="twitter:image" content="/CL-512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        
        <meta property="og:title" content="Contact Us - CoinLookout" />
        <meta property="og:description" content="Have a question, need some help, or want to advertise on CoinLookout? Reach out to us here!" />
        <meta property="og:image" content="/CL-512.png" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta property='og:locale' content='en_US' />
        
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="canonical" href="https://coinlookout.app/contact" />

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
      <main className='container px-3 d-flex flex-column justify-content-center align-items-center py-5'>
      <Flex
      align={'center'}
      w="100%"
      justify={'center'}>
      <Stack spacing={8} mx={'auto'} w="100%" py={12} px={6}>
      <Stack mb={3} align={'center'}>
          <Heading textAlign="center" fontSize={'4xl'}>Have a question?</Heading>
          <Text fontSize={'lg'}>
            Send us a message using the form below! 📩
          </Text>
        </Stack>
      <form className="contactForm w-100" action="https://coinlookout.org/sendMessage.php" method="POST">
        {typeof window === 'undefined' ? null : window.location.search.split('m=')[1] ? window.location.search.split('m=')[1] == "s" ? <Text style={{ fontSize:"1.25rem" }} className='mt-1 mb-3' color={'green.400'}>Message Sent!</Text> : <Text style={{ fontSize:"1.25rem" }}  className='mt-1 mb-3' color={'red.400'}>Message Not Sent - An Unknown Error Occurred!</Text> : null}
        <FormControl className="mb-2" id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input name="uName" className="customBack" type="text" placeholder="Name" />
        </FormControl>
        <FormControl className="mb-2" id="first-name" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input name="uEmail" className="customBack" type="email" placeholder="Email Address" />
        </FormControl>
        <FormControl className="mb-2" id="first-name" isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea name="uMessage" className="customBack" placeholder="Your message..." />
        </FormControl>
        <ReCAPTCHA className='mt-3 mb-1' sitekey="6LdQ5QchAAAAAFMLnMWJKRAgg_aMuV8Bg2pWx3vk" onChange={completeCaptcha} />
        <Button className="mt-2" type="submit" rightIcon={<FaPaperPlane />} colorScheme="green" disabled={!captchaComplete} variant="solid">
            Submit
        </Button>
      </form>
      </Stack></Flex>
      </main>
      <Footer />
    </div>
  )
}