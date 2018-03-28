exports.getBestWarehouses = (orders, warehouses) => {
    const orderedItems = Object.keys(orders);
    const bestWareHouses = [];

    for (let i = 0; i < orderedItems.length; i++) {
        const orderedItem = orderedItems[i];
        let orderedAmount = orders[orderedItem];
        for (let j = 0; j < warehouses.length; j++) {
            const warehouse = warehouses[j];
            const warehouseName = warehouse.name;
            const availableItem = warehouse.inventory[orderedItem];

            const bestWarehouse = {};
            const bestWareHouseValue = {};

            if (availableItem > 0 && orderedAmount > 0) {
                if (orderedAmount >= availableItem) {
                    if (bestWareHouses.length > 1) {
                        let isInBestWarehouses = false;

                        for (let k = 0; k < bestWareHouses.length; k++) {
                            if (bestWareHouses[k][warehouseName]) {
                                bestWareHouses[k][warehouseName][orderedItem] = availableItem;
                                isInBestWarehouses = true;
                                break;
                            }
                        }

                        if (!isInBestWarehouses) {
                            bestWareHouseValue[orderedItem] = availableItem;
                            bestWarehouse[warehouseName] = bestWareHouseValue;
                            bestWareHouses.push(bestWarehouse);
                        }
                    } else {
                        bestWareHouseValue[orderedItem] = availableItem;
                        bestWarehouse[warehouseName] = bestWareHouseValue;
                        bestWareHouses.push(bestWarehouse);
                    }

                    orderedAmount -= availableItem;
                } else {
                    if (bestWareHouses.length > 1) {
                        let isInBestWarehouses = false;
                        for (let k = 0; k < bestWareHouses.length; k++) {
                            if (bestWareHouses[k][warehouseName]) {
                                bestWareHouses[k][warehouseName][orderedItem] = orderedAmount;
                                isInBestWarehouses = true;
                                break;
                            }
                        }

                        if (!isInBestWarehouses) {
                            bestWareHouseValue[orderedItem] = orderedAmount;
                            bestWarehouse[warehouseName] = bestWareHouseValue;
                            bestWareHouses.push(bestWarehouse);
                        }

                    } else {
                        bestWareHouseValue[orderedItem] = orderedAmount;
                        bestWarehouse[warehouseName] = bestWareHouseValue;
                        bestWareHouses.push(bestWarehouse);
                    }

                    break;
                }
            }
        }

        console.log(bestWareHouses);
    }

    return bestWareHouses;
}