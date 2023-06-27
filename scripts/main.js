import { world, system } from "@minecraft/server"
import { serverShop } from "./shop/gui"
import * as config from "./config"

system.events.beforeWatchdogTerminate.subscribe(event => {
    event.cancel = true
})

world.events.entityHit.subscribe(data => {
    if (data.hitEntity?.typeId === "minecraft:npc" && data.hitEntity?.hasTag(config.shopTag)) {
        serverShop(data.entity)
    }
})

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getScore(target, objective) {
    try {
        const oB = world.scoreboard.getObjective(objective);
        if (typeof target == "string")
            return oB.getScore(
                oB.getParticipants().find((pT) => pT.displayName == target)
            );
        return oB.getScore(target.scoreboard);
    } catch {
        return 0;
    }
};
