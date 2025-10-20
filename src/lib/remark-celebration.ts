import { visit } from 'unist-util-visit';

/**
 * Remark plugin to handle celebration directives
 * Converts :::celebrate-confetti, :::celebrate-fireworks, :::celebrate-particles, :::celebrate-slowmo
 * into celebration-animation components
 */
export function remarkCelebrationPlugin() {
  return (tree: any) => {
    visit(tree, 'containerDirective', (node: any) => {
      // Check if this is a celebrate-* directive
      const celebrationType = node.name;
      
      if (!['celebrate-confetti', 'celebrate-fireworks', 'celebrate-particles', 'celebrate-slowmo'].includes(celebrationType)) {
        return;
      }

      // Extract the type (e.g., 'confetti' from 'celebrate-confetti')
      const type = celebrationType.replace('celebrate-', '');

      // Transform the directive into an HTML element
      // Following the official remark-directive pattern
      node.data = {
        hName: 'celebration-animation',
        hProperties: {
          type,
          autoplay: true,
        },
        ...node.data,
      };
    });
  };
}
