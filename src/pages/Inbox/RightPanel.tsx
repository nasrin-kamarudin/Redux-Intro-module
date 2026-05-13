import {
  Alert,
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import type { Order, SortableFields, tableData } from "../../types/inbox.types";
import { centerFlex, columnFlex } from "../../utils/styles";
import { useMemo, useState } from "react";
import SearchBar from "../../component/ui/SearchBar/SearchBar";
import {
  FilterIcon,
  KeyLeftArrowIcon,
  KeyRightArrowIcon,
  SettingsIcon,
} from "../../icons/Icons";
import Badge from "../../component/ui/Badge/Badge";
import CustomButton from "../../component/ui/Button/Button";
import CustomDialog from "../../component/ui/Dialog/Dialog";
import CustomCheckbox from "../../component/ui/Checkbox/Checkbox";
import { mockWorkPoolsData } from "../../api/workPoolsMock";

const data = mockWorkPoolsData;

interface ColumnData {
  dataKey: keyof tableData;
  label: string;
  numeric?: boolean;
  width?: number;
}

const allColumns: ColumnData[] = [
  { dataKey: "applicationNo", label: "Application No." },
  { dataKey: "appliedSa", label: "Applied SA (₹)" },
  { dataKey: "annualPremium", label: "Annual Premium (₹)" },
  { dataKey: "poolTAT", label: "Pool TAT(Hrs)" },
  { dataKey: "dateAndTimeStamp", label: "Date/Time Stamp" },
  { dataKey: "drc", label: "DRC" },
  { dataKey: "hniFlag", label: "HNI Flag" },
  { dataKey: "ptlr", label: "PTLR" },
  { dataKey: "breDecision", label: "BRE Decision" },
  { dataKey: "channel", label: "Channel" },
  {
    dataKey: "munichReMedicalDecision",
    label: "Munich Re Medical Decision",
  },
  { dataKey: "roleType", label: "Role Type" },
  { dataKey: "productType", label: "Product Type" },
  { dataKey: "isMedical", label: "Medical/Non Medical" },
];

const poolRoleMap: Record<string, string | null> = {
  // "All Cases": null,
  "1st UW Pool": "1st UW",
  "Sr. UW Pool": "Sr. UW",
  "CMO Pool": "CMO UW",
};

const filterCategories = [
  "Product Type",
  "DRC",
  "HNI Flag",
  "Medical/Non-Medical",
];

const getDefaultColumns = () => {
  return [
    "Application No.",
    "Applied SA (₹)",
    "Annual Premium (₹)",
    "Pool TAT(Hrs)",
    "Date/Time Stamp",
    "DRC",
    "HNI Flag",
  ];
};

const RightPanel = ({ selectedPool }: { selectedPool: string }) => {
  const [rows] = useState<tableData[]>(data);
  const [error, setError] = useState<string>("");
  const [checked, setChecked] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [openFilterDialog, setOpenFilterDialog] = useState<boolean>(false);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState(
    "Medical/Non-Medical",
  );
  const [openTransferDialog, setOpenTransferDialog] = useState<boolean>(false);
  const [medicalFilterOptions, setMedicalFilterOptions] = useState<string[]>(
    [],
  );
  const [orderBy, setOrderBy] = useState<SortableFields>("appliedSa");
  const [order, setOrder] = useState<Order>("asc");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [right, setRight] = useState<string[]>(getDefaultColumns());
  const [left, setLeft] = useState<string[]>(
    allColumns
      .map((c) => c.label)
      .filter((label) => !getDefaultColumns().includes(label)),
  );

  const handleCloseTransfer = () => {
    setOpenTransferDialog(false);
  };

  const handleCloseFilter = () => {
    setOpenFilterDialog(false);
  };

  const handleClearMedicalFilter = () => {
    setMedicalFilterOptions([]);
  };

  const handleFilterCategorySelect = (category: string) => () => {
    setSelectedFilterCategory(category);
  };

  const handleMedicalOptionToggle = (option: string) => () => {
    setMedicalFilterOptions((prev) =>
      prev.includes(option)
        ? prev.filter((value) => value !== option)
        : [...prev, option],
    );
  };

  const handleSort = (field: SortableFields) => {
    const isAsc = orderBy === field && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const visibleColumns = allColumns.filter((c) => right.includes(c.label));

  const fixedHeaderContent = () => (
    <TableRow
      sx={{
        "&:hover": {
          backgroundColor: "#f5faff",
          cursor: "pointer",
        },
      }}
    >
      {visibleColumns.map((column) => {
        const isSortable =
          column.dataKey === "appliedSa" || column.dataKey === "annualPremium";

        return (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric ? "right" : "left"}
            sx={{
              backgroundColor: "#F5FAFF",
              px: 2,
              fontWeight: "bold",
              fontSize: "13px",
              width: column.width,
            }}
          >
            {isSortable ? (
              <TableSortLabel
                active={orderBy === column.dataKey}
                direction={orderBy === column.dataKey ? order : "asc"}
                onClick={() => handleSort(column.dataKey as SortableFields)}
              >
                {column.label}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );

  const filteredRows = useMemo(() => {
    let data = rows;

    // 1. Pool filter
    const role = poolRoleMap[selectedPool];
    if (role) {
      data = data.filter((row) => row.roleType === role);
    }

    // 2. Search filter (applicationNo)
    if (searchText.trim()) {
      data = data.filter((row) =>
        row.applicationNo.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    // 3. Medical / Non-Medical filter
    if (medicalFilterOptions.length > 0) {
      data = data.filter((row) => medicalFilterOptions.includes(row.isMedical));
    }

    // 4. Sorting
    if (orderBy) {
      data = [...data].sort((a, b) => {
        let aValue: number;
        let bValue: number;

        if (orderBy === "appliedSa") {
          // Remove commas and convert to number
          aValue = parseFloat(a.appliedSa.replace(/,/g, "")) || 0;
          bValue = parseFloat(b.appliedSa.replace(/,/g, "")) || 0;
        } else {
          // annualPremium
          aValue = a.annualPremium || 0;
          bValue = b.annualPremium || 0;
        }

        if (order === "asc") {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      });
    }

    return data;
  }, [rows, selectedPool, searchText, medicalFilterOptions, orderBy, order]);

  const handleChangeRowsPerPage = (
    event: SelectChangeEvent<number | string>,
  ) => {
    const value = Number(event.target.value);
    setRowsPerPage(value);
    setPage(0);
  };

  const rowContent = (_index: number, row: tableData) => (
    <>
      {visibleColumns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric ? "right" : "left"}
          sx={{ p: 1.5, pl: 2, fontSize: "13px" }}
        >
          {column.dataKey === "drc" ? (
            <Badge
              label={row.drc}
              variant={
                row.drc === "Medium"
                  ? "Medium"
                  : row.drc === "Low"
                    ? "Low"
                    : "High"
              }
            />
          ) : column.dataKey === "applicationNo" ? (
            <Typography
              sx={{
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "13px",
                color: "#0E3762",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {row.applicationNo}
            </Typography>
          ) : (
            row[column.dataKey]
          )}
        </TableCell>
      ))}
    </>
  );

  const totalCount = filteredRows.length;
  const totalPages =
    rowsPerPage > 0 ? Math.max(1, Math.ceil(totalCount / rowsPerPage)) : 1;
  const startRecord =
    totalCount === 0 ? 0 : rowsPerPage > 0 ? page * rowsPerPage + 1 : 1;
  const endRecord =
    rowsPerPage > 0
      ? Math.min(totalCount, (page + 1) * rowsPerPage)
      : totalCount;

  const paginatedRows =
    rowsPerPage > 0
      ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : filteredRows;

  const renderPageButtons = () => {
    const pages: Array<number | string> = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i += 1) pages.push(i);
    } else if (page <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages - 1, totalPages);
    } else if (page >= totalPages - 4) {
      pages.push(
        1,
        2,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      pages.push(1, 2, "...", page + 1, "...", totalPages - 1, totalPages);
    }

    return pages.map((item, index) =>
      typeof item === "number" ? (
        <CustomButton
          key={item}
          size="small"
          variant={item === page + 1 ? "outlined" : "text"}
          onClick={() => setPage(item - 1)}
          sx={{
            minWidth: 32,
            borderRadius: "134px",
            px: "10px",
            py: "6px",
            fontWeight: item === page + 1 ? 600 : 400,
            ...(item !== page + 1 && {
              color: "#444444",
            }),
          }}
        >
          {item}
        </CustomButton>
      ) : (
        <Typography
          key={`${item}-${index}`}
          sx={{ mx: 1, color: "text.secondary" }}
        >
          {item}
        </Typography>
      ),
    );
  };

  const handleToggle = (item: string) => () => {
    const currentIndex = checked.indexOf(item);
    const newChecked = [...checked];
    if (currentIndex === -1) newChecked.push(item);
    else newChecked.splice(currentIndex, 1);
    setChecked(newChecked);
    setError("");
  };

  const handleMoveRight = () => {
    const moved = left.filter((item) => checked.includes(item));
    if (moved.length + right.length > 7) {
      setError("Table can only display 7 columns at a time");
      return;
    }
    setRight(right.concat(moved));
    setLeft(left.filter((item) => !checked.includes(item)));
    setChecked(checked.filter((item) => !moved.includes(item)));
  };

  const handleMoveLeft = () => {
    const moved = right.filter((item) => checked.includes(item));
    setLeft(left.concat(moved));
    setRight(right.filter((item) => !checked.includes(item)));
    setChecked(checked.filter((item) => !moved.includes(item)));
    setError("");
  };

  const customList = (title: string, items: string[]) => (
    <Paper sx={{ width: 300, overflow: "auto" }}>
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1,
          borderBottom: "1px solid #e0e0e0",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="subtitle1">{title}</Typography>
      </Box>

      <List dense component="div" role="list">
        {items.map((item) => (
          <ListItem key={item} role="listitem" disablePadding>
            <Box sx={{ paddingX: 2 }}>
              <CustomCheckbox
                label={item}
                checked={checked.indexOf(item) !== -1}
                onChange={() => handleToggle(item)()}
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#F0F3F8",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "transparent",
          ...columnFlex,
          margin: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0.7,
            pl: 2,
            borderRadius: "20px 20px 0 0",
            backgroundColor: "#004A80",
            color: "#FFFFFF",
          }}
        >
          <Typography component="span" className="gap-1">
            {selectedPool ? selectedPool : "All Cases"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
            top: 8,
            right: 24,
            gap: 1,
            backgroundColor: "#fff",
          }}
        >
          <SearchBar onSearch={setSearchText} focusColor="#004A80"/>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => setOpenFilterDialog(true)}
            >
              <FilterIcon />
            </Box>
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => setOpenTransferDialog(true)}
            >
              <SettingsIcon />
            </Box>
          </Box>
        </Box>

        {/* Table */}
        <Paper sx={{ height: 435, width: "100%", ...columnFlex, borderRadius: "0 0 20px 20px"}}>
          {filteredRows.length === 0 ? (
            <Box
              sx={{
                height: 550,
                ...centerFlex,
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No Results Found
              </Typography>
            </Box>
          ) : (
            <>
              <TableContainer
                component={Paper}
                sx={{
                  flexGrow: 1,
                  overflowX: "hidden",
                }}
              >
                <Table sx={{ tableLayout: "auto" }} stickyHeader>
                  <TableHead sx={{ backgroundColor: "#E9EEF3" }}>
                    {fixedHeaderContent()}
                  </TableHead>

                  {/* Body */}
                  <TableBody>
                    {paginatedRows.map((row, index) => (
                      <TableRow
                        key={row.id}
                        hover
                        sx={{
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "#f5faff" },
                        }}
                      >
                        {rowContent(index, row)}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Footer Pagination */}
              <Box
                sx={{
                  borderTop: "1px solid #e0e0e0",
                  px: 2,
                  py: 1.5,
                  borderRadius: "0 0 20px"
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: 14, color: "#444444" }}>
                      Show
                    </Typography>
                    <Select
                      value={rowsPerPage}
                      size="small"
                      onChange={handleChangeRowsPerPage}
                      sx={{
                        minWidth: 80,
                        height: 34,
                        fontSize: 14,
                      }}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={25}>25</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                      <MenuItem value={100}>100</MenuItem>
                      <MenuItem value={-1}>All</MenuItem>
                    </Select>
                  </Box>

                  <Box sx={{ ...centerFlex, gap: 1, flexWrap: "wrap" }}>
                    <CustomButton
                      variant="text"
                      size="small"
                      onClick={() => setPage(Math.max(0, page - 1))}
                      disabled={page === 0}
                      sx={{ textTransform: "none", minWidth: 42 }}
                    >
                      <KeyLeftArrowIcon />
                      Previous
                    </CustomButton>

                    {renderPageButtons()}

                    <CustomButton
                      variant="text"
                      size="small"
                      onClick={() =>
                        setPage(Math.min(totalPages - 1, page + 1))
                      }
                      disabled={page >= totalPages - 1}
                      sx={{ textTransform: "none", minWidth: 42 }}
                    >
                      Next
                      <KeyRightArrowIcon />
                    </CustomButton>
                  </Box>

                  <Typography sx={{ fontSize: 14, color: "#444444" }}>
                    Showing {startRecord}-{endRecord} of {totalCount}
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Paper>

        {/* Transfer Dialog */}
        <CustomDialog
          open={openTransferDialog}
          onClose={handleCloseTransfer}
          title="Additional Fields"
          maxWidth="md"
          fullWidth
          titleSx={{ color: "#063E6F", fontWeight: 700 }}
          contentSx={{ p: 3 }}
          actionsSx={{
            justifyContent: "center",
            pb: 3,
          }}
          actions={
            <CustomButton
              variant="contained"
              onClick={handleCloseTransfer}
              sx={{
                width: "150px",
                borderRadius: "50px",
              }}
            >
              Apply
            </CustomButton>
          }
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Grid
            container
            spacing={2}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Grid>{customList("Available Options", left)}</Grid>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CustomButton
                sx={{ my: 1 }}
                variant="outlined"
                size="small"
                onClick={handleMoveRight}
                disabled={checked.filter((c) => left.includes(c)).length === 0}
              >
                <KeyRightArrowIcon />
              </CustomButton>

              <CustomButton
                sx={{ my: 1 }}
                variant="outlined"
                size="small"
                onClick={handleMoveLeft}
                disabled={checked.filter((c) => right.includes(c)).length === 0}
              >
                <KeyLeftArrowIcon />
              </CustomButton>
            </Box>

            <Grid>{customList("Visible Options", right)}</Grid>
          </Grid>
        </CustomDialog>

        {/* Filter Dialog */}
        <CustomDialog
          open={openFilterDialog}
          onClose={handleCloseFilter}
          title="FILTER"
          maxWidth="md"
          fullWidth
          titleSx={{ color: "#063E6F", fontWeight: 700 }}
          contentSx={{ p: 2 }}
          actionsSx={{
            justifyContent: "center",
            gap: 2,
            pb: 3,
          }}
          actions={
            <>
              <CustomButton
                variant="outlined"
                onClick={handleClearMedicalFilter}
                sx={{
                  borderRadius: "50px",
                  px: 4,
                }}
              >
                Clear All
              </CustomButton>

              <CustomButton
                variant="contained"
                onClick={handleCloseFilter}
                sx={{
                  borderRadius: "50px",
                  px: 4,
                }}
              >
                Apply
              </CustomButton>
            </>
          }
        >
          <Box
            sx={{ minHeight: 420, display: "flex", flexDirection: "column" }}
          >
            <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
              {/* Left Sidebar */}
              <Paper
                sx={{
                  width: 220,
                  minHeight: 300,
                  backgroundColor: "#F8F9FA",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <List disablePadding>
                  {filterCategories.map((category) => (
                    <ListItemButton
                      key={category}
                      selected={selectedFilterCategory === category}
                      onClick={handleFilterCategorySelect(category)}
                      sx={{
                        borderLeft:
                          selectedFilterCategory === category
                            ? "4px solid #B02A30"
                            : "4px solid transparent",
                        py: 2,
                      }}
                    >
                      <ListItemText primary={category} />
                    </ListItemButton>
                  ))}
                </List>
              </Paper>

              {/* Right Content */}
              <Paper
                sx={{
                  flex: 1,
                  minHeight: 300,
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: "#FFFFFF",
                }}
              >
                {selectedFilterCategory === "Medical/Non-Medical" ? (
                  <Box>
                    <CustomCheckbox
                      label="Medical"
                      checked={medicalFilterOptions.includes("Medical")}
                      onChange={handleMedicalOptionToggle("Medical")}
                    />

                    <CustomCheckbox
                      label="Non-Medical"
                      checked={medicalFilterOptions.includes("Non-Medical")}
                      onChange={handleMedicalOptionToggle("Non-Medical")}
                    />
                  </Box>
                ) : (
                  <Typography color="text.secondary">
                    No filter controls available for this category.
                  </Typography>
                )}
              </Paper>
            </Box>
          </Box>
        </CustomDialog>
      </Box>
    </Box>
  );
};

export default RightPanel;
