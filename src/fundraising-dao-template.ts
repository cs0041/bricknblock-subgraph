import { BigInt } from '@graphprotocol/graph-ts'
import {
  InvestmentMade,
  FundraisingCompleted,
  TokensClaimed,
  DeadlineExtended,
  InvestmentWithdrawn
} from '../generated/templates/RealEstateFundraisingDao/RealEstateFundraisingDao'
import { FundraisingDao, Investment } from '../generated/schema'

export function handleInvestmentMade(event: InvestmentMade): void {
  let fundraisingDaoId = event.address.toHexString()
  let investmentId = fundraisingDaoId
    .concat('-')
    .concat(event.params.investor.toHexString())

  let investment = Investment.load(investmentId)
  if (!investment) {
    investment = new Investment(investmentId)
    investment.investor = event.params.investor
    investment.amount = BigInt.fromI32(0)
    investment.claimed = false
    investment.fundraisingDao = fundraisingDaoId
    investment.timestamp = event.block.timestamp
  }

  investment.amount = investment.amount.plus(event.params.amount)
  investment.save()

  let fundraisingDao = FundraisingDao.load(fundraisingDaoId)
  if (fundraisingDao) {
    fundraisingDao.totalRaised = fundraisingDao.totalRaised.plus(event.params.amount)
    fundraisingDao.save()
  }

}

export function handleInvestmentWithdrawn(event: InvestmentWithdrawn): void {
  let fundraisingDaoId = event.address.toHexString()
  let investmentId = fundraisingDaoId
    .concat('-')
    .concat(event.params.investor.toHexString())

  let investment = Investment.load(investmentId)
  if (investment) {
    investment.amount = investment.amount.minus(event.params.amount)
    investment.save()
  }

  // Update fundraising total
  let fundraisingDao = FundraisingDao.load(fundraisingDaoId)
  if (fundraisingDao) {
    fundraisingDao.totalRaised = fundraisingDao.totalRaised.minus(event.params.amount)
    fundraisingDao.save()
  }
}

export function handleFundraisingCompleted(event: FundraisingCompleted): void {
  let fundraisingDao = FundraisingDao.load(event.address.toHexString())
  if (fundraisingDao) {
    fundraisingDao.isCompleted = true
    fundraisingDao.save()
  }
}

export function handleTokensClaimed(event: TokensClaimed): void {
  let fundraisingDaoId = event.address.toHexString()
  let investmentId = fundraisingDaoId
    .concat('-')
    .concat(event.params.investor.toHexString())

  let investment = Investment.load(investmentId)
  if (investment) {
    investment.claimed = true
    investment.save()
  }
}

export function handleDeadlineExtended(event: DeadlineExtended): void {
  let fundraisingDao = FundraisingDao.load(event.address.toHexString())
  if (fundraisingDao) {
    fundraisingDao.deadline = event.params.newDeadline
    fundraisingDao.save()
  }
}
