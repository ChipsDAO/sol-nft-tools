import React from 'react';
import Head from "next/head";

export const Meta = () => {
  return (
    <Head>
          <title>Solana NFT Toolbox</title>
          <meta name="description" content="grab metadata from SOL NFTs" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@0xAlice_" />
          <meta name="twitter:creator" content="@0xAlice_" />
          <meta property="og:site_name" content="Solana NFT Toolbox" />
          <meta
            name="twitter:image"
            content="https://sol-nft.tools/sol-logo.jpeg"
          />
          <meta
            name="twitter:image:alt"
            content="Solana NFT Tools, made by @0xAlice_"
          />
          <meta name="twitter:title" content="Solana NFT Toolbox" />
          <meta
            name="twitter:description"
            content="Solana NFT Tools, made by @0xAlice_"
          />
          <meta name="og:url" content="https://sol-nft.tools" />
          <meta name="og:title" content="Solana NFT Toolbox" />
          <meta name="og:image" content="https://sol-nft.tools/sol-logo.jpeg" />
          <meta
            property="og:description"
            content="Solana NFT Tools, made by @0xAlice_"
          />
        </Head>
  )
}