import { MediaRenderer, Web3Button, useContract, useContractMetadata } from "@thirdweb-dev/react";
import { FARMER_ADDRESS } from "../const/addresses";
import { Box, Container, Flex, Heading } from "@chakra-ui/react";

import Link from 'next/link';
import { Text, Button, Card, SimpleGrid, Stack } from '@chakra-ui/react';

export function ClaimFarmer() {
    const { contract } = useContract(FARMER_ADDRESS);
    const { data: metadata } = useContractMetadata(contract);
    
    return (
        <Container maxW={"1200px"}>
            <Flex direction={"column"} alignItems={"center"} justifyContent={"center"} h={"50vh"}>
                <Heading>Buy Farm Villas to start farming</Heading>
                <Box borderRadius={"8px"} overflow={"hidden"} my={10}>
                    <MediaRenderer
                        src={metadata?.image}
                        height="250px"
                        width="250px"

                        

                    />
                   
                </Box>

                <Box>
                <Text> </Text>
                <Link
                    href="https://www.savingtoken.net/game/farm-villa"
                >
                    <Button>Buy Farm Villas</Button>
                </Link>
            </Box>
 
               
    
             
                </Flex>

 
        </Container>
  
  
    );
    

}