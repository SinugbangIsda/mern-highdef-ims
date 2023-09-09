import { ScaleLoader } from "react-spinners";
import { ButtonProps } from "../../interfaces";

const Button = ({ 
    label,
    type,
    isLoading,
    disabled,
    className,
    defaultBG,
    deleteBG,
    updateBG,
    onClick
}: ButtonProps) => {
    const primary = "bg-[#3887FE] text-white disabled:bg-[#838d97] hover:bg-[#3887febe]";
    const Delete = "bg-[#F44544] hover:bg-[#f44b45af] text-white";
    const update = "bg-[#8338EA] hover:bg-[#8238eab7] text-white disabled:bg-[#838d97]";
  return (
    <button
        type = { type }
        onClick  = { onClick }
        disabled =  { isLoading || disabled }
        className = { `w-full btn rounded-lg border-0 ${defaultBG ? primary : " "} ${deleteBG ? Delete : " "} ${updateBG  ? update : ""} ${className}` }
        tabIndex = { -1 }
    >
        { !isLoading || !disabled ?
            <span>
                { label }
            </span>
        :
            <span className = "h-full w-full flex flex-col justify-center items-center">
                <ScaleLoader 
                    color = "white"
                    loading = { isLoading }
                    height = { 20 }
                />
            </span>
        }
    </button>
  )
}

export default Button;