import React, { createContext, useContext, useEffect, useState } from "react";
import generateRandomId from "../../../utils/idGenerator";

import { JobInventoryType, JobInventoryItemType, InventoryItem } from "../types/JobInventoryType";


interface JobInventoryContextType {
  listJobInventory: JobInventoryType[];
  jobInventory: JobInventoryType | null;
  activeCategoryId: string | null;
  setActiveCategoryId: (categoryId: string) => void;
  getJobsInventory: () => void;
  createJobInventory: (updatedJobInventory: any) => void;
  searchJobInventoryById: (id: string) => void;
  addItemToActiveCategory: (newItem: InventoryItem) => void;
  updateItemInActiveCategory: (updatedItem: InventoryItem) => void;
  activeJobInventory: JobInventoryItemType[] | null;
}

const JobInventoryContext = createContext<JobInventoryContextType>({
  listJobInventory: [],
  jobInventory: null,
  activeCategoryId: null,
  setActiveCategoryId: () => {},
  getJobsInventory: () => {},
  createJobInventory: () => {},
  searchJobInventoryById: () => {},
  addItemToActiveCategory: () => {},
  activeJobInventory: null,
  updateItemInActiveCategory: () => {},
});

export const JobInventoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [listJobInventory, setListJobInventory] = useState<any>([]);
  const [jobInventory, setJobInventory] = useState<JobInventoryType | null>(
    null
  );
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeJobInventory, setActiveJobInventory] = useState<JobInventoryItemType[] | null>(null);


  useEffect(() => {
    const storedJobsInventory = localStorage.getItem("jobInventory");
    setListJobInventory(
      storedJobsInventory ? JSON.parse(storedJobsInventory) : []
    );
  }, []);

  useEffect(() => {
    if (!activeCategoryId || listJobInventory.length === 0) {
      setActiveJobInventory(null);
      return;
    }
  
    const jobWithCategory = listJobInventory.find((job: any) =>
      job.categories.some((cat: any) => Object.keys(cat)[0] === activeCategoryId)
    );
  
    setActiveJobInventory(jobWithCategory ? jobWithCategory.categories.find((cat: any) =>
      Object.keys(cat)[0] === activeCategoryId)[activeCategoryId] : []);
  }, [activeCategoryId, listJobInventory]);


  const getJobsInventory = async () => {
    const storedJobsInventory = localStorage.getItem("jobInventory");
    setListJobInventory(
      storedJobsInventory ? JSON.parse(storedJobsInventory) : []
    );
  };

  const createJobInventory = (updatedJobs: any) => {
    const jobInventoryParam = {
      id: generateRandomId(8),
      jobId: updatedJobs.id,
      jobName: updatedJobs.name,
      categories: updatedJobs.categories.map((category: string) => ({
        [category]: [],
      })),
    };

    const updatedJobInventory: JobInventoryType[] = [
      ...listJobInventory,
      jobInventoryParam,
    ];

    localStorage.setItem("jobInventory", JSON.stringify(updatedJobInventory));
    setListJobInventory(updatedJobInventory);
  };

  const searchJobInventoryById = (id: string) => {
    const storedJobsInventory = localStorage.getItem("jobInventory") || "";
    const hello = JSON.parse(storedJobsInventory);
    if (storedJobsInventory) {
      const foundJobInventory = hello.find(
        (item: { jobId: string }) => item.jobId === id
      );
      setJobInventory(foundJobInventory);
    }
  };

  const addItemToActiveCategory = (newItem: InventoryItem) => {
    if (!activeCategoryId) {
      console.error("Active category is not provided");
      return;
    }

    const updatedList = listJobInventory.map((job: any) => {
      const category = job.categories.find((cat: any) => Object.keys(cat)[0] === activeCategoryId);
      if (category) {
        category[activeCategoryId].push(newItem);
      }
      return job;
    });

    setListJobInventory(updatedList);
    localStorage.setItem("jobInventory", JSON.stringify(updatedList));
  };

  const updateItemInActiveCategory = (updatedItem: InventoryItem) => {
    if (!activeCategoryId) {
      console.error("Active category is not provided");
      return;
    }
  
    const updatedList = listJobInventory.map((job: any) => ({
      ...job,
      categories: job.categories.map((category: any) => {
        const updatedCategory = { ...category };
        if (category[activeCategoryId]) {
          updatedCategory[activeCategoryId] = category[activeCategoryId].map((item: any) =>
            item.id === updatedItem.id ? updatedItem : item
          );
        }
        return updatedCategory;
      }),
    }));
  
    setListJobInventory(updatedList);
    localStorage.setItem("jobInventory", JSON.stringify(updatedList));
  };
  

  return (
    <JobInventoryContext.Provider
      value={{
        listJobInventory,
        jobInventory,
        activeJobInventory,
        activeCategoryId,
        setActiveCategoryId,
        getJobsInventory,
        createJobInventory,
        searchJobInventoryById,
        addItemToActiveCategory,
        updateItemInActiveCategory,
      }}
    >
      {children}
    </JobInventoryContext.Provider>
  );
};

export const useJobInventory = () => useContext(JobInventoryContext);
