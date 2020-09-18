export type CommitStruct = {
  hash: string;
  time: number;
  message: string;
  committer: string;
  parents: string[];
};

export type BranchStruct = {
  name: string;
  commit: string;
};
