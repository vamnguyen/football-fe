import { useMemo } from "react";

export interface UsePaginationProps {
  /** Số trang hiện tại */
  page: number;
  /** Số item trên mỗi trang */
  pageSize: number;
  /** Số trang hiển thị bên cạnh trang hiện tại */
  siblingCount: number;
  /** Tổng số kết quả */
  totalResults: number;
}

/** Ký tự hiển thị cho các trang bị ẩn */
export const DOTS = "•••";

/**
 * Tạo mảng số từ start đến end
 * @param start Số bắt đầu
 * @param end Số kết thúc
 * @returns Mảng các số từ start đến end
 */
const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

/**
 * Hook tính toán các số trang cần hiển thị
 * @param props UsePaginationProps
 * @returns Mảng các số trang và dots cần hiển thị
 */
export const usePagination = ({
  page,
  pageSize,
  siblingCount = 1,
  totalResults,
}: UsePaginationProps): (string | number)[] => {
  return useMemo<(number | string)[]>(() => {
    // Tính tổng số trang
    const totalPages = Math.ceil(totalResults / pageSize);

    // Số lượng số trang tối đa hiển thị = số trang bên cạnh + trang đầu + trang cuối + trang hiện tại + 2*dots
    const totalPageNumbers = siblingCount + 5;

    // Trường hợp 1: Nếu tổng số trang ít hơn số trang muốn hiển thị
    // Trả về tất cả các trang từ 1 đến totalPages
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    // Tính chỉ số của trang bên trái và phải của trang hiện tại
    // Đảm bảo các chỉ số nằm trong khoảng từ 1 đến totalPages
    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

    // Chỉ hiển thị dots khi có nhiều hơn 1 trang cần ẩn
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Trường hợp 2: Không hiển thị dots bên trái, chỉ hiển thị dots bên phải
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPages];
    }

    // Trường hợp 3: Không hiển thị dots bên phải, chỉ hiển thị dots bên trái
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    // Trường hợp 4: Hiển thị dots ở cả hai bên
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [];
  }, [totalResults, pageSize, siblingCount, page]);
};
