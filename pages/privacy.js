import Head from 'next/head'
import Header from '../components/Header.jsx'
import {
  Flex,
  Stack,
  Heading,
  Text,
  ListItem,
  UnorderedList,
  Link
} from "@chakra-ui/react";
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Privacy - CoinLookout</title>
        <meta name="description" content="This Privacy Policy document contains types of information that is collected and recorded by CoinLookout." />
        
        <meta name="twitter:title" content="Privacy - CoinLookout" />
        <meta name="twitter:description" content="This Privacy Policy document contains types of information that is collected and recorded by CoinLookout." />
        <meta name="twitter:image" content="/CL-512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        
        <meta property="og:title" content="Privacy - CoinLookout" />
        <meta property="og:description" content="This Privacy Policy document contains types of information that is collected and recorded by CoinLookout." />
        <meta property="og:image" content="/CL-512.png" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta property='og:locale' content='en_US' />
        
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="canonical" href="https://coinlookout.app/privacy" />

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
      <main className='container px-3 d-flex flex-column justify-content-center align-items-center py-0'>
      <Flex
      align={'center'}
      w="100%"
      justify={'center'}>
      <Stack spacing={8} mx={'auto'} w="100%" py={12} px={6}>
      <Heading
            color={'white'}
            fontSize={'2xl'}
            fontFamily={'body'}
            pb={'0.8rem'}
            textAlign={'left'}
            mb={'1rem!important'}
            fontWeight={500}
            borderBottom={'1px solid #ffffff25'}>
            Privacy Policy
            </Heading>
            <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>At CoinLookout, accessible from https://coinlookout.com/, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by CoinLookout and how we use it.</Text><br />
                  
                  <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>If you have additional questions or require more information about our privacy policy, do not hesitate to <Link href="/contact" color={'blue.300'}>contact us</Link>.</Text><br />
                  
                  <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>This privacy policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in CoinLookout. This policy is not applicable to any information collected offline or via channels other than this website.</Text><br /> 
                  
                  <Heading color={'white'} fontSize={'xl'} fontFamily={'body'} pb={'0.8rem'} textAlign={'left'} mb={'1rem!important'} fontWeight={500} borderBottom={'1px solid #ffffff25'}>Consent</Heading> 
                  <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>By using our website, you hereby consent to our privacy policy and agree to its terms.</Text><br /> <Heading color={'white'} fontSize={'xl'} fontFamily={'body'} pb={'0.8rem'} textAlign={'left'} mb={'1rem!important'} fontWeight={500} borderBottom={'1px solid #ffffff25'}>Information we collect</Heading> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</Text><br /> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</Text><br /> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</Text><br /> <Heading color={'white'} fontSize={'xl'} fontFamily={'body'} pb={'0.8rem'} textAlign={'left'} mb={'1rem!important'} fontWeight={500} borderBottom={'1px solid #ffffff25'}>How we use your information</Heading> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>We use the information we collect in various ways, including to:</Text><br /> <UnorderedList color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}> <ListItem>Provide, operate, and maintain our webste</ListItem> <ListItem>Improve, personalize, and expand our webste</ListItem> <ListItem>Understand and analyze how you use our webste</ListItem> <ListItem>Develop new products, services, features, and functionality</ListItem> <ListItem>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the webste, and for marketing and promotional purposes</ListItem> <ListItem>Send you emails</ListItem> <ListItem>Find and prevent fraud</ListItem></UnorderedList><br /><Heading color={'white'} fontSize={'xl'} fontFamily={'body'} pb={'0.8rem'} textAlign={'left'} mb={'1rem!important'} fontWeight={500} borderBottom={'1px solid #ffffff25'}>Log Files</Heading> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>CoinLookout follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</Text><br /> <Heading color={'white'} fontSize={'xl'} fontFamily={'body'} pb={'0.8rem'} textAlign={'left'} mb={'1rem!important'} fontWeight={500} borderBottom={'1px solid #ffffff25'}>Cookies and Web Beacons</Heading> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>Like any other website, CoinLookout uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</Text><br /> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>For more general information on cookies, please read <Link color={'blue.300'} href="https://www.cookieconsent.com/what-are-cookies/">&quot;What Are Cookies&quot; from Cookie Consent</Link>.</Text><br /> <Heading color={'white'} fontSize={'xl'} fontFamily={'body'} pb={'0.8rem'} textAlign={'left'} mb={'1rem!important'} fontWeight={500} borderBottom={'1px solid #ffffff25'}>Google DoubleClick DART Cookie</Heading> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network privacy policy at the following URL – <Link color={'blue.300'} href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</Link></Text><br /> <Heading color={'white'} fontSize={'xl'} fontFamily={'body'} pb={'0.8rem'} textAlign={'left'} mb={'1rem!important'} fontWeight={500} borderBottom={'1px solid #ffffff25'}>Advertising Partners Privacy Policies</Heading> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>You may consult this list to find the privacy policy for each of the advertising partners of CoinLookout.</Text><br /> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on CoinLookout, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</Text><br /> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>Note that CoinLookout has no access to or control over these cookies that are used by third-party advertisers.</Text><br /> <Heading color={'white'} fontSize={'xl'} fontFamily={'body'} pb={'0.8rem'} textAlign={'left'} mb={'1rem!important'} fontWeight={500} borderBottom={'1px solid #ffffff25'}>Third Party Privacy Policies</Heading> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>CoinLookout's privacy policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </Text><br /> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</Text><br /> <Heading color={'white'} fontSize={'xl'} fontFamily={'body'} pb={'0.8rem'} textAlign={'left'} mb={'1rem!important'} fontWeight={500} borderBottom={'1px solid #ffffff25'}>CCPA Privacy Rights (Do Not Sell My Personal Information)</Heading> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>Under the CCPA, among other rights, California consumers have the right to:</Text><br /> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</Text><br /> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>Request that a business delete any personal data about the consumer that a business has collected.</Text><br /> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</Text><br /> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</Text><br /> <Heading color={'white'} fontSize={'xl'} fontFamily={'body'} pb={'0.8rem'} textAlign={'left'} mb={'1rem!important'} fontWeight={500} borderBottom={'1px solid #ffffff25'}>GDPR Data Protection Rights</Heading> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</Text><br /> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</Text><br /> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</Text><br /> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</Text><br /> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</Text><br /> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</Text><br /> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</Text><br /> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</Text><br /> <Heading color={'white'} fontSize={'xl'} fontFamily={'body'} pb={'0.8rem'} textAlign={'left'} mb={'1rem!important'} fontWeight={500} borderBottom={'1px solid #ffffff25'}>Children's Information</Heading> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</Text><br /> <Text color={'white'} style={{ fontSize:"1.15rem", marginTop:'0!important', lineHeight:'2.15rem' }}>CoinLookout does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</Text><br />
      </Stack></Flex>
      </main>
      <Footer />
    </div>
  )
}