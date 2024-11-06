import {
  FactoryToken,
  TokenCreated,
} from '../generated/FactoryToken/FactoryToken'
import { PropertyToken as PropertyTokenContract } from '../generated/FactoryToken/PropertyToken'
import { PropertyToken as PropertyTokenTemplate } from '../generated/templates'
import { PropertyToken } from '../generated/schema'
import { BigInt } from '@graphprotocol/graph-ts'

export function handleTokenCreated(event: TokenCreated): void {
  // Get token address from allPropertyTokenContracts array
  let factoryContract = FactoryToken.bind(event.address)
  let tokenAddress = factoryContract.allPropertyTokenContracts(
    BigInt.fromI32(0)
  )

  // Create new PropertyToken entity
  let token = new PropertyToken(tokenAddress.toHexString())

  // Get the actual token contract to fetch name and symbol
  let tokenContract = PropertyTokenContract.bind(tokenAddress)

  token.address = event.params.token
  token.name = tokenContract.name()
  token.symbol = tokenContract.symbol()
  token.totalSupply = BigInt.fromI32(0)
  token.createdAt = event.block.timestamp
  token.save()

  // Start indexing the new token contract
  PropertyTokenTemplate.create(event.params.token)
}

// export function handleTokenCreated(event: TokenCreated): void {
//   // Create new PropertyToken entity
//   let token = new PropertyToken(event.params.token.toHexString())

//   // Get the actual token contract to fetch name and symbol
//   let tokenContract = PropertyTokenContract.bind(event.params.token)

//   token.address = event.params.token
//   token.name = tokenContract.try_name().value
//   token.symbol = tokenContract.try_symbol().value
//   token.totalSupply = BigInt.fromI32(0)
//   token.createdAt = event.block.timestamp
//   token.save()

//   // Start indexing the new token contract
//   PropertyTokenTemplate.create(event.params.token)
// }
