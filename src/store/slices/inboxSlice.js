import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { tableData, Order } from '../../types/inbox.types';

interface InboxState {
  // Table data
  tableData: tableData[];
  filteredData: tableData[];

  // Pagination
  page: number;
  rowsPerPage: number;
  totalCount: number;

  // Sorting
  order: Order;
  orderBy: keyof tableData;

  // Filtering
  searchQuery: string;
  selectedPool: string;
  selectedChannel: string;
  selectedProductType: string;

  // UI state
  leftPanelOpen: boolean;
  rightPanelOpen: boolean;

  // Loading and error states
  loading: boolean;
  error: string | null;

  // Selected item
  selectedApplication: tableData | null;
}

const initialState: InboxState = {
  tableData: [],
  filteredData: [],
  page: 0,
  rowsPerPage: 10,
  totalCount: 0,
  order: 'asc',
  orderBy: 'applicationNo',
  searchQuery: '',
  selectedPool: '',
  selectedChannel: '',
  selectedProductType: '',
  leftPanelOpen: true,
  rightPanelOpen: false,
  loading: false,
  error: null,
  selectedApplication: null,
};

const inboxSlice = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    // Data actions
    setTableData: (state, action: PayloadAction<tableData[]>) => {
      state.tableData = action.payload;
      state.filteredData = action.payload;
      state.totalCount = action.payload.length;
    },
    setFilteredData: (state, action: PayloadAction<tableData[]>) => {
      state.filteredData = action.payload;
    },

    // Pagination actions
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.page = 0; // Reset to first page when changing rows per page
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },

    // Sorting actions
    setOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },
    setOrderBy: (state, action: PayloadAction<keyof tableData>) => {
      state.orderBy = action.payload;
    },

    // Filtering actions
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 0; // Reset to first page when filtering
    },
    setSelectedPool: (state, action: PayloadAction<string>) => {
      state.selectedPool = action.payload;
      state.page = 0;
    },
    setSelectedChannel: (state, action: PayloadAction<string>) => {
      state.selectedChannel = action.payload;
      state.page = 0;
    },
    setSelectedProductType: (state, action: PayloadAction<string>) => {
      state.selectedProductType = action.payload;
      state.page = 0;
    },

    // UI actions
    toggleLeftPanel: (state) => {
      state.leftPanelOpen = !state.leftPanelOpen;
    },
    toggleRightPanel: (state) => {
      state.rightPanelOpen = !state.rightPanelOpen;
    },
    setLeftPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.leftPanelOpen = action.payload;
    },
    setRightPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.rightPanelOpen = action.payload;
    },

    // Selection actions
    setSelectedApplication: (state, action: PayloadAction<tableData | null>) => {
      state.selectedApplication = action.payload;
    },

    // Loading and error actions
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Reset actions
    resetInboxState: () => initialState,
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedPool = '';
      state.selectedChannel = '';
      state.selectedProductType = '';
      state.page = 0;
    },
  },
});

export const {
  setTableData,
  setFilteredData,
  setPage,
  setRowsPerPage,
  setTotalCount,
  setOrder,
  setOrderBy,
  setSearchQuery,
  setSelectedPool,
  setSelectedChannel,
  setSelectedProductType,
  toggleLeftPanel,
  toggleRightPanel,
  setLeftPanelOpen,
  setRightPanelOpen,
  setSelectedApplication,
  setLoading,
  setError,
  resetInboxState,
  resetFilters,
} = inboxSlice.actions;

export default inboxSlice.reducer;