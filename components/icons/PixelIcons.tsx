const INK = '#000000'
const FACE = '#c0c0c0'
const SCREEN = '#0000aa'
const TEAL = '#008080'
const YELLOW = '#ffcc00'
const WHITE = '#ffffff'
const RED = '#aa0000'
const LINE = '#7a7a7a'

type Rect = [number, number, number, number, string]

interface IconProps {
  size?: number
  className?: string
}

function Glyph({ rects, size = 32, className }: { rects: Rect[] } & IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {rects.map(([x, y, w, h, fill], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={fill} />
      ))}
    </svg>
  )
}

export function IconComputer({ size, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      rects={[
        [1, 1, 13, 9, INK],
        [2, 2, 11, 7, FACE],
        [3, 3, 9, 5, SCREEN],
        [7, 10, 2, 2, INK],
        [4, 12, 8, 2, INK],
        [5, 12, 6, 1, FACE],
      ]}
    />
  )
}

export function IconFolder({ size, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      rects={[
        [1, 4, 6, 2, INK],
        [2, 5, 4, 1, YELLOW],
        [1, 6, 14, 9, INK],
        [2, 7, 12, 7, YELLOW],
      ]}
    />
  )
}

export function IconMail({ size, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      rects={[
        [1, 3, 14, 10, INK],
        [2, 4, 12, 8, WHITE],
        [2, 4, 2, 1, LINE],
        [4, 5, 2, 1, LINE],
        [6, 6, 2, 1, LINE],
        [8, 6, 2, 1, LINE],
        [10, 5, 2, 1, LINE],
        [12, 4, 2, 1, LINE],
      ]}
    />
  )
}

function driveRects(accent: string): Rect[] {
  return [
    [1, 1, 14, 14, INK],
    [2, 2, 12, 12, FACE],
    [3, 3, 10, 4, accent],
    [3, 9, 10, 1, INK],
    [3, 11, 4, 2, FACE],
  ]
}

export function IconDriveC({ size, className }: IconProps) {
  return <Glyph size={size} className={className} rects={driveRects(SCREEN)} />
}

export function IconDriveD({ size, className }: IconProps) {
  return <Glyph size={size} className={className} rects={driveRects(TEAL)} />
}

export function IconNotepad({ size, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      rects={[
        [2, 1, 11, 14, INK],
        [3, 2, 9, 12, WHITE],
        [4, 4, 7, 1, LINE],
        [4, 6, 7, 1, LINE],
        [4, 8, 7, 1, LINE],
        [4, 10, 7, 1, LINE],
        [10, 1, 3, 3, FACE],
      ]}
    />
  )
}

export function IconFileExe({ size, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      rects={[
        [2, 1, 11, 14, INK],
        [3, 2, 9, 12, WHITE],
        [10, 1, 3, 3, FACE],
        [5, 9, 6, 4, SCREEN],
      ]}
    />
  )
}

export function IconFileDll({ size, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      rects={[
        [2, 1, 11, 14, INK],
        [3, 2, 9, 12, WHITE],
        [10, 1, 3, 3, FACE],
        [5, 9, 6, 4, TEAL],
      ]}
    />
  )
}

export function IconErrorBadge({ size, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      rects={[
        [2, 2, 12, 12, RED],
        [1, 4, 14, 8, RED],
        [4, 1, 8, 14, RED],
        [4, 4, 2, 2, WHITE],
        [6, 6, 2, 2, WHITE],
        [8, 8, 2, 2, WHITE],
        [10, 10, 2, 2, WHITE],
        [10, 4, 2, 2, WHITE],
        [8, 6, 2, 2, WHITE],
        [6, 8, 2, 2, WHITE],
        [4, 10, 2, 2, WHITE],
      ]}
    />
  )
}

export function IconTelegram({ size, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      rects={[
        [1, 7, 2, 2, SCREEN],
        [3, 6, 2, 2, SCREEN],
        [5, 5, 2, 2, SCREEN],
        [7, 4, 2, 2, SCREEN],
        [9, 3, 6, 2, SCREEN],
        [3, 8, 2, 2, SCREEN],
        [5, 9, 2, 2, SCREEN],
        [7, 10, 2, 2, SCREEN],
        [9, 11, 2, 2, SCREEN],
        [5, 7, 4, 2, FACE],
      ]}
    />
  )
}

export function IconGithub({ size, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      rects={[
        [4, 2, 2, 2, INK],
        [10, 2, 2, 2, INK],
        [3, 4, 10, 8, INK],
        [5, 7, 1, 1, WHITE],
        [10, 7, 1, 1, WHITE],
        [2, 12, 2, 2, INK],
        [12, 12, 2, 2, INK],
      ]}
    />
  )
}
