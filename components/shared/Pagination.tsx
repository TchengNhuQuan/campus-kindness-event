"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number | string>(page);
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(currentPage) + 1 : Number(currentPage) - 1;
    setCurrentPage(pageValue)
    const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: urlParamName || 'page',
        value: pageValue.toString(),
    })

    router.push(newUrl, {scroll: false})
  };

  return (
    <div className="flex gap-2">
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        onClick={() => onClick("prev")}
        disabled={Number(currentPage) <= 1}
      >
        Previous
      </Button>

      <Button
        size="lg"
        variant="outline"
        className="w-28"
        onClick={() => onClick("next")}
        disabled={Number(currentPage) >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
