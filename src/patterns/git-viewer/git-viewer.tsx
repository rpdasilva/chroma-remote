import React, { useState } from "react";

import { BranchStruct, CommitStruct } from "../../types";
import { Box } from "../../components/box";
import { Text } from "../../components/text";
import { Commit } from "../../components/commit";
import { Line } from "../../components/line";

export type GitViewerProps = {
  commits: CommitStruct[];
  branches?: BranchStruct[];
};

const isCommitIncluded = (branches, currentIndex, commit) => {
  return branches
    .filter((_, i) => currentIndex !== i)
    .some((branchCommit) => branchCommit.hash === commit.hash);
};

const isCurrentCommit = (currentCommit, commit) =>
  currentCommit && currentCommit.hash === commit.hash;

const isForkMerge = (index, currentCommit, branches) =>
  index > 0 &&
  branches[0].some((branchCommit) => currentCommit.hash === branchCommit.hash);

// const sortByDate = (branch) => {
//   const sortedBranch = [...branch];
//   sortedBranch.sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : 0));
//   return sortedBranch;
// };

export const GitViewer = ({ commits, branches = [] }: GitViewerProps) => {
  const [currentCommit, setCurrentCommit] = useState();
  const commitDate = currentCommit ? new Date(currentCommit.time) : "";
  const forks = {};

  const mapCommitToParent = (allCommits) => (currentCommits) => {
    return [currentCommits]
      .flat()
      .map((currentCommit, i, currentBranches) => {
        if (
          currentCommit.parents &&
          currentCommit.parents.length &&
          !isCommitIncluded(currentBranches, i, currentCommit)
        ) {
          return [
            currentCommit.parents
              .map((parent) => [
                allCommits.find((commit) => commit.hash === parent),
              ])
              .map(mapCommitToParent(allCommits))
              .flat(),
            currentCommit,
          ].flat();
        }

        return currentCommit;
      })
      .flat();
  };

  const branchSegments = branches
    .map((branch) => commits.find((commit) => commit.hash === branch.commit))
    .map(mapCommitToParent(commits));

  return (
    <Box>
      {!branchSegments.length && (
        <Box mx={4} my={5} display="flex" alignItems="center">
          {commits.map((commit, i) => (
            <>
              {i > 0 && <Line />}
              <Commit
                isHighlighted={isCurrentCommit(currentCommit, commit)}
                commit={commit}
                onCommitDisplay={setCurrentCommit}
              ></Commit>
            </>
          ))}
        </Box>
      )}
      {branchSegments.length &&
        branchSegments.map((branch, branchIndex) => (
          <Box mx={4} my={5} display="flex" alignItems="center">
            {branch.map((commit, i) => (
              <>
                {isForkMerge(branchIndex, commit, branchSegments) ? (
                  <Line
                    forkMerge
                    rotationDirection={
                      (forks[commit.hash] = !forks[commit.hash])
                    }
                  />
                ) : (
                  <>
                    {i > 0 && <Line />}
                    <Commit
                      isHead={branches[branchIndex].commit === commit.hash}
                      isHighlighted={isCurrentCommit(currentCommit, commit)}
                      branchName={branches[branchIndex].name}
                      commit={commit}
                      onCommitDisplay={setCurrentCommit}
                    ></Commit>
                  </>
                )}
              </>
            ))}
          </Box>
        ))}
      {currentCommit && (
        <Box>
          <Text variant="body">
            {currentCommit.hash.slice(0, 6)} - {currentCommit.message} -
            {currentCommit.committer} -{" "}
            {commitDate.toLocaleString().split(",").slice(0, 1)}
          </Text>
        </Box>
      )}
    </Box>
  );
};
