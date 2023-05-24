// ------------------ SHOP SETTINGS ------------------ //
export const shopTag = 'shop' // CHOOSE THE NPC TAG THAT WILL OPEN THE SHOP
export const moneyObjective = 'money' // CHOOSE YOUR MONEY OBJECTIVE

// SET UP ITEMS AND CATEGORIES HERE
export const shops = [
    {
        category: 'Blocks', items: [
            { type: 'item', name: 'Andesite', price: 805, id: 'stone', data: 5 },
            { type: 'item', name: 'Basalt', price: 100, id: 'basalt', data: 0 },
            { type: 'item', name: 'Blackstone', price: 20, id: 'blackstone', data: 0 },
            { type: 'item', name: 'Blue Ice', price: 750, id: 'blue_ice', data: 0 },
            { type: 'item', name: 'Cobblestone', price: 5, id: 'cobblestone', data: 0 },
            { type: 'item', name: 'Concrete Powder', price: 60, id: 'concrete_powder', data: 0 },
            { type: 'item', name: 'Crimson Nylium', price: 450, id: 'crimson_nylium', data: 0 },
            { type: 'item', name: 'Crimson Stem', price: 60, id: 'crimson_stem', data: 0 },
        ]
    },
    {
        category: 'Kits', items: [
            { type: 'structure', name: 'Diamond Kit', description: 'Full diamond with unbreaking and efficiency II', price: 40000, structure: 'diamondKit' },
            { type: 'structure', name: 'Netherite Kit', description: 'Full netherite with no enchants', price: 60000, structure: 'netheriteKit' },
        ]
    },
    {
        category: 'Food', items: [
            { type: 'item', name: 'Apple', price: 40, id: 'apple', data: 0 },
            { type: 'item', name: 'Beetroot', price: 80, id: 'beetroot', data: 0 },
            { type: 'item', name: 'Carrot', price: 30, id: 'carrot', data: 0 },
            { type: 'item', name: 'Cooked Beef', price: 70, id: 'cooked_beef', data: 0 },
            { type: 'item', name: 'Cooked Mutton', price: 70, id: 'cooked_mutton', data: 0 },
            { type: 'item', name: 'Cooked Porkchop', price: 70, id: 'cooked_porkchop', data: 0 },
            { type: 'item', name: 'Golden Apple', price: 15000, id: 'golden_apple', data: 0 },
        ]
    },
    {
        category: 'Farming', items: [
            { type: 'item', name: 'Acacia Log', price: 40, id: 'log2', data: 0 },
            { type: 'item', name: 'Acacia Sapling', price: 1000, id: 'sapling', data: 4 },
            { type: 'item', name: 'Bamboo', price: 100, id: 'bamboo', data: 0 },
            { type: 'item', name: 'Beetroot Seed', price: 30, id: 'beetroot_seed', data: 0 },
            { type: 'item', name: 'Birch Log', price: 40, id: 'log', data: 2 },
            { type: 'item', name: 'Birch Sapling', price: 1000, id: 'sapling', data: 2 },
        ]
    },
    {
        category: 'Other', items: [
            { type: 'item', name: 'Redstone Dust', price: 40, id: 'redstone', data: 0 },
            { type: 'item', name: 'Redstone Block', price: 300, id: 'redstone_block', data: 0 },
        ]
    },
];