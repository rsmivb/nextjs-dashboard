interface FormFieldProps {
    label: string;
    type: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    options?: { label: string; value: string }[]; // For select dropdowns
    step?: string;
    required?: boolean;
  }

export default function FormField({
    label,
    type,
    name,
    value,
    onChange,
    options,
    step,
    required = false,
  }: FormFieldProps){
    return (
      <div>
        <label>
          {label}:
          {type === 'select' ? (
            <select name={name} value={value} onChange={onChange} required={required}>
              <option value="" disabled>
                Select {label}
              </option>
              {options?.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              step={step}
              required={required}
            />
          )}
        </label>
      </div>
    );
  };