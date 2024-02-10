import React, { useState, useEffect } from 'react';
import { MediaRenderer, Web3Button, useAddress, useContract, useContractRead } from '@thirdweb-dev/react';
import { NFT } from '@thirdweb-dev/sdk';
import { STAKING_ADDRESS, TOOLS_ADDRESS } from '../const/addresses';
import Link from 'next/link';
import { Text, Box, Button, Card, SimpleGrid, Stack, Input } from '@chakra-ui/react';
import { ethers } from "ethers";

type Props = {
    nft: NFT[] | undefined;
};

export function Inventory({ nft }: Props) {
    const address = useAddress();
    const { contract: toolContract } = useContract(TOOLS_ADDRESS);
    const { contract: stakingContract } = useContract(STAKING_ADDRESS);
    const [quantities, setQuantities] = useState<{ [id: string]: number }>({}); // Estado para almacenar la cantidad ingresada por el usuario para cada NFT
    const [userNftCounts, setUserNftCounts] = useState<{ [id: string]: number }>({}); // Estado para almacenar la cantidad de NFTs que tiene el usuario para cada NFT

    useEffect(() => {
        async function fetchUserNftCounts() {
            if (!address || !toolContract || !nft) return;

            const userCounts = await Promise.all(nft.map(async nftItem => {
                const count = await toolContract?.erc1155.balanceOf(address, nftItem.metadata.id.toString());
                return { [nftItem.metadata.id]: count.toNumber() };
            }));

            const countsObject = Object.assign({}, ...userCounts);
            setUserNftCounts(countsObject);
        }

        fetchUserNftCounts();
    }, [address, toolContract, nft]);

    async function stakeNFT(id: string) {
        if (!address || !toolContract || !stakingContract) {
            return;
        }

        const quantity = quantities[id] || 1; // Obtener la cantidad del estado correspondiente al ID del NFT

        const isApproved = await toolContract?.erc1155.isApproved(
            address,
            STAKING_ADDRESS,
        );

        if (!isApproved) {
            await toolContract?.erc1155.setApprovalForAll(
                STAKING_ADDRESS,
                true,
            );
        }
        await stakingContract?.call("stake", [id, quantity]); // Utilizamos la cantidad ingresada por el usuario
    };

    if(nft?.length === 0) {
        return (
            <Box>
                <Text>No Producers.</Text>
                <Link
                    href="/shop"
                >
                    <Button>Shop Producers</Button>
                </Link>
            </Box>
        )
    }
    
    return (
        <SimpleGrid columns={3} spacing={4}>
            {nft?.map((nftItem) => (
                <Card key={nftItem.metadata.id} p={5}>
                    <Stack alignItems="center">
                        <MediaRenderer 
                            src={nftItem.metadata.image} 
                            height="100px"
                            width="100px"
                        />
                        <Text>{nftItem.metadata.name}</Text>
                        <Input
                            type="number"
                            value={quantities[nftItem.metadata.id] || ''}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setQuantities(prevState => ({
                                    ...prevState,
                                    [nftItem.metadata.id]: isNaN(value) ? 1 : value, // Actualizar la cantidad para este NFT específico
                                }));
                            }}
                            placeholder="Amount"
                            style={{ color: 'Black', textAlign: 'center' }}
                        />
                        <Web3Button
                            contractAddress={STAKING_ADDRESS}
                            action={() => stakeNFT(nftItem.metadata.id)}
                            style={{ color: 'Black'}}
                        >
                            Equip
                        </Web3Button>
                        <Text>Amount: {userNftCounts[nftItem.metadata.id] || 0}</Text>
                    </Stack>
                </Card>
            ))}
        </SimpleGrid>
    );
};