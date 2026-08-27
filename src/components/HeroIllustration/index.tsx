import type {ReactNode} from 'react';
import styles from './styles.module.css';

interface NodeSpec {
  x: number;
  y: number;
  method: 'POST' | 'PATCH';
}

const W = 170;
const H = 76;
const VIEWBOX_W = 1400;
const VIEWBOX_H = 480;
const CENTER_X = VIEWBOX_W / 2;

// Spread to the two side columns, clear of the vertical center strip
// where the hero's title/subtitle/buttons sit — this renders as a
// full-bleed background layer, not an inline figure. Margin is generous
// on purpose: at very wide viewports the outer edge is close to the
// browser chrome, not just the text column.
const MARGIN = 110;
const A: NodeSpec = {x: MARGIN, y: 40, method: 'POST'};
const C: NodeSpec = {x: VIEWBOX_W - MARGIN - W, y: 40, method: 'POST'};
const B: NodeSpec = {x: MARGIN, y: 330, method: 'PATCH'};
const D: NodeSpec = {x: VIEWBOX_W - MARGIN - W, y: 330, method: 'POST'};

function Node({x, y, method}: NodeSpec) {
  const badgeWidth = method === 'PATCH' ? 46 : 42;
  const badgeFill = method === 'PATCH' ? 'var(--hero-patch)' : 'var(--hero-post)';
  return (
    <g>
      <rect className={styles.node} x={x} y={y} width={W} height={H} rx={10} />
      <rect x={x + 13} y={y + 15} width={badgeWidth} height={19} rx={4} fill={badgeFill} />
      <text className={styles.badgeText} x={x + 13 + badgeWidth / 2} y={y + 15 + 13.5} textAnchor="middle">
        {method}
      </text>
      <line x1={x + 13} y1={y + 48} x2={x + W - 13} y2={y + 48} className={styles.line} opacity={0.4} />
      <line x1={x + 13} y1={y + 60} x2={x + W - 45} y2={y + 60} className={styles.line} opacity={0.25} />
    </g>
  );
}

/**
 * A generated illustration used as a full-bleed hero background, not a
 * screenshot — same visual language as the brand mark (rounded nodes, a
 * solid connection, a dashed mapping line with source/target dots) and
 * the app's own method-badge colors. Nodes sit in the two side columns
 * on purpose, clear of the center strip where the hero text renders on
 * top (see HomepageHeader in src/pages/index.tsx).
 */
export default function HeroIllustration(): ReactNode {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="heroGrid" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" className={styles.grid} />
          </pattern>
        </defs>
        <rect x={0} y={0} width={VIEWBOX_W} height={VIEWBOX_H} fill="url(#heroGrid)" />

        {/* Connections (order only), one per side column */}
        <path d={`M${A.x + 90},${A.y + H} L${B.x + 90},${B.y}`} className={styles.line} />
        <path d={`M${C.x + 90},${C.y + H} L${D.x + 90},${D.y}`} className={styles.line} />

        {/* Mappings (data pulled from an upstream response), sweeping toward
            each other. Both curves route through the same two control
            points on the vertical centerline (CENTER_X) — that's what
            makes them cross exactly in the middle rather than off-center. */}
        <path
          d={`M${A.x + W},${A.y + 38} C ${CENTER_X},${A.y + 38} ${CENTER_X},${D.y + 38} ${D.x},${D.y + 38}`}
          className={styles.mapLine}
        />
        <path
          d={`M${C.x},${C.y + 38} C ${CENTER_X},${C.y + 38} ${CENTER_X},${B.y + 38} ${B.x + W},${B.y + 38}`}
          className={styles.mapLine}
        />

        <circle cx={A.x + W} cy={A.y + 38} r={5} className={styles.dotSource} />
        <circle cx={D.x} cy={D.y + 38} r={5} className={styles.dotTarget} />
        <circle cx={C.x} cy={C.y + 38} r={5} className={styles.dotSource} />
        <circle cx={B.x + W} cy={B.y + 38} r={5} className={styles.dotTarget} />

        <Node {...A} />
        <Node {...C} />
        <Node {...B} />
        <Node {...D} />

        {/* A credential attached to the node that needs one — tucked into
            the gap above D, inside the visible frame, rather than hung
            off the node's outer edge where wide viewports crop it. */}
        <path d={`M${D.x + W - 30},${D.y} L${D.x + W - 30},${D.y - 60}`} className={styles.tether} />
        <g transform={`translate(${D.x + W - 30}, ${D.y - 85})`}>
          <path d="M -7 3 A 7 7 0 0 1 7 3" className={styles.keyShackle} />
          <rect x={-9} y={2} width={18} height={16} rx={3} className={styles.keyBody} />
        </g>
      </svg>
    </div>
  );
}
