import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    JXG: any;
  }
}

interface JSXGraphBoardProps {
  code: string;
  width?: number;
  height?: number;
}

export const JSXGraphBoard: React.FC<JSXGraphBoardProps> = ({ 
  code, 
  width = 500, 
  height = 400 
}) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const boardInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!boardRef.current || !window.JXG) return;

    try {
      // Create board with unique ID
      const boardId = `jxgbox-${Math.random().toString(36).substr(2, 9)}`;
      boardRef.current.id = boardId;
      
      const board = window.JXG.JSXGraph.initBoard(boardId, {
        boundingbox: [-1, 5, 5, -1],
        axis: false,
        showNavigation: false,
        showCopyright: false,
        keepAspectRatio: true
      });

      boardInstanceRef.current = board;

      // Execute JessieCode
      console.log('Executing JessieCode:', code);
      board.jc.parse(code);
      board.update();
    } catch (error) {
      console.error('JSXGraph error:', error);
      console.error('Failed code:', code);
    }

    return () => {
      if (boardInstanceRef.current) {
        try {
          window.JXG.JSXGraph.freeBoard(boardInstanceRef.current);
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, [code]);

  return (
    <div 
      ref={boardRef} 
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        margin: '1rem auto',
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem'
      }} 
    />
  );
};
