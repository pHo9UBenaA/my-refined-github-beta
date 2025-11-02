/// <reference lib="deno.ns" />

import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";

import { __test__copyToClipboard } from "./copySshUri.ts";

const createClipboardMock = () => {
  let lastCopiedText: string | null = null;

  return {
    clipboard: {
      writeText: (text: string) => {
        lastCopiedText = text;
        return Promise.resolve();
      },
    },
    getLastCopiedText: () => lastCopiedText,
  };
};

describe("copyToClipboard", () => {
  it("copies SSH URI for repository URL", async () => {
    // Arrange
    const clipboard = createClipboardMock();

    // Act
    await __test__copyToClipboard(
      "https://github.com/octocat/Hello-World",
      clipboard.clipboard,
    );

    // Assert
    assertEquals(
      clipboard.getLastCopiedText(),
      "git@github.com:octocat/Hello-World.git",
    );
  });

  it("copies SSH URI for repository URL with trailing slash", async () => {
    // Arrange
    const clipboard = createClipboardMock();

    // Act
    await __test__copyToClipboard(
      "https://github.com/octocat/Hello-World/",
      clipboard.clipboard,
    );

    // Assert
    assertEquals(
      clipboard.getLastCopiedText(),
      "git@github.com:octocat/Hello-World.git",
    );
  });

  it("does nothing for non-repository page", async () => {
    // Arrange
    const clipboard = createClipboardMock();

    // Act
    await __test__copyToClipboard(
      "https://github.com/octocat/Hello-World/issues",
      clipboard.clipboard,
    );

    // Assert
    assertEquals(clipboard.getLastCopiedText(), null);
  });
});
