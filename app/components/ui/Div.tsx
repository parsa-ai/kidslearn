import { ButtonColors } from "@/app/lib/data/ButtonColors";
import { DivProps } from "@/app/lib/Types";

function Div({
  color = "blue",
  isActive = "deactive",
  className = "",
  children,
  ...rest
}: DivProps) {
  return (
    <div className={`rounded-full transition duration-400 outline ${ButtonColors[isActive][color]} ${className}`} {...rest}>{children}</div>
  )
}

export default Div