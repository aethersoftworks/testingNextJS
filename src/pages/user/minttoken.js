import React from 'react'
import Head from 'next/head';
import {
    Box, Button,
    Card,
    CardContent, Container, TextField,
    Typography
} from '@mui/material';


const MintToken = (props) => {
    console.log(props)
    const { tracking, accounts } = props
    const [tokenIdToMint, setTokenIdToMint] = React.useState("")
    const [tokenQuantity, setTokenQuantity] = React.useState("")

    function handleTokenIdToMint(event) {
        const { value } = event.target
        setTokenIdToMint(value)
    }
    function handleTokenQuantity(event) {
        const { value } = event.target
        setTokenQuantity(value)
    }

    async function mintToken() {
        if (!accounts) {
            alert("Need an Ethereum address to check")
            return;
        }

        // await contract.methods.mint_token(tokenIdToMint, tokenQuantity).send({ from: props.account });
        const rs = await tracking.methods.mint_token(tokenIdToMint, tokenQuantity).send({ from: accounts });
        // console.log(rs);
        const tokenHash = rs.events._exposeMintedTokenHash.returnValues.tokenhash
        console.log(tokenHash)

        const tokenData = await tracking.methods.getTokenData(tokenIdToMint, tokenHash).call()
        console.log(tokenData)
    }

    return (
        <>
            <Head>
                <title>
                    Mint Token | Blockchain Food Supply
      </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">

                    <Typography
                        sx={{ m: 1 }}
                        variant="h4"
                    >
                        Mint Token
      </Typography>
                    <Box sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        mt: 3
                    }}>
                        <Card>
                            <CardContent>
                                <Box sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    flexWrap: 'wrap'
                                }}
                                    component="form"
                                    noValidate
                                    autoComplete="off"
                                >
                                    <Box
                                        sx={{
                                            maxWidth: 500,

                                        }} >
                                        <TextField
                                            fullWidth
                                            label="Token id to mint"
                                            variant="outlined"
                                            id="tokenidtomint"
                                            value={tokenIdToMint}
                                            onChange={handleTokenIdToMint}
                                        />
                                        {tokenIdToMint}
                                    </Box>
                                    <Box sx={{ maxWidth: 500 }}>

                                        <TextField
                                            fullWidth
                                            placeholder="Token Quantity"
                                            variant="outlined"
                                            value={tokenQuantity}
                                            onChange={handleTokenQuantity}
                                        />
                                        {tokenQuantity}
                                    </Box>
                                    <Box sx={{ maxWidth: 500 }}>

                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={mintToken}
                                        >
                                            Mint
        </Button>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Container>
            </Box >
        </>
    )
}

export default MintToken;
