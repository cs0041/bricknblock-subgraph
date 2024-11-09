import { BigInt, Address, Bytes } from '@graphprotocol/graph-ts'
import {
  ProposalCreated,
  VoteCast,
  ProposalExecuted,
  PropertyGovernance,
} from '../generated/PropertyGovernance/PropertyGovernance'
import { PropertyToken as PropertyTokenContract } from '../generated/PropertyGovernance/PropertyToken'
import { Proposal, Vote, PropertyToken, TokenHolder } from '../generated/schema'
import { log } from 'matchstick-as'

export function handleProposalCreated(event: ProposalCreated): void {
  let propertyGovernance = PropertyGovernance.bind(event.address)
  let proposalResult = propertyGovernance.try_getProposal(
    event.params.propertyToken, // propertyToken address
    event.params.proposalId
  )

  if (!proposalResult.reverted) {
    let proposal = proposalResult.value
    let proposalId = event.params.propertyToken
      .toHexString()
      .concat('-')
      .concat(event.params.proposalId.toString())

    // Load or create PropertyToken
    let propertyTokenId = event.params.propertyToken.toHexString()

    let proposalEntity = new Proposal(proposalId)
    proposalEntity.propertyToken = propertyTokenId
    proposalEntity.proposalId = event.params.proposalId
    proposalEntity.proposer = proposal.getProposer()
    proposalEntity.description = proposal.getDescription()
    proposalEntity.startTime = proposal.getStartTime()
    proposalEntity.endTime = proposal.getEndTime()
    proposalEntity.forVotes = proposal.getForVotes()
    proposalEntity.againstVotes = proposal.getAgainstVotes()
    proposalEntity.executed = proposal.getExecuted()
    proposalEntity.proposalType = proposal.getProposalType()
    proposalEntity.target = Address.fromString(
      '0x0000000000000000000000000000000000000000'
    )
    proposalEntity.callData = Bytes.fromHexString(
      '0x0000000000000000000000000000000000000000'
    )
    proposalEntity.proposalSnapshot = BigInt.fromI32(0)
    proposalEntity.state = propertyGovernance.getProposalState(
      event.params.propertyToken,
      event.params.proposalId
    )
    proposalEntity.createdAt = event.block.timestamp
    proposalEntity.save()
  }
}

export function handleVoteCast(event: VoteCast): void {
  let proposalId = event.params.propertyToken
    .toHexString()
    .concat('-')
    .concat(event.params.proposalId.toString())
  let propertyTokenId = event.address.toHexString()
  let holderId = propertyTokenId
    .concat('-')
    .concat(event.params.voter.toHexString())
  let voteId = proposalId.concat('-').concat(event.params.voter.toHexString())

  // Create or update TokenHolder
  let holder = TokenHolder.load(holderId)
  if (!holder) {
    holder = new TokenHolder(holderId)
    holder.address = event.params.voter
    holder.votingPower = event.params.weight
    holder.save()
  }

  let vote = new Vote(voteId)
  vote.proposal = proposalId
  vote.voter = holderId // Reference the TokenHolder entity
  vote.voterAddress = event.params.voter // Store the raw address
  vote.support = event.params.support
  vote.weight = event.params.weight
  vote.timestamp = event.block.timestamp
  vote.save()

  let proposal = Proposal.load(proposalId)
  if (proposal) {
    if (event.params.support) {
      proposal.forVotes = proposal.forVotes.plus(event.params.weight)
    } else {
      proposal.againstVotes = proposal.againstVotes.plus(event.params.weight)
    }

    let propertyGovernance = PropertyGovernance.bind(event.address)
    proposal.state = propertyGovernance.getProposalState(
      Address.fromString(proposal.propertyToken),
      proposal.proposalId
    )

    proposal.save()
  }
}

export function handleProposalExecuted(event: ProposalExecuted): void {
  let propertyGovernance = PropertyGovernance.bind(event.address)
  let proposalResult = propertyGovernance.try_getProposal(
    event.transaction.to as Address, // propertyToken address
    event.params.proposalId
  )

  let proposalId = event.params.propertyToken
    .toHexString()
    .concat('-')
    .concat(event.params.proposalId.toString())

  let proposal = Proposal.load(proposalId)
  if (proposal) {
    proposal.executed = true
    proposal.state = 4 // Executed state

    // If the proposal result is available, update any final values
    if (!proposalResult.reverted) {
      let proposalData = proposalResult.value
      proposal.forVotes = proposalData.getForVotes()
      proposal.againstVotes = proposalData.getAgainstVotes()
    }

    // Get the final state from the contract
    let stateResult = propertyGovernance.try_getProposalState(
      event.transaction.to as Address,
      event.params.proposalId
    )
    if (!stateResult.reverted) {
      proposal.state = stateResult.value
    }

    proposal.save()

    // Update the PropertyToken if needed (for certain proposal types)
    let propertyToken = PropertyToken.load(proposal.propertyToken)
    if (propertyToken) {
      // Update any relevant PropertyToken fields based on the proposal type
      if (proposal.proposalType == 2) {
        // TransferFunds
        // You might want to update some token stats here
      } else if (proposal.proposalType == 3) {
        // CreateFundraising
        // You might want to link the new fundraising here
      }
      propertyToken.save()
    }
  }
}
