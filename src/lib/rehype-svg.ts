import { visit } from 'unist-util-visit';
import type { Element, Text } from 'hast';

export function rehypeSvgPlugin() {
  return (tree: any) => {
    visit(tree, 'element', (node: any) => {
      // Find <pre><code class="language-svg">...</code></pre>
      if (
        node.tagName === 'pre' &&
        node.children?.[0]?.type === 'element'
      ) {
        const codeNode = node.children[0] as Element;
        const classAttr = codeNode.properties?.className as string[];

        if (classAttr?.includes('language-svg')) {
          // Extract SVG content from code block
          const textNode = codeNode.children?.[0] as Text;
          const svgContent = textNode?.value || '';

          // Replace pre/code with raw SVG HTML
          node.type = 'html';
          node.value = `<div class="flex justify-center my-5 p-4 border border-border rounded-lg bg-muted/30 overflow-x-auto">${svgContent}</div>`;
          node.children = [];
        }
      }
    });
  };
}
