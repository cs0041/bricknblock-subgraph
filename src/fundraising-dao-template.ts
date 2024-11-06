import { BigInt } from '@graphprotocol/graph-ts'
import {
  InvestmentMade,
  FundraisingCompleted,
  TokensClaimed,
} from '../generated/templates/RealEstateFundraisingDao/RealEstateFundraisingDao'
import { FundraisingDao, Investment } from '../generated/schema'

export function handleInvestmentMade(event: InvestmentMade): void {
  let fundraisingDaoId = event.address.toHexString()
  let investmentId = fundraisingDaoId
    .concat('-')
    .concat(event.params.investor.toHexString())

  let investment = new Investment(investmentId)
  investment.investor = event.params.investor
  investment.amount = event.params.amount
  investment.claimed = false
  investment.fundraisingDao = fundraisingDaoId
  investment.timestamp = event.block.timestamp
  investment.save()

  let fundraisingDao = FundraisingDao.load(fundraisingDaoId)
  if (fundraisingDao) {
    fundraisingDao.totalRaised = fundraisingDao.totalRaised.plus(
      event.params.amount
    )
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
