export function fixCursorOnFocus(root) {
  if (root._cursorFixAttached) return;
  root._cursorFixAttached = true;

  root.addEventListener("focusin", (event) => {
    const el = event.target;
    if (!(el instanceof HTMLInputElement) && !(el instanceof HTMLTextAreaElement)) return;
    if (el.type && !["text", "number"].includes(el.type)) return;

    const len = el.value.length;
    requestAnimationFrame(() => {
      try {
        el.setSelectionRange(len, len);
      } catch (e) {
        // setSelectionRange not supported on some input types; ignore.
      }
    });
  });
}