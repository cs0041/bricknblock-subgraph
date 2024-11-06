import {
  FactoryToken,
  TokenCreated,
} from '../generated/FactoryToken/FactoryToken'
import { PropertyToken as PropertyTokenContract } from '../generated/FactoryToken/PropertyToken'
import { PropertyToken as PropertyTokenTemplate } from '../generated/templates'
import { PropertyToken, Fundraising, NFT } from '../generated/schema'
import { BigInt } from '@graphprotocol/graph-ts'

export function handleTokenCreated(event: TokenCreated): void {
  let propertyTokenId = event.params.token.toHexString()

  // Create or update PropertyToken entity
  let token = new PropertyToken(propertyTokenId)
  let tokenContract = PropertyTokenContract.bind(event.params.token)

  token.address = event.params.token
  token.name = tokenContract.try_name().value
  token.symbol = tokenContract.try_symbol().value
  token.totalSupply = BigInt.fromI32(0)
  token.createdAt = event.block.timestamp
  token.save()

  // Update Fundraising if it exists
  let fundraising = Fundraising.load(
    event.params.fundraisingContract.toHexString()
  )
  if (fundraising) {
    fundraising.propertyToken = propertyTokenId
    fundraising.save()

    // Update the PropertyToken with fundraising reference
    token.fundraising = fundraising.id
    token.save()

    // Update NFT if it exists
    let nft = NFT.load(fundraising.nft)
    if (nft) {
      nft.isTokenized = true
      nft.propertyToken = propertyTokenId
      nft.save()
    }
  }

  // Start indexing the new token contract
  PropertyTokenTemplate.create(event.params.token)
}
