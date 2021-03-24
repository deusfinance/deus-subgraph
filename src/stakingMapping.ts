import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Deposit,
  Withdraw,
  RewardClaimed,
  EmergencyWithdraw,
  RewardPerBlockChanged
} from "../generated/SDeaStaking/SDeaStaking"
import { StakingEntity, StakingRewardClaimedEntity, StakingRewardPerBlockEntity, StakingSummaryEntity } from "../generated/schema"

function updateStakingSummaryEntity(id: string, amount: BigInt, name: String, type: String): void {
  let summary = StakingSummaryEntity.load(id);

  if (summary === null) {
    summary = new StakingSummaryEntity(id);
    summary.totalValueLocked = BigInt.fromI32(0);
    summary.sDeaLocked = BigInt.fromI32(0);
    summary.sDeusLocked = BigInt.fromI32(0);
    summary.timeLocked = BigInt.fromI32(0);
    summary.balancerLocked = BigInt.fromI32(0);
    summary.save();
  }
  if (type === 'plus') {
    summary.totalValueLocked = summary.totalValueLocked.plus(amount)
  } else {
    summary.totalValueLocked = summary.totalValueLocked.minus(amount)
  }

  if (name === 'sDea') {
    if (type === 'plus') {
      summary.sDeaLocked = summary.sDeaLocked.plus(amount)
    } else {
      summary.sDeaLocked = summary.sDeaLocked.minus(amount)
    }
  }
  if (name === 'sDeus') {
    if (type === 'plus') {
      summary.sDeusLocked = summary.sDeusLocked.plus(amount)
    } else {
      summary.sDeusLocked = summary.sDeusLocked.minus(amount)
    }
  }
  if (name === 'Time') {
    if (type === 'plus') {
      summary.timeLocked = summary.timeLocked.plus(amount)
    } else {
      summary.timeLocked = summary.timeLocked.minus(amount)
    }
  }
  if (name === 'Balancer') {
    if (type === 'plus') {
      summary.balancerLocked = summary.balancerLocked.plus(amount)
    } else {
      summary.balancerLocked = summary.balancerLocked.minus(amount)
    }
  }
  summary.save();
}

function updateSummaryEntity(id: Address, amount: BigInt, name: String, type: String): void {
  updateStakingSummaryEntity('0', amount, name, type)
  updateStakingSummaryEntity(id.toHex(), amount, name, type)
}

function updateRewardClaimedEntity(id: string, amount: BigInt, name: String): void {
  let summary = StakingRewardClaimedEntity.load(id);

  if (summary === null) {
    summary = new StakingRewardClaimedEntity(id);
    summary.totalRewardClaimed = BigInt.fromI32(0);
    summary.balancerRewardClaimed = BigInt.fromI32(0);
    summary.sDeaRewardClaimed = BigInt.fromI32(0);
    summary.sDeusRewardClaimed = BigInt.fromI32(0);
    summary.timeRewardClaimed = BigInt.fromI32(0);
    summary.save();
  }
    
  summary.totalRewardClaimed = summary.totalRewardClaimed.plus(amount)
  if (name === 'Balancer') {
    summary.balancerRewardClaimed = summary.balancerRewardClaimed.plus(amount)
  }
  if (name === 'sDea') {
    summary.sDeaRewardClaimed = summary.sDeaRewardClaimed.plus(amount)
  }
  if (name === 'sDeus') {
    summary.sDeusRewardClaimed = summary.sDeusRewardClaimed.plus(amount)
  }
  if (name === 'Time') {
    summary.timeRewardClaimed = summary.timeRewardClaimed.plus(amount)
  }
  summary.save();
}

function updateRewardClaimed(id: Address, amount: BigInt, name: String): void {
  updateRewardClaimedEntity('0', amount, name)
  updateRewardClaimedEntity(id.toHex(), amount, name)
}

// SDea part
export function handleSDeaDeposit(event: Deposit): void {
  let entity = StakingEntity.load(event.transaction.hash.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.hash.toHex())
  }
  entity.name = 'sDea';
  entity.type = 'Deposit';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'sDea', 'plus');
}

export function handleSDeaWithdraw(event: Withdraw): void {
  let entity = StakingEntity.load(event.transaction.hash.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.hash.toHex())
  }
  entity.name = 'sDea';
  entity.type = 'Withdraw';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'sDea', 'minus');
}

export function handleSDeaEmergencyWithdraw(event: EmergencyWithdraw): void {
  let entity = StakingEntity.load(event.transaction.hash.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.hash.toHex())
  }
  entity.name = 'sDea';
  entity.type = 'EmergencyWithdraw';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'sDea', 'minus');
}

