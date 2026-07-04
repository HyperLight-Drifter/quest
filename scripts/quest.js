import QuestCharacterData from "./data/character-data.js";
import QuestCharacterSheet from "./sheets/character-sheet.js";
import QuestAbilityData from "./data/ability-data.js";
import QuestAbilitySheet from "./sheets/ability-sheet.js";
import QuestItemData from "./data/item-data.js";
import QuestItemSheet from "./sheets/item-sheet.js";
import QuestNpcData from "./data/npc-data.js";
import QuestNpcSheet from "./sheets/npc-sheet.js";

Hooks.once("init", () => {
  CONFIG.Actor.dataModels.character = QuestCharacterData;

  foundry.applications.apps.DocumentSheetConfig.registerSheet(
    Actor,
    "quest",
    QuestCharacterSheet,
    {
      types: ["character"],
      makeDefault: true,
      label: "Quest Character Sheet"
    }
  );

  CONFIG.Actor.trackableAttributes = {
    character: {
      bar: ["hp"],
      value: ["armor", "ap"]
    },
    npc: {
      bar: ["hp"],
      value: ["armor", "att"]
    }
  };

  CONFIG.Actor.dataModels.npc = QuestNpcData;

  foundry.applications.apps.DocumentSheetConfig.registerSheet(
    Actor,
    "quest",
    QuestNpcSheet,
    {
      types: ["npc"],
      makeDefault: true,
      label: "Quest NPC Sheet"
    }
  );

  CONFIG.Item.dataModels.ability = QuestAbilityData;

  foundry.applications.apps.DocumentSheetConfig.registerSheet(
    Item,
    "quest",
    QuestAbilitySheet,
    {
      types: ["ability"],
      makeDefault: true,
      label: "Quest Ability Sheet"
    }
  );

  CONFIG.Item.dataModels.item = QuestItemData;

  foundry.applications.apps.DocumentSheetConfig.registerSheet(
    Item,
    "quest",
    QuestItemSheet,
    {
      types: ["item"],
      makeDefault: true,
      label: "Quest Item Sheet"
    }
  );
});

Hooks.on("preCreateActor", (actor, data, options, userId) => {
  const linkDefaults = {
    character: true,
    npc: false
  };

  const actorLink = linkDefaults[actor.type];
  if (actorLink === undefined) return;

  const tokenUpdate = {
    actorLink,
    bar1: { attribute: "hp" }
  };

  if (actor.type === "character") {
    tokenUpdate.bar2 = { attribute: "ap" };
  }

  actor.updateSource({
    prototypeToken: tokenUpdate
  });
});

Hooks.on("combatStart", async (combat) => {
  const choice = await foundry.applications.api.DialogV2.wait({
    window: { title: "Who Goes First?" },
    content: "<p>Who acts first this combat?</p>",
    buttons: [
      { action: "character", label: "Characters", default: true },
      { action: "npc", label: "NPCs" }
    ]
  });

  if (!choice) return;

  const updates = combat.combatants.map(combatant => {
    const actorType = combatant.actor?.type;
    const isWinner = actorType === choice;
    return {
      _id: combatant.id,
      initiative: isWinner ? 2 : 1
    };
  });

  await combat.updateEmbeddedDocuments("Combatant", updates);
  await combat.update({ turn: 0 });
});