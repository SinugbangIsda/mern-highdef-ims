import { FormInputProps } from "../../interfaces";

const FormInput = ({
    type,
    placeholder,
    label,
    value,
    name,
    required,
    ref,
    options,
    disabled,
    labelInputFlexRow,
    min,
    checked,
    onChange
}: FormInputProps) => {
  return (
    <div className = {`flex ${labelInputFlexRow ? "flex-row" : "flex-col"} gap-3 w-full h-full`}>
        { label && (
            <div className = "flex flex-row items-center gap-1.5">
                <span className = "text-[#485467] dark:text-inherit font-semibold">
                    { label }
                </span>
                { required && (
                    <span className = "text-[#E53E3F]">
                        *
                    </span>
                )}
            </div>
        )}
        { type !==  "select" && (
            <input 
                type = { type }
                placeholder = { placeholder }
                value = { type === "number" && isNaN(parseFloat(value)) ? 0 : value }
                min = { min }
                onChange = { onChange }
                required = { required }
                className = { type === "checkbox" ? "checkbox" : "w-full bg-white dark:bg-[#363D4C] rounded-lg focus:outline-0 border border-[#E9EBEA] dark:border-transparent focus:border-[#a4aca8] dark:focus:border-white input text-[#2D3039] dark:text-white"}
                name = { name }
                autoComplete = "new-off"
                ref = { ref}
                checked = { checked } 
                disabled = { disabled }
            />
        )}
        { type === "select" && (
            <select 
                value = { value }
                onChange = { onChange }
                required = { required }
                name = { name }
                placeholder = { placeholder }
                tabIndex = { -1 }
                color = "white"
                disabled = { disabled }
                className = "select select-bordered bg-white dark:bg-[#363D4C] rounded-lg focus:outline-0 border border-[#E9EBEA] dark:border-transparent focus:border-[#a4aca8] dark:focus:border-white input text-[#2D3039] dark:text-white"
            >
                <option 
                    value = ""
                    disabled
                    className = "text-[#A8ADB9] dark:text-[#A6ADBA]"
                >
                    Select Option
                </option>
                { options?.map((val, i) => (
                    <option 
                        key = { i }
                        value = { val }
                    >
                        { val }
                    </option>
            ))}
            </select>
        )}
    </div>
  )
}

export default FormInput;