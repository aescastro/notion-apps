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

import { 
    useDarkLightSwitcher ,
    useQuery
} from "../../utils";

import { Widget } from "../Widget";

const readingSchema = object({
    book: string(),
    currentPage: number().min(0).integer("Must be an integer").required("Required"),
    totalPages: number().positive().integer("Must be an integer").required("Required").when("currentPage", (currentPage, schema) => {
        return schema.test("totalPages", "Total pages cannot be less than current pages", (totalPages) => {
            return totalPages >= currentPage;
        });        
    }),
});

const ReadingTracker = () => {
    const [isView, setIsView] = useState(true);
    const [values, setValues] = useState(() => {
        const savedBook = localStorage.getItem("book");
        const savedCurrentPage = localStorage.getItem("currentPage");
        const savedTotalPages = localStorage.getItem("totalPages");
        
        const book = JSON.parse(savedBook);
        const currentPage = JSON.parse(savedCurrentPage);
        const totalPages = JSON.parse(savedTotalPages);

        return {
            book: book || "",
            currentPage: currentPage || 0,
            totalPages: totalPages || 0,
        }
    });
    const [percent, setPercent] = useState(0);
    const isDarkMode = useDarkLightSwitcher()
    var query = useQuery()

    useEffect(() => {
        if (values.totalPages > 0) {
            setPercent(Math.round(values.currentPage / values.totalPages * 100));
        } else {
            setPercent(0);
        }

        localStorage.setItem("book", JSON.stringify(values.book));
        localStorage.setItem("currentPage", JSON.stringify(values.currentPage));
        localStorage.setItem("totalPages", JSON.stringify(values.totalPages));
    }, [values])

    return (
        <>
            <style type="text/css">
                {`
                    .progress-bar {
                        background-color: ${query.get("progressColour") || "#000000"}
                    }
                `}
            </style>
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
                                    style={{
                                        justifyContent: "center",
                                        padding: "0px 30px",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <div
                                        style={{
                                            marginBottom: isView ? "1rem" : "1.5rem"
                                        }}
                                    >
                                        <h6
                                            style={{
                                                color: isDarkMode ? "#ffffff" : "#000000",
                                                marginBottom: isView ? "0px" : "0.5rem",
                                                fontWeight: "bold",
                                            }}
                                        >   
                                            Currently Reading
                                        </h6>
                                        <FormControl 
                                            plaintext={isView}
                                            readOnly={isView}
                                            name="book"
                                            as={Field}
                                            style={{
                                                color: (isDarkMode && isView) ? "#ffffff" : "#000000",                                           
                                            }}
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
                                                backgroundColor: "#e9ecef",
                                            }}
                                        />
                                        <button 
                                            type="submit" 
                                            disabled={!formik.isValid} 
                                            onClick={() => setIsView(!isView)}
                                            style={{
                                                borderRadius: "4px",
                                                border: "0.5px solid #000",
                                                background: "#FFFFFF",
                                                color: "#000000",
                                                fontSize: "13px",
                                            }}
                                        >
                                            {isView ? "Edit" : "Save"}
                                        </button>
                                    </Stack>

                                    {
                                        !isView &&
                                            <Stack
                                                direction="horizontal"
                                                style={{
                                                    justifyContent: "center",
                                                    gap: "5px",
                                                    alignItems: "center",
                                                    marginTop: "6px"
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontSize: "13.5px",
                                                        color: isDarkMode ? "#ffffff" : "#000000",
                                                    }}
                                                >
                                                    On page
                                                </span>
                                                <FormControl
                                                    plaintext={isView}
                                                    readOnly={isView}
                                                    name="currentPage"
                                                    as={Field}
                                                    isInvalid={formik.errors.currentPage && formik.touched.currentPage}
                                                    size="sm"
                                                    style={{
                                                        fontSize: "13.5px",
                                                        width: "5em",
                                                    }}
                                                />
                                                <span
                                                    style={{
                                                        fontSize: "13.5px",
                                                        color: isDarkMode ? "#ffffff" : "#000000",
                                                    }}  
                                                >
                                                    of
                                                </span>
                                                <FormControl
                                                    plaintext={isView}
                                                    readOnly={isView}
                                                    name="totalPages"
                                                    isInvalid={formik.errors.totalPages && formik.touched.totalPages}
                                                    as={Field}
                                                    size="sm"
                                                    style={{
                                                        fontSize: "13.5px",
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
        </>
        
        
    )
}

export {ReadingTracker};