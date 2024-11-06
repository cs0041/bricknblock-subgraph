import { FundraisingDaoCreated } from '../generated/FactoryFundraisingDao/FactoryFundraisingDao'
import { RealEstateFundraisingDao as FundraisingDaoTemplate } from '../generated/templates'
import { FundraisingDao } from '../generated/schema'
import { BigInt } from '@graphprotocol/graph-ts'

export function handleFundraisingDaoCreated(
  event: FundraisingDaoCreated
): void {
  let fundraisingDao = new FundraisingDao(
    event.params.fundraisingDao.toHexString()
  )
  fundraisingDao.address = event.params.fundraisingDao
  fundraisingDao.goalAmount = event.params.goalAmount
  fundraisingDao.minInvestment = event.params.minInvestment
  fundraisingDao.maxInvestment = event.params.maxInvestment
  fundraisingDao.deadline = event.params.duration.plus(event.block.timestamp)
  fundraisingDao.totalRaised = BigInt.fromI32(0)
  fundraisingDao.isCompleted = false
  fundraisingDao.createdAt = event.block.timestamp
  fundraisingDao.save()

  // Start indexing the new fundraising dao contract
  FundraisingDaoTemplate.create(event.params.fundraisingDao)
}
