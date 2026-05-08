import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from "@mui/material";
import LoginImage from "../../assets/Login-Image.svg";
import IPRULogo from "../../assets/ICICI-Logo.svg";
import AxiomLogo from "../../assets/Axiom Logo.svg";
import IBMLogo from "../../assets/IBM Logo.svg";
import { useState } from "react";
import CustomTextField from "../../component/ui/TextField/TextField";
import CustomCheckbox from "../../component/ui/Checkbox/Checkbox";
import CustomButton from "../../component/ui/Button/Button";
import { centerFlex, columnFlex } from "../../utils/styles";
import { EyeIcon, EyeSlashIcon } from "../../icons/Icons";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Left Section */}
      <Box sx={{ width: "50%", position: "relative" }}>
        <Box
          component="img"
          src={LoginImage}
          alt="Underwriter reviewing and filling out an insurance form"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: "8.33%",
            color: "#fff",
            px: 4,
          }}
        >
          <Typography
            sx={{
              fontSize: "36px",
              fontWeight: "bold",
            }}
          >
            Secure Underwriting Solutions
          </Typography>

          <Typography
            sx={{
              fontSize: "1.125rem",
              fontWeight: 500,
            }}
          >
            Streamline your insurance underwriting process with our
            comprehensive platform designed for efficiency and accuracy.
          </Typography>
        </Box>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          width: "50%",
          ...centerFlex,
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            px: 4,
            py: 2,
            gap: 2.5,
            ...columnFlex,
          }}
        >
          {/* Logo */}
          <Box>
            <Box
              component="img"
              src={IPRULogo}
              alt="ICICI Prudential Logo"
              sx={{ height: 40 }}
            />
          </Box>

          {/* Header */}
          <Box>
            <Box component="img" src={AxiomLogo} alt="Axiom Logo" />
            <Typography variant="body1" color="text.secondary">
              Log in to access your account
            </Typography>
          </Box>

          {/* Form */}
          <Box
            component="form"
            sx={{
              ...columnFlex,
              gap: 1,
            }}
          >
            {/* User ID */}
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                User ID
              </Typography>
              <CustomTextField fullWidth placeholder="enter your User ID" />
            </Box>

            {/* Password */}
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Password
              </Typography>
              <CustomTextField
                fullWidth
                placeholder="enter your Password"
                type={showPassword ? "text" : "password"}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePassword} edge="end">
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              color: "#161616",
                            }}
                          >
                            {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                          </Box>
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, fontSize: "11px" }}
              >
                It must be a combination of minimum 8 letters, numbers, and
                symbols.
              </Typography>
            </Box>

            {/* Remember + Forgot */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CustomCheckbox label="Remember me" />

              <Link href="#" underline="hover" variant="body2">
                Forgot Password?
              </Link>
            </Box>

            {/* Login Button */}
            <CustomButton
              fullWidth
              variant="contained"
              sx={{ borderRadius: "50px" }}
            >
              Log In
            </CustomButton>
          </Box>

          {/* Footer */}
          <Box sx={{ textAlign: "center" }}>
            <Divider sx={{ mb: 1 }} />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: "11px" }}
            >
              © 2026 ICICI Prudential Insurance,&nbsp;
              <Link href="#" underline="hover">
                Privacy Policy
              </Link>
              &nbsp; | &nbsp;
              <Link href="#" underline="hover">
                Terms and Conditions
              </Link>
            </Typography>
          </Box>
        </Box>

        {/* Bottom Branding */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="body2">Powered by</Typography>
          <Box component="img" src={IBMLogo} alt="IBM Logo" />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
