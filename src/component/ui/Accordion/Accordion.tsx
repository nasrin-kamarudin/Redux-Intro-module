import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import { KeyDownArrowIcon, KeyUpArrowIcon } from "../../../icons/Icons";

type CustomAccordionProps = {
  title: string;
  children: React.ReactNode;
  chip?: React.ReactNode;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onChange?: (expanded: boolean) => void;
};

export default function CustomAccordion({
  title,
  children,
  chip,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onChange,
}: CustomAccordionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const isControlled = controlledExpanded !== undefined;
  const displayExpanded = isControlled ? controlledExpanded : expanded;

  return (
    <Accordion
      expanded={displayExpanded}
      onChange={() => {
        const newExpanded = !displayExpanded;
        if (!isControlled) {
          setExpanded(newExpanded);
        }
        onChange?.(newExpanded);
      }}
      sx={{
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        backgroundColor: "#FFFFFF",
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary
        sx={{
          borderBottom: "1px solid #E6E6E6",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: 700, flex: 1 }}>
          {title} {chip}
        </Typography>

        <Box
          sx={{
            width: 20,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#161616",
            mt: 0.5,
          }}
        >
          {displayExpanded ? (
            <KeyUpArrowIcon width={20} height={20} />
          ) : (
            <KeyDownArrowIcon width={20} height={20} />
          )}
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Box>{children}</Box>
      </AccordionDetails>
    </Accordion>
  );
}
