import { visit } from 'unist-util-visit';
import type { Code } from 'mdast';
import type { Parent } from 'unist';

export function remarkGeoGebraPlugin() {
  return (tree: Parent) => {
    visit(tree, 'code', (node: Code, index: number | undefined, parent: Parent | undefined) => {
      if (node.lang === 'geogebra' && parent && index !== undefined) {
        const code = node.value;
        
        // Create a div with data attribute containing the GeoGebra commands
        const divNode = {
          type: 'html',
          value: `<div data-geogebra-code="${encodeURIComponent(code)}"></div>`
        };
        
        parent.children[index] = divNode as any;
      }
    });
  };
}
