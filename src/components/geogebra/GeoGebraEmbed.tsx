/**
 * GeoGebraEmbed Component
 * Elegant embed display for GeoGebra templates
 * Similar to YouTube embed experience - clean, minimal, professional
 */

import React, { useState } from 'react';
import { GeoGebraBoard } from './GeoGebraBoard';
import { getGeoGebraTemplate } from '@/content/geogebraTemplates';
import { ChevronDown } from 'lucide-react';

interface GeoGebraEmbedProps {
  templateId: string;
}

export const GeoGebraEmbed: React.FC<GeoGebraEmbedProps> = ({ templateId }) => {
  const template = getGeoGebraTemplate(templateId);
  const [isExpanded, setIsExpanded] = useState(true);

  if (!template) {
    return (
      <div className="my-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        ⚠️ GeoGebra template not found: <code>{templateId}</code>
      </div>
    );
  }

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Header - YouTube-like */}
      <div
        className="flex cursor-pointer items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-3 hover:from-slate-100 hover:to-slate-150"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-100">
            <span className="text-lg">📐</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900">{template.name}</h3>
            <p className="text-xs text-slate-600">{template.description}</p>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`text-slate-600 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </div>

      {/* Content - Collapsible */}
      {isExpanded && (
        <div className="border-t border-slate-200 bg-white p-4">
          <div className="flex justify-center">
            <GeoGebraBoard
              code={template.code}
              width={template.width || 500}
              height={template.height || 400}
            />
          </div>
          <div className="mt-3 text-xs text-slate-600">
            <span className="inline-block rounded bg-blue-50 px-2 py-1 text-blue-700">
              {template.topic}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
