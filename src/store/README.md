# Redux State Management Structure

This project uses Redux Toolkit for state management. The store is organized into slices for different features of the application.

## Store Structure

```
src/store/
├── store.js          # Main store configuration
├── index.js          # Re-exports for easy importing
├── hooks/
│   └── hooks.js      # Typed hooks for useDispatch and useSelector
└── slices/
    ├── drsSlice.js   # DRS (Decision Review System) state
    └── inboxSlice.js # Inbox state
```

## Usage

### Importing Hooks

```javascript
import { useAppDispatch, useAppSelector } from '../store';
```

### Using in Components

```javascript
import { useAppDispatch, useAppSelector } from '../store';
import { setApplicationRows } from '../store';

function MyComponent() {
  const dispatch = useAppDispatch();

  // Select data from store
  const applicationRows = useAppSelector(state => state.drs.applicationData.rows);
  const loading = useAppSelector(state => state.drs.loading.applicationOverview);

  // Dispatch actions
  const handleLoadData = () => {
    dispatch(setApplicationRows(someData));
  };

  return (
    // Your component JSX
  );
}
```

## Available Slices

### DRS Slice (`drsSlice.js`)

Manages state for the Decision Review System including:
- Application overview data (rows, requirements, riders, risk cards)
- UW (Underwriting) decisions
- BRE (Business Rules Engine) decisions
- Applicant profile information
- Medical data
- Loading and error states

### Inbox Slice (`inboxSlice.js`)

Manages state for the Inbox feature including:
- Table data and filtering
- Pagination and sorting
- UI panel states
- Selected applications
- Loading and error states

## Actions

Each slice exports its actions. Import them as needed:

```javascript
import {
  setApplicationData,
  setLoading,
  setError,
  resetDrsState
} from '../store/slices/drsSlice';

import {
  setTableData,
  setPage,
  setSearchQuery,
  resetFilters
} from '../store/slices/inboxSlice';
```

## Types

TypeScript types are automatically inferred from the slices. Use `RootState` and `AppDispatch` for typing:

```javascript
import type { RootState, AppDispatch } from '../store';
```

## Best Practices

1. Use the typed hooks (`useAppDispatch`, `useAppSelector`) instead of plain Redux hooks
2. Keep slices focused on specific features
3. Use meaningful action names
4. Handle loading and error states appropriately
5. Reset state when appropriate (e.g., on component unmount or navigation)