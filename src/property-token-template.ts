import { BigInt, Address } from '@graphprotocol/graph-ts'
import {
  Transfer,
  DelegateChanged,
} from '../generated/templates/PropertyToken/PropertyToken'
import {
  PropertyToken,
  TokenHolder,
  Transfer as TransferEntity,
} from '../generated/schema'

export function handleTransfer(event: Transfer): void {
  let token = PropertyToken.load(event.address.toHexString())
  if (!token) return

  // Update or create sender TokenHolder
  let fromHolderId = event.address
    .toHexString()
    .concat('-')
    .concat(event.params.from.toHexString())
  let fromHolder = TokenHolder.load(fromHolderId)
  if (fromHolder) {
    fromHolder.balance = fromHolder.balance.minus(event.params.value)
    fromHolder.save()
  }

  // Update or create receiver TokenHolder
  let toHolderId = event.address
    .toHexString()
    .concat('-')
    .concat(event.params.to.toHexString())
  let toHolder = TokenHolder.load(toHolderId)
  if (!toHolder) {
    toHolder = new TokenHolder(toHolderId)
    toHolder.address = event.params.to
    toHolder.token = token.id
    toHolder.balance = BigInt.fromI32(0)
    toHolder.votingPower = BigInt.fromI32(0)
  }
  toHolder.balance = toHolder.balance.plus(event.params.value)
  if (!toHolder.delegatedTo) {
    toHolder.votingPower = toHolder.balance
  }
  toHolder.save()

  // Create Transfer entity
  let transfer = new TransferEntity(
    event.transaction.hash
      .toHexString()
      .concat('-')
      .concat(event.logIndex.toString())
  )
  transfer.token = token.id
  transfer.from = event.params.from
  transfer.to = event.params.to
  transfer.amount = event.params.value
  transfer.timestamp = event.block.timestamp
  transfer.save()

  // Update token total supply if minting/burning
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
