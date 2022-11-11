// Don’t change this section

// Land managers
const landManagers = [
    { id: 1, internalNumber: '123456789', name: 'RAFAEL MORALES SOTO' },
    { id: 2, internalNumber: '123456788', name: 'FERNANDO PINTO VARELA' },
    { id: 3, internalNumber: '123456787', name: 'ANDRES ROJAS PEÑA' },
    { id: 4, internalNumber: '123456786', name: 'MANUEL SALAS ORTIZ' },
    { id: 5, internalNumber: '123456785', name: 'MARIO ZUÑIGA ROMERO' },
    { id: 6, internalNumber: '123456784', name: 'JOSE ALFARO MOLINA' }
];

// Land type, describe what product is going to be harvested
const landType = [
    { id: 1, name: 'APPLE' },
    { id: 2, name: 'ORANGE' },
    { id: 3, name: 'BANANA' },
    { id: 4, name: 'PEACH' },
]

// A land is a farm that will be harvested
const lands = [
    { landManagerId: 5, farmId: 2, landTypeId: 4, harvestYear: 2020, area: 200 },
    { landManagerId: 4, farmId: 1, landTypeId: 2, harvestYear: 2018, area: 1500 },
    { landManagerId: 6, farmId: 1, landTypeId: 3, harvestYear: 2021, area: 2000 },
    { landManagerId: 1, farmId: 2, landTypeId: 4, harvestYear: 2020, area: 4405 },
    { landManagerId: 2, farmId: 3, landTypeId: 2, harvestYear: 2022, area: 4875 },
    { landManagerId: 3, farmId: 3, landTypeId: 2, harvestYear: 2018, area: 1905 },
    { landManagerId: 2, farmId: 2, landTypeId: 1, harvestYear: 2017, area: 10735 },
    { landManagerId: 1, farmId: 1, landTypeId: 4, harvestYear: 2022, area: 2525 },
    { landManagerId: 6, farmId: 1, landTypeId: 3, harvestYear: 2019, area: 1555 },
    { landManagerId: 3, farmId: 2, landTypeId: 2, harvestYear: 2016, area: 400 },
    { landManagerId: 4, farmId: 1, landTypeId: 2, harvestYear: 2017, area: 3255 },
    { landManagerId: 6, farmId: 2, landTypeId: 1, harvestYear: 2022, area: 725 },
    { landManagerId: 5, farmId: 3, landTypeId: 2, harvestYear: 2020, area: 12565 },
    { landManagerId: 1, farmId: 1, landTypeId: 2, harvestYear: 2022, area: 5000 },
    { landManagerId: 2, farmId: 2, landTypeId: 4, harvestYear: 2021, area: 23215 },
    { landManagerId: 2, farmId: 2, landTypeId: 3, harvestYear: 2018, area: 7125 },
    { landManagerId: 3, farmId: 3, landTypeId: 3, harvestYear: 2021, area: 300 },
    { landManagerId: 1, farmId: 3, landTypeId: 2, harvestYear: 2018, area: 3235 },
    { landManagerId: 4, farmId: 1, landTypeId: 1, harvestYear: 2019, area: 13255 },
    { landManagerId: 4, farmId: 2, landTypeId: 2, harvestYear: 2021, area: 3120 },
    { landManagerId: 5, farmId: 2, landTypeId: 2, harvestYear: 2018, area: 5300 },
    { landManagerId: 3, farmId: 3, landTypeId: 3, harvestYear: 2019, area: 20340 },
    { landManagerId: 6, farmId: 3, landTypeId: 4, harvestYear: 2020, area: 24235 }
];

const farms = [
    { id: 1, name: 'Glo Land' },
    { id: 2, name: 'Chicken Land' },
    { id: 3, name: 'Wonderful Land' }
];

// You can change this section


// Return an array with the ids of the managers of each land
function listLandManagerIds() {
    return landManagers.map(e => e.id);
};

// Return an array with the internal number of the managers or the lands, sorted by name
function listLandManagersByName() {
    return landManagers.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    }).map(e => e.internalNumber);
};

// Return an Array with the names of each land type, sorted dec by the total sum of the harvested hectares of each of them
// Tip: one hectare is 10.000m2
function sortLandTypeByTotalArea() {
    return landType.map(e => {
        const totalArea = lands
            .filter(l => l.landTypeId === e.id)
            .map(e => parseInt(e.area))
            .reduce((a, b) => parseInt(a) + parseInt(b));
        return {
            name: e.name,
            totalArea,
        }
    }).sort((a, b) => {
        if (a.totalArea > b.totalArea) {
            return -1;
        }
        if (a.totalArea < b.totalArea) {
            return 1;
        }
        return 0;
    }).map(e => e.name);
};