export function handleSDeaRewardClaimed(event: RewardClaimed): void {
  updateRewardClaimed(event.params.user, event.params.amount, 'sDea');
}

export function handleSDeaRewardPerBlockChanged(event: RewardPerBlockChanged): void {
  let entity = StakingRewardPerBlockEntity.load('sDea')
  if (entity == null) {
    entity = new StakingRewardPerBlockEntity('sDea')
  }
  entity.oldValue = event.params.oldValue;
  entity.newValue = event.params.newValue;
  entity.save()
}

//SDeus part
export function handleSDeusDeposit(event: Deposit): void {
  let entity = StakingEntity.load(event.transaction.hash.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.hash.toHex())
  }
  entity.name = 'sDeus';
  entity.type = 'Deposit';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'sDeus', 'plus');
}

export function handleSDeusWithdraw(event: Withdraw): void {
  let entity = StakingEntity.load(event.transaction.hash.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.hash.toHex())
  }
  entity.name = 'sDeus';
  entity.type = 'Withdraw';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'sDeus', 'minus');
}

export function handleSDeusEmergencyWithdraw(event: EmergencyWithdraw): void {
  let entity = StakingEntity.load(event.transaction.hash.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.hash.toHex())
  }
  entity.name = 'sDeus';
  entity.type = 'EmergencyWithdraw';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'sDeus', 'minus');
}

export function handleSDeusRewardClaimed(event: RewardClaimed): void {
  updateRewardClaimed(event.params.user, event.params.amount, 'sDeus');
}

export function handleSDeusRewardPerBlockChanged(event: RewardPerBlockChanged): void {
  let entity = StakingRewardPerBlockEntity.load('sDeus')
  if (entity == null) {
    entity = new StakingRewardPerBlockEntity('sDeus')
  }
  entity.oldValue = event.params.oldValue;
  entity.newValue = event.params.newValue;
  entity.save()
}

//Time part
export function handleTimeDeposit(event: Deposit): void {
  let entity = StakingEntity.load(event.transaction.hash.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.hash.toHex())
  }
  entity.name = 'Time';
  entity.type = 'Deposit';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'Time', 'plus');
}

export function handleTimeWithdraw(event: Withdraw): void {
  let entity = StakingEntity.load(event.transaction.hash.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.hash.toHex())
  }
  entity.name = 'Time';
  entity.type = 'Withdraw';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'Time', 'minus');
}

export function handleTimeEmergencyWithdraw(event: EmergencyWithdraw): void {
  let entity = StakingEntity.load(event.transaction.hash.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.hash.toHex())
  }
  entity.name = 'Time';
  entity.type = 'EmergencyWithdraw';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'Time', 'minus');
}

export function handleTimeRewardClaimed(event: RewardClaimed): void {
  updateRewardClaimed(event.params.user, event.params.amount, 'Time');
}

export function handleTimeRewardPerBlockChanged(event: RewardPerBlockChanged): void {
  let entity = StakingRewardPerBlockEntity.load('Time')
  if (entity == null) {
    entity = new StakingRewardPerBlockEntity('Time')
  }
  entity.oldValue = event.params.oldValue;
  entity.newValue = event.params.newValue;
  entity.save()
}

//Balancer part
export function handleBalancerDeposit(event: Deposit): void {
  let entity = StakingEntity.load(event.transaction.hash.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.hash.toHex())
  }
  entity.name = 'Balancer';
  entity.type = 'Deposit';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'Balancer', 'plus');
}

export function handleBalancerWithdraw(event: Withdraw): void {
  let entity = StakingEntity.load(event.transaction.hash.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.hash.toHex())
  }
  entity.name = 'Balancer';
  entity.type = 'Withdraw';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'Balancer', 'minus');
}

export function handleBalancerEmergencyWithdraw(event: EmergencyWithdraw): void {
  let entity = StakingEntity.load(event.transaction.hash.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.hash.toHex())
  }
  entity.name = 'Balancer';
  entity.type = 'EmergencyWithdraw';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'Balancer', 'minus');
}

export function handleBalancerRewardClaimed(event: RewardClaimed): void {
  updateRewardClaimed(event.params.user, event.params.amount, 'Balancer');
}

export function handleBalancerRewardPerBlockChanged(event: RewardPerBlockChanged): void {
  let entity = StakingRewardPerBlockEntity.load('Balancer')
  if (entity == null) {
    entity = new StakingRewardPerBlockEntity('Balancer')
  }
  entity.oldValue = event.params.oldValue;
  entity.newValue = event.params.newValue;
  entity.save()
}