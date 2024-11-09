import { BigInt, Address } from '@graphprotocol/graph-ts'
import {
  FundraisingCreated,
  FactoryFundraising,
} from '../generated/FactoryFundraising/FactoryFundraising'
import { RealEstateFundraising as RealEstateFundraisingTemplate } from '../generated/templates'
import { Fundraising, NFT } from '../generated/schema'
import { NFT as RealEstateNFT } from '../generated/FactoryFundraising/NFT'

export function handleFundraisingCreated(event: FundraisingCreated): void {
  // Create NFT entity first if it doesn't exist
  let factoryContract = FactoryFundraising.bind(event.address)
  let nftContract = RealEstateNFT.bind(factoryContract.nftContract())
  let nftId = event.params.nftId.toString()
  let nft = NFT.load(nftId)

  if (!nft) {
    nft = new NFT(nftId)
    let nftInfo = nftContract.getProperty(event.params.nftId)
    nft.tokenId = event.params.nftId
    nft.owner = event.params.owner
    nft.name = nftInfo.name
    nft.image = nftInfo.image
    nft.location = nftInfo.location
    nft.area = nftInfo.area
    nft.propertyType = nftInfo.propertyType
    nft.documents = nftInfo.documents
    nft.isTokenized = false
    nft.isVerified = false
    nft.save()
  }

  // Create new Fundraising entity
  let fundraising = new Fundraising(event.params.fundraising.toHexString())
  fundraising.address = event.params.fundraising
  fundraising.nft = nftId
  fundraising.owner = event.params.owner
  fundraising.goalAmount = event.params.goalAmount
  fundraising.minInvestment = event.params.minInvestment
  fundraising.maxInvestment = event.params.maxInvestment
  fundraising.deadline = event.params.duration.times(BigInt.fromI32(86400)).plus(event.block.timestamp)
  fundraising.totalRaised = BigInt.fromI32(0)
  fundraising.isCompleted = false
  fundraising.createdAt = event.block.timestamp
  fundraising.save()

  // Start indexing the new fundraising contract
  RealEstateFundraisingTemplate.create(event.params.fundraising)
}
