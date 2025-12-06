// src/fields/CheckboxGroup/index.tsx
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { Checkbox as CheckboxUi } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Error } from '../../blocks/Form/Error'
import { Width } from '../../blocks/Form/Width'

type CheckboxOption = {
  label: string
  value: string
}

export const CheckboxGroup: React.FC<{
  name: string
  label?: string
  options: CheckboxOption[]
  noneOption?: CheckboxOption // e.g., { label: 'None', value: 'none' }
  defaultValue?: string[]
  errors: Partial<FieldErrorsImpl>
  register: UseFormRegister<FieldValues>
  required?: boolean
  width?: number | string
}> = ({
  name,
  label,
  options,
  noneOption = { label: 'None', value: 'none' },
  defaultValue = [],
  errors,
  register,
  required,
  width,
}) => {
  const { setValue, watch } = useFormContext()
  const selectedValues = watch(name) || defaultValue

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    let newValues: string[] = [...selectedValues]

    if (optionValue === noneOption.value) {
      // If "None" is checked, clear all selections
      newValues = checked ? [noneOption.value] : []
    } else {
      if (checked) {
        // Remove "None" if it was selected, then add the new value
        newValues = newValues.filter((v) => v !== noneOption.value)
        newValues.push(optionValue)
      } else {
        // Remove the unchecked value
        newValues = newValues.filter((v) => v !== optionValue)
      }
    }

    setValue(name, newValues, { shouldValidate: true })
  }

  // Register the field for validation
  React.useEffect(() => {
    register(name, { required })
  }, [name, register, required])

  return (
    <Width width={width}>
      <div className="space-y-3">
        {label && (
          <Label>
            {required && (
              <span className="required">
                * <span className="sr-only">(required)</span>
              </span>
            )}
            {label}
          </Label>
        )}

        <div className="space-y-2">
          {/* Regular options */}
          {options.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <CheckboxUi
                id={`${name}-${option.value}`}
                checked={selectedValues.includes(option.value)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(option.value, checked as boolean)
                }
              />
              <Label htmlFor={`${name}-${option.value}`} className="font-normal">
                {option.label}
              </Label>
            </div>
          ))}

          {/* None option */}
          {noneOption && (
            <>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex items-center gap-2">
                <CheckboxUi
                  id={`${name}-${noneOption.value}`}
                  checked={selectedValues.includes(noneOption.value)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(noneOption.value, checked as boolean)
                  }
                />
                <Label htmlFor={`${name}-${noneOption.value}`} className="font-normal">
                  {noneOption.label}
                </Label>
              </div>
            </>
          )}
        </div>

        {errors[name] && <Error name={name} />}
      </div>
    </Width>
  )
}
