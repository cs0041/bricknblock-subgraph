import { FundraisingDaoCreated } from '../generated/FactoryFundraisingDao/FactoryFundraisingDao'
import { RealEstateFundraisingDao as FundraisingDaoTemplate } from '../generated/templates'
import { FundraisingDao, PropertyToken, Proposal } from '../generated/schema'
import { BigInt } from '@graphprotocol/graph-ts'

export function handleFundraisingDaoCreated(
  event: FundraisingDaoCreated
): void {
  let propertyToken = PropertyToken.load(
    event.params.propertyToken.toHexString()
  )
  if (!propertyToken) return

  let proposalId = event.params.propertyToken
    .toHexString()
    .concat('-')
    .concat(event.params.proposalID.toString())
  let proposal = Proposal.load(proposalId)
  if (!proposal) return

  let fundraisingDao = new FundraisingDao(
    event.params.fundraisingDao.toHexString()
  )
  fundraisingDao.address = event.params.fundraisingDao
  fundraisingDao.propertyToken = propertyToken.id
  fundraisingDao.proposal = proposalId
  fundraisingDao.proposalId = event.params.proposalID
  fundraisingDao.goalAmount = event.params.goalAmount
  fundraisingDao.minInvestment = event.params.minInvestment
  fundraisingDao.maxInvestment = event.params.maxInvestment
  fundraisingDao.deadline = event.params.duration.times(BigInt.fromI32(86400)).plus(event.block.timestamp)
  fundraisingDao.totalRaised = BigInt.fromI32(0)
  fundraisingDao.isCompleted = false
  fundraisingDao.createdAt = event.block.timestamp
  fundraisingDao.save()

  propertyToken.fundraisingDao = event.params.fundraisingDao.toHexString()
  propertyToken.save()

  // Start indexing the new fundraising dao contract
  FundraisingDaoTemplate.create(event.params.fundraisingDao)
}
