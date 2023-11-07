
export const Widget = (props) => {
    return (
        <div 
            id="widget"
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "15px",
            }}
        >
            {props.children}
        </div>
    )
}