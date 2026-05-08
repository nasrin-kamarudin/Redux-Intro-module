import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { DangerIcon } from "../../../icons/Icons";

type BadgeVariant = "Low" | "Medium" | "High" | "Neutral";

interface WarningBadgeIconProps {
  count: number;
  variant?: BadgeVariant;
  size?: "small" | "medium";
}

const variantStyles: Record<BadgeVariant, SxProps<Theme>> = {
  Low: {
    backgroundColor: "#E7F7ED",
    color: "#218311",
  },
  Medium: {
    backgroundColor: "#FFF4DB",
    color: "#EA7617",
  },
  High: {
    backgroundColor: "#FDE8E8",
    color: "#9A2529",
  },
  Neutral: {
    backgroundColor: "#FFFFFF",
    color: "#063E6F",
    border: "1px solid #C6C6C6",
  },
};

const sizeStyles = {
  small: {
    padding: "4px 8px",
    fontSize: "12px",
  },
  medium: {
    padding: "6px 12px",
    fontSize: "14px",
  },
};

/**
 * Warning Badge Icon Component
 * Displays a danger icon with count using Badge styling
 * Usage: <WarningBadgeIcon count={3} variant="Medium" />
 */
const WarningBadgeIcon: React.FC<WarningBadgeIconProps> = ({
  count,
  variant = "Medium",
  size = "medium",
}) => {
  const badgeStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        ...badgeStyle,
        ...sizeStyle,
        borderRadius: "16px",
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      <DangerIcon sx={{ width: 16, height: 16 }} />
      <span>{count}</span>
    </Box>
  );
};

export default WarningBadgeIcon;

/**
 * USAGE EXAMPLES:
 *
 * 1. Basic usage with default styling:
 * <WarningBadgeIcon count={3} />
 *
 * 2. With different variants:
 * <WarningBadgeIcon count={1} variant="Low" />
 * <WarningBadgeIcon count={3} variant="Medium" />
 * <WarningBadgeIcon count={5} variant="High" />
 *
 * 3. With different sizes:
 * <WarningBadgeIcon count={3} size="small" />
 * <WarningBadgeIcon count={3} size="medium" />
 *
 * 4. In your CustomAccordion:
 * <CustomAccordion
 *   title="Lipid Profile"
 *   chip={abnormalCount > 0 ? <WarningBadgeIcon count={abnormalCount} variant="Medium" /> : null}
 *   sx={{ padding: 0 }}
 * >
 *   {children}
 * </CustomAccordion>
 */
