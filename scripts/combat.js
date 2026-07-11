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
  if (!game.user.isGM) return;
  if (!("round" in changed)) return;

  const updates = combat.combatants
    .filter(c => c.getFlag("quest-adventure-game", "turnTaken"))
    .map(c => ({ _id: c.id, "flags.quest-adventure-game-adventure-game-adventure-game-adventure-game.turnTaken": false }));

  if (updates.length) {
    await combat.updateEmbeddedDocuments("Combatant", updates);
  }
});