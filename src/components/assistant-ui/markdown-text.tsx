"use client";

import "@assistant-ui/react-markdown/styles/dot.css";
import "katex/dist/katex.min.css";
import "remark-github-blockquote-alert/alert.css";

import {
  type CodeHeaderProps,
  MarkdownTextPrimitive,
  unstable_memoizeMarkdownComponents as memoizeMarkdownComponents,
  useIsMarkdownCodeBlock,
} from "@assistant-ui/react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { remarkGeoGebraEmbedPlugin } from "@/lib/remark-geogebra-embed";
import { rehypeGeoGebraEmbedPlugin } from "@/lib/rehype-geogebra-embed";
import { GeoGebraEmbed } from "@/components/geogebra/GeoGebraEmbed";
import remarkDirective from "remark-directive";
import remarkGithubBlockquoteAlert from "remark-github-blockquote-alert";
import { type FC, memo, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { cn } from "@/lib/utils";
import rehypeRaw from "rehype-raw";
import { rehypeDirectiveContainers } from "@/lib/rehype-directive-containers";
import { CelebrationAnimation } from "@/components/CelebrationAnimation";
import { rehypeEmojiWrapper } from "@/lib/rehype-emoji-wrapper";
import { remarkCelebrationPlugin } from "@/lib/remark-celebration";

// Preprocess function to normalize LaTeX delimiters
function normalizeCustomMathTags(input: string): string {
  return (
    input
      // Convert \( ... \) to $...$ (inline math)
      .replace(/\\\(([\s\S]*?)\\\)/g, (_, content) => `$${content.trim()}$`)
      // Convert \[ ... \] to $$...$$ (block math)
      .replace(/\\\[([\s\S]*?)\\\]/g, (_, content) => `$$${content.trim()}$$`)
  );
}

const MarkdownTextImpl = () => {
  return (
    <MarkdownTextPrimitive
      remarkPlugins={[
        remarkGfm,
        remarkMath,
        remarkDirective,
        remarkCelebrationPlugin,
        remarkGithubBlockquoteAlert,
        remarkGeoGebraEmbedPlugin,
      ]}
      rehypePlugins={[rehypeRaw, rehypeDirectiveContainers, rehypeGeoGebraEmbedPlugin, rehypeEmojiWrapper, rehypeKatex]}
      preprocess={normalizeCustomMathTags}
      className="aui-md text-left"
      components={defaultComponents}
    />
  );
};

export const MarkdownText = memo(MarkdownTextImpl);

const CodeHeader: FC<CodeHeaderProps> = ({ language, code }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const onCopy = () => {
    if (!code || isCopied) return;
    copyToClipboard(code);
  };

  return (
    <div className="aui-code-header-root mt-4 flex items-center justify-between gap-4 rounded-t-lg bg-muted-foreground/15 px-4 py-2 text-sm font-semibold text-foreground dark:bg-muted-foreground/20">
      <span className="aui-code-header-language lowercase [&>span]:text-xs">
        {language}
      </span>
      <TooltipIconButton tooltip="Copy" onClick={onCopy}>
        {!isCopied && <CopyIcon />}
        {isCopied && <CheckIcon />}
      </TooltipIconButton>
    </div>
  );
};

const useCopyToClipboard = ({
  copiedDuration = 3000,
}: {
  copiedDuration?: number;
} = {}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = (value: string) => {
    if (!value) return;

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), copiedDuration);
    });
  };

  return { isCopied, copyToClipboard };
};

const defaultComponents = memoizeMarkdownComponents({
  ...{
    GeoGebraEmbed: ({ templateId }: { templateId: string }) => (
      <GeoGebraEmbed templateId={templateId} />
    ),
    'celebration-animation': ({ type, autoplay }: { type: string; autoplay: boolean }) => (
      <CelebrationAnimation type={type as 'confetti' | 'fireworks' | 'particles' | 'slowmo'} autoplay={autoplay} />
    ),
  } as any,
  svg: ({ className, ...props }) => (
    <svg
      className={cn(
        "mx-auto my-5 block",
        className,
      )}
      {...props}
    />
  ),
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "aui-md-h1 mb-8 scroll-m-20 text-4xl font-black tracking-tight last:mb-0 text-blue-600 dark:text-cyan-400",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "aui-md-h2 mt-8 mb-4 scroll-m-20 text-3xl font-bold tracking-tight first:mt-0 last:mb-0 text-blue-600 dark:text-cyan-400",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "aui-md-h3 mt-6 mb-4 scroll-m-20 text-2xl font-bold tracking-tight first:mt-0 last:mb-0 text-purple-700 dark:text-purple-400",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        "aui-md-h4 mt-6 mb-4 scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 last:mb-0",
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }) => (
    <h5
      className={cn(
        "aui-md-h5 my-4 text-lg font-semibold first:mt-0 last:mb-0",
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }) => (
    <h6
      className={cn(
        "aui-md-h6 my-4 font-semibold first:mt-0 last:mb-0",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn(
        "aui-md-p mt-5 mb-5 leading-7 first:mt-0 last:mb-0",
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn(
        "aui-md-a font-bold text-blue-600 dark:text-cyan-400 underline underline-offset-4 hover:text-blue-700 dark:hover:text-cyan-300",
        className,
      )}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn("aui-md-blockquote border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn("aui-md-ul my-5 ml-6 list-disc [&>li]:mt-2", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("aui-md-ol my-5 ml-6 list-decimal [&>li]:mt-2", className)}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("aui-md-hr my-5 border-b", className)} {...props} />
  ),
  table: ({ className, ...props }) => (
    <table
      className={cn(
        "aui-md-table my-5 w-full border-separate border-spacing-0 overflow-y-auto",
        className,
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "aui-md-th bg-muted px-4 py-2 text-left font-bold first:rounded-tl-lg last:rounded-tr-lg [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "aui-md-td border-b border-l px-4 py-2 text-left last:border-r [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  tr: ({ className, ...props }) => (
    <tr
      className={cn(
        "aui-md-tr m-0 border-b p-0 first:border-t [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg",
        className,
      )}
      {...props}
    />
  ),
  sup: ({ className, ...props }) => (
    <sup
      className={cn("aui-md-sup [&>a]:text-xs [&>a]:no-underline", className)}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "aui-md-pre overflow-x-auto !rounded-t-none rounded-b-lg bg-black p-4 text-white",
        className,
      )}
      {...props}
    />
  ),
  code: function Code({ className, children, ...props }) {
    const isCodeBlock = useIsMarkdownCodeBlock();
    
    return (
      <code
        className={cn(
          !isCodeBlock &&
            "aui-md-inline-code rounded border bg-muted font-semibold",
          className,
        )}
        {...props}
      >
        {children}
      </code>
    );
  },
  CodeHeader,
});
