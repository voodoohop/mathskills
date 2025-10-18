import { visit } from 'unist-util-visit';
import type { Element } from 'hast';

export function rehypeGeoGebraPlugin() {
  return (tree: any) => {
    visit(tree, 'element', (node: Element) => {
      // Find divs with data-geogebra-code attribute (created by remark plugin)
      if (
        node.tagName === 'div' &&
        node.properties &&
        'dataGeogebraCode' in node.properties
      ) {
        const encodedCode = node.properties.dataGeogebraCode as string;
        const code = decodeURIComponent(encodedCode);
        
        // Transform to GeoGebraBoard component
        node.tagName = 'GeoGebraBoard';
        node.properties = { code };
        node.children = [];
      }
    });
  };
}