// Return an array with the names of the land managers, sorted dec by the total sum of the hectares that they manage
function sortLandManagerByAdminArea() {
    return landManagers.map(e => {
        const totalArea = lands
            .filter((l) => l.landManagerId === e.id)
            .map(e => parseInt(e.area))
            .reduce((a, b) => parseInt(a) + parseInt(b));
        return {
            name: e.name,
            totalArea,
        };
    }).sort((a, b) => {
        if (a.totalArea > b.totalArea) {
            return -1;
        }
        if (a.totalArea < b.totalArea) {
            return 1;
        }
        return 0;
    }).map(e => e.name);
}

// Return an Object where the keys are the name of the farms and the values an Array of the internal number of their managers sorted alphabetically by name.
function farmManagerNames() {
    const result = {};
    farms.map(e => {
        const managers = [];
        lands
            .filter(l => l.farmId === e.id)
            .forEach(l => {
                if (!managers.find(m => m.iid === l.landManagerId)) {
                    managers.push({
                        name: landManagers.find(m => m.id === l.landManagerId).name,
                        iid: l.landManagerId,
                    });  
                }
            });
        const farmManagers = managers.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        }).map(fm => fm.iid);
        
        return {
            farmName: e.name,
            farmManagers,
        };
    }).forEach(e => {
        result[e.farmName] = e.farmManagers
    });

    return result;
}

// Return an Array sorted dec by the total m2 of the lands that have more than 2 hectares of Apples
function biggestAppleFarms() {
    return lands    
            .filter(l => l.landTypeId === 1 && l.area > 20000)
            .map(l => l.area)
            .sort((a, b) => {
                if (a.area > b.area) {
                    return -1;
                }
                if (a.area < b.area) {
                    return 1;
                }
                return 0;
            });
}

// Return an array with the names of the managers of Glo Land and Chicken Land sorted by name if they have more than 1000m2 of Oranges
function biggestOrangesManagers() {
    const searchManagers = lands    
            .filter(l => (l.farmId === 1 || l.farmId === 2) && l.area > 1000 && l.landTypeId === 2)
            .map(l => landManagers.find(m => m.id === l.landManagerId).name)
            .sort((a, b) => {
                if (a > b) {
                    return 1;
                }
                if (a < b) {
                    return -1;
                }
                return 0;
            });
    return [...new Set(searchManagers)];

}

// Return an Object where the keys are the name of the manager and the value an Array of names of the lands that they manage, sorted alphabetically
function farmManagerLands() {
    const result = {};
    landManagers.map(m => {
        const farmNamesArr = lands
            .filter(l => l.landManagerId === m.id)
            .map(l => farms.find(f => f.id === l.farmId).name)
            .sort((a, b) => {
                if (a > b) {
                    return 1;
                }
                if (a < b) {
                    return -1;
                }
                return 0;
            });
        return {
            managerName: m.name,
            farmNames: [...new Set(farmNamesArr)],
        }
    }).forEach(lm => result[lm.managerName] = lm.farmNames);

    return result;
}



// Return an Object where the keys are the land types concatenated with the harvested year (use “-” to concatenate) and the value another Object where the key is the ID of the manager and the value the name of the manager
function landsManagers() {
    const result = {};
    lands.map(l => {
        return {
            landTypeHarvest: `${l.landTypeId}-${l.harvestYear}`,
            manager: {
                id: l.landManagerId,
                name: landManagers.find(m => m.id === l.landManagerId).name,
            },
        }
    }).forEach(l => {
        if (!result[l.landTypeHarvest]) {
            result[l.landTypeHarvest] = l.manager;
        } else {
            let managers = [];
            if (typeof(result[l.landTypeHarvest]) == 'string') {
                managers.push(result[l.landTypeHarvest]);
            } else {
                managers = managers.concat(result[l.landTypeHarvest]);
            }
            managers.push(l.manager);
            result[l.landTypeHarvest] = managers;
        }
    });
    return result;
}

console.log('listLandManagerIds() :>> ', listLandManagerIds());
console.log('listLandManagersByName() :>> ', listLandManagersByName());
console.log('sortLandTypeByTotalArea() :>> ', sortLandTypeByTotalArea());
console.log('sortLandManagerByAdminArea() :>> ', sortLandManagerByAdminArea());
console.log('farmManagerNames() :>> ', farmManagerNames());
console.log('biggestAppleFarms() :>> ', biggestAppleFarms());
console.log('biggestOrangesManagers() :>> ', biggestOrangesManagers());
console.log('farmManagerLands() :>> ', farmManagerLands());
console.log('landsManagers() :>> ', landsManagers());

/* All code was made with Vanilla javascript. In other projects, we can use 
Lodash to do easier work with these arrays.
 */