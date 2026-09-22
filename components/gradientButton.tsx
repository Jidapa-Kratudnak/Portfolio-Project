"use client";

import { Button } from "antd";
import type { ButtonProps } from "antd";
import { useState } from "react";

interface GradientButtonProps extends ButtonProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  fontSize?: number | string;
}

export default function GradientButton({
  children,
  width = 200,
  height = 50,
  fontSize = 16,
  ...props
}: GradientButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Button
      type="primary"
      {...props}
      shape="round"
      onMouseEnter={(event) => {
        setHovered(true);
        props.onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setHovered(false);
        props.onMouseLeave?.(event);
      }}
      style={{
        border: "none",
        background: hovered
          ? "#734e30"
          : "linear-gradient(135deg, #734e30, #464831)",
        width,
        height,
        fontSize,
        ...props.style,
      }}
    >
      {children}
    </Button>
  );
}