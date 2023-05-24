import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui"
import { numberWithCommas, getScore } from "../main";
import * as config from "../config"

export function serverShop(player) {
    const form = new ActionFormData()
        .title('§l§3Server Shop§r')
        .body('§bChoose a category:§r');

    // Add a button for each category
    config.shops.forEach((shop) => {
        form.button('§l§8' + shop.category)
    });

    form.show(player).then(result => {
        let i = 0
        config.shops.forEach((shop) => {
            if (result.selection === i) {
                shopItems(player, shop.category);
            }
            i += 1
        });
    })
}

function shopItems(player, shopCategory) {
    const selectedShop = config.shops.find(shop => shop.category === shopCategory);

    const buttons = selectedShop.items.map(item => {
        return `§l§8${item.name}§r\n§8[§2$${numberWithCommas(item.price)}§8]§r`;
    });

    const form = new ActionFormData()
        .title(`§l§3Server Shop (${selectedShop.category})§r`)
        .body('§bChoose an item:§r')
    for (let i = 0; i < buttons.length; i++) {
        const buttonText = buttons[i];
        form.button(buttonText);
    }
    form.button(`§l§4Back§r\n§8[Go back to previous page]`)
        .show(player)
        .then(result => {
            if (result.selection < selectedShop.items.length) {
                const selectedItem = selectedShop.items[result.selection];
                if (selectedItem.type === 'item') return shopCheckout(player, selectedItem.name, selectedItem.price, selectedItem.id, selectedItem.data); // go to shopCheckout page
                if (selectedItem.type === 'structure') return shopCheckout2(player, selectedItem.name, selectedItem.description, selectedItem.price, selectedItem.structure)

            } else if (result.selection >= selectedShop.items.length) {
                return serverShop(player);
            }
        });
}

function shopCheckout(player, itemName, itemPrice, itemID, itemData) {
    new ModalFormData()
        .title('§l§3Server Shop (Checkout)§r')
        .textField(`§bHow many §e${itemName}§b would you like to buy?§r `, 'Amount')
        .show(player)
        .then(({ formValues: [textField] }) => {
            if (textField !== '') {
                if (/^[1-9][0-9]*$/.test(textField)) {
                    if (textField > 32767) {
                        player.runCommandAsync('playsound note.bass @s')
                        return player.sendMessage('§cThis number is too big!§r');
                    } else {
                        return shopConfirm(player, itemName, itemPrice, itemID, itemData, textField)
                    }
                } if (!/^[1-9][0-9]*$/.test(textField)) {
                    player.runCommandAsync('playsound note.bass @s')
                    return player.sendMessage('§cPlease use positive integer numbers only!§r');
                }
            } else {
                player.runCommandAsync('playsound note.bass @s')
                return player.sendMessage('§cPlease input an amount to buy!§r');
            }
        });
}

function shopCheckout2(player, itemName, itemDescription, itemPrice, itemStructure) {
    new ModalFormData()
        .title('§l§3Server Shop (Checkout)§r')
        .textField(`§6Description:§r\n${itemDescription}\n\n§bHow many §e${itemName}§b would you like to buy?§r `, 'Amount')
        .show(player)
        .then(({ formValues: [textField] }) => {
            if (textField !== '') {
                if (/^[1-9][0-9]*$/.test(textField)) {
                    if (textField > 32767) {
                        player.runCommandAsync('playsound note.bass @s')
                        return player.sendMessage('§cThis number is too big!§r');
                    } else {
                        return shopConfirm2(player, itemName, itemPrice, itemStructure, textField);
                    }
                } if (!/^[1-9][0-9]*$/.test(textField)) {
                    player.runCommandAsync('playsound note.bass @s')
                    return player.sendMessage('§cPlease use positive integer numbers only!§r');
                }
            } else {
                player.runCommandAsync('playsound note.bass @s')
                return player.sendMessage('§cPlease input an amount to buy!§r');
            }
        });
}

function shopConfirm(player, itemName, itemPrice, itemID, itemData, buyAmount) {
    const totalPrice = itemPrice * buyAmount;
    const money = getScore(player, config.moneyObjective)
    new MessageFormData()
        .title('§l§4Are you sure?§r')
        .body(`§bBuy §e${buyAmount}x ${itemName}§b for §a$${numberWithCommas(totalPrice)}§b?`)
        .button1(`§l§2Yes§r`)
        .button2(`§l§4No§r`)
        .show(player)
        .then(result => {
            if ((result.selection === 1) && (money >= totalPrice)) {
                player.runCommandAsync(`scoreboard players remove @s "${config.moneyObjective}" ${totalPrice}`)
                player.runCommandAsync(`give @s ${itemID} ${buyAmount} ${itemData}`)
                player.sendMessage(`§aSuccessfully bought §e${buyAmount}x ${itemName}§a for $${numberWithCommas(totalPrice)}!§r`)
                player.runCommandAsync('playsound random.levelup @s')
                return;
            }
            if ((result.selection === 1) && !(money >= totalPrice)) {
                player.runCommandAsync('playsound note.bass @s')
                return player.sendMessage("§cYou don't have enough money!§r");
            }
        })
}

function shopConfirm2(player, itemName, itemPrice, itemStructure, buyAmount) {
    const totalPrice = itemPrice * buyAmount;
    const money = getScore(player, config.moneyObjective)
    new MessageFormData()
        .title('§l§4Are you sure?§r')
        .body(`§bBuy §e${buyAmount}x ${itemName}§b for §a$${numberWithCommas(totalPrice)}§b?`)
        .button1(`§l§2Yes§r`)
        .button2(`§l§4No§r`)
        .show(player)
        .then(result => {
            if ((result.selection === 1) && (money >= totalPrice)) {
                for (let i = 0; i < buyAmount; i++) {
                    player.runCommandAsync(`scoreboard players remove @s money ${itemPrice}`)
                    player.runCommandAsync(`structure load ${itemStructure} ~~~`)
                }
                player.runCommandAsync('playsound random.levelup @s')
                return player.sendMessage(`§aSuccessfully bought §e${buyAmount}x ${itemName}§a for $${numberWithCommas(totalPrice)}!§r`);
            }
            if ((result.selection === 1) && !(money >= totalPrice)) {
                player.runCommandAsync('playsound note.bass @s')
                return player.sendMessage("§cYou don't have enough money!§r");
            }
        })
}