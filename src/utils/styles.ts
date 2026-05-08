export const columnFlex = {
  display: "flex",
  flexDirection: "column",
};

export const centerFlex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const selectedSx = {
  borderLeft: "4px solid #9A2529",
  borderColor: "error.dark",
  borderRadius: 1,
  background: "linear-gradient(to right, rgba(154,37,41,0.10), transparent)",
  transition: "background 0.2s ease",
};

export const hoverSx = {
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f3f4f6",
  },
};
