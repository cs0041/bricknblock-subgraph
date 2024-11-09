import { PropertyVerified } from '../generated/RealEstateNFT/RealEstateNFT'
import { NFT } from '../generated/schema'
import { BigInt } from '@graphprotocol/graph-ts'

export function handlePropertyVerified(event: PropertyVerified): void {
  let nftId = event.params.tokenId.toString()
  let nft = NFT.load(nftId)
  
  if (nft) {
    nft.isVerified = true
    nft.save()
  }
} 