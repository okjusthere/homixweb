import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm text-sm font-medium tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-bronze px-6 py-3",
  outline:
    "border border-ink/80 text-ink hover:border-bronze hover:text-bronze px-6 py-3",
  ghost:
    "text-ink hover:text-bronze underline-offset-4 decoration-bronze/60 hover:underline px-0 py-0 gap-1.5",
};

type BaseProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type LinkProps = BaseProps & { href: string };

type BtnProps = BaseProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
};

export function Button(props: LinkProps | BtnProps) {
  const classes = cn(base, variants[props.variant ?? "primary"], props.className);

  if (props.href) {
    return (
      <Link href={props.href} className={classes}>
        {props.children}
      </Link>
    );
  }

  const { type = "button", onClick, disabled, children } = props as BtnProps;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
