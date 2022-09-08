import { useEffect, useState } from "react";

function usePagination(listArr: any[] | undefined) {
  //Desktop size
  const [pageCardSize, setPageCardSize] = useState<number>(12);
  const [pageSize, setPageSize] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentPageList, setCurrentPageList] = useState<any[]>([]);

  useEffect(() => {
    if (listArr) {
      const pageLength = listArr.length / pageCardSize;
      const pageNum = Math.floor(pageLength) + 1;
      setPageSize(pageNum);
    }
  }, [listArr, pageCardSize]);

  useEffect(() => {
    if (listArr) {
      console.log(currentPage);
      const currentPageData =
        currentPage === listArr.length
          ? listArr.slice((currentPage - 1) * 12)
          : listArr.slice((currentPage - 1) * 12 + 1, 12 * currentPage + 1);
      setCurrentPageList(currentPageData);
    }
  }, [pageSize, currentPage, listArr]);

  return { pageSize, currentPageList, setCurrentPage };
}

export default usePagination;
