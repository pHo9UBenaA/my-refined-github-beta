/// <reference types="@types/chrome" />

const copyToClipboard = async (
  url: string,
  clipboard: Pick<Clipboard, "writeText"> = navigator.clipboard,
): Promise<void> => {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;

  // Expected format: /<owner>/<repository-name> or /<owner>/<repository-name>/
  const match = pathname.match(/^\/([^/]+)\/([^/]+)\/?$/);

  if (!match) {
    return;
  }

  const [, owner, repository] = match;
  const sshUri = `git@github.com:${owner}/${repository}.git`;

  try {
    await clipboard.writeText(sshUri);
  } catch (err) {
    console.error("Failed to copy SSH URI:", err);
  }
};

const copySshUri = async (): Promise<void> => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab?.id || !tab?.url) {
    return;
  }

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: copyToClipboard,
    args: [tab.url],
  });
};

export { copySshUri, copyToClipboard as __test__copyToClipboard };
