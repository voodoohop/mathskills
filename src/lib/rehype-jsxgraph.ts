import { visit } from 'unist-util-visit';
import type { Element } from 'hast';

export function rehypeJSXGraphPlugin() {
  return (tree: any) => {
    visit(tree, 'element', (node: Element) => {
      // Find divs with data-jsxgraph-code attribute (created by remark plugin)
      if (
        node.tagName === 'div' &&
        node.properties &&
        'dataJsxgraphCode' in node.properties
      ) {
        const encodedCode = node.properties.dataJsxgraphCode as string;
        const code = decodeURIComponent(encodedCode);
        
        // Transform to JSXGraphBoard component
        node.tagName = 'JSXGraphBoard';
        node.properties = { code };
        node.children = [];
      }
    });
  };
}
