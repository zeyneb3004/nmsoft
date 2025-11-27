import { Table, Button } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:3001/users";

const UsersTable: React.FC = () => {
  const queryClient = useQueryClient();


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Məlumatları çəkmək mümkün olmadı");
      return res.json();
    },
  });


  const deleteUsers = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Silmək mümkün olmadı");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const columns = [
    { title: "ID", dataIndex: "id", width: 50 },
    { title: "Ad", dataIndex: "ad", width: 100 },
    { title: "Mənzil nömrəsi", dataIndex: "menzil", width: 100 },
    { title: "Parkovka yeri", dataIndex: "parkovka", width: 100 },
    { title: "Avtomobil nömrəsi", dataIndex: "avto", width: 100 },
    { title: "Qiymət", dataIndex: "qiymet", width: 100 },
    { title: "Bitmə tarixi", dataIndex: "bitme", width: 120 },
    {
      title: "Actions",
      key: "action",
      render: (_: any, record: any) => (
        <Button danger onClick={() => deleteUsers.mutate(record.id)}>
          Sil
        </Button>
      ),
    },
  ];

  if (isLoading) return <p>Yüklənir...</p>;
  if (isError) return <p>Xəta: {(error as Error).message}</p>;


  const tableData = Array.isArray(data)
    ? data.map((item: any) => ({
        key: item.id,
        id: item.id,
        ad: item.name,
        menzil: item.apartment,
        parkovka: item.parking,
        avto: item.car,
        qiymet: item.payment,
        bitme: item.date,
      }))
    : [];

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

export default UsersTable;