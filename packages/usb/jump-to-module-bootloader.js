#!/usr/bin/env node
const uhk = require('./uhk');
const program = require('commander');

program
    .usage(`moduleSlot`)
    .parse(process.argv)

const moduleSlot = program.args[0];
const moduleSlotId = uhk.checkModuleSlot(moduleSlot, uhk.moduleSlotToId);
const device = uhk.getUhkDevice();
let transfer = new Buffer([uhk.usbCommands.jumpToModuleBootloader, moduleSlotId]);
device.write(uhk.getTransferData(transfer));
const response = Buffer.from(device.readSync());
