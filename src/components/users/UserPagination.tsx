import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from '../ui/pagination';

interface UserPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const UserPagination: React.FC<UserPaginationProps> = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page > 2) pages.push(1);
      if (page > 3) pages.push('ellipsis-prev');
      for (let i = Math.max(1, page - 1); i <= Math.min(totalPages, page + 1); i++) pages.push(i);
      if (page < totalPages - 2) pages.push('ellipsis-next');
      if (page < totalPages - 1) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            asChild
            onClick={() => page > 1 && onPageChange(page - 1)}
            aria-disabled={page === 1}
            tabIndex={page === 1 ? -1 : 0}
          />
        </PaginationItem>
        {getPageNumbers().map((p, idx) =>
          typeof p === 'number' ? (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                onClick={() => onPageChange(p)}
                aria-current={p === page ? 'page' : undefined}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={p + idx}>
              <PaginationEllipsis />
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            asChild
            onClick={() => page < totalPages && onPageChange(page + 1)}
            aria-disabled={page === totalPages}
            tabIndex={page === totalPages ? -1 : 0}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default UserPagination; 