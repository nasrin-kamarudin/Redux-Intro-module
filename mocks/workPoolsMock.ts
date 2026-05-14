import { http, HttpResponse } from 'msw';
import type { tableData } from '../src/types/inbox.types';
import rightPanelTableData from '../json/rightPanelTableData.json';

// Mock data for Inbox Work Pools
export const mockWorkPoolsData: tableData[] = rightPanelTableData.tableData;

// MSW HTTP handler for the work pools API
export const workPoolsHandler = http.get('/api/work-pools', (_req: any) => {
  return HttpResponse.json(mockWorkPoolsData);
});