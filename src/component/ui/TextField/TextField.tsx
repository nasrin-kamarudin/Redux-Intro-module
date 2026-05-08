import { TextField, type TextFieldProps } from "@mui/material";

const inputStyles: TextFieldProps["sx"] = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontStyle: "italic",

    "&:hover fieldset": {
      borderColor: "#9A2529",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#9A2529",
    },
  },
};

type CustomTextFieldProps = TextFieldProps;

const CustomTextField = ({
  sx,
  size = "small",
  variant = "outlined",
  ...props
}: CustomTextFieldProps) => {
  return (
    <TextField
      size={size}
      variant={variant}
      sx={{
        ...inputStyles,
        ...sx,
      }}
      {...props}
    />
  );
};

export default CustomTextField;