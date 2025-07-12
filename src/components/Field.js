import {
    Field as FormikField,
} from "formik"

import { TextField } from "@mui/material"

import { useWidgetParams } from "../utils"
import { NOTION_FONTS } from "../constants"

const Field = (props) => {
    const widgetParams = useWidgetParams(props)

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
                    fontFamily: widgetParams.fontType ? NOTION_FONTS[widgetParams.fontType] : "sans-serif",
                    padding: props.isView ? "0" : "0.375rem 0.75rem",
                    color: `#${widgetParams.fontColour}`,
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