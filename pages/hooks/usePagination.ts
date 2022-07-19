import { useEffect, useState } from "react";

function usePagination(listArr: any[]) {
  //Desktop size
  const [pageSize, setPageSize] = useState<number>(12);
  const [rowNum, setRowNum] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentPageList, setCurrentPageList] = useState<any[]>([]);

  console.log(currentPage);
  console.log(currentPageList);

  useEffect(() => {
    const pageLength = listArr.length / pageSize;
    const pageNum = Math.floor(pageLength) + 1;
    setRowNum(pageNum);
  }, [listArr, pageSize]);

  useEffect(() => {
    const currentPageData = listArr.slice(currentPage * 12, 12);
    setCurrentPageList(currentPageData);
  }, [rowNum, currentPage, listArr]);

  return { rowNum, currentPageList, setCurrentPage };
}

export default usePagination;
