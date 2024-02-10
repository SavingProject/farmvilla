import React, { useState } from 'react';
import { MediaRenderer, Web3Button, useAddress, useContract, useContractRead, useNFT } from "@thirdweb-dev/react";
import { STAKING_ADDRESS, TOOLS_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";
import styles from "../styles/Home.module.css";
import { Text, Box, Card, Stack, Flex, Input } from "@chakra-ui/react";

interface EquippedProps {
    tokenId: number;
};

export const Equipped = (props: EquippedProps) => {
    const address = useAddress();
    const { contract: toolContract } = useContract(TOOLS_ADDRESS);
    const { data: nft } = useNFT(toolContract, props.tokenId);
    const { contract: stakingContract } = useContract(STAKING_ADDRESS);
    const { data: claimableRewards } = useContractRead(
        stakingContract,
        "getStakeInfoForToken",
        [props.tokenId, address]
    );
    const [workQuantity, setWorkQuantity] = useState<number>(1); // Estado para almacenar la cantidad de trabajo para cada NFT

    async function unWorkNFT(id: number) {
        if (!address || !stakingContract) return;
        await stakingContract.call("withdraw", [id, workQuantity]); // Utilizamos la cantidad ingresada por el usuario
    };

    return (
        <Box>
            {nft && (
                <Card className={styles.equipcontainer} p={5}>
                    <Flex>
                        <Box>
                            <MediaRenderer
                                src={nft.metadata.image}
                                height="100%"
                                width="100%"
                            />
                        </Box>
                        <Stack spacing={1}>
                            <Text fontSize={"2xl"} fontWeight={"bold"}>{nft.metadata.name}</Text>
                            <Text>Work: {ethers.utils.formatUnits(claimableRewards[0], 0)}</Text>
                            <Input
                                type="number"
                                value={workQuantity}
                                onChange={(e) => setWorkQuantity(parseInt(e.target.value))}
                                placeholder="Work Quantity"
                                style={{ color: 'black', textAlign: 'center' }}
                            />
                            <Web3Button
                                contractAddress={STAKING_ADDRESS}
                                action={() => unWorkNFT(props.tokenId)}
                                className={styles.unequipbutton}
                            >UnWork</Web3Button>
                        </Stack>
                    </Flex>
                    <Box mt={5}>
                        <Text>Claimable Coin (CVS):</Text>
                        <Text> {ethers.utils.formatUnits(claimableRewards[1], 18)}</Text>
                        <Web3Button
                            contractAddress={STAKING_ADDRESS}
                            action={(contract) => contract.call("claimRewards", [props.tokenId])}
                        >Claim CVS</Web3Button>
                    </Box>
                </Card>
            )}
        </Box>
    )
};