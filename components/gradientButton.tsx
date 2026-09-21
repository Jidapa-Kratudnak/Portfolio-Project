"use client";

import { Button } from "antd";
import type { ButtonProps } from "antd";
import { useState } from "react";

interface GradientButtonProps extends ButtonProps {
  children: React.ReactNode;
  width?: number | 200;
  height?: number | 50;
  fontSize?: number | 16;
}

export default function GradientButton({
  children,
  ...props
}: GradientButtonProps) {
  const [hovered, setHovered] = useState(false);
  const { width, height, fontSize } = props;

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
          width: width,
          height: height,
          fontSize: fontSize,
        ...props.style,
      }}
    >
      {children}
    </Button>
  );
}