import { Table, Button } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://api-park.nmtech.az/e-parking/api/v0/resident/search";

interface Registration {
  id: string; // API JSON-da id stringdir
  name: string;
  apartmentNumber: string;
  parkingPlace: string;
  active?: boolean;
  carNumber: string;
  amount: number;
  from?: string;
  to?: string;
  expireDate: string;
}

interface TableProps {
  data?: Registration[];
}

const MyScrollableTable: React.FC<TableProps> = ({ data: filteredData }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery<Registration[]>({
    queryKey: ["registrations"],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Məlumatları çəkmək mümkün olmadı");
      return res.json();
    },
  });

  const deleteRegistration = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_URL}/${id}`, { method: "POST" });
      if (!res.ok) throw new Error("Silmək mümkün olmadı");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
  });

  const columns = [
    { title: "ID", dataIndex: "id", width: 50 },
    { title: "Ad", dataIndex: "name", width: 100 },
    { title: "Mənzil nömrəsi", dataIndex: "apartmentNumber", width: 100 },
    { title: "Parkovka yeri", dataIndex: "parkingPlace", width: 100 },
    { title: "Avtomobil nömrəsi", dataIndex: "carNumber", width: 100 },
    { title: "Qiymət", dataIndex: "amount", width: 100 },
    { title: "Bitmə tarixi", dataIndex: "expireDate", width: 120 },
    {
      title: "Actions",
      key: "action",
      render: (_: any, record: Registration) => (
        <Button danger onClick={() => deleteRegistration.mutate(record.id)}>Sil</Button>
      ),
    },
  ];

  if (isLoading) return <p>Yüklənir...</p>;
  if (isError) return <p>Xəta: {(error as Error).message}</p>;

  const apiTableData = Array.isArray(data)
    ? data.map((item) => ({ key: item.id, ...item }))
    : [];

  const tableData = filteredData && filteredData.length > 0 ? filteredData : apiTableData;

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={false}
      scroll={{ y: 200 }}
      className="scroll-table"
    />
  );
};

export default MyScrollableTable;
