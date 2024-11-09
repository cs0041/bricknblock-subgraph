// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class ProposalCreated extends ethereum.Event {
  get params(): ProposalCreated__Params {
    return new ProposalCreated__Params(this);
  }
}

export class ProposalCreated__Params {
  _event: ProposalCreated;

  constructor(event: ProposalCreated) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get proposer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get propertyToken(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get description(): string {
    return this._event.parameters[3].value.toString();
  }
}

export class ProposalExecuted extends ethereum.Event {
  get params(): ProposalExecuted__Params {
    return new ProposalExecuted__Params(this);
  }
}

export class ProposalExecuted__Params {
  _event: ProposalExecuted;

  constructor(event: ProposalExecuted) {
    this._event = event;
  }

  get executor(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get proposalId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get propertyToken(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class VoteCast extends ethereum.Event {
  get params(): VoteCast__Params {
    return new VoteCast__Params(this);
  }
}

export class VoteCast__Params {
  _event: VoteCast;

  constructor(event: VoteCast) {
    this._event = event;
  }

  get voter(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get proposalId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get propertyToken(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get support(): boolean {
    return this._event.parameters[3].value.toBoolean();
  }

  get weight(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class PropertyGovernance__getProposalResult {
  value0: Address;
  value1: string;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;
  value5: BigInt;
  value6: boolean;
  value7: i32;
  value8: Address;
  value9: Bytes;

  constructor(
    value0: Address,
    value1: string,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt,
    value5: BigInt,
    value6: boolean,
    value7: i32,
    value8: Address,
    value9: Bytes,
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
    this.value8 = value8;
    this.value9 = value9;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    map.set("value6", ethereum.Value.fromBoolean(this.value6));
    map.set(
      "value7",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value7)),
    );
    map.set("value8", ethereum.Value.fromAddress(this.value8));
    map.set("value9", ethereum.Value.fromBytes(this.value9));
    return map;
  }

  getProposer(): Address {
    return this.value0;
  }

  getDescription(): string {
    return this.value1;
  }

  getStartTime(): BigInt {
    return this.value2;
  }

  getEndTime(): BigInt {
    return this.value3;
  }

  getForVotes(): BigInt {
    return this.value4;
  }

  getAgainstVotes(): BigInt {
    return this.value5;
  }

  getExecuted(): boolean {
    return this.value6;
  }

  getProposalType(): i32 {
    return this.value7;
  }

  getTarget(): Address {
    return this.value8;
  }

  getCallData(): Bytes {
    return this.value9;
  }
}

export class PropertyGovernance__proposalsResult {
  value0: BigInt;
  value1: Address;
  value2: string;
  value3: BigInt;
  value4: BigInt;
  value5: BigInt;
  value6: BigInt;
  value7: boolean;
  value8: i32;
  value9: Address;
  value10: Address;
  value11: Bytes;
  value12: BigInt;

  constructor(
    value0: BigInt,
    value1: Address,
    value2: string,
    value3: BigInt,
    value4: BigInt,
    value5: BigInt,
    value6: BigInt,
    value7: boolean,
    value8: i32,
    value9: Address,
    value10: Address,
    value11: Bytes,
    value12: BigInt,
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
    this.value8 = value8;
    this.value9 = value9;
    this.value10 = value10;
    this.value11 = value11;
    this.value12 = value12;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    map.set("value6", ethereum.Value.fromUnsignedBigInt(this.value6));
    map.set("value7", ethereum.Value.fromBoolean(this.value7));
    map.set(
      "value8",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value8)),
    );
    map.set("value9", ethereum.Value.fromAddress(this.value9));
    map.set("value10", ethereum.Value.fromAddress(this.value10));
    map.set("value11", ethereum.Value.fromBytes(this.value11));
    map.set("value12", ethereum.Value.fromUnsignedBigInt(this.value12));
    return map;
  }

  getId(): BigInt {
    return this.value0;
  }

  getProposer(): Address {
    return this.value1;
  }

  getDescription(): string {
    return this.value2;
  }

  getStartTime(): BigInt {
    return this.value3;
  }

  getEndTime(): BigInt {
    return this.value4;
  }

  getForVotes(): BigInt {
    return this.value5;
  }

  getAgainstVotes(): BigInt {
    return this.value6;
  }

  getExecuted(): boolean {
    return this.value7;
  }

  getProposalType(): i32 {
    return this.value8;
  }

  getTarget(): Address {
    return this.value9;
  }

  getPropertyToken(): Address {
    return this.value10;
  }

  getCallData(): Bytes {
    return this.value11;
  }

  getProposalSnapshot(): BigInt {
    return this.value12;
  }
}

export class PropertyGovernance extends ethereum.SmartContract {
  static bind(address: Address): PropertyGovernance {
    return new PropertyGovernance("PropertyGovernance", address);
  }

  PROPOSAL_THRESHOLD(): BigInt {
    let result = super.call(
      "PROPOSAL_THRESHOLD",
      "PROPOSAL_THRESHOLD():(uint256)",
      [],
    );

    return result[0].toBigInt();
  }

  try_PROPOSAL_THRESHOLD(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "PROPOSAL_THRESHOLD",
      "PROPOSAL_THRESHOLD():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  QUORUM_PERCENTAGE(): BigInt {
    let result = super.call(
      "QUORUM_PERCENTAGE",
      "QUORUM_PERCENTAGE():(uint256)",
      [],
    );

    return result[0].toBigInt();
  }

  try_QUORUM_PERCENTAGE(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "QUORUM_PERCENTAGE",
      "QUORUM_PERCENTAGE():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  VOTING_DELAY(): BigInt {
    let result = super.call("VOTING_DELAY", "VOTING_DELAY():(uint256)", []);

    return result[0].toBigInt();
  }

  try_VOTING_DELAY(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("VOTING_DELAY", "VOTING_DELAY():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  VOTING_PERIOD(): BigInt {
    let result = super.call("VOTING_PERIOD", "VOTING_PERIOD():(uint256)", []);

    return result[0].toBigInt();
  }

  try_VOTING_PERIOD(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "VOTING_PERIOD",
      "VOTING_PERIOD():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  canInvest(
    propertyToken: Address,
    proposalId: BigInt,
    account: Address,
  ): boolean {
    let result = super.call(
      "canInvest",
      "canInvest(address,uint256,address):(bool)",
      [
        ethereum.Value.fromAddress(propertyToken),
        ethereum.Value.fromUnsignedBigInt(proposalId),
        ethereum.Value.fromAddress(account),
      ],
    );

    return result[0].toBoolean();
  }

  try_canInvest(
    propertyToken: Address,
    proposalId: BigInt,
    account: Address,
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "canInvest",
      "canInvest(address,uint256,address):(bool)",
      [
        ethereum.Value.fromAddress(propertyToken),
        ethereum.Value.fromUnsignedBigInt(proposalId),
        ethereum.Value.fromAddress(account),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  factoryFundraisingDao(): Address {
    let result = super.call(
      "factoryFundraisingDao",
      "factoryFundraisingDao():(address)",
      [],
    );

    return result[0].toAddress();
  }

  try_factoryFundraisingDao(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "factoryFundraisingDao",
      "factoryFundraisingDao():(address)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  factoryToken(): Address {
    let result = super.call("factoryToken", "factoryToken():(address)", []);

    return result[0].toAddress();
  }

  try_factoryToken(): ethereum.CallResult<Address> {
    let result = super.tryCall("factoryToken", "factoryToken():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getProposal(
    propertyToken: Address,
    proposalId: BigInt,
  ): PropertyGovernance__getProposalResult {
    let result = super.call(
      "getProposal",
      "getProposal(address,uint256):(address,string,uint256,uint256,uint256,uint256,bool,uint8,address,bytes)",
      [
        ethereum.Value.fromAddress(propertyToken),
        ethereum.Value.fromUnsignedBigInt(proposalId),
      ],
    );

    return new PropertyGovernance__getProposalResult(
      result[0].toAddress(),
      result[1].toString(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBigInt(),
      result[6].toBoolean(),
      result[7].toI32(),
      result[8].toAddress(),
      result[9].toBytes(),
    );
  }

  try_getProposal(
    propertyToken: Address,
    proposalId: BigInt,
  ): ethereum.CallResult<PropertyGovernance__getProposalResult> {
    let result = super.tryCall(
      "getProposal",
      "getProposal(address,uint256):(address,string,uint256,uint256,uint256,uint256,bool,uint8,address,bytes)",
      [
        ethereum.Value.fromAddress(propertyToken),
        ethereum.Value.fromUnsignedBigInt(proposalId),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PropertyGovernance__getProposalResult(
        value[0].toAddress(),
        value[1].toString(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toBigInt(),
        value[6].toBoolean(),
        value[7].toI32(),
        value[8].toAddress(),
        value[9].toBytes(),
      ),
    );
  }

  getProposalState(propertyToken: Address, proposalId: BigInt): i32 {
    let result = super.call(
      "getProposalState",
      "getProposalState(address,uint256):(uint8)",
      [
        ethereum.Value.fromAddress(propertyToken),
        ethereum.Value.fromUnsignedBigInt(proposalId),
      ],
    );

    return result[0].toI32();
  }

  try_getProposalState(
    propertyToken: Address,
    proposalId: BigInt,
  ): ethereum.CallResult<i32> {
    let result = super.tryCall(
      "getProposalState",
      "getProposalState(address,uint256):(uint8)",
      [
        ethereum.Value.fromAddress(propertyToken),
        ethereum.Value.fromUnsignedBigInt(proposalId),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  getVotingPowerAtProposal(
    propertyToken: Address,
    proposalId: BigInt,
    account: Address,
  ): BigInt {
    let result = super.call(
      "getVotingPowerAtProposal",
      "getVotingPowerAtProposal(address,uint256,address):(uint256)",
      [
        ethereum.Value.fromAddress(propertyToken),
        ethereum.Value.fromUnsignedBigInt(proposalId),
        ethereum.Value.fromAddress(account),
      ],
    );

    return result[0].toBigInt();
  }

  try_getVotingPowerAtProposal(
    propertyToken: Address,
    proposalId: BigInt,
    account: Address,
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getVotingPowerAtProposal",
      "getVotingPowerAtProposal(address,uint256,address):(uint256)",
      [
        ethereum.Value.fromAddress(propertyToken),
        ethereum.Value.fromUnsignedBigInt(proposalId),
        ethereum.Value.fromAddress(account),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  hasVoted(
    propertyToken: Address,
    proposalId: BigInt,
    account: Address,
  ): boolean {
    let result = super.call(
      "hasVoted",
      "hasVoted(address,uint256,address):(bool)",
      [
        ethereum.Value.fromAddress(propertyToken),
        ethereum.Value.fromUnsignedBigInt(proposalId),
        ethereum.Value.fromAddress(account),
      ],
    );

    return result[0].toBoolean();
  }

  try_hasVoted(
    propertyToken: Address,
    proposalId: BigInt,
    account: Address,
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "hasVoted",
      "hasVoted(address,uint256,address):(bool)",
      [
        ethereum.Value.fromAddress(propertyToken),
        ethereum.Value.fromUnsignedBigInt(proposalId),
        ethereum.Value.fromAddress(account),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  proposals(
    param0: Address,
    param1: BigInt,
  ): PropertyGovernance__proposalsResult {
    let result = super.call(
      "proposals",
      "proposals(address,uint256):(uint256,address,string,uint256,uint256,uint256,uint256,bool,uint8,address,address,bytes,uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1),
      ],
    );

    return new PropertyGovernance__proposalsResult(
      result[0].toBigInt(),
      result[1].toAddress(),
      result[2].toString(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBigInt(),
      result[6].toBigInt(),
      result[7].toBoolean(),
      result[8].toI32(),
      result[9].toAddress(),
      result[10].toAddress(),
      result[11].toBytes(),
      result[12].toBigInt(),
    );
  }

  try_proposals(
    param0: Address,
    param1: BigInt,
  ): ethereum.CallResult<PropertyGovernance__proposalsResult> {
    let result = super.tryCall(
      "proposals",
      "proposals(address,uint256):(uint256,address,string,uint256,uint256,uint256,uint256,bool,uint8,address,address,bytes,uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PropertyGovernance__proposalsResult(
        value[0].toBigInt(),
        value[1].toAddress(),
        value[2].toString(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toBigInt(),
        value[6].toBigInt(),
        value[7].toBoolean(),
        value[8].toI32(),
        value[9].toAddress(),
        value[10].toAddress(),
        value[11].toBytes(),
        value[12].toBigInt(),
      ),
    );
  }

  propose(
    propertyToken: Address,
    description: string,
    proposalType: i32,
    callData: Bytes,
    target: Address,
  ): BigInt {
    let result = super.call(
      "propose",
      "propose(address,string,uint8,bytes,address):(uint256)",
      [
        ethereum.Value.fromAddress(propertyToken),
        ethereum.Value.fromString(description),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(proposalType)),
        ethereum.Value.fromBytes(callData),
        ethereum.Value.fromAddress(target),
      ],
    );

    return result[0].toBigInt();
  }

  try_propose(
    propertyToken: Address,
    description: string,
    proposalType: i32,
    callData: Bytes,
    target: Address,
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "propose",
      "propose(address,string,uint8,bytes,address):(uint256)",
      [
        ethereum.Value.fromAddress(propertyToken),
        ethereum.Value.fromString(description),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(proposalType)),
        ethereum.Value.fromBytes(callData),
        ethereum.Value.fromAddress(target),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  usdt(): Address {
    let result = super.call("usdt", "usdt():(address)", []);

    return result[0].toAddress();
  }

  try_usdt(): ethereum.CallResult<Address> {
    let result = super.tryCall("usdt", "usdt():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _usdt(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CastVoteCall extends ethereum.Call {
  get inputs(): CastVoteCall__Inputs {
    return new CastVoteCall__Inputs(this);
  }

  get outputs(): CastVoteCall__Outputs {
    return new CastVoteCall__Outputs(this);
  }
}

export class CastVoteCall__Inputs {
  _call: CastVoteCall;

  constructor(call: CastVoteCall) {
    this._call = call;
  }

  get propertyToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get proposalId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get support(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }
}

export class CastVoteCall__Outputs {
  _call: CastVoteCall;

  constructor(call: CastVoteCall) {
    this._call = call;
  }
}

export class ExecuteProposalCall extends ethereum.Call {
  get inputs(): ExecuteProposalCall__Inputs {
    return new ExecuteProposalCall__Inputs(this);
  }

  get outputs(): ExecuteProposalCall__Outputs {
    return new ExecuteProposalCall__Outputs(this);
  }
}

export class ExecuteProposalCall__Inputs {
  _call: ExecuteProposalCall;

  constructor(call: ExecuteProposalCall) {
    this._call = call;
  }

  get propertyToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get proposalId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ExecuteProposalCall__Outputs {
  _call: ExecuteProposalCall;

  constructor(call: ExecuteProposalCall) {
    this._call = call;
  }
}

export class ProposeCall extends ethereum.Call {
  get inputs(): ProposeCall__Inputs {
    return new ProposeCall__Inputs(this);
  }

  get outputs(): ProposeCall__Outputs {
    return new ProposeCall__Outputs(this);
  }
}

export class ProposeCall__Inputs {
  _call: ProposeCall;

  constructor(call: ProposeCall) {
    this._call = call;
  }

  get propertyToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get description(): string {
    return this._call.inputValues[1].value.toString();
  }

  get proposalType(): i32 {
    return this._call.inputValues[2].value.toI32();
  }

  get callData(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }

  get target(): Address {
    return this._call.inputValues[4].value.toAddress();
  }
}

export class ProposeCall__Outputs {
  _call: ProposeCall;

  constructor(call: ProposeCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetFactoryCall extends ethereum.Call {
  get inputs(): SetFactoryCall__Inputs {
    return new SetFactoryCall__Inputs(this);
  }

  get outputs(): SetFactoryCall__Outputs {
    return new SetFactoryCall__Outputs(this);
  }
}

export class SetFactoryCall__Inputs {
  _call: SetFactoryCall;

  constructor(call: SetFactoryCall) {
    this._call = call;
  }

  get _factoryFundraisingDao(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _factoryToken(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class SetFactoryCall__Outputs {
  _call: SetFactoryCall;

  constructor(call: SetFactoryCall) {
    this._call = call;
  }
}

export class SkipVotingDelayCall extends ethereum.Call {
  get inputs(): SkipVotingDelayCall__Inputs {
    return new SkipVotingDelayCall__Inputs(this);
  }

  get outputs(): SkipVotingDelayCall__Outputs {
    return new SkipVotingDelayCall__Outputs(this);
  }
}

export class SkipVotingDelayCall__Inputs {
  _call: SkipVotingDelayCall;

  constructor(call: SkipVotingDelayCall) {
    this._call = call;
  }

  get propertyToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get proposalId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SkipVotingDelayCall__Outputs {
  _call: SkipVotingDelayCall;

  constructor(call: SkipVotingDelayCall) {
    this._call = call;
  }
}

export class SkipVotingPeriodCall extends ethereum.Call {
  get inputs(): SkipVotingPeriodCall__Inputs {
    return new SkipVotingPeriodCall__Inputs(this);
  }

  get outputs(): SkipVotingPeriodCall__Outputs {
    return new SkipVotingPeriodCall__Outputs(this);
  }
}

export class SkipVotingPeriodCall__Inputs {
  _call: SkipVotingPeriodCall;

  constructor(call: SkipVotingPeriodCall) {
    this._call = call;
  }

  get propertyToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get proposalId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SkipVotingPeriodCall__Outputs {
  _call: SkipVotingPeriodCall;

  constructor(call: SkipVotingPeriodCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
