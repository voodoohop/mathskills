import { visit } from 'unist-util-visit';

export function remarkJSXGraphPlugin() {
  return (tree: any) => {
    visit(tree, 'code', (node: any, index: number | undefined, parent: any) => {
      // Find code blocks with language jsxgraph
      if (node.lang === 'jsxgraph' && index !== undefined) {
        const code = node.value;
        
        // Create an HTML node that will be transformed by rehype
        // Use a custom data attribute to pass the code
        const htmlNode = {
          type: 'html',
          value: `<div data-jsxgraph-code="${encodeURIComponent(code)}"></div>`,
        };
        
        // Replace the code block with the HTML node
        parent.children[index] = htmlNode;
      }
    });
  };
}
