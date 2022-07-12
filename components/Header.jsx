import React from "react";
import {
  chakra,
  HStack,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
  CloseButton,
  VStack,
  Button,
  useColorMode,
  SimpleGrid
} from "@chakra-ui/react";
import { useViewportScroll } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { FaFire, FaPlusCircle, FaTelegram, FaTwitter, FaEnvelope } from "react-icons/fa";
import { GiConsoleController } from 'react-icons/gi';
import { BiMovie } from 'react-icons/bi';
import { IoMdPlanet } from 'react-icons/io'
import { RiMovie2Line } from 'react-icons/ri'

export default function Header() {
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const bg = useColorModeValue("#fafafa", "gray.800");
  const ref = React.useRef();
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);
  const cl = useColorModeValue("gray.800", "#fafafa");
  const mobileNav = useDisclosure();

  const Section = (props) => {
    const ic = useColorModeValue("brand.600", "brand.50");
    const hbg = useColorModeValue("gray.50", "brand.400");
    const tcl = useColorModeValue("gray.900", "gray.50");
    const dcl = useColorModeValue("gray.500", "gray.50");
    return (
      <Box
        m={-3}
        p={3}
        display="flex"
        alignItems="start"
        rounded="lg"
        _hover={{ bg: hbg }}
      >
        <chakra.svg
          flexShrink={0}
          h={6}
          w={6}
          color={ic}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {props.icon}
        </chakra.svg>
        <Box ml={4}>
          <chakra.p fontSize="sm" fontWeight="700" color={tcl}>
            {props.title}
          </chakra.p>
          <chakra.p mt={1} fontSize="sm" color={dcl}>
            {props.children}
          </chakra.p>
        </Box>
      </Box>
    );
  };

  const Categories = (props) => {
    return (
      <React.Fragment>
        <SimpleGrid
          columns={props.h ? { base: 1, md: 3, lg: 5 } : 1}
          pos="relative"
          gap={{ base: 6, sm: 8 }}
          px={5}
          py={6}
          p={{ sm: 8 }}
        >
          <Link href={'/anime'}><Section
            title="Anime"
            icon={
                <RiMovie2Line size={25} />
            }
          >
            Find all our Anime Better Discord themes.
          </Section></Link>

          <Link href={'/marvel'}><Section
            title="Marvel"
            icon={
                <BiMovie size={25} />
            }
          >
            Check out all of our Marvel Better Discord themes.
          </Section></Link>

          <Link href={'/gaming'}><Section
            title="Gaming"
            icon={
                <GiConsoleController size={25} />
            }
          >
            View our gaming Better Discord themes right here.
          </Section></Link>

          <Link href={'/space'}><Section
            title="Space"
            icon={
                <IoMdPlanet size={25} />
            }
          >
            Give our space Better Discord themes a visit.
          </Section></Link>
        </SimpleGrid>
      </React.Fragment>
    );
  };

  const MobileNavContent = (
    <VStack
      position={"absolute"}
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? "flex" : "none"}
      flexDirection="column"
      p={2}
      pb={4}
      bg={bg}
      spacing={3}
      rounded="sm"
      zIndex={'1000'}
      shadow="sm"
      borderBottomWidth={2}
      borderBottomColor={useColorModeValue("gray.200", "gray.900")}
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
      <Popover>
       <PopoverTrigger><Button
        w="full"
        variant="ghost"
        rightIcon={<IoIosArrowDown />}
      >
        Categories
      </Button></PopoverTrigger>
      <PopoverContent
        w="100vw"
        maxW="md"
        _focus={{ boxShadow: "md" }}
        >
            <Categories />
        </PopoverContent>
    </Popover>
      <Link href={'/themes/'}><Button
        w="full"
        variant="ghost"
        
        leftIcon={<FaFire />}
      >
        Themes
      </Button></Link>
      <Link href={'/plugins/'}><Button
        w="full"
        variant="ghost"
        
        leftIcon={<FaPlusCircle />}
      >
        Plugins
      </Button></Link>
    </VStack>
  );
  return (
    <React.Fragment>
      <chakra.header
        ref={ref}
        shadow={y > height ? "sm" : undefined}
        transition="box-shadow 0.2s"
        bg={bg}
        w="full"
        px={{ base: "none", md:4 }}
        position={"sticky"}
        top={"0"}
        zIndex={'500'}
        borderBottomWidth={2}
        borderBottomColor={useColorModeValue("gray.200", "gray.900")}
      >
        <chakra.div h="4.5rem" mx="auto" maxW="1200px">
          <Flex
            w="full"
            h="full"
            px="6"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex>
              <Link href="/">
                <HStack>
                <svg width="188" height="42" viewBox="0 0 188 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.012 33.632C13.34 34.16 12.536 34.58 11.6 34.892C10.664 35.204 9.728 35.36 8.792 35.36C7.16 35.36 5.732 35.036 4.508 34.388C3.284 33.74 2.324 32.84 1.628 31.688C0.956 30.512 0.62 29.132 0.62 27.548C0.62 25.964 0.98 24.584 1.7 23.408C2.444 22.232 3.404 21.332 4.58 20.708C5.78 20.06 7.064 19.736 8.432 19.736C9.632 19.736 10.7 19.904 11.636 20.24C12.596 20.576 13.412 21.032 14.084 21.608L12.428 23.768C11.996 23.432 11.468 23.132 10.844 22.868C10.22 22.604 9.512 22.472 8.72 22.472C7.856 22.472 7.052 22.7 6.308 23.156C5.588 23.588 5.012 24.188 4.58 24.956C4.172 25.724 3.968 26.588 3.968 27.548C3.968 28.46 4.184 29.312 4.616 30.104C5.048 30.872 5.648 31.484 6.416 31.94C7.184 32.372 8.06 32.588 9.044 32.588C9.692 32.588 10.28 32.492 10.808 32.3C11.36 32.108 11.852 31.844 12.284 31.508L14.012 33.632ZM17.038 27.404C17.038 25.916 17.386 24.572 18.082 23.372C18.802 22.172 19.786 21.224 21.034 20.528C22.282 19.832 23.698 19.484 25.282 19.484C26.914 19.484 28.342 19.832 29.566 20.528C30.79 21.224 31.738 22.172 32.41 23.372C33.082 24.572 33.418 25.916 33.418 27.404C33.418 28.892 33.082 30.248 32.41 31.472C31.738 32.672 30.778 33.62 29.53 34.316C28.306 35.012 26.878 35.36 25.246 35.36C23.662 35.36 22.246 35.036 20.998 34.388C19.774 33.716 18.802 32.792 18.082 31.616C17.386 30.416 17.038 29.012 17.038 27.404ZM20.386 27.44C20.386 28.4 20.602 29.276 21.034 30.068C21.466 30.836 22.042 31.448 22.762 31.904C23.506 32.36 24.322 32.588 25.21 32.588C26.146 32.588 26.974 32.36 27.694 31.904C28.438 31.448 29.014 30.836 29.422 30.068C29.83 29.276 30.034 28.4 30.034 27.44C30.034 26.48 29.83 25.616 29.422 24.848C29.014 24.056 28.438 23.432 27.694 22.976C26.974 22.496 26.146 22.256 25.21 22.256C24.298 22.256 23.47 22.496 22.726 22.976C22.006 23.456 21.43 24.092 20.998 24.884C20.59 25.652 20.386 26.504 20.386 27.44ZM37.9512 20.096H41.2992V35H37.9512V20.096ZM37.6992 14.696C37.6992 14.168 37.9032 13.724 38.3112 13.364C38.7432 13.004 39.2112 12.824 39.7152 12.824C40.2192 12.824 40.6632 13.004 41.0472 13.364C41.4552 13.724 41.6592 14.168 41.6592 14.696C41.6592 15.248 41.4552 15.704 41.0472 16.064C40.6632 16.4 40.2192 16.568 39.7152 16.568C39.2112 16.568 38.7432 16.388 38.3112 16.028C37.9032 15.668 37.6992 15.224 37.6992 14.696ZM50.0798 20.096L50.3678 23.732L50.2238 23.156C50.7038 22.052 51.4838 21.176 52.5638 20.528C53.6438 19.856 54.8918 19.52 56.3078 19.52C57.7238 19.52 58.8758 19.94 59.7638 20.78C60.6758 21.596 61.1438 22.664 61.1678 23.984V35H57.7838V25.172C57.7598 24.356 57.5198 23.696 57.0638 23.192C56.6318 22.664 55.9478 22.4 55.0118 22.4C54.1478 22.4 53.3678 22.64 52.6718 23.12C51.9758 23.6 51.4238 24.26 51.0158 25.1C50.6318 25.94 50.4398 26.912 50.4398 28.016V35H47.0918V20.096H50.0798ZM66.9902 7.136H70.3382V35H66.9902V7.136ZM121.693 35V7.136H125.041V35H121.693ZM128.641 25.1L135.481 35H131.557L126.409 26.972L128.641 25.1ZM123.997 30.248L123.673 27.044L132.709 19.772L134.761 21.536L123.997 30.248ZM137.765 27.404C137.765 25.916 138.113 24.572 138.809 23.372C139.529 22.172 140.513 21.224 141.761 20.528C143.009 19.832 144.425 19.484 146.009 19.484C147.641 19.484 149.069 19.832 150.293 20.528C151.517 21.224 152.465 22.172 153.137 23.372C153.809 24.572 154.145 25.916 154.145 27.404C154.145 28.892 153.809 30.248 153.137 31.472C152.465 32.672 151.505 33.62 150.257 34.316C149.033 35.012 147.605 35.36 145.973 35.36C144.389 35.36 142.973 35.036 141.725 34.388C140.501 33.716 139.529 32.792 138.809 31.616C138.113 30.416 137.765 29.012 137.765 27.404ZM141.113 27.44C141.113 28.4 141.329 29.276 141.761 30.068C142.193 30.836 142.769 31.448 143.489 31.904C144.233 32.36 145.049 32.588 145.937 32.588C146.873 32.588 147.701 32.36 148.421 31.904C149.165 31.448 149.741 30.836 150.149 30.068C150.557 29.276 150.761 28.4 150.761 27.44C150.761 26.48 150.557 25.616 150.149 24.848C149.741 24.056 149.165 23.432 148.421 22.976C147.701 22.496 146.873 22.256 145.937 22.256C145.025 22.256 144.197 22.496 143.453 22.976C142.733 23.456 142.157 24.092 141.725 24.884C141.317 25.652 141.113 26.504 141.113 27.44ZM163.394 35.576C162.05 35.576 160.934 35.168 160.046 34.352C159.182 33.512 158.726 32.432 158.678 31.112V20.096H162.026V29.924C162.074 30.74 162.302 31.4 162.71 31.904C163.142 32.408 163.814 32.672 164.726 32.696C165.566 32.696 166.31 32.456 166.958 31.976C167.63 31.472 168.17 30.8 168.578 29.96C168.986 29.096 169.19 28.124 169.19 27.044V20.096H172.538V35H169.478L169.19 31.328L169.37 31.976C169.082 32.672 168.638 33.296 168.038 33.848C167.462 34.376 166.778 34.796 165.986 35.108C165.194 35.42 164.33 35.576 163.394 35.576ZM179.77 13.544H183.118V20.168H187.222V22.796H183.118V35H179.77V22.796H177.034V20.168H179.77V13.544Z" fill={useColorModeValue("#141A46","white")}/>
                  <path d="M113.623 25.1078C113.511 24.7999 113.383 24.4987 113.239 24.2055L106.592 8.68515C106.526 8.53798 106.433 8.40453 106.32 8.2914C105.844 7.80278 105.278 7.41513 104.656 7.15064C104.033 6.88614 103.366 6.75 102.692 6.75C102.018 6.75 101.351 6.88614 100.729 7.15064C100.106 7.41513 99.5408 7.80278 99.0648 8.2914C98.9474 8.41221 98.8545 8.55554 98.7913 8.71319C98.7281 8.87085 98.6959 9.03972 98.6964 9.21015V13.968H93.5714V9.21015C93.572 9.03972 93.5398 8.87085 93.4766 8.71319C93.4134 8.55554 93.3204 8.41221 93.2031 8.2914C92.727 7.80278 92.1616 7.41513 91.5392 7.15064C90.9167 6.88614 90.2494 6.75 89.5755 6.75C88.9017 6.75 88.2344 6.88614 87.6119 7.15064C86.9895 7.41513 86.424 7.80278 85.948 8.2914C85.8345 8.40453 85.7423 8.53798 85.6757 8.68515L79.0292 24.2055C78.8848 24.4987 78.7565 24.7999 78.6449 25.1078C78.3472 25.955 78.1955 26.8488 78.1964 27.7492C78.1964 29.8378 79.0064 31.8408 80.448 33.3177C81.8897 34.7945 83.8451 35.6242 85.8839 35.6242C87.9228 35.6242 89.8781 34.7945 91.3198 33.3177C92.7615 31.8408 93.5714 29.8378 93.5714 27.7492V16.593H98.6964V27.7492C98.6964 29.8378 99.5064 31.8408 100.948 33.3177C102.39 34.7945 104.345 35.6242 106.384 35.6242C108.423 35.6242 110.378 34.7945 111.82 33.3177C113.262 31.8408 114.071 29.8378 114.071 27.7492C114.072 26.8488 113.921 25.955 113.623 25.1078V25.1078ZM87.9179 9.99765C88.3446 9.62883 88.8766 9.41184 89.434 9.37929C89.9914 9.34675 90.5441 9.50041 91.0089 9.81718V21.8922C89.6062 20.5881 87.7782 19.8683 85.8839 19.8742C85.0795 19.8727 84.2797 20 83.5136 20.2516L87.9179 9.99765ZM85.8839 32.9992C85.0611 33.0024 84.2498 32.8019 83.5188 32.4149C82.7879 32.0279 82.159 31.4658 81.6857 30.7763C81.2124 30.0869 80.9086 29.2905 80.8002 28.455C80.6919 27.6195 80.7821 26.7695 81.0632 25.9773L81.3515 25.3211C81.7721 24.4951 82.3997 23.7987 83.1698 23.3032C83.94 22.8078 84.8249 22.5312 85.7339 22.5018C86.6428 22.4725 87.5431 22.6914 88.3421 23.1361C89.1412 23.5809 89.8104 24.2354 90.281 25.0326C90.7515 25.8298 91.0066 26.7409 91.0199 27.6724C91.0332 28.6038 90.8043 29.5222 90.3567 30.3331C89.9091 31.1441 89.259 31.8184 88.4729 32.2869C87.6869 32.7555 86.7933 33.0013 85.8839 32.9992ZM101.259 9.81718C101.724 9.50041 102.276 9.34675 102.834 9.37929C103.391 9.41184 103.923 9.62883 104.35 9.99765L108.754 20.2516C107.988 20 107.188 19.8727 106.384 19.8742C104.49 19.8683 102.662 20.5881 101.259 21.8922V9.81718ZM106.384 32.9992C105.475 33.0013 104.581 32.7555 103.795 32.2869C103.009 31.8184 102.359 31.1441 101.911 30.3331C101.464 29.5222 101.235 28.6038 101.248 27.6724C101.261 26.7409 101.516 25.8298 101.987 25.0326C102.457 24.2354 103.127 23.5809 103.926 23.1361C104.725 22.6914 105.625 22.4725 106.534 22.5018C107.443 22.5312 108.328 22.8078 109.098 23.3032C109.868 23.7987 110.496 24.4951 110.916 25.3211L111.205 25.9773C111.486 26.7695 111.576 27.6195 111.468 28.455C111.359 29.2905 111.056 30.0869 110.582 30.7763C110.109 31.4658 109.48 32.0279 108.749 32.4149C108.018 32.8019 107.207 33.0024 106.384 32.9992V32.9992Z"  fill={useColorModeValue("#141A46","white")}/>
                </svg>
                </HStack>
              </Link>
            </Flex>
            <Flex justify="flex-end" align="center" color="gray.400">
              <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${text} mode`}
                variant="ghost"
                color="current"
                ml={{ base: "0", md: "3" }}
                onClick={toggleMode}
                icon={<FaTelegram />}
              />
              <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${text} mode`}
                variant="ghost"
                color="current"
                ml={{ base: "0", md: "3" }}
                onClick={toggleMode}
                icon={<FaTwitter />}
              />
            <Button onClick={() => { window.location.href = "/#Post" }} display={{ base: "none", md: "flex" }} ml={{ base: "0", md: "4" }} leftIcon={<FaPlusCircle />} borderRadius={'50px'} colorScheme='blue'>
              Create Post
            </Button> 
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color="current"
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
            </Flex>
          </Flex>
          {MobileNavContent}
        </chakra.div>
      </chakra.header>
    </React.Fragment>
  );
}