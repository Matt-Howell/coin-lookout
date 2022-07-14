import {
    Box,
    Heading,
    Text,
    Badge,
    IconButton,
    Button,
    Link,
    Menu,
    MenuButton,
    MenuList,
    useToast
  } from '@chakra-ui/react';
  import { useRouter } from 'next/router';
  import { useState } from 'react';
  import { FaArrowUp, FaFlag, FaShare } from 'react-icons/fa'
  import { supabase } from './Supabase';
  
  export default function postCard(props) {   
    const toast = useToast()
    const router = useRouter()
    const [upvoted, setUpvoted] = useState(null)
    const [upvotes, setUpvotes] = useState(null)

    function sharePost() {
        navigator.clipboard.writeText(`https://coinlookout.app/posts/${props.slug}`).then(function() {
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

    function reportPost() {
        toast({ 
            title: "Post Reported", 
            description: "The post has been reported. Our team will take a look!", 
            status: "success",
            position: "top-end", 
            duration: 7500, 
            isClosable: true 
        });
    }

    const voteUp = async () =>  {
        const { data, error } = await supabase
        .from('posts')
        .update({ votes: parseInt(parseInt(props.score) + 1) })
        .eq('slug', props.slug)

        if(data && data.length > 0){
            setUpvotes(data[0]["votes"])
            data[0]["voted_by"] !== null ? data[0]["voted_by"].push(supabase.auth.user().id) : [supabase.auth.user().id]
            let updatedArray = data[0]["voted_by"]
            const { data: final, error } = await supabase
            .from('posts')
            .update({ voted_by: updatedArray})
            .eq('slug', props.slug)
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

    return (
      <Box className='mb-4 d-flex flex-row w-100' backgroundColor={'hsla(240,4%,46%,.2)'} borderRadius='7.5px' border='1px solid hsla(240,4%,46%,.3)'>
        <Box borderRadius='7.5px 0px 0px 7.5px' display={'flex'} justifyContent='center' flexDirection='column' backgroundColor={'hsla(240,4%,46%,.5)'} p={6}>
           <Box display={'flex'} justifyContent='center' flexDirection='column' width={'fit-content'}>
            {supabase.auth.user() ? <IconButton icon={<FaArrowUp />} disabled={upvoted !== null ? upvoted : props.alreadyVoted} pointerEvents={upvoted !== null ? upvoted ?  "none" : "auto" : props.alreadyVoted ? "none" : "auto"} onClick={() => {props.alreadyVoted ? null : voteUp()}} /> : <IconButton icon={<FaArrowUp />} onClick={() => { toast({ title: "Please Sign In", description: "To vote for your favorite projects, please sign in here!", status: "warning", position: "top-end", duration: 7500, isClosable: true }); router.push("/sign-in"); }} />}
            <Text as="span" textAlign={'center'} fontWeight={600} fontSize='lg' my={3}>{upvotes !== null ? upvotes : props.score}</Text>
           </Box>
        </Box>
        <Box flex={2} p={6}>
            <Box display={'flex'} flexDirection='column'>
                <Text mb={1} opacity='0.6' fontSize={'sm'}>{props.date}</Text>
                <Heading display={'flex'} justifyContent='start' alignItems={'center'} fontSize={'xl'} lineHeight='1.5' fontWeight={500}>
                    <Link className='remainHover' href={`/posts/${props.slug}`}>{props.title}</Link> <Badge fontSize={'md'} fontWeight={500} letterSpacing={'0.5px'} ml={2} colorScheme={props.chain == "BSC" ? 'yellow' : props.chain == "ETH" ? 'blue' : props.chain == "AVAX" ? 'red' : props.chain == "Polygon" ? 'purple' : null}>{props.chain}</Badge>
                </Heading>
                <Text mt={2} opacity='0.8' fontSize={'md'}>{props.description}</Text>
                <Box mt={4} className="d-flex flex-row">
                    <Box>
                        <Button onClick={sharePost} fontSize={'md'} fontWeight={500} leftIcon={<FaShare />}>
                            Share
                        </Button>
                    </Box>
                    <Box ml={2}>
                        <Button onClick={reportPost} fontSize={'md'} fontWeight={500} leftIcon={<FaFlag />}>
                            Report
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
      </Box>
    );
  }