export interface PageIconOption {
  value: string;
  label: string;
  description: string;
}

export const pageIconOptions: PageIconOption[] = [
  { value: "WS", label: "Làm việc", description: "Hợp với trang tổng quan và công việc." },
  { value: "NB", label: "Ghi chú", description: "Dùng cho ghi chú, ghi nhớ và ý tưởng nhanh." },
  { value: "PX", label: "Dự án", description: "Phù hợp cho trang mô tả dự án hay sprint." },
  { value: "RD", label: "Nghiên cứu", description: "Dùng cho trang phân tích và tài liệu tham khảo." },
  { value: "PL", label: "Kế hoạch", description: "Hợp với roadmap, kế hoạch và mục tiêu." },
  { value: "SK", label: "Sổ tay", description: "Dành cho hướng dẫn, quy trình và tài liệu nội bộ." },
  { value: "AI", label: "Ý tưởng", description: "Dùng cho brainstorm và nháp ý tưởng." },
  { value: "UX", label: "Trải nghiệm", description: "Phù hợp cho trang UI, UX và thiết kế." },
];

export const pageCoverOptions = [
  "linear-gradient(135deg, rgba(186,145,93,0.92), rgba(105,74,41,0.9))",
  "linear-gradient(135deg, rgba(232,223,208,0.95), rgba(177,152,120,0.85))",
  "linear-gradient(135deg, rgba(156,184,176,0.94), rgba(74,106,100,0.9))",
  "linear-gradient(135deg, rgba(189,165,129,0.92), rgba(102,83,57,0.88))",
  "linear-gradient(135deg, rgba(127,160,191,0.93), rgba(57,88,121,0.9))",
];
