import { visit } from 'unist-util-visit';
import type { Element } from 'hast';

// Rehype plugin to style directive containers
export function rehypeDirectiveContainers() {
  return (tree: any) => {
    visit(tree, 'element', (node: Element) => {
      // Handle container directives (:::hint, :::warning, etc.)
      if (node.tagName === 'div' && Array.isArray(node.properties?.className)) {
        const classes = node.properties.className as string[];
        
        // Style hint containers
        if (classes.includes('hint')) {
          node.properties.className = [
            ...classes,
            'border-l-4',
            'border-blue-500',
            'bg-blue-50',
            'dark:bg-blue-950',
            'p-4',
            'my-4',
            'rounded-r',
          ];
        }
        
        // Style warning containers
        if (classes.includes('warning')) {
          node.properties.className = [
            ...classes,
            'border-l-4',
            'border-amber-500',
            'bg-amber-50',
            'dark:bg-amber-950',
            'p-4',
            'my-4',
            'rounded-r',
          ];
        }
        
        // Style example containers
        if (classes.includes('example')) {
          node.properties.className = [
            ...classes,
            'border-l-4',
            'border-green-500',
            'bg-green-50',
            'dark:bg-green-950',
            'p-4',
            'my-4',
            'rounded-r',
          ];
        }
        
        // Style solution containers
        if (classes.includes('solution')) {
          node.properties.className = [
            ...classes,
            'border-l-4',
            'border-purple-500',
            'bg-purple-50',
            'dark:bg-purple-950',
            'p-4',
            'my-4',
            'rounded-r',
          ];
        }
        
        // Style steps containers
        if (classes.includes('steps')) {
          node.properties.className = [
            ...classes,
            'border',
            'border-gray-300',
            'dark:border-gray-700',
            'bg-gray-50',
            'dark:bg-gray-900',
            'p-4',
            'my-4',
            'rounded',
          ];
        }
      }
      
      // Handle definition lists
      if (node.tagName === 'dl') {
        node.properties = node.properties || {};
        node.properties.className = [
          'my-5',
          'space-y-3',
        ];
      }
      
      if (node.tagName === 'dt') {
        node.properties = node.properties || {};
        node.properties.className = [
          'font-bold',
          'text-lg',
          'mt-4',
          'first:mt-0',
        ];
      }
      
      if (node.tagName === 'dd') {
        node.properties = node.properties || {};
        node.properties.className = [
          'ml-6',
          'text-muted-foreground',
        ];
      }
    });
  };
}
