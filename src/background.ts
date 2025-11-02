/// <reference types="@types/chrome" />

import { focusSearchBox } from "./features/focusSearchBox.ts";
import { copySshUri } from "./features/copySshUri.ts";

chrome.commands.onCommand.addListener(async (command: string) => {
  if (command === "focus_search") {
    await focusSearchBox();
  } else if (command === "copy_ssh_uri") {
    await copySshUri();
  }
});
