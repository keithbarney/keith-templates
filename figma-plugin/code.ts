/**
 * {{PLUGIN_NAME}} — Figma Plugin
 * {{PLUGIN_DESCRIPTION}}
 */

import {
  getSelection,
  hasSelection,
  notifySuccess,
  notifyError,
  traverse,
} from './shared/figma-helpers';

import {
  UIMessage,
  sendResult,
  sendError,
  sendLoading,
  createMessageHandler,
} from './shared/messaging';

// ============================================================================
// PLUGIN CONFIG
// ============================================================================

const UI_WIDTH = 320;
const UI_HEIGHT = 400;

// ============================================================================
// MAIN
// ============================================================================

figma.showUI(__html__, {
  width: UI_WIDTH,
  height: UI_HEIGHT,
  themeColors: true,
});

// ============================================================================
// MESSAGE HANDLING
// ============================================================================

const handleMessage = createMessageHandler({
  run: async () => {
    try {
      sendLoading(true);

      if (!hasSelection()) {
        sendError('Please select something first');
        return;
      }

      const selection = getSelection();

      // TODO: Your plugin logic here
      const result = processSelection(selection);

      sendResult(result);
      notifySuccess('Done!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      sendError(message);
      notifyError(message);
    } finally {
      sendLoading(false);
    }
  },

  close: () => {
    figma.closePlugin();
  },

  settings: (msg) => {
    // Handle settings changes from UI
    console.log('Settings:', msg.data);
  },
});

figma.ui.onmessage = handleMessage;

// ============================================================================
// SELECTION CHANGE LISTENER (optional)
// ============================================================================

figma.on('selectionchange', () => {
  figma.ui.postMessage({
    type: 'selection-changed',
    count: figma.currentPage.selection.length,
  });
});

// ============================================================================
// PLUGIN LOGIC
// ============================================================================

function processSelection(nodes: readonly SceneNode[]): unknown {
  // TODO: Implement your plugin logic
  // Example: count nodes by type
  const counts: Record<string, number> = {};

  for (const node of nodes) {
    traverse(node, (child) => {
      counts[child.type] = (counts[child.type] || 0) + 1;
    });
    counts[node.type] = (counts[node.type] || 0) + 1;
  }

  return counts;
}
