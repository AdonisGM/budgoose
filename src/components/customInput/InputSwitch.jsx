import {useController} from "react-hook-form";
import {Switch} from "@nextui-org/react";

const InputSwitch = (props) => {
    const {
        field,
        fieldState: { invalid, isTouched, isDirty , error},
        formState: { touchedFields, dirtyFields }
    } = useController({
        name: props.name,
        control: props.control,
        rules: props.rules,
    });

    return (
        <Switch
            isSelected={field.value}
            isDisabled={props.isDisabled}

            onValueChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            ref={field.ref}

            size={'sm'}
        >
            {props.label}
        </Switch>
    )
}

export default InputSwitch;