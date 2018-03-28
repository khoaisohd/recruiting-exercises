const expect = require('chai').expect;
const inventoryAllocator = require("../app/inventory-allocator");

describe("Inventory Allocator", function () {
    it("Allocate for an order with one item and one warehouse - enough item", function () {
        const warehouse = inventoryAllocator.getBestWarehouses({apple: 1}, [{name: 'owd', inventory: {apple: 1}}]);
        expect(warehouse).to.deep.equal([{owd: {apple: 1}}]);
    });

    it("Allocate for an order with one item and one warehouse - not enough item", function () {
        const warehouse = inventoryAllocator.getBestWarehouses({apple: 1}, [{name: 'owd', inventory: {apple: 0}}]);
        expect(warehouse).to.deep.equal([]);
    });

    it("Should split an item across warehouses", function () {
        const warehouse = inventoryAllocator.getBestWarehouses({apple: 10},
            [{name: 'owd', inventory: {apple: 5}}, {name: 'dm', inventory: {apple: 5}}]);
        expect(warehouse).to.deep.equal([{owd: {apple: 5}}, {dm: {apple: 5}}]);
    });

    it("Should split an item across warehouses with multiple items in order", function () {
        const warehouse = inventoryAllocator.getBestWarehouses({apple: 5, banana: 5, orange: 5},
            [{name: 'owd', inventory: {apple: 5, orange: 10}}, {name: 'dm', inventory: {banana: 5, orange: 10}}]);
        expect(warehouse).to.deep.equal([{owd: {apple: 5, orange: 5}}, {dm: {banana: 5}}]);
    });

    it("Should split an item across warehouses with multiple items in order and one item get from multiple inventories", function () {
        const warehouse = inventoryAllocator.getBestWarehouses({apple: 2, banana: 2, orange: 20},
            [{name: 'owd', inventory: {apple: 5, orange: 10}}, {name: 'dm', inventory: {banana: 5, orange: 10}}]);
        expect(warehouse).to.deep.equal([{owd: {apple: 2, orange: 10}}, {dm: {banana: 2, orange: 10}}]);
    });

    it("Should split an item across warehouses with multiple items in order and one item get from multiple inventories", function () {
        const warehouse = inventoryAllocator.getBestWarehouses({apple: 2, banana: 2, orange: 20},
            [{name: 'owd', inventory: {apple: 5, orange: 10}},
                {name: 'dir', inventory: {apple: 5, orange: 10}},
                {name: 'dm', inventory: {banana: 5, orange: 10}}]);
        expect(warehouse).to.deep.equal([{owd: {apple: 2, orange: 10}}, {dm: {banana: 2}}, {dir: {orange: 10}} ]);
    });

    it("Should split an item across warehouses with multiple items in order and one item get from multiple inventories", function () {
        const warehouse = inventoryAllocator.getBestWarehouses({apple: 2, banana: 2, orange: 21},
            [{name: 'owd', inventory: {apple: 5, orange: 10}},
                {name: 'dir', inventory: {apple: 5, orange: 10}},
                {name: 'dm', inventory: {banana: 5, orange: 10}}]);
        expect(warehouse).to.deep.equal([{owd: {apple: 2, orange: 10}}, {dm: {banana: 2, orange: 1}}, {dir: {orange: 10}} ]);
    });

});