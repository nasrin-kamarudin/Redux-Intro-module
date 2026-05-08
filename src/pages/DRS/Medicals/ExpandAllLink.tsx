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
        mb: 2,
        pr: 1,
        margin: "10px 8px 0 auto",
      }}
    >
      <MuiLink
        onClick={() => (isAllExpanded ? onCollapseAll() : onExpandAll())}
        sx={{
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 600,
          color: "#063E6F",
          textDecoration: "underline",
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
