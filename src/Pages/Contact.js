import { useState } from "react";
import axios from "axios";

import {
    Stack,
    useMediaQuery,
    TextField,
    Box,
} from "@mui/material";

import {
    Formik,
    Field,
    Form,
} from "formik";

import * as Yup from "yup";

import styled from "@emotion/styled";

import { ReactComponent as CIcon } from "../assets/icons/check-circle.svg"

import {
    Header,
    MobileHeader,
    Button,
} from "../components";

import { theme, MAIN_BACKGROUND_COLOUR, DARK_GREEN } from "../constants";

const StyledForm = styled(Form)(() => ({
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    padding: "50px 40px",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    gap: "26px",
    height: "430px",
}));

const CheckIcon = styled(CIcon)(() => ({
    width: "81px",
    height: "81px",
    fill: DARK_GREEN,
}));

const validationSchema = Yup.object({
    name: Yup.string().max(30, "Must be 30 characters or less"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    message: Yup.string().required("Message is required"),
});


const Contact = () => {
    const isDesktopWidth = useMediaQuery(theme.breakpoints.up('md'));
    const initialValues = {
        name: "",
        email: "",
        message: "",
    }
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = (values) => {
        axios.post('https://formcarry.com/s/e8DlRsPsYTL', values)
            .then(response => {
                console.log(response);
                if (response.data.code === 200) {
                    setSubmitSuccess(true);
                    console.log("success");
                } else {
                    setSubmitSuccess(false);
                    setError(response.message ? response.message : response);
                }
            })
            .catch(error => {
                // request related error.
                setError(error.message ? error.message : error);
            });
    }

    return (

        <Stack
            width="100%"
            height="max-content"
            sx={{
                backgroundColor: MAIN_BACKGROUND_COLOUR,
                overflow: isDesktopWidth ? "visible" : "hidden",
            }}
        >
            {
                isDesktopWidth ? <Header /> : <MobileHeader />
            }
            <Stack
                sx={{
                    padding: "60px 75px",
                    gap: "15px",
                    flexGrow: 1,
                }}
            >
                <h1>
                    Let's Talk
                </h1>
                <p
                    sx={{
                        fontSize: "20px"
                    }}
                >
                    Would you like to contact me for reasons unrelated to this website?  Connect with me on LinkedIn <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/aescastro/">here</a>.
                </p>

                <h1>
                    Website Feedback
                </h1>
                <p>
                    Do you have feedback regarding this website? Feel free to fill out this form with your thoughts. I would love to know of any potential design improvements or bugs that you find.
                </p>

                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {
                        formik => (
                            <StyledForm
                                onSubmit={formik.handleSubmit}
                            >
                                {
                                    submitSuccess ?
                                        <Stack
                                            sx={{
                                                alignItems: "center",
                                                gap: "20px",
                                                padding: "50px 40px",
                                                textAlign: "center",
                                            }}
                                        >
                                            <CheckIcon/>
                                            <h1>
                                                Thanks for your feedback!
                                            </h1>
                                        </Stack>
                                        :
                                        <>
                                            <Field
                                                as={TextField}
                                                name="name"
                                                label="Name"
                                                error={formik.touched.name && formik.errors.name != undefined}
                                                helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                                            />

                                            <Field
                                                as={TextField}
                                                name="email"
                                                label="Email *"
                                                error={formik.touched.email && formik.errors.email != undefined}
                                                helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                                            />

                                            <Field
                                                multiline
                                                rows={3}
                                                as={TextField}
                                                name="message"
                                                label="Message *"
                                                error={formik.touched.message && formik.errors.message != undefined}
                                                helperText={formik.touched.message && formik.errors.message ? formik.errors.message : ""}
                                            />

                                            <Box
                                                sx={{
                                                    marginLeft: "auto",
                                                }}
                                            >
                                                <Button type="submit">Submit</Button>
                                            </Box>
                                        </>


                                }


                            </StyledForm>
                        )
                    }

                </Formik>
            </Stack>
        </Stack>
    );
}

export default Contact;