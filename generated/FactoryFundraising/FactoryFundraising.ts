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

export class FundraisingCreated extends ethereum.Event {
  get params(): FundraisingCreated__Params {
    return new FundraisingCreated__Params(this);
  }
}

export class FundraisingCreated__Params {
  _event: FundraisingCreated;

  constructor(event: FundraisingCreated) {
    this._event = event;
  }

  get fundraising(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get owner(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get nftId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get goalAmount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get minInvestment(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get maxInvestment(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get duration(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }
}

export class FactoryFundraising extends ethereum.SmartContract {
  static bind(address: Address): FactoryFundraising {
    return new FactoryFundraising("FactoryFundraising", address);
  }

  allFundraisingContracts(param0: BigInt): Address {
    let result = super.call(
      "allFundraisingContracts",
      "allFundraisingContracts(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );

    return result[0].toAddress();
  }

  try_allFundraisingContracts(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "allFundraisingContracts",
      "allFundraisingContracts(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  createFundraising(
    nftId: BigInt,
    goalAmount: BigInt,
    minInvestment: BigInt,
    maxInvestment: BigInt,
    durationDays: BigInt,
  ): Address {
    let result = super.call(
      "createFundraising",
      "createFundraising(uint256,uint256,uint256,uint256,uint256):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(nftId),
        ethereum.Value.fromUnsignedBigInt(goalAmount),
        ethereum.Value.fromUnsignedBigInt(minInvestment),
        ethereum.Value.fromUnsignedBigInt(maxInvestment),
        ethereum.Value.fromUnsignedBigInt(durationDays),
      ],
    );

    return result[0].toAddress();
  }

  try_createFundraising(
    nftId: BigInt,
    goalAmount: BigInt,
    minInvestment: BigInt,
    maxInvestment: BigInt,
    durationDays: BigInt,
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "createFundraising",
      "createFundraising(uint256,uint256,uint256,uint256,uint256):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(nftId),
        ethereum.Value.fromUnsignedBigInt(goalAmount),
        ethereum.Value.fromUnsignedBigInt(minInvestment),
        ethereum.Value.fromUnsignedBigInt(maxInvestment),
        ethereum.Value.fromUnsignedBigInt(durationDays),
      ],
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

  getAllFundraisingsLength(): BigInt {
    let result = super.call(
      "getAllFundraisingsLength",
      "getAllFundraisingsLength():(uint256)",
      [],
    );

    return result[0].toBigInt();
  }

  try_getAllFundraisingsLength(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getAllFundraisingsLength",
      "getAllFundraisingsLength():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getCreateFromFactoryFundraisings(param0: Address): boolean {
    let result = super.call(
      "getCreateFromFactoryFundraisings",
      "getCreateFromFactoryFundraisings(address):(bool)",
      [ethereum.Value.fromAddress(param0)],
    );

    return result[0].toBoolean();
  }

  try_getCreateFromFactoryFundraisings(
    param0: Address,
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "getCreateFromFactoryFundraisings",
      "getCreateFromFactoryFundraisings(address):(bool)",
      [ethereum.Value.fromAddress(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getNFTFundraising(param0: BigInt): Address {
    let result = super.call(
      "getNFTFundraising",
      "getNFTFundraising(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );

    return result[0].toAddress();
  }

  try_getNFTFundraising(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getNFTFundraising",
      "getNFTFundraising(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getOwnerFundraisings(param0: Address, param1: BigInt): Address {
    let result = super.call(
      "getOwnerFundraisings",
      "getOwnerFundraisings(address,uint256):(address)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1),
      ],
    );

    return result[0].toAddress();
  }

  try_getOwnerFundraisings(
    param0: Address,
    param1: BigInt,
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getOwnerFundraisings",
      "getOwnerFundraisings(address,uint256):(address)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getOwnerFundraisingsLength(owner: Address): BigInt {
    let result = super.call(
      "getOwnerFundraisingsLength",
      "getOwnerFundraisingsLength(address):(uint256)",
      [ethereum.Value.fromAddress(owner)],
    );

    return result[0].toBigInt();
  }

  try_getOwnerFundraisingsLength(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getOwnerFundraisingsLength",
      "getOwnerFundraisingsLength(address):(uint256)",
      [ethereum.Value.fromAddress(owner)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  nftContract(): Address {
    let result = super.call("nftContract", "nftContract():(address)", []);

    return result[0].toAddress();
  }

  try_nftContract(): ethereum.CallResult<Address> {
    let result = super.tryCall("nftContract", "nftContract():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
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

  get _nftContract(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _factoryToken(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CreateFundraisingCall extends ethereum.Call {
  get inputs(): CreateFundraisingCall__Inputs {
    return new CreateFundraisingCall__Inputs(this);
  }

  get outputs(): CreateFundraisingCall__Outputs {
    return new CreateFundraisingCall__Outputs(this);
  }
}

export class CreateFundraisingCall__Inputs {
  _call: CreateFundraisingCall;

  constructor(call: CreateFundraisingCall) {
    this._call = call;
  }

  get nftId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get goalAmount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get minInvestment(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get maxInvestment(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get durationDays(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class CreateFundraisingCall__Outputs {
  _call: CreateFundraisingCall;

  constructor(call: CreateFundraisingCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}