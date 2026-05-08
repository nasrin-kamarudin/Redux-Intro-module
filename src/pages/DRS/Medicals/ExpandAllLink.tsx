import { Box, Link as MuiLink } from "@mui/material";

interface ExpandAllLinkProps {
  onExpandAll: () => void;
  onCollapseAll: () => void;
  isAllExpanded: boolean;
}

/**
 * Expand All Link Component
 * Displays a toggle link to expand/collapse all accordions
 * Usage: <ExpandAllLink onExpandAll={handleExpandAll} onCollapseAll={handleCollapseAll} isAllExpanded={allExpanded} />
 */
const ExpandAllLink: React.FC<ExpandAllLinkProps> = ({
  onExpandAll,
  onCollapseAll,
  isAllExpanded,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        mt: 2, ml: 5, mr: 12, mb: 0, pr: 1,
        width: "100%",
      }}
    >
      <MuiLink
        onClick={() => (isAllExpanded ? onCollapseAll() : onExpandAll())}
        sx={{
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 600,
          color: "#063E6F",
          textDecoration: "none",
          whiteSpace: "nowrap",
          "&:hover": {
            textDecoration: "underline",
            color: "#004A80",
          },
        }}
      >
        {isAllExpanded ? "Collapse all" : "Expand all"}
      </MuiLink>
    </Box>
  );
};

export default ExpandAllLink;
