"use client";

import { useDocumentDetailQuery } from "../hooks/use-documents";

interface DocumentPageDescriptionProps {
  documentId: string;
}

export function DocumentPageDescription({ documentId }: DocumentPageDescriptionProps) {
  const documentQuery = useDocumentDetailQuery(documentId);

  if (documentQuery.isLoading) {
    return <span>Đang tải thông tin tài liệu...</span>;
  }

  return (
    <span>
      {documentQuery.data
        ? "Trang tài liệu đang kết nối qua lớp service và repository, sẵn sàng làm việc với backend."
        : "Không tìm thấy tài liệu trong không gian làm việc hiện tại."}
    </span>
  );
}
