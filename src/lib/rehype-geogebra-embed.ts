/**
 * Rehype plugin for GeoGebra template embedding
 * Transforms divs with data-geogebra-embed-id into GeoGebraEmbed components
 */

import { visit } from 'unist-util-visit';
import type { Element } from 'hast';

export function rehypeGeoGebraEmbedPlugin() {
  return (tree: any) => {
    visit(tree, 'element', (node: Element) => {
      // Find divs with data-geogebra-embed-id attribute (created by remark plugin)
      if (
        node.tagName === 'div' &&
        node.properties &&
        'dataGeogebraEmbedId' in node.properties
      ) {
        const templateId = node.properties.dataGeogebraEmbedId as string;
        
        // Transform to GeoGebraEmbed component
        node.tagName = 'GeoGebraEmbed';
        node.properties = { templateId };
        node.children = [];
      }
    });
  };
}
