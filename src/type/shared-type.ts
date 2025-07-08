import type { Locator, Page } from "playwright";
import type { z } from "zod";
import type { JobNumberSchema } from "../schema";

export type JobNumber = z.infer<typeof JobNumberSchema>;
const jobSearchPage = Symbol();

export type JobSearchPage = Page & {
  [jobSearchPage]: unknown;
};

const firstJobListPage = Symbol();

export type FirstJobListPage = Page & { [firstJobListPage]: unknown };

const jobListPage = Symbol();

export type JobListPage =
  | FirstJobListPage
  | (Page & { [jobListPage]: unknown });

export type EmploymentType = "RegularEmployee" | "PartTimeWorker";

export interface DirtyWorkLocation {
  prefecture: "東京都";
}

export type EngineeringLabel = "ソフトウェア開発技術者、プログラマー";

type DirtyDesiredOccupation = EngineeringLabel;

export type JobSearchCriteria = {
  jobNumber?: JobNumber;
  workLocation?: DirtyWorkLocation;
  desiredOccupation?: {
    occupationSelection?: DirtyDesiredOccupation;
  };
  employmentType?: EmploymentType;
};

export type EngineeringLabelSelector = {
  radioBtn: EngineeringLabelSelectorRadioBtn;
  openerSibling: EngineeringLabelSelectorOpenerSibling;
};

const engineeringLabelSelectorRadioBtn = Symbol();
export type EngineeringLabelSelectorRadioBtn = string & {
  [engineeringLabelSelectorRadioBtn]: unknown;
};
const engineeringLabelSelectorOpener = Symbol();

//　直接openerのセレクタをとってこれないため
export type EngineeringLabelSelectorOpenerSibling = string & {
  [engineeringLabelSelectorOpener]: unknown;
};

const jobOverviewList = Symbol();
export type JobOverViewList = Locator[] & {
  [jobOverviewList]: unknown;
};

const emplomentTypeSelector = Symbol();
export type EmploymentTypeSelector = string & {
  [emplomentTypeSelector]: unknown;
};
