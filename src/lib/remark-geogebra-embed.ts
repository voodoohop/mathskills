/**
 * Remark plugin for elegant GeoGebra template embedding
 * Syntax: ```geogebra-embed\ntemplate-id\n```
 * Example: ```geogebra-embed\npythagoras\n```
 */

import { visit } from 'unist-util-visit';
import type { Code } from 'mdast';
import type { Parent } from 'unist';

export function remarkGeoGebraEmbedPlugin() {
  return (tree: Parent) => {
    visit(tree, 'code', (node: Code, index: number | undefined, parent: Parent | undefined) => {
      if (node.lang === 'geogebra-embed' && parent && index !== undefined) {
        const templateId = node.value.trim();
        
        // Create a div with data attribute containing the template ID
        const divNode = {
          type: 'html',
          value: `<div data-geogebra-embed-id="${templateId}"></div>`
        };
        
        parent.children[index] = divNode as any;
      }
    });
  };
}
