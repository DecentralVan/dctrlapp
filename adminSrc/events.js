const request = require('superagent')
const uuidV1 = require('uuid/v1')
const dctrlDb = require('./dctrlDb')
const addressManager = require('../bitcoinSrc/addressManager')
const config = require('../configuration')

function memberCreate(name, email, fob, callback) {
  addressManager.getNewAddress((err, addr) => {
    let newEvent = {
        type: "member-created",
        memberId: uuidV1(),
        address: addr,
        fob: fob,
        active: 1,
        balance: 0,
        name: name,
        email: email
    }
    dctrlDb.insertEvent(newEvent, callback)
  })
}

function memberPaid(memberId, paid, isCash, notes, callback) {
  let newEvent = {
      type: "member-paid",
      memberId,
      paid,
      isCash,
      notes
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function memberCharged(memberId, charged, notes, callback) {
    let newEvent = {
        type: "member-charged",
        memberId,
        charged,
        notes,
    }
    dctrlDb.insertEvent(newEvent, callback)
}

function memberDeactivate(memberId, callback) {
  let newEvent = {
    type: "member-deactivated",
    memberId,
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function memberActivate(memberId, callback) {
  let newEvent = {
    type: "member-activated",
    memberId,
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function bountyCreate(name, description, monthlyValue, cap, boost, fob, oneTime, callback) {
  let newEvent = {
    type: "bounty-created",
    bountyId: uuidV1(),
    lastClaimed: Date.now(),
    name,
    description,
    monthlyValue,
    fob,
    cap,
    boost: 0,
    oneTime: !!oneTime
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function bountyClaim(bountyId, memberId, paid,  callback) {
  let newEvent = {
    type: "bounty-claimed",
    bountyId,
    memberId,
    paid,
    notes: "dctrl-admin",
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function bountyBoost(bountyId, amount, notes, callback) {
  let newEvent = {
      type: "bounty-boosted",
      bountyId,
      amount,
      notes
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function bountyMonthlyUpdate(bountyId, amount, notes, callback) {
  let newEvent = {
    type: "bounty-monthly-updated",
    amount,
    bountyId,
    notes,
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function cashReceived(amount, notes, callback) {
  let newEvent = {
      type: "cash-increase",
      amount,
      notes,

  }
  dctrlDb.insertEvent(newEvent, callback)
}

function cashExpense(amount, notes, callback) {
  let newEvent = {
    type: "cash-decrease",
    amount,
    notes,
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function suppliesStock(memberId, supplyType, amount, paid,  notes, callback) {
  let newEvent = {
      type: 'supplies-stocked',
      memberId,
      supplyType,
      amount,
      paid,
      notes,
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function suppliesUse(memberId, supplyType, charged, notes, callback) {
  let newEvent = {
      type: 'supplies-used',
      memberId,
      supplyType,
      charged,
      notes
  }
  dctrlDb.insertEvent(newEvent, callback)
}

function resourceCreate(name, location, howTo, callback) {
  addressManager.getNewAddress((err, addr) => {
    let newEvent = {
        type: "resource-created",
        resourceId: uuidV1(),
        name,
        location,
        howTo,
        address: addr,
    }
    dctrlDb.insertEvent(newEvent, callback)
  })
}

module.exports = {
  memberCreate,
  memberPaid,
  memberCharged,
  memberDeactivate,
  memberActivate,
  bountyMonthlyUpdate,
  bountyBoost,
  bountyCreate,
  bountyClaim,
  cashReceived,
  cashExpense,
  suppliesStock,
  suppliesUse,
  resourceCreate,
}
