import { ButtonColors } from "@/app/lib/data/ButtonColors";
import { ButtonProps } from "@/app/lib/Types";

function Button({
  color = "blue",
  isActive = "deactive",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={`rounded-full transition duration-400 cursor-pointer outline ${ButtonColors[isActive][color]} ${className}`} {...rest}>{children}</button>
  )
}

export default Button