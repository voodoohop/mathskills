import { visit } from 'unist-util-visit';
import type { Element, Text } from 'hast';

/**
 * Rehype plugin to convert pollinations code fences into images.
 * 
 * Detects code blocks with language "pollinations" and converts them to <img> tags
 * with the Pollinations AI image generation API.
 * 
 * Example markdown:
 * ```pollinations
 * cheering happily
 * ```
 * 
 * Becomes:
 * <img src="https://image.pollinations.ai/prompt/black%20and%20white%20cartoon%20mascot%20style%2C%20energetic%20shaggy%20dog%20with%20big%20floppy%20ears%20and%20friendly%20smile%2C%20cheering%20happily?..." />
 */

// Visual style configuration - abstract geometric interpretation in manga/comic ink style
const STYLE_DESCRIPTION = "minimal geometric abstract interpretation, black and white manga comic ink style, solid blacks, clean linework, expressive and conceptual";

export function rehypePollinationsCodefencePlugin() {
  return (tree: any) => {
    visit(tree, 'element', (node: Element) => {
      // Find <pre><code class="language-pollinations">...</code></pre>
      if (node.tagName === 'pre' && node.children?.[0]) {
        const codeNode = node.children[0] as Element;
        
        if (
          codeNode.tagName === 'code' &&
          Array.isArray(codeNode.properties?.className) &&
          codeNode.properties.className.includes('language-pollinations')
        ) {
          // Extract prompt text from code content
          const textNode = codeNode.children?.[0] as Text;
          const prompt = textNode?.value?.trim() || '';
          
          if (!prompt) {
            return; // Skip empty prompts
          }
          
          // Build prompt for abstract geometric interpretation
          const fullPrompt = `${prompt}, ${STYLE_DESCRIPTION}`;
          
          // Build Pollinations URL with all parameters
          const encodedPrompt = encodeURIComponent(fullPrompt);
          const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?model=gptimage-mini&width=600&height=400&quality=high&nologo=true&referrer=pppp`;
          
          // Replace <pre><code> with <img>
          node.tagName = 'img';
          node.properties = {
            src: url,
            alt: prompt,
            className: ['pollinations-image', 'rounded-lg', 'my-4', 'mx-auto', 'max-w-full'],
          };
          node.children = [];
        }
      }
    });
  };
}
