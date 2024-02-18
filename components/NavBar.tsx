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
                    <Link href={"/"} mx={4} fontSize="20px">Play</Link>
                    <Link href={"/shop"} mx={4} fontSize="20px">Shop</Link>
                    <Link href={"https://www.eggs.cool/ex/#/swap"} mx={4} fontSize="20px" target="_blank">Change CVS to SVIT</Link>
                    <Link href={"https://www.savingtoken.net/game/farm-villa"} mx={4} fontSize="20px" target="_blank">Main page</Link>
                       
                </Flex>
                <ConnectWallet/>
            </Flex>
        </Container>
    )
};
