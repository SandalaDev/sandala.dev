import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { Checkbox as CheckboxUi } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Error } from '../Error'
import { Width } from '../Width'

type CheckboxOption = {
  label: string
  value: string
  id?: string
}

export const CheckboxGroup: React.FC<{
  name: string
  label?: string
  options?: CheckboxOption[]
  includeNoneOption?: boolean
  noneLabel?: string
  defaultValue?: string[]
  errors: Partial<FieldErrorsImpl>
  register: UseFormRegister<FieldValues>
  required?: boolean
  width?: number | string
}> = ({
  name,
  label,
  options = [],
  includeNoneOption = true,
  noneLabel = 'None of the above',
  defaultValue = [],
  errors,
  register,
  required,
  width,
}) => {
  const { setValue, watch } = useFormContext()
  const selectedValues = watch(name) || defaultValue

  const noneValue = 'none'

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    let newValues: string[] = Array.isArray(selectedValues) ? [...selectedValues] : []

    if (optionValue === noneValue) {
      // If "None" is checked, clear all selections
      newValues = checked ? [noneValue] : []
    } else {
      if (checked) {
        // Remove "None" if it was selected, then add the new value
        newValues = newValues.filter((v) => v !== noneValue)
        if (!newValues.includes(optionValue)) {
          newValues.push(optionValue)
        }
      } else {
        // Remove the unchecked value
        newValues = newValues.filter((v) => v !== optionValue)
      }
    }

    setValue(name, newValues, { shouldValidate: true })
  }

  // Register the field for validation
  React.useEffect(() => {
    register(name, {
      required: required ? 'This field is required' : false,
      validate: (value) => {
        if (required && (!value || value.length === 0)) {
          return 'Please select at least one option'
        }
        return true
      },
    })
  }, [name, register, required])

  return (
    <Width width={width}>
      <div className="space-y-3">
        {label && (
          <Label className="text-base">
            {label}
            {required && (
              <span className="required text-red-500 ml-1">
                * <span className="sr-only">(required)</span>
              </span>
            )}
          </Label>
        )}

        <div className="space-y-2 pl-1">
          {/* Regular options */}
          {options.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <CheckboxUi
                id={`${name}-${option.value}`}
                checked={Array.isArray(selectedValues) && selectedValues.includes(option.value)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(option.value, checked as boolean)
                }
              />
              <Label htmlFor={`${name}-${option.value}`} className="font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}

          {/* None option with separator */}
          {includeNoneOption && options.length > 0 && (
            <>
              <div className="h-px bg-coral-bright opacity-30 my-3" />
              <div className="flex items-center gap-2">
                <CheckboxUi
                  id={`${name}-${noneValue}`}
                  checked={Array.isArray(selectedValues) && selectedValues.includes(noneValue)}
                  onCheckedChange={(checked) => handleCheckboxChange(noneValue, checked as boolean)}
                />
                <Label
                  htmlFor={`${name}-${noneValue}`}
                  className="font-normal cursor-pointer italic"
                >
                  {noneLabel}
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
