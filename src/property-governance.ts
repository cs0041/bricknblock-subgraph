import { BigInt, Address, Bytes } from '@graphprotocol/graph-ts'
import {
  ProposalCreated,
  VoteCast,
  ProposalExecuted,
  PropertyGovernance,
} from '../generated/PropertyGovernance/PropertyGovernance'
import { PropertyToken as PropertyTokenContract } from '../generated/PropertyGovernance/PropertyToken'
import { Proposal, Vote, PropertyToken, TokenHolder, TokenBalance } from '../generated/schema'
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
    proposalEntity.target = proposal.getTarget()
    proposalEntity.callData = proposal.getCallData()
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
  
  // Create or update TokenHolder using wallet address as ID
  let holder = TokenHolder.load(event.params.voter.toHexString())
  if (!holder) {
    holder = new TokenHolder(event.params.voter.toHexString())
    holder.address = event.params.voter
    holder.votingPower = event.params.weight
    holder.save()
  }

  // Create TokenBalance if needed
  let balanceId = event.params.voter.toHexString()
    .concat('-')
    .concat(event.params.propertyToken.toHexString())
  let tokenBalance = TokenBalance.load(balanceId)
  if (!tokenBalance) {
    tokenBalance = new TokenBalance(balanceId)
    tokenBalance.holder = holder.id
    tokenBalance.token = event.params.propertyToken.toHexString()
    tokenBalance.balance = BigInt.fromI32(0)
    tokenBalance.save()
  }

  let voteId = proposalId.concat('-').concat(event.params.voter.toHexString())
  let vote = new Vote(voteId)
  vote.proposal = proposalId
  vote.voter = holder.id
  vote.voterAddress = event.params.voter
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

    // // Update the PropertyToken if needed (for certain proposal types)
    // let propertyToken = PropertyToken.load(proposal.propertyToken)
    // if (propertyToken) {
    //   if (proposal.proposalType == 3) { // CreateFundraising
    //     propertyToken.fundraisingDao = event.params.target.toHexString()
    //     propertyToken.save()
    //   }
    // }
  }
}
