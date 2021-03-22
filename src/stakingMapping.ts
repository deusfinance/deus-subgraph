import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Deposit,
  Withdraw,
  RewardClaimed,
  EmergencyWithdraw,
  RewardPerBlockChanged
} from "../generated/SDeaStaking/SDeaStaking"
import { StakingEntity, StakingRewardPerBlockEntity, StakingSummaryEntity } from "../generated/schema"

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

// SDea part
export function handleSDeaDeposit(event: Deposit): void {
  let entity = StakingEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.from.toHex())
  }
  entity.name = 'sDea';
  entity.type = 'Deposit';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'sDea', 'plus');
}

export function handleSDeaWithdraw(event: Withdraw): void {
  let entity = StakingEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.from.toHex())
  }
  entity.name = 'sDea';
  entity.type = 'Withdraw';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'sDea', 'minus');
}

export function handleSDeaEmergencyWithdraw(event: EmergencyWithdraw): void {
  let entity = StakingEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.from.toHex())
  }
  entity.name = 'sDea';
  entity.type = 'EmergencyWithdraw';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'sDea', 'minus');
}

export function handleSDeaRewardClaimed(event: RewardClaimed): void {
  let entity = StakingEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.from.toHex())
  }
  entity.name = 'sDea';
  entity.type = 'RewardClaimed';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'sDea', 'minus');
}

export function handleSDeaRewardPerBlockChanged(event: RewardPerBlockChanged): void {
  let entity = StakingRewardPerBlockEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingRewardPerBlockEntity(event.transaction.from.toHex())
  }
  entity.name = 'sDea';
  entity.oldValue = event.params.oldValue;
  entity.newValue = event.params.newValue;
  entity.save()
}

//SDeus part
export function handleSDeusDeposit(event: Deposit): void {
  let entity = StakingEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.from.toHex())
  }
  entity.name = 'sDeus';
  entity.type = 'Deposit';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'sDeus', 'plus');
}

export function handleSDeusWithdraw(event: Withdraw): void {
  let entity = StakingEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.from.toHex())
  }
  entity.name = 'sDeus';
  entity.type = 'Withdraw';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'sDeus', 'minus');
}

export function handleSDeusEmergencyWithdraw(event: EmergencyWithdraw): void {
  let entity = StakingEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.from.toHex())
  }
  entity.name = 'sDeus';
  entity.type = 'EmergencyWithdraw';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'sDeus', 'minus');
}

export function handleSDeusRewardClaimed(event: RewardClaimed): void {
  let entity = StakingEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.from.toHex())
  }
  entity.name = 'sDeus';
  entity.type = 'RewardClaimed';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'sDeus', 'minus');
}

export function handleSDeusRewardPerBlockChanged(event: RewardPerBlockChanged): void {
  let entity = StakingRewardPerBlockEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingRewardPerBlockEntity(event.transaction.from.toHex())
  }
  entity.name = 'sDeus';
  entity.oldValue = event.params.oldValue;
  entity.newValue = event.params.newValue;
  entity.save()
}

//Time part
export function handleTimeDeposit(event: Deposit): void {
  let entity = StakingEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.from.toHex())
  }
  entity.name = 'Time';
  entity.type = 'Deposit';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'Time', 'plus');
}

export function handleTimeWithdraw(event: Withdraw): void {
  let entity = StakingEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.from.toHex())
  }
  entity.name = 'Time';
  entity.type = 'Withdraw';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'Time', 'minus');
}

export function handleTimeEmergencyWithdraw(event: EmergencyWithdraw): void {
  let entity = StakingEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.from.toHex())
  }
  entity.name = 'Time';
  entity.type = 'EmergencyWithdraw';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'Time', 'minus');
}

export function handleTimeRewardClaimed(event: RewardClaimed): void {
  let entity = StakingEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.from.toHex())
  }
  entity.name = 'Time';
  entity.type = 'RewardClaimed';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'Time', 'minus');
}

export function handleTimeRewardPerBlockChanged(event: RewardPerBlockChanged): void {
  let entity = StakingRewardPerBlockEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingRewardPerBlockEntity(event.transaction.from.toHex())
  }
  entity.name = 'Time';
  entity.oldValue = event.params.oldValue;
  entity.newValue = event.params.newValue;
  entity.save()
}

//Balancer part
export function handleBalancerDeposit(event: Deposit): void {
  let entity = StakingEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.from.toHex())
  }
  entity.name = 'Balancer';
  entity.type = 'Deposit';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'Balancer', 'plus');
}

export function handleBalancerWithdraw(event: Withdraw): void {
  let entity = StakingEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.from.toHex())
  }
  entity.name = 'Balancer';
  entity.type = 'Withdraw';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'Balancer', 'minus');
}

export function handleBalancerEmergencyWithdraw(event: EmergencyWithdraw): void {
  let entity = StakingEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.from.toHex())
  }
  entity.name = 'Balancer';
  entity.type = 'EmergencyWithdraw';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'Balancer', 'minus');
}

export function handleBalancerRewardClaimed(event: RewardClaimed): void {
  let entity = StakingEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingEntity(event.transaction.from.toHex())
  }
  entity.name = 'Balancer';
  entity.type = 'RewardClaimed';
  entity.address = event.params.user;
  entity.amount = event.params.amount;
  entity.save()
  updateSummaryEntity(event.params.user, event.params.amount, 'Balancer', 'minus');
}

export function handleBalancerRewardPerBlockChanged(event: RewardPerBlockChanged): void {
  let entity = StakingRewardPerBlockEntity.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new StakingRewardPerBlockEntity(event.transaction.from.toHex())
  }
  entity.name = 'Balancer';
  entity.oldValue = event.params.oldValue;
  entity.newValue = event.params.newValue;
  entity.save()
}