export function copyToClipboard(elem: HTMLElement): boolean {
  const targetId = "_hiddenCopyText_";
  let target = document.getElementById(
    "_hiddenCopyText_"
  ) as HTMLTextAreaElement;

  if (!target) {
    target = document.createElement("textarea");
    target.style.position = "absolute";
    target.style.left = "-9999px";
    target.style.top = "0";
    target.id = targetId;
    document.body.appendChild(target);
  }

  target.textContent = elem.textContent;
  target.focus();
  target.setSelectionRange(0, target.value.length);
  let succeed;
  try {
    succeed = document.execCommand("copy");
  } catch (e) {
    succeed = false;
  }

  return succeed;
}
