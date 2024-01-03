import { Container, Flex, Heading, Link, Image, HStack } from "@chakra-ui/react";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function NavBar() {
    return (
        <Container maxW={"1200px"} py={4}>
             
            <Flex direction={"row"} justifyContent={"space-between"}>
            <HStack spacing={4} align="center">
                <Heading>Farm Villa</Heading>
                <Image src="/svit.png" alt="Descripción de la imagen" boxSize="40px" />
                </HStack>
                <Flex alignItems={"center"}>
                    <Link href={"/"} mx={4} fontSize="25px">Play</Link>
                    <Link href={"/shop"} mx={4} fontSize="25px">Shop</Link>
                    <Link href={"https://stakecvs.vercel.app/"} mx={4} fontSize="25px">Stake CVS</Link>
                       
                </Flex>
                <ConnectWallet/>
            </Flex>
        </Container>
    )
};