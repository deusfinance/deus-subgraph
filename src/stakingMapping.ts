import { BigInt } from "@graphprotocol/graph-ts"
import {
  Deposit,
  Withdraw,
  RewardClaimed,
  EmergencyWithdraw,
  RewardPerBlockChanged
} from "../generated/SDeaStaking/SDeaStaking"
import { StakingEntity, StakingRewardPerBlockEntity } from "../generated/schema"

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