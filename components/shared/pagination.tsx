import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DOTS, usePagination } from "@/hooks/use-pagination";

export interface PaginationProps {
  /** Số trang hiện tại */
  page: number;
  /** Số item trên mỗi trang */
  limit: number;
  /** Tổng số kết quả */
  totalResults: number;
  /** Tổng số trang */
  totalPages: number;
  /** Callback khi thay đổi trang */
  onPageChange: (page: number) => void;
  /** Số trang hiển thị bên cạnh trang hiện tại */
  siblingCount?: number;
}

export function Pagination({
  page,
  limit,
  totalResults,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) {
  // Sử dụng hook usePagination để tính toán các số trang cần hiển thị
  const paginationRange = usePagination({
    page,
    pageSize: limit,
    siblingCount,
    totalResults,
  });

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {/* Nút Previous */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Hiển thị các số trang và dots */}
      {paginationRange.map((pageNumber, index) => {
        // Nếu là dots, hiển thị ký tự ...
        if (pageNumber === DOTS) {
          return (
            <span key={`dots-${index}`} className="px-2">
              {DOTS}
            </span>
          );
        }

        // Hiển thị nút số trang
        return (
          <Button
            key={pageNumber}
            variant={pageNumber === page ? "default" : "outline"}
            onClick={() => onPageChange(pageNumber as number)}
            disabled={pageNumber === page}
          >
            {pageNumber}
          </Button>
        );
      })}

      {/* Nút Next */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
