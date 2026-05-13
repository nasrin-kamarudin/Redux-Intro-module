import { http, HttpResponse } from 'msw';
import type { tableData } from '../types/inbox.types';
import rightPanelTableData from '../../json/rightPanelTableData.json';

// Mock data for Inbox Work Pools
export const mockWorkPoolsData: tableData[] = rightPanelTableData.tableData;

// MSW REST handler for the work pools API
export const workPoolsHandler = http.get('/api/work-pools', () => {
  return HttpResponse.json(mockWorkPoolsData);
});