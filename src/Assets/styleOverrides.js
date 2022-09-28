const primaryBlueColor = '#0096B0';
const primaryGreenColor = '#4ecdc4';
const primaryBlackColor = '#2A2B2A';

const styleOverrides = {
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: primaryBlueColor,
          ":hover": {
            backgroundColor: primaryGreenColor
          }
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: primaryBlackColor
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: primaryBlueColor
          }
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: primaryBlueColor
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: primaryBlueColor,
          "&:hover": {
            color: primaryGreenColor
          }
        }
      }
    }
  }
};

export default styleOverrides;