import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePatient() {
  const navigate = useNavigate();


  const [form, setForm] = useState({
    full_name: "",
    dob: "",
    email: "",
    glucose: "",
    haemoglobin: "",
    cholesterol: "",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post(
      "http://localhost:5000/patients",
      form
    );

    navigate("/");
  }
  catch(error) {
    alert(
      error.response?.data?.error ||
      "Something went wrong"
    );
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex justify-center items-center px-4 py-8">

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">

        <div className="mb-8 grid gap-3">
          <p className="text-[22px] font-semibold text-slate-800">
            Create Patient
          </p>

          <p className="text-gray-500 mb-6">
            Enter patient health details below
          </p>
        </div>

        <form
  onSubmit={handleSubmit}
  className="space-y-4"
>

  <div className="grid grid-cols-[150px_1fr] items-center gap-3">
    <label className="text-sm text-gray-700">
      Full Name
    </label>

    <input
      type="text" required
      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
      onChange={(e) =>
        setForm({
          ...form,
          full_name: e.target.value,
        })
      }
    />
  </div>

  <div className="grid grid-cols-[150px_1fr] items-center gap-3">
    <label className="text-sm text-gray-700">
      Date of Birth
    </label>

    <input
  type="date"
  required
  max={new Date().toISOString().split("T")[0]}
  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
  onChange={(e) =>
    setForm({
      ...form,
      dob: e.target.value,
    })
  }
/>
  </div>

  <div className="grid grid-cols-[150px_1fr] items-center gap-3">
    <label className="text-sm text-gray-700">
      Email
    </label>

    <input
      type="email" required
      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
      onChange={(e) =>
        setForm({
          ...form,
          email: e.target.value,
        })
      }
    />
  </div>

  <div className="grid grid-cols-[150px_1fr] items-center gap-3">
    <label className="text-sm text-gray-700">
      Glucose
    </label>

    <input
  type="number"
  step="0.1"
  min="0"
  required
  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
  onChange={(e) =>
    setForm({
      ...form,
      glucose: e.target.value,
    })
  }
/>
  </div>

  <div className="grid grid-cols-[150px_1fr] items-center gap-3">
    <label className="text-sm text-gray-700">
      Haemoglobin
    </label>

        <input
  type="number"
  step="0.1"
  min="0"
  required
  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
  onChange={(e) =>
    setForm({
      ...form,
      haemoglobin: e.target.value,
    })
  }
/>
  </div>

  <div className="grid grid-cols-[150px_1fr] items-center gap-3">
    <label className="text-sm text-gray-700">
      Cholesterol
    </label>

    <input
  type="number"
  step="0.1"
  min="0"
  required
  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
  onChange={(e) =>
    setForm({
      ...form,
      cholesterol: e.target.value,
    })
  }
/>
  </div>

  <div className="flex justify-end gap-3 pt-3">

    <button
      type="button"
      onClick={() => navigate("/")}
      className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm cursor-pointer"
    >
      Cancel
    </button>

    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm cursor-pointer"
    >
      Save
    </button>

  </div>

</form>

      </div>

    </div>
  );
}

export default CreatePatient;  