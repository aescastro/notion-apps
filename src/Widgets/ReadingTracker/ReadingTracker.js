import { useEffect, useState } from "react";
import {
    ProgressBar,
} from "react-bootstrap";
import {
    Stack,
    FormGroup,
} from "@mui/material";
import {
    Formik,
    Form,
} from "formik";
import {
    object,
    string,
    number,
} from "yup";
import styled from "@emotion/styled";

import {
    useWidgetParams,
} from "../../utils";

import { Widget } from "../Widget";
import { Field } from "../../components"

const Button = styled.button(({color})=> ({
    borderRadius: "4px",
    border: `0.5px solid #${color}`,
    background: "#FFFFFF",
    color: `#${color}`,
    fontSize: "13px",
}));

const H6 = styled.h6(({ isView }) => ({
    marginBottom: isView ? "0px" : "0.5rem",
    fontWeight: "bold",
}));

const Span = styled.span(() => ({
    fontSize: "13.5px",
}));

const readingSchema = object({
    book: string().required("Required"),
    currentPage: number().typeError("Must be a number").min(0, "Must be greater or equal to 0").integer("Must be an integer").required("Required"),
    totalPages: number().typeError("Must be a number").positive("Must be positive").integer("Must be an integer").required("Required").when("currentPage", (currentPage, schema) => {
        return schema.test("totalPages", "Total pages cannot be less than current pages", (totalPages) => {
            return totalPages >= currentPage;
        });
    }),
});

const ReadingTracker = (props) => {
    const widgetParams = useWidgetParams(props)
    const [isView, setIsView] = useState(true);
    const [values, setValues] = useState(() => {
        const savedBook = localStorage.getItem("book");
        const savedCurrentPage = localStorage.getItem("currentPage");
        const savedTotalPages = localStorage.getItem("totalPages");

        const book = widgetParams.preview ? "Pride and Prejudice" : JSON.parse(savedBook);
        const currentPage = widgetParams.preview ? 123 : JSON.parse(savedCurrentPage);
        const totalPages = widgetParams.preview ? 364 : JSON.parse(savedTotalPages);

        return {
            book: book || "",
            currentPage: currentPage || 0,
            totalPages: totalPages || 0,
        }
    });
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        if (values.totalPages > 0) {
            setPercent(Math.round(values.currentPage / values.totalPages * 100));
        } else {
            setPercent(0);
        }

        if (!widgetParams.preview) {
            localStorage.setItem("book", JSON.stringify(values.book));
            localStorage.setItem("currentPage", JSON.stringify(values.currentPage));
            localStorage.setItem("totalPages", JSON.stringify(values.totalPages));
        }

    }, [values])

    return (
        <>
            <style type="text/css">
                {`
                    .progress-bar {
                        background-color: #${widgetParams.progressColour};
                        border: 0.5px solid #FFFFFF;
                        border-radius: 0.375rem;
                    }
                `}
            </style>
            <Widget {...widgetParams}>
                <Formik
                    initialValues={values}
                    onSubmit={(values) => {
                        setValues(values)
                    }
                    }
                    validationSchema={readingSchema}
                >
                    {
                        formik => (
                            <Form
                                style={{
                                    width: "100%",
                                }}
                            >
                                <Stack
                                    sx={{
                                        justifyContent: "center",
                                        padding: "0px 30px",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <Stack
                                        sx={{
                                            marginBottom: isView ? "1rem" : "1.5rem",
                                            gap: "7px"
                                        }}
                                    >
                                        <H6
                                            isView={isView}
                                        >
                                            Currently Reading
                                        </H6>
                                        <FormGroup>
                                            <Field
                                                name="book"
                                                error={!isView && formik.errors.book !== undefined}
                                                helperText={formik.errors.book}
                                                isView={isView}
                                                fontType={widgetParams.fontType}
                                                fontColour={widgetParams.fontColour}
                                            />
                                        </FormGroup>

                                    </Stack>

                                    <Stack
                                        direction="row"
                                        sx={{
                                            alignSelf: "start",
                                            width: "100%",
                                            gap: "9px",
                                        }}
                                    >
                                        <ProgressBar
                                            label={`${percent}%`}
                                            now={percent}
                                            style={{
                                                flexGrow: 1,
                                                backgroundColor: "#e9ecef",
                                            }}
                                        />
                                        <Button
                                            type="submit"
                                            disabled={!formik.isValid || widgetParams.preview}
                                            onClick={() => setIsView(!isView)}
                                            color={widgetParams.fontColour}
                                        >
                                            {isView ? "Edit" : "Save"}
                                        </Button>
                                    </Stack>

                                    {
                                        !isView &&
                                        <Stack
                                            direction="row"
                                            sx={{
                                                justifyContent: "center",
                                                gap: "5px",
                                                alignItems: "center",
                                                marginTop: "6px"
                                            }}
                                        >
                                            <Span>
                                                On page
                                            </Span>
                                            <FormGroup
                                                sx={{
                                                    position: "relative",
                                                    top: formik.errors.currentPage ? "11px" : "0",
                                                }}
                                            >
                                                <Field
                                                    name="currentPage"
                                                    isView={isView}
                                                    error={!isView && formik.errors.currentPage !== undefined}
                                                    helperText={formik.errors.currentPage}
                                                />
                                            </FormGroup>
                                            <Span>
                                                of
                                            </Span>
                                            <FormGroup
                                                sx={{
                                                    position: "relative",
                                                    top: formik.errors.totalPages ? "11px" : "0",
                                                }}>
                                                <Field
                                                    name="totalPages"
                                                    isView={isView}
                                                    error={!isView && formik.errors.totalPages !== undefined}
                                                    helperText={formik.errors.totalPages}
                                                />
                                            </FormGroup>
                                        </Stack>
                                    }

                                </Stack>
                            </Form>
                        )
                    }
                </Formik>
            </Widget>
        </>


    )
}

export { ReadingTracker };