import React, { createContext, useContext, useEffect, useState } from "react";

import {  DataType, JobStatusCount } from '../types/JobSiteTypes'

const JobsContext = createContext<{
  jobs: DataType[];
  getJobs: () => Promise<void>;
  createJob: (jobData: DataType) => Promise<void>;
  searchJobsByName: (jobName: string) => Promise<void>;
  countJobsByStatus: () => void;
  jobStatusCounts: JobStatusCount[];
  isLoading: boolean;
}>({
  jobs: [],
  getJobs: async () => {},
  createJob: async () => {},
  searchJobsByName: async () => {},
  countJobsByStatus: () => {},
  jobStatusCounts: [],
  isLoading: false,
});

export const JobsProvider = ({ children }: { children: React.ReactNode }) => {
  const [jobs, setJobs] = useState<DataType[]>([]);
  const [jobStatusCounts, setJobStatusCounts] = useState<JobStatusCount[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadJobs = async () => {
      setIsLoading(true);
      try {
        const storedJobs = localStorage.getItem("jobs");
        setJobs(storedJobs ? JSON.parse(storedJobs) : []);
      } catch (error) {
        console.error("Error loading jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadJobs();
  }, []);

  const getJobs = async () => {
    const storedJobs = localStorage.getItem("jobs");
    setJobs(storedJobs ? JSON.parse(storedJobs) : []);
  };

  const saveJobs = async (updatedJobs: DataType[]) => {
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
  };

  const createJob = async (jobData: DataType) => {
    try {
      const updatedJobs = [...jobs, jobData];
      await saveJobs(updatedJobs);
      countJobsByStatus(updatedJobs); // Update counts after creating a job
    } catch (error) {
      console.error("Error creating job:", error);
      return;
    }
  };

  const searchJobsByName = async (jobName: string) => {
    try {
      const storedJobs = localStorage.getItem("jobs");
      const parsedJobs: DataType[] = JSON.parse(storedJobs || '');
      const filteredJobs = parsedJobs.filter((job) => job.name.includes(jobName));
      setJobs(filteredJobs);
    } catch (error) {
      console.error("Error searching jobs:", error);
      return;
    }
  };

  const countJobsByStatus = (jobsList = jobs) => {

    const storedJobs = localStorage.getItem("jobs");
    const parsedJobs: DataType[] = JSON.parse(storedJobs || '[]');

    const statusCount = {
      completed: 0,
      inProgress: 0,
      onHold: 0,
    };

    parsedJobs.forEach((job) => {
      if (statusCount[job.status] !== undefined) {
        statusCount[job.status]++;
      }
    });

    setJobStatusCounts([
      { name: 'completed', label: 'Completed', number: statusCount.completed, color: "#7AC14D" },
      { name: 'onHold', label: 'On Hold', number: statusCount.onHold, color: '#FE4C4A' },
      { name: 'onRoad', label: 'On Road', number: statusCount.inProgress, color: '#ECDE7C' },
    ]);
  };

  useEffect(() => {
    countJobsByStatus();
  }, [jobs]);

  return (
    <JobsContext.Provider
      value={{ jobs, getJobs, createJob, searchJobsByName, countJobsByStatus, jobStatusCounts, isLoading }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => useContext(JobsContext);
