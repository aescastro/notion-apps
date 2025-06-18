import { useState, } from "react"
import { ChromePicker } from "react-color"
import { Box, Button, Popover } from "@mui/material";

export default function ColorPicker(props) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [color, setColor] = useState(props.value);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "4px",
        boxShadow: "none",
        borderWidth: "1px",
        borderColor: "#EDF2F7",
        borderStyle: "solid",
        height: "40px",
        fontSize: "0.875rem",
        width: "calc(296px + 0.5rem)",
      }}
    >
      <Button
        onClick={handleClick}
        sx={{
          color: "#000000",
          justifyContent: "left",
          width: "100%",
        }}
      >
        {color}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <ChromePicker
          color={color}
          onChange={(c) => {
            setColor(c.hex);
            props.setFieldValue(props.name, c.hex.substring(1))
          }}
        />
      </Popover>

    </Box>

  );
}
