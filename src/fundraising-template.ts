import { BigInt } from '@graphprotocol/graph-ts'
import {
  InvestmentMade,
  InvestmentWithdrawn,
  FundraisingCompleted,
  TokensClaimed,
  PropertyTokenCreated,
  DeadlineExtended,
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

  let investment = Investment.load(investmentId)
  if (!investment) {
    investment = new Investment(investmentId)
    investment.investor = event.params.investor
    investment.amount = BigInt.fromI32(0)
    investment.claimed = false
    investment.fundraising = fundraisingId
    investment.timestamp = event.block.timestamp
  }
  
  investment.amount = investment.amount.plus(event.params.amount)
  investment.save()

  let fundraising = Fundraising.load(fundraisingId)
  if (fundraising) {
    fundraising.totalRaised = fundraising.totalRaised.plus(event.params.amount)
    fundraising.save()
  }
}

export function handleInvestmentWithdrawn(event: InvestmentWithdrawn): void {
  let fundraisingId = event.address.toHexString()
  let investmentId = fundraisingId
    .concat('-')
    .concat(event.params.investor.toHexString())

  let investment = Investment.load(investmentId)
  if (investment) {
    investment.amount = investment.amount.minus(event.params.amount)
    investment.save()
  }

  // Update fundraising total
  let fundraising = Fundraising.load(fundraisingId)
  if (fundraising) {
    fundraising.totalRaised = fundraising.totalRaised.minus(event.params.amount)
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

    let nft = NFT.load(fundraising.nft)
    if (nft) {
      nft.isTokenized = true
      nft.propertyToken = event.params.tokenAddress.toHexString()
      nft.save()
    }
  }
}

export function handleDeadlineExtended(event: DeadlineExtended): void {
  let fundraising = Fundraising.load(event.address.toHexString())
  if (fundraising) {
    fundraising.deadline = event.params.newDeadline
    fundraising.save()
  }
}
