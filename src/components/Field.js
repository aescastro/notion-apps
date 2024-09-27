import {
    Field as FormikField,
} from "formik"

import { TextField } from "@mui/material"

import { useDarkLightSwitcher, useQuery } from "../utils"

const Field = (props) => {
    const isDarkMode = useDarkLightSwitcher()
    const query = useQuery();

    return (
        <FormikField
            name={props.name}
            as={TextField}
            error={props.error}
            helperText={props.helperText}
            InputProps={{
                readOnly: props.isView,
            }}
            inputProps={{
                sx: {
                    fontFamily: query.has("fontType") ? query.get("fontType") : "sans-serif",
                    padding: props.isView ? "0" : "0.375rem 0.75rem",
                    color: (isDarkMode) ? "#ffffff" : "#000000",
                }
            }}
            sx={{
                "& fieldset": { 
                    border: props.isView ? 'none' : '1px solid #dee2e6',
                },
            }}
        />
    );
}

export default Field;