/// <reference types="vite/client" />

import * as React from 'react';

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        's-page': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { heading?: string }, HTMLElement>
        's-box': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { background?: 'default' | 'subdued' | 'secondary' | 'tertiary'; padding?: 'none' | 'small-200' | 'small-100' | 'small' | 'base' | 'large'; borderRadius?: 'none' | 'small-200' | 'small-100' | 'base' | 'large-100' | 'large-200' | 'full'; borderWidth?: 'none' | 'small-100' | 'base'; borderColor?: 'base' | 'hover'; maxInlineSize?: string | number }, HTMLElement>
        's-stack': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { gap?: 'none' | 'small-200' | 'small-100' | 'small' | 'base' | 'large' | 'small-300'; direction?: 'block' | 'inline'; alignItems?: 'start' | 'center' | 'end' | 'stretch'; inlineAlign?: 'start' | 'center' | 'end'; justifyContent?: 'start' | 'center' | 'end' | 'space-between'; padding?: 'none' | 'small-200' | 'small-100' | 'small' | 'base' | 'large'; inlineSize?: 'hug' | 'fill' }, HTMLElement>
        's-grid': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { columns?: string | number; gap?: 'none' | 'small-200' | 'small-100' | 'small' | 'base' | 'large'; gridTemplateColumns?: string }, HTMLElement>
        's-grid-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
        's-section': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { heading?: string; padding?: 'none' | 'small-200' | 'small-100' | 'small' | 'base' | 'large' }, HTMLElement>
        's-text': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { type?: 'body' | 'strong'; tone?: 'default' | 'success' | 'critical' | 'warning' | 'info' | 'subdued'; color?: 'default' | 'subdued'; fontVariantNumeric?: 'tabular-nums' }, HTMLElement>
        's-paragraph': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { color?: 'default' | 'subdued'; tone?: 'critical' | 'success' | 'warning' | 'info'; lineClamp?: number }, HTMLElement>
        's-app-nav': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
        's-link': React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLElement> & { href?: string; rel?: string; id?: string }, HTMLElement>
        's-button': React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLElement> & { variant?: 'primary' | 'secondary' | 'tertiary' | 'plain'; tone?: 'default' | 'critical'; size?: 'micro' | 'small' | 'base' | 'large'; loading?: boolean; disabled?: boolean; inlineSize?: 'hug' | 'fill'; slot?: string; icon?: string; accessibilityLabel?: string; 'data-href'?: string }, HTMLElement>
        's-text-field': React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLElement> & { label?: string; labelAccessibilityVisibility?: 'visible' | 'exclusive'; placeholder?: string; type?: 'text' | 'email' | 'password' | 'search' | 'url'; value?: string; error?: string; disabled?: boolean }, HTMLElement>
        's-search-field': React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLElement> & { label?: string; labelAccessibilityVisibility?: 'visible' | 'exclusive'; placeholder?: string; value?: string; disabled?: boolean; slot?: string }, HTMLElement>
        's-badge': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { tone?: 'default' | 'success' | 'critical' | 'warning' | 'info' | 'new'; size?: 'small' | 'base' | 'large' }, HTMLElement>
        's-banner': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { tone?: 'default' | 'success' | 'critical' | 'warning' | 'info'; heading?: string }, HTMLElement>
        's-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { type?: string; tone?: 'default' | 'success' | 'critical' | 'warning' | 'info' | 'subdued'; size?: 'small' | 'base' | 'large' }, HTMLElement>
        's-spinner': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { size?: 'small' | 'base' | 'large' }, HTMLElement>
        's-progress-bar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { progress?: string | number; tone?: 'default' | 'success' | 'critical' | 'warning' | 'info'; size?: 'small' | 'base' | 'large' }, HTMLElement>
      }
    }
  }
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SHOPIFY_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  shopify?: {
    loading?: boolean;
    idToken?: () => Promise<string>;
  };
  __POLARIS__?: unknown;
}

export {};
