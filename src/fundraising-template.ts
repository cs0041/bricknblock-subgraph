import { BigInt } from '@graphprotocol/graph-ts'
import {
  InvestmentMade,
  FundraisingCompleted,
  TokensClaimed,
  PropertyTokenCreated,
} from '../generated/templates/RealEstateFundraising/RealEstateFundraising'
import {
  Fundraising,
  Investment,
  PropertyToken,
  NFT,
} from '../generated/schema'

export function handleInvestmentMade(event: InvestmentMade): void {
  let fundraisingId = event.address.toHexString()
  let investmentId = fundraisingId
    .concat('-')
    .concat(event.params.investor.toHexString())

  let investment = new Investment(investmentId)
  investment.investor = event.params.investor
  investment.amount = event.params.amount
  investment.claimed = false
  investment.fundraising = fundraisingId
  investment.timestamp = event.block.timestamp
  investment.save()

  let fundraising = Fundraising.load(fundraisingId)
  if (fundraising) {
    fundraising.totalRaised = fundraising.totalRaised.plus(event.params.amount)
    fundraising.save()
  }
}

export function handleFundraisingCompleted(event: FundraisingCompleted): void {
  let fundraising = Fundraising.load(event.address.toHexString())
  if (fundraising) {
    fundraising.isCompleted = true
    fundraising.save()
  }
}

export function handleTokensClaimed(event: TokensClaimed): void {
  let fundraisingId = event.address.toHexString()
  let investmentId = fundraisingId
    .concat('-')
    .concat(event.params.investor.toHexString())

  let investment = Investment.load(investmentId)
  if (investment) {
    investment.claimed = true
    investment.save()
  }
}

export function handlePropertyTokenCreated(event: PropertyTokenCreated): void {
  let fundraising = Fundraising.load(event.address.toHexString())
  if (fundraising) {
    fundraising.propertyToken = event.params.tokenAddress.toHexString()
    fundraising.save()

    let nft = NFT.load(fundraising.nftId.toString())
    if (nft) {
      nft.isTokenized = true
      nft.propertyToken = event.params.tokenAddress.toHexString()
      nft.save()
    }
  }
}
