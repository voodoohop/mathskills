import { visit, SKIP } from 'unist-util-visit';
import type { Element } from 'hast';

/**
 * Rehype plugin to remove <progress> XML tags from rendered output.
 * 
 * The progress data is extracted by useDiagnosticProgress hook from the raw text
 * before markdown parsing, so we can safely strip these tags to prevent React warnings.
 */
export function rehypeRemoveProgressPlugin() {
  return (tree: any) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      // Remove <progress> tags and their children
      if (node.tagName === 'progress') {
        if (parent && typeof index === 'number') {
          parent.children.splice(index, 1);
          return [SKIP, index];
        }
      }
      
      // Also remove child tags that might be parsed separately
      if (
        node.tagName === 'current' ||
        node.tagName === 'total' ||
        node.tagName === 'correct' ||
        node.tagName === 'incorrect'
      ) {
        if (parent && typeof index === 'number') {
          parent.children.splice(index, 1);
          return [SKIP, index];
        }
      }
    });
  };
}
