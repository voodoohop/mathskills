import { visit } from 'unist-util-visit';
import type { Element } from 'hast';
import { h } from 'hastscript';

type CelebrationType = 'confetti' | 'fireworks' | 'particles';

export function rehypeCelebrationPlugin() {
  return (tree: any) => {
    visit(tree, 'element', (node: Element) => {
      // Find container directives with celebrate- class names
      if (node.tagName === 'div' && Array.isArray(node.properties?.className)) {
        const classes = node.properties.className as string[];
        
        // Check if any class starts with 'celebrate-'
        const celebrateClass = classes.find(c => c.startsWith('celebrate-'));
        
        if (celebrateClass) {
          const celebrationType = celebrateClass.replace('celebrate-', '') as CelebrationType;
          
          // Validate celebration type
          if (!['confetti', 'fireworks', 'particles'].includes(celebrationType)) {
            return;
          }
          
          // Create the animation element
          const animationElement = h(
            'celebration-animation',
            {
              type: celebrationType,
              autoplay: 'true',
            },
            []
          ) as any;
          
          // Keep the original content (message)
          const contentWrapper = h('div', { className: 'celebration-content' }, node.children) as any;
          
          // Replace the node with both animation and content
          node.children = [animationElement, contentWrapper];
          node.properties = {
            className: 'celebration-wrapper',
            style: 'display: flex; flex-direction: column; gap: 0.5rem;',
          };
        }
      }
    });
  };
}
