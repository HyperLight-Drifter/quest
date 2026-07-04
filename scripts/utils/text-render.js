export function renderAbilityDescription(text, options = {}) {
  const { includeApBadge = true } = options;
  if (!text) return "";
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

  if (!includeApBadge) {
    return escaped.replace(/(\d+)\s*AP\./g, "").trim();
  }

  return escaped.replace(/(\d+)\s*AP\./g, (match, cost) => {
    return `<br><span class="ap-badge" data-action="spendAp" data-cost="${cost}">${cost}</span>`;
  });
}

export function renderItemDescription(text, options = {}) {
  const { includeApBadge = true } = options;
  if (!text) return "";
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

  const withDamage = escaped.replace(/(\d+)\s*damage\./gi, (match, amount) => {
    return `<span class="damage-badge">${amount}</span>`;
  });

  if (!includeApBadge) {
    return withDamage.replace(/(\d+)\s*AP\./g, "").trim();
  }

  return withDamage.replace(/(\d+)\s*AP\./g, (match, cost) => {
    return `<br><span class="ap-badge" data-action="spendAp" data-cost="${cost}">${cost}</span><br>`;
  });
}