import { useEffect, useState } from "react";
import { 
    Stack,
    FormControl,
    ProgressBar
} from "react-bootstrap";
import { 
    Formik,
    Form,
    Field
} from "formik";
import {
    object,
    string,
    number,
} from "yup";

import { Widget } from "./Widget";

const readingSchema = object({
    book: string(),
    currentPage: number().positive().integer().required("Required"),
    totalPages: number().positive().integer().required("Required").when("currentPage", (currentPage, schema) => {
        return schema.test("totalPages", "Total pages cannot be less than current pages", (totalPages) => {
            return totalPages >= currentPage;
        });        
    }),
});

const ReadingTracker = () => {
    const [isView, setIsView] = useState(true);
    const [values, setValues] = useState({
        book: "",
        currentPage: 0,
        totalPages: 0,
    });
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        if (values.totalPages > 0) {
            setPercent(Math.round(values.currentPage / values.totalPages * 100));
        } else {
            setPercent(0);
        }
    }, [values])

    return (
        <Widget>
            <Formik
                initialValues={values}
                onSubmit={(values) => setValues(values)}
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
                                gap={3}
                                style={{
                                    justifyContent: "center",
                                    padding: "30px 30px",
                                    boxSizing: "border-box",
                                }}
                            >
                                <div>
                                    <h5>Currently Reading</h5>
                                    <FormControl 
                                        plaintext={isView}
                                        readOnly={isView}
                                        name="book"
                                        as={Field}
                                    />    
                                </div>
                                
                                <Stack 
                                    direction="horizontal"
                                    style={{
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
                                        }}
                                    />
                                    <button type="submit" onClick={() => setIsView(!isView)}>{isView ? "Edit" : "Save"}</button>
                                </Stack>

                                {
                                    !isView &&
                                    <Stack
                                        direction="horizontal"
                                        style={{
                                            justifyContent: "center",
                                            gap: "5px",
                                            alignItems: "center"
                                        }}
                                    >
                                        <span>On page</span>
                                        <FormControl
                                            plaintext={isView}
                                            readOnly={isView}
                                            name="currentPage"
                                            as={Field}
                                            isInvalid={formik.errors.currentPage && formik.touched.currentPage}
                                            size="sm"
                                            style={{
                                                width: "5em",
                                            }}
                                        />
                                        <span>of</span>
                                        <FormControl
                                            plaintext={isView}
                                            readOnly={isView}
                                            name="totalPages"
                                            isInvalid={formik.errors.totalPages && formik.touched.totalPages}
                                            as={Field}
                                            size="sm"
                                            style={{
                                                width: "5em",
                                            }}
                                        />
                                    </Stack>
                                } 
                                
                            </Stack>      
                        </Form>  
                    )
                }
                
                  
            </Formik>
        </Widget>
        
    )
}

export default ReadingTracker;