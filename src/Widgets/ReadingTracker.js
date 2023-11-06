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

import { Widget } from "./Widget";

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
            >
                <Form
                    style={{
                        width: "100%",
                    }}
                >
                    <Stack 
                        gap={3}
                        style={{
                            justifyContent: "center",
                            padding: "30px 19px",
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
                            <button onClick={() => setIsView(!isView)}>{isView ? "Edit" : "Save"}</button>
                        </Stack>

                        {
                            !isView &&
                            <Stack
                                direction="horizontal"
                                alignItems="center"
                                style={{
                                    justifyContent: "center",
                                    gap: "5px",
                                }}
                            >
                                <span>On page</span>
                                <FormControl
                                    plaintext={isView}
                                    readOnly={isView}
                                    name="currentPage"
                                    as={Field}
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
                  
            </Formik>
        </Widget>
        
    )
}

export default ReadingTracker;