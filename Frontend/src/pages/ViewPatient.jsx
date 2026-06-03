import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

function ViewPatient() {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);

  

const navigate = useNavigate();
  useEffect(() => {
    loadPatient();
  }, []);

  const loadPatient = async () => {
    const res = await axios.get(
      `http://localhost:5000/patients/${id}`
    );

    setPatient(res.data);
  };

  if (!patient) {
    return <p>Loading...</p>;
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex justify-center items-center p-6">

    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">

      <div className="px-8 py-5">
      <div className="relative mb-2">

  <FaArrowLeft
    onClick={() => navigate("/")}
    className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-600 hover:text-blue-600 cursor-pointer text-lg"
  />

  <p className="text-2xl font-semibold text-slate-800 text-center">
    Patient Details
  </p>

</div>

<p className="text-slate-500 text-sm text-center">
  Complete patient health information
</p>
      </div>

      <div className="p-8">

        <div className="grid gap-4">

          <div className="grid grid-cols-[220px_1fr] border-b border-gray-100 pb-3">
            <p className="font-semibold text-gray-600">
              Full Name
            </p>

            <p className="text-slate-800">
              {patient[1]}
            </p>
          </div>

          <div className="grid grid-cols-[220px_1fr] border-b border-gray-100 pb-3">
            <p className="font-semibold text-gray-600">
              Date of Birth
            </p>

            <p className="text-slate-800">
  {new Date(patient[2]).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}
</p>
          </div>

          <div className="grid grid-cols-[220px_1fr] border-b border-gray-100 pb-3">
            <p className="font-semibold text-gray-600">
              Email Address
            </p>

            <p className="text-slate-800">
              {patient[3]}
            </p>
          </div>

          <div className="grid grid-cols-[220px_1fr] border-b border-gray-100 pb-3">
            <p className="font-semibold text-gray-600">
              Glucose Level
            </p>

            <p className="text-slate-800">
              {patient[4]}
            </p>
          </div>

          <div className="grid grid-cols-[220px_1fr] border-b border-gray-100 pb-3">
            <p className="font-semibold text-gray-600">
              Haemoglobin
            </p>

            <p className="text-slate-800">
              {patient[5]}
            </p>
          </div>

          <div className="grid grid-cols-[220px_1fr] border-b border-gray-100 pb-3">
            <p className="font-semibold text-gray-600">
              Cholesterol
            </p>

            <p className="text-slate-800">
              {patient[6]}
            </p>
          </div>

          <div className="grid grid-cols-[220px_1fr]">
            <p className="font-semibold text-gray-600">
              AI Health Remarks
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-slate-700 leading-relaxed">
              {patient[7]}
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
);
}

export default ViewPatient;