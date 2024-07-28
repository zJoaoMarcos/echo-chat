import * as React from "react";

import { Input } from "./input";
import { Eye, EyeOff } from "lucide-react";

export interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="inline-flex gap-2 items-center">
        <Input type={showPassword ? "text" : "password"} {...props} ref={ref} />
        <span onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <Eye /> : <EyeOff />}
        </span>
      </div>
    );
  }
);
InputPassword.displayName = "InputPassword";

export { InputPassword };
