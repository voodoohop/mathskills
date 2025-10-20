import { visit } from 'unist-util-visit';
import type { Element, Text } from 'hast';

/**
 * Rehype plugin to automatically wrap emojis with the .emoji class
 * Detects Unicode emoji characters and wraps them in <span className="emoji">
 */
export function rehypeEmojiWrapper() {
  return (tree: any) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!node.value || !parent || index === undefined) return;

      // Regex to detect emoji characters
      // Matches: emoji ranges, ZWJ sequences, variation selectors, etc.
      const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;

      if (!emojiRegex.test(node.value)) return;

      // Split text by emoji and create new nodes
      const parts = node.value.split(/([\p{Emoji_Presentation}\p{Extended_Pictographic}]+)/gu);
      const newNodes: (Text | Element)[] = [];

      parts.forEach((part) => {
        if (!part) return;

        if (/([\p{Emoji_Presentation}\p{Extended_Pictographic}])/gu.test(part)) {
          // This is an emoji - wrap it
          newNodes.push({
            type: 'element',
            tagName: 'span',
            properties: { className: ['emoji'] },
            children: [{ type: 'text', value: part }],
          } as Element);
        } else {
          // Regular text
          newNodes.push({ type: 'text', value: part } as Text);
        }
      });

      // Replace the original node with new nodes
      if (newNodes.length > 0) {
        parent.children.splice(index, 1, ...newNodes);
      }
    });
  };
}
