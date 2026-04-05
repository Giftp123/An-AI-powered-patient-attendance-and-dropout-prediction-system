import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const StaffPieChart = ({ staffs }) => {
    const staffsCounts = staffs.reduce((acc, staff) => {
    const role = staff.staff_type;

    if (!acc[role]) acc[role] = 0;
    acc[role] += 1;

    return acc;
  }, {});

  const data = Object.keys(staffsCounts).map((key) => ({
    name: key,
    value: staffsCounts[key],
  }));

  // 🎨 Use your theme colors
  const COLORS = [
    "#615be4",
    "#15f83f",
    "#d615f8",
    "#f39c12",
    "#27ae60"
  ];

  return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Tooltip />

          <Legend />

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
  );
};

export default StaffPieChart;

const styles = {
  dashboardContainer: { padding: '30px', backgroundColor: '#f0f4f8', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  header: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '30px', 
    backgroundColor: 'white', 
    padding: '20px 30px', 
    borderRadius: '16px', 
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    border: '1px solid #e1e8ed'
  },
  scheduleBtn: { padding: '10px 20px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', boxShadow: '0 4px 10px rgba(39, 174, 96, 0.2)' },
  searchBtn: { padding: '10px 20px', backgroundColor: '#2c6eb5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', boxShadow: '0 4px 10px rgba(44, 110, 181, 0.2)' },
  logoutBtn: { padding: '10px 20px', backgroundColor: 'transparent', color: '#e74c3c', border: '2px solid #e74c3c', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
  statsRow: { display: 'flex', gap: '25px', marginBottom: '35px' },
  card: { 
    flex: 1, 
    backgroundColor: 'white', 
    padding: '25px', 
    borderRadius: '16px', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)', 
    textAlign: 'center',
    transition: 'transform 0.2s ease',
    cursor: 'default',
    border: '1px solid #f0f0f0'
  },
  statLabel: { margin: '0 0 8px 0', color: '#7f8c8d', fontSize: '13px', fontWeight: 'bold', letterSpacing: '0.5px' },
  tableSection: { 
    backgroundColor: 'white', 
    padding: '30px', 
    borderRadius: '16px', 
    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
    border: '1px solid #e1e8ed'
  },
  table: { width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' },
  tableHeader: { textAlign: 'left', backgroundColor: '#f8fafc' },
  th: { padding: '15px', color: '#4b5563', fontSize: '14px', fontWeight: '600' },
  td: { padding: '18px 15px', color: '#1f2937', fontSize: '14px', backgroundColor: '#fff', borderBottom: '1px solid #f3f4f6' },
  tableRow: { transition: 'background-color 0.2s' },
  badge: { color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  actionBtn: { padding: '8px 18px', backgroundColor: '#2c6eb5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  linkBtn: { background: 'none', border: 'none', color: '#2c6eb5', cursor: 'pointer', padding: 0, fontSize: '15px', textAlign: 'left', textDecoration: 'none', borderBottom: '1px solid transparent' }
};