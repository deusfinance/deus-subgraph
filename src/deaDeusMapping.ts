import { BigInt } from "@graphprotocol/graph-ts"
import {
  Swap
} from "../generated/DeaDeusVault/DeaDeusVault"
import { LPEntity } from "../generated/schema"

export function handleSwap(event: Swap): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = LPEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new LPEntity(event.transaction.from.toHex())
  }

  // Entity fields can be set based on event parameters
  entity.name = 'DeaDeus';
  entity.from = event.params.sender;
  entity.amount0In = event.params.amount0In;
  entity.amount1In = event.params.amount1In;
  entity.amount0Out = event.params.amount0Out;
  entity.amount1Out = event.params.amount1Out;
  entity.to = event.params.to;
  // entity.lockedAmount = event.params.lockedAmount
  // entity.sealedAmount = event.params.sandAmount
  // entity.timeAmount = event.params.timeAmount

  // Entities can be written to the store with `.save()`
  entity.save()
}