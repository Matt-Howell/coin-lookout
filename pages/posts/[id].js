import Head from 'next/head'
import Header from '../../components/Header.jsx'
import {
  Heading,
  Text,
  Box,
  Button,
  Badge,
  Image,  
} from "@chakra-ui/react";
import { FaArrowDown, FaArrowUp, FaShare } from 'react-icons/fa'
import useWindowSize from '../../components/getWindowSize.js';
import { supabase } from '../../components/Supabase.js';

export default function Post({ post }) {
  const { width, height } = useWindowSize()

  return (
    <div>
      <Head>
        <title>Coin Lookout</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Header />
      <div className="container">
      <Box width={728} height={90} display='flex' justifyContent={'center'} alignItems='center' border={'1px solid hsla(240,4%,46%,.3)'} className='mt-5 mx-auto'>Ad</Box>
      <main className="d-flex flex-xl-row flex-column mt-5 mb-4">
            <div className="col-xl-8 col-12 pr-xl-2 pr-0">
            <Box backgroundColor={'hsla(240,4%,46%,.2)'} borderRadius='7.5px' border='1px solid hsla(240,4%,46%,.3)'>
                <Box width='100%!important'>
                    <Image height={'100%'} maxH={'300px'} borderRadius='7.5px 7.5px 0px 0px' objectFit='cover' width='100%' src={post["image_url"]} alt={"Farm The Dip"} className="themeImage" />
                </Box>
                <Box className='d-flex flex-md-row flex-column mb-2'>
                    <Box p={4}>
                        <Heading mt={2} fontWeight={600} lineHeight={'150%'} fontSize='3xl'>
                            {post["title"]}
                        </Heading>
                        <Text mt={2} opacity='0.75' display={'flex'} alignItems={'center'} fontSize={'md'} pb={4} borderBottom={'1px solid hsla(240,4%,46%,.3)'}><Text as="span" mr={2}>24th June, 2022</Text>&bull;<Badge fontSize={'md'} fontWeight={500} letterSpacing={'0.5px'} px={2} py={0} ml={2} borderRadius={'5px'} colorScheme={'yellow'}>{post["chain"]}</Badge></Text>
                        <Text mt={4} whiteSpace='pre-wrap' color={'inherit'} lineHeight={'175%'} fontSize={'lg'}>
                            {post["body"]}
                        </Text>
                        </Box>
                </Box>
            </Box>
            </div>
            <Box mt={4} className="col-xl-4 col-12 mt-xl-0 pl-xl-2 pl-0 d-flex flex-column align-items-center">
                <Box mb={4} backgroundColor={'hsla(240,4%,46%,.2)'} w='100%' borderRadius='7.5px' border='1px solid hsla(240,4%,46%,.3)' display='flex' flexDirection={'column'} alignItems={'center'}>
                    <Box p={6} w='100%' display={'flex'} justifyContent='center' flexDirection='row'>
                        <Button mr={6} leftIcon={<FaArrowUp />}>Vote</Button>
                        <Button mr={6} leftIcon={<FaArrowDown />}>Vote</Button>
                        <Button leftIcon={<FaShare />}>Share</Button>
                    </Box>
                </Box>
                <Box mb={4} backgroundColor={'hsla(240,4%,46%,.2)'} w='100%' borderRadius='7.5px' border='1px solid hsla(240,4%,46%,.3)' display='flex' flexDirection={'column'} alignItems={'center'}><Box width={300} height={250} display='flex' justifyContent={'center'} alignItems='center' border={'1px solid hsla(240,4%,46%,.3)'} className='my-4 mx-auto'>Ad</Box></Box>
                <Box backgroundColor={'hsla(240,4%,46%,.2)'} w='100%' borderRadius='7.5px' border='1px solid hsla(240,4%,46%,.3)' display='flex' flexDirection={'column'} alignItems={'center'}><Box width={300} height={250} display='flex' justifyContent={'center'} alignItems='center' border={'1px solid hsla(240,4%,46%,.3)'} className='my-4 mx-auto'>Ad</Box></Box>
            </Box>
      </main>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10000, stale-while-revalidate=10000'
    )

    const { id } = context.query;

    let { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq("slug", String(id))
    
    let post = posts[0] || posts;
    
    return { props: { post } };
}