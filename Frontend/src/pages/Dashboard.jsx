
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const deletePatient = async (id) => {
  await axios.delete(
    `http://localhost:5000/patients/${id}`
  );

  loadPatients();
};

  const loadPatients = async () => {
    const res = await axios.get(
      "http://localhost:5000/patients"
    );

    setPatients(res.data);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-4">

      <div className="w-full">

        <div className="flex justify-between items-center mb-5">

          <p className="text-[25px] font-semibold">
            Health Prediction System
          </p>

          <button
            onClick={() => navigate("/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm cursor-pointer"
          >
            + Create Patient
          </button>

        </div>

        <div className="bg-white rounded-lg shadow border">

          <table className="w-full border-collapse text-sm">

            <thead className="bg-slate-800 text-white">

              <tr>
  
  <th className="p-3 text-left border border-gray-300">Full Name</th>
  <th className="border border-gray-300">DOB</th>
  <th className="border border-gray-300">Email</th>
  <th className="border border-gray-300">Glucose</th>
  <th className="border border-gray-300">Hb</th>
  <th className="border border-gray-300">Cholesterol</th>
  <th className="border border-gray-300">Remarks</th>
  <th className="border border-gray-300">Action</th>
</tr>

            </thead>

            <tbody>

              {patients.map((p) => (

                <tr
  key={p[0]}
  className="hover:bg-gray-50"
>
                 
                  <td className="border border-gray-300 p-2">{p[1]}</td>
<td className="border border-gray-300 p-2">
  {new Date(p[2]).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}
</td>
<td className="border border-gray-300 p-2">{p[3]}</td>
<td className="border border-gray-300 p-2">{p[4]}</td>
<td className="border border-gray-300 p-2">{p[5]}</td>
<td className="border border-gray-300 p-2">{p[6]}</td>

<td className="border border-gray-300 p-2 text-xs">
  {p[7]}
</td>

                  <td>
                    <div className="flex gap-2">

                      <button
  onClick={() =>
    navigate(`/view/${p[0]}`)
  }
  className="px-3 py-1 bg-blue-500 text-white rounded text-xs cursor-pointer"
>
  View
</button>

                      <button
  onClick={() =>
    navigate(`/edit/${p[0]}`)
  }
  className="px-3 py-1 bg-yellow-500 text-white rounded text-xs cursor-pointer"
>
  Edit
</button>

                      <button
  onClick={() => deletePatient(p[0])}
  className="px-3 py-1 bg-red-500 text-white rounded text-xs cursor-pointer"
>
  Delete
</button>

                    </div>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;