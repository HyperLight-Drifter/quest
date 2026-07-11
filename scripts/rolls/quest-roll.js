const ROLL_TIERS = [
  {
    min: 20,
    max: 20,
    label: "Triumph",
    text: "This is an exciting moment. You automatically succeed at what you were trying to do, and you may even find added fortune. If you're dealing damage, double it."
  },
  {
    min: 11,
    max: 19,
    label: "Success",
    text: "You accomplish what you were trying to do without any compromises. If you're dealing damage, you deal the standard amount."
  },
  {
    min: 6,
    max: 10,
    label: "Tough Choice",
    text: "You succeed in your action, but there's a cost. The Guide will give you a choice between two setbacks."
  },
  {
    min: 2,
    max: 5,
    label: "Failure",
    text: "You fail your intended action and face a setback of the Guide's choice. You might lose equipment, take damage from an enemy counterattack, or face some other misfortune."
  },
  {
    min: 1,
    max: 1,
    label: "Catastrophe",
    text: "Oh no. You automatically fail, and you may suffer a severe setback."
  }
];

export function getRollTier(total) {
  return ROLL_TIERS.find(tier => total >= tier.min && total <= tier.max);
}

export async function rollTieredD20(actor) {
  const roll = new Roll("1d20");
  await roll.evaluate();

  const total = roll.total;
  const tier = getRollTier(total);

  const content = await foundry.applications.handlebars.renderTemplate(
    "systems/quest-adventure-game/templates/chat/roll-card.hbs",
    { total, tier }
  );

  await roll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor }),
    content
  });
}