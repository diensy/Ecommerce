import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) => {
  function renderInputsByComponentType(getControlItems) {
    let element = null;
    const value = formData[getControlItems.name] || "";

    switch (getControlItems.componentType) {
      case "input":
        element = (
          <Input
            value={value}
            name={getControlItems.name}
            placeholder={getControlItems.placeholder}
            id={getControlItems.name}
            type={getControlItems.type}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItems.name]: event.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItems.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItems.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItems.options && getControlItems.options.length > 0
                ? getControlItems.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={getControlItems.name}
            placeholder={getControlItems.placeholder}
            id={getControlItems.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItems.name]: event.target.value,
              })
            }
          />
        );
        break;
      default:
        element = (
          <Input
            value={value}
            name={getControlItems.name}
            placeholder={getControlItems.placeholder}
            id={getControlItems.name}
            type={getControlItems.type}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItems.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-3">
            {formControls.map((controlItems) => (
              <div className="grid w-full gap-1.5" key={controlItems.name}>
                <Label className="mb-1">{controlItems.label}</Label>
                {renderInputsByComponentType(controlItems)}
              </div>
            ))}
          </div>
          <Button
            disabled={isBtnDisabled}
            className="mt-2 w-full"
            type="submit"
          >
            {buttonText || "submit"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default CommonForm;
