import {setupWorker} from "msw/browser";
import { workPoolsHandler } from "./workPoolsMock";

export const worker = setupWorker(workPoolsHandler);