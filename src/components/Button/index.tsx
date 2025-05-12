import type { PropsWithChildren } from "react";

const themes = {
  primary: "bg-primary text-secondary",
  secondary: "bg-secondary text-primary",
};

export default function Button({
  children,
  type = "button",
  classNames,
  theme = "primary",
  onClick,
}: PropsWithChildren<{
  type?: "submit" | "button" | "reset";
  classNames?: string;
  theme?: string;
  onClick?: () => void;
}>) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${classNames} ${themes[theme]} flex w-full cursor-pointer content-between items-center justify-center gap-2 rounded-md p-2.5 text-center font-bold`}
    >
      {children}
    </button>
  );
}
