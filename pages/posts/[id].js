import Head from 'next/head'
import Header from '../../components/Header.jsx'
import {
  Heading,
  Text,
  Box,
  Button,
  Badge,
  Image,  
  useToast
} from "@chakra-ui/react";
import { FaArrowUp, FaShare } from 'react-icons/fa'
import useWindowSize from '../../components/getWindowSize.js';
import Footer from '../../components/Footer.jsx';
import { supabase } from '../../components/Supabase.js';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

export function Post({ post }) {
  const { width, height } = useWindowSize()
  const toast = useToast()
  const router = useRouter()

  const [upvoted, setUpvoted] = useState(null)
  const [upvotes, setUpvotes] = useState(null)

  function sharePost() {
    navigator.clipboard.writeText(`https://coinlookout.app/posts/${data["slug"]}`).then(function() {
        toast({ 
            title: "📋 Copied", 
            description: "The post URL has been copied to your clipboard!", 
            status: "success",
            position: "top-end", 
            duration: 7500, 
            isClosable: true 
        });
    })
  }

  const voteUp = async () =>  {
    const { data: initial, error } = await supabase
    .from('posts')
    .update({ votes: parseInt(parseInt(data["votes"]) + 1) })
    .eq('slug', data["slug"])

    if(initial && initial.length > 0){
        setUpvotes(initial[0]["votes"])
        let updatedArray = initial[0]["voted_by"] !== null ? initial[0]["voted_by"].concat(supabase.auth.user().id) : [supabase.auth.user().id]
        const { data: final, error } = await supabase
        .from('posts')
        .update({ voted_by: updatedArray })
        .eq('slug', data["slug"])
        if(final){
            toast({ title: "Upvoted 🎉", 
            description: "The more upvotes a post has, the more people see it. Upvote your favorite projects!", 
            status: "success",
            position: "top-end", 
            duration: 7500, 
            isClosable: true });
            setUpvoted(true)
        } else if(error) {
            toast({ title: "Whoops", 
                description: String(error.message), 
                status: "error",
                position: "top-end", 
                duration: 7500, 
                isClosable: true }
            );
        }
    }
  }

  useEffect( async () => {
    const { data: initial, error } = await supabase
    .from('posts')
    .select("votes, voted_by")
    .eq('slug', data["slug"])

    setUpvotes(initial[0]["votes"])
    setUpvoted(supabase.auth.user() ? initial[0]["voted_by"] != null ? initial[0]["voted_by"].includes(String(supabase.auth.user().id)) : false : false)
  }, [])
  
  const data = JSON.parse(post)
  return (
    <div>
      <Head>
        <title>{`${data["title"].substring(0, 49)}... - CoinLookout`}</title>
        <meta name="description" content={`${String(data["body"]).substring(0, 230).trimEnd().includes("\n") ? String(data["body"]).substring(0, 230).trimEnd().split("\n")[0] : String(data["body"]).substring(0, 230).trimEnd()}...`} />
        
        <meta name="twitter:title" content={`${data["title"].substring(0, 49)}... - CoinLookout`} />
        <meta name="twitter:description" content={`${String(data["body"]).substring(0, 230).trimEnd().includes("\n") ? String(data["body"]).substring(0, 230).trimEnd().split("\n")[0] : String(data["body"]).substring(0, 230).trimEnd()}...`} />
        <meta name="twitter:image" content={`${data["image_url"]}`} />
        <meta name="twitter:card" content="summary_large_image" />
        
        <meta property="og:title" content={`${data["title"].substring(0, 49)}... - CoinLookout`} />
        <meta property="og:description" content={`${String(data["body"]).substring(0, 230).trimEnd().includes("\n") ? String(data["body"]).substring(0, 230).trimEnd().split("\n")[0] : String(data["body"]).substring(0, 230).trimEnd()}...`} />
        <meta property="og:image" content={`${data["image_url"]}`} />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta property='og:locale' content='en_US' />
        
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="canonical" href={`https://coinlookout.app/posts/${data["slug"]}`} />

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
      <div className="container">
      <Box width={320} className="mt-5" height={50} display='flex' justifyContent={'center'} alignItems='center' border={'1px solid hsla(240,4%,46%,.3)'} mx="auto">Ad</Box>
      <main className="d-flex flex-xl-row flex-column mt-5 mb-4">
            <div className="col-xl-8 col-12 pr-xl-2 pr-0">
            <Box backgroundColor={'hsla(240,4%,46%,.2)'} borderRadius='7.5px' border='1px solid hsla(240,4%,46%,.3)'>
                <Box width='100%!important'>
                    <Image height={'100%'} maxH={'300px'} borderRadius='7.5px 7.5px 0px 0px' objectFit='cover' width='100%' src={data["image_url"]} alt={"Farm The Dip"} className="themeImage" />
                </Box>
                <Box className='d-flex flex-md-row flex-column mb-2'>
                    <Box p={4}>
                        <Heading mt={2} fontWeight={600} lineHeight={'150%'} fontSize='3xl'>
                            {data["title"]}
                        </Heading>
                        <Text mt={2} opacity='0.75' display={'flex'} alignItems={'center'} fontSize={'md'} pb={4} borderBottom={'1px solid hsla(240,4%,46%,.3)'}><Text as="span" mr={2}>{new Date(parseInt(data["posted_at"])).toLocaleString('en-us',{day:'numeric', month:'long', year:'numeric'})}</Text>&bull;<Badge fontSize={'md'} fontWeight={500} letterSpacing={'0.5px'} px={2} py={0} ml={2} borderRadius={'5px'} colorScheme={data["chain"] == "BSC" ? 'yellow' : data["chain"] == "ETH" ? 'blue' : data["chain"] == "AVAX" ? 'red' : data["chain"] == "Polygon" ? 'purple' : null}>{data["chain"]}</Badge></Text>
                        <Text mt={4} whiteSpace='pre-wrap' color={'inherit'} lineHeight={'175%'} fontSize={'lg'}>
                            {data["body"]}
                        </Text>
                        </Box>
                </Box>
            </Box>
            <Box width={320} className="mt-5" mb={{ base:'2rem', lg:'1rem' }} height={50} display='flex' justifyContent={'center'} alignItems='center' border={'1px solid hsla(240,4%,46%,.3)'} mx="auto">Ad</Box>
            </div>
            <Box mt={4} className="col-xl-4 col-12 mt-xl-0 pl-xl-2 pl-0 d-flex flex-column align-items-center">
                <Box mb={4} backgroundColor={'hsla(240,4%,46%,.2)'} w='100%' borderRadius='7.5px' border='1px solid hsla(240,4%,46%,.3)' display='flex' flexDirection={'column'} alignItems={'center'}>
                    <Box p={6} borderTop='1px solid hsla(240,4%,46%,.3)' w='100%' display={'flex'} justifyContent='center' flexDirection='row'>
                        <Text fontSize={'xl'} display={'flex'} letterSpacing='1.1px' fontWeight={'600'} justifyContent='center' flexDirection='row' alignItems={'center'}><FaArrowUp style={{ marginRight:'0.5rem' }} />{upvotes !== null ? upvotes : data["votes"]}</Text>
                    </Box>
                    <Box p={6} borderTop='1px solid hsla(240,4%,46%,.3)' w='100%' display={'flex'} justifyContent='center' flexDirection='row'>
                        {supabase.auth.user() ? <Button disabled={upvoted} pointerEvents={upvoted ? "none" : "auto"} onClick={() => {upvoted ? null : voteUp()}} mr={6} leftIcon={<FaArrowUp />}>Vote</Button> : <Button disabled={false} pointerEvents={"auto"} onClick={() => {toast({ title: "Please Sign In", description: "To vote for your favorite projects, please sign in here!", status: "warning", position: "top-end", duration: 7500, isClosable: true }); router.push("/sign-in") }} mr={6} leftIcon={<FaArrowUp />}>Vote</Button>}
                        <Button leftIcon={<FaShare />} onClick={sharePost}>Share</Button>
                    </Box>
                </Box>
                <Box mb={4} backgroundColor={'hsla(240,4%,46%,.2)'} w='100%' borderRadius='7.5px' border='1px solid hsla(240,4%,46%,.3)' display='flex' flexDirection={'column'} alignItems={'center'}><Box width={300} height={250} display='flex' justifyContent={'center'} alignItems='center' border={'1px solid hsla(240,4%,46%,.3)'} className='my-4 mx-auto'>Ad</Box></Box>
                <Box backgroundColor={'hsla(240,4%,46%,.2)'} w='100%' borderRadius='7.5px' border='1px solid hsla(240,4%,46%,.3)' display='flex' flexDirection={'column'} alignItems={'center'}><Box width={300} height={250} display='flex' justifyContent={'center'} alignItems='center' border={'1px solid hsla(240,4%,46%,.3)'} className='my-4 mx-auto'>Ad</Box></Box>
            </Box>
      </main>
      </div>
      <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {
    const { id } = context.query;

    if (!id) {
        return;
    }

    let { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq("slug", String(id))

    let post = JSON.stringify(data[0])

    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=100000, stale-while-revalidate=100000'
    )
    
    return { props: { post } };
}

export default Post;