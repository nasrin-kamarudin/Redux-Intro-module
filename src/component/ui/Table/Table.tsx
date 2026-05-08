import {
  Paper,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export type Column<T> = {
  key: keyof T;
  header: string;
  width?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type CustomTableProps<T> = {
  title?: string;
  columns: Column<T>[];
  data: T[];
};

export default function CustomTable<T extends Record<string, unknown>>({
  title,
  columns,
  data,
}: CustomTableProps<T>) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #D8D8D8",
        borderRadius: "14px",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      {title && (
        <Box
          sx={{
            backgroundColor: "#004A80",
            color: "#FFFFFF",
            px: 3,
            py: 1.2,
          }}
        >
          <Typography sx={{fontSize: "15px", fontWeight: 700 }}>
            {title}
          </Typography>
        </Box>
      )}

      {/* TABLE */}
      <TableContainer>
        <Table
          size="small"
          sx={{
            width: "100%",

            "& th": {
              backgroundColor: "#D2D7DD",
              color: "#4A4A4A",
              fontSize: "14px",
              fontWeight: 600,
              py: 1,
              px: 2,
              borderBottom: "1px solid #D6D6D6",
            },

            "& td": {
              color: "#4A4A4A",
              fontSize: "15px",
              py: 1.1,
              px: 2,
              borderBottom: "1px solid #E1E1E1",
            },

            "& tr:last-child td": {
              borderBottom: "none",
            },
          }}
        >
          {/* HEAD */}
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={String(col.key)} sx={{ width: col.width }}>
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* BODY */}
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => {
                  const value = row[col.key];

                  return (
                    <TableCell key={String(col.key)}>
                      {col.render
                        ? col.render(value, row)
                        : (value as React.ReactNode)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}