export const getStatusColor = (status: string): string => {
  switch (status) {
    case "완료": return "bg-green-500";
    case "배송중": return "bg-blue-500";
    case "처리중": return "bg-yellow-500";
    case "대기": return "bg-gray-500";
    default: return "bg-gray-500";
  }
};