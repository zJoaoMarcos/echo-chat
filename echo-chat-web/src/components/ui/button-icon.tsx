import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { LucideIcon } from "lucide-react";
import React from "react";

interface ButtonIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  asChild?: boolean
}

const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ className, asChild = false, ...props }, ref) => {
  const { icon: Icon } = props;

  const Comp = asChild ? Slot : "button"
  
  return (
    <Comp className={cn({ className })} ref={ref} {...props}>
      <Icon className="w-4 h-4" />
    </Comp>
  );
}
)

ButtonIcon.displayName = "ButtonIcon";

export { ButtonIcon };
