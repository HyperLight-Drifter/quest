export class QuestCombat extends Combat {
  _sortCombatants(a, b) {
    const groupA = a.getFlag("quest-adventure-game", "group") ?? (a.actor?.type === "npc" ? "npc" : "character");
    const groupB = b.getFlag("quest-adventure-game", "group") ?? (b.actor?.type === "npc" ? "npc" : "character");

    if (groupA !== groupB) {
      return groupA === "character" ? -1 : 1;
    }
    return (a.name ?? "").localeCompare(b.name ?? "");
  }
}

Hooks.on("updateCombat", async (combat, changed) => {
  console.log("QUEST | updateCombat fired", { changed, isGM: game.user.isGM });

  if (!game.user.isGM) return;
  if (!("round" in changed)) {
    console.log("QUEST | no round change in this update, skipping");
    return;
  }

  const flagged = combat.combatants.filter(c => c.getFlag("quest-adventure-game", "turnTaken"));
  console.log("QUEST | combatants with turnTaken flag:", flagged.map(c => c.name));

  const updates = flagged.map(c => ({ _id: c.id, "flags.quest-adventure-game.turnTaken": false }));

  if (updates.length) {
    await combat.updateEmbeddedDocuments("Combatant", updates);
    console.log("QUEST | cleared turnTaken on", updates.length, "combatant(s)");
  }
});