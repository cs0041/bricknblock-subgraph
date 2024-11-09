import { BigInt, Address } from '@graphprotocol/graph-ts'
import {
  Transfer,
  DelegateChanged,
  DividendDistributed,
  DividendClaimed,
} from '../generated/templates/PropertyToken/PropertyToken'
import {
  Dividend,
  DividendClaim,
  PropertyToken,
  TokenHolder,
  TokenBalance,
  Transfer as TransferEntity,
} from '../generated/schema'

export function handleTransfer(event: Transfer): void {
  let token = PropertyToken.load(event.address.toHexString())
  if (!token) return

  // Handle sender
  let fromHolder = TokenHolder.load(event.params.from.toHexString())
  if (fromHolder) {
    let fromBalanceId = event.params.from.toHexString()
      .concat('-')
      .concat(event.address.toHexString())
    let fromBalance = TokenBalance.load(fromBalanceId)
    if (fromBalance) {
      fromBalance.balance = fromBalance.balance.minus(event.params.value)
      fromBalance.save()
    }
  }

  // Handle receiver
  let toHolder = TokenHolder.load(event.params.to.toHexString())
  if (!toHolder) {
    toHolder = new TokenHolder(event.params.to.toHexString())
    toHolder.address = event.params.to
    toHolder.votingPower = BigInt.fromI32(0)
    toHolder.save()
  }

  let toBalanceId = event.params.to.toHexString()
    .concat('-')
    .concat(event.address.toHexString())
  let toBalance = TokenBalance.load(toBalanceId)
  if (!toBalance) {
    toBalance = new TokenBalance(toBalanceId)
    toBalance.holder = toHolder.id
    toBalance.token = token.id
    toBalance.balance = BigInt.fromI32(0)
  }
  toBalance.balance = toBalance.balance.plus(event.params.value)
  toBalance.save()

  // Create Transfer entity
  let transfer = new TransferEntity(
    event.transaction.hash.toHexString().concat('-').concat(event.logIndex.toString())
  )
  transfer.token = token.id
  transfer.from = event.params.from
  transfer.to = event.params.to
  transfer.amount = event.params.value
  transfer.timestamp = event.block.timestamp
  transfer.save()

  if (event.params.from == Address.zero()) {
    token.totalSupply = token.totalSupply.plus(event.params.value)
    token.save()
  } else if (event.params.to == Address.zero()) {
    token.totalSupply = token.totalSupply.minus(event.params.value)
    token.save()
  }
}

export function handleDelegateChanged(event: DelegateChanged): void {
  let holderId = event.address
    .toHexString()
    .concat('-')
    .concat(event.params.delegator.toHexString())
  let holder = TokenHolder.load(holderId)
  if (holder) {
    holder.delegatedTo = event.params.toDelegate
    holder.save()
  }
}

export function handleDividendDistributed(event: DividendDistributed): void {
  let dividendId = event.params.dividendIndex.toString()
  let propertyTokenAddress = event.address.toHexString()

  let dividend = new Dividend(propertyTokenAddress + '-' + dividendId)
  let propertyToken = PropertyToken.load(propertyTokenAddress)

  if (propertyToken) {
    dividend.propertyToken = propertyToken.id
    dividend.dividendId = event.params.dividendIndex
    dividend.amount = event.params.amount
    dividend.timestamp = event.block.timestamp
    dividend.totalClaimed = BigInt.fromI32(0)
    dividend.save()
  }
}

export function handleDividendClaimed(event: DividendClaimed): void {
  let propertyTokenAddress = event.address.toHexString()
  let dividendId = event.params.dividendIndex.toString()
  let holderAddress = event.params.user.toHexString()

  let claimId = dividendId + '-' + holderAddress
  let dividendClaim = new DividendClaim(claimId)

  let dividend = Dividend.load(propertyTokenAddress + '-' + dividendId)
  let holder = TokenHolder.load(holderAddress)

  if (dividend && holder) {
    dividendClaim.dividend = dividend.id
    dividendClaim.holder = holder.id
    dividendClaim.amount = event.params.amount
    dividendClaim.timestamp = event.block.timestamp
    dividendClaim.save()

    // Update total claimed amount
    dividend.totalClaimed = dividend.totalClaimed.plus(event.params.amount)
    dividend.save()
  }
}
