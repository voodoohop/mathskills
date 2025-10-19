import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    GGBApplet: any;
    ggbApplet: any;
  }
}

interface GeoGebraBoardProps {
  code: string;
  width?: number;
  height?: number;
}

export const GeoGebraBoard: React.FC<GeoGebraBoardProps> = ({ 
  code, 
  width = 600, 
  height = 400 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appletIdRef = useRef<string>(`ggb-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (!containerRef.current || !window.GGBApplet) {
      console.error('GeoGebra not loaded or container not ready');
      return;
    }

    const appletId = appletIdRef.current;

    try {
      // Configure GeoGebra parameters
      const params = {
        appName: "geometry",
        width: width,
        height: height,
        showToolBar: false,
        showAlgebraInput: false,
        showMenuBar: false,
        enableShiftDragZoom: true,
        enableRightClick: false,
        showResetIcon: false,
        appletOnLoad: function() {
          console.log('GeoGebra applet loaded, executing commands...');
          
          // Execute commands after applet loads
          setTimeout(() => {
            try {
              // First, set perspective to show only graphics view (hide algebra panel)
              window.ggbApplet.evalCommand('SetPerspective("G")');
              
              const commands = code.split('\n').filter(cmd => cmd.trim());
              commands.forEach(cmd => {
                console.log('Executing:', cmd);
                window.ggbApplet.evalCommand(cmd);
              });
            } catch (error) {
              console.error('Error executing GeoGebra commands:', error);
            }
          }, 500);
        }
      };

      // Create and inject applet
      const applet = new window.GGBApplet(params, true);
      applet.inject(appletId);
    } catch (error) {
      console.error('GeoGebra initialization error:', error);
    }

    // Cleanup
    return () => {
      // GeoGebra cleanup is handled automatically
    };
  }, [code, width, height]);

  return (
    <div 
      style={{ 
        margin: '1rem auto',
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div 
        id={appletIdRef.current}
        ref={containerRef}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      />
    </div>
  );
};
