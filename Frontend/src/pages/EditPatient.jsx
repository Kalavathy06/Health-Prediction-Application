import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const blockInvalidChars = (e) => {
  if (["e", "E", "+", "-"].includes(e.key)) {
    e.preventDefault();
  }
};

  const [form, setForm] = useState({
    full_name: "",
    dob: "",
    email: "",
    glucose: "",
    haemoglobin: "",
    cholesterol: "",
  });

  useEffect(() => {
    loadPatient();
  }, []);

  const loadPatient = async () => {
    const res = await axios.get(
      `http://localhost:5000/patients/${id}`
    );

    const p = res.data;

    setForm({
      full_name: p[1],
      dob: p[2],
      email: p[3],
      glucose: p[4],
      haemoglobin: p[5],
      cholesterol: p[6],
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const today = new Date().toISOString().split("T")[0];

  if (form.dob > today) {
    alert("Future DOB is not allowed");
    return;
  }

  if (
    !form.full_name ||
    !form.dob ||
    !form.email ||
    !form.glucose ||
    !form.haemoglobin ||
    !form.cholesterol
  ) {
    alert("Please fill all fields");
    return;
  }

  await axios.put(
    `http://localhost:5000/patients/${id}`,
    form
  );

  navigate("/");
};  
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow w-full max-w-3xl">

        <h2 className="text-2xl font-bold mb-6">
          Edit Patient
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

  <div className="grid grid-cols-[220px_1fr] items-center">
    <label className="font-semibold text-gray-600">
      Full Name
    </label>

    <input
      type="text"
      required
      value={form.full_name}
      onChange={(e) =>
        setForm({
          ...form,
          full_name: e.target.value,
        })
      }
      className="border border-gray-300 rounded-lg px-3 py-2"
    />
  </div>

  <div className="grid grid-cols-[220px_1fr] items-center">
    <label className="font-semibold text-gray-600">
      Date of Birth
    </label>

    <input
  type="date"
  required
  required
  max={new Date().toISOString().split("T")[0]}
  value={form.dob}
  onChange={(e) =>
    setForm({
      ...form,
      dob: e.target.value,
    })
  }
  className="border border-gray-300 rounded-lg px-3 py-2"
/>
  </div>

  <div className="grid grid-cols-[220px_1fr] items-center">
    <label className="font-semibold text-gray-600">
      Email Address
    </label>

    <input
      type="email"
      required
      value={form.email}
      onChange={(e) =>
        setForm({
          ...form,
          email: e.target.value,
        })
      }
      className="border border-gray-300 rounded-lg px-3 py-2"
    />
  </div>

  <div className="grid grid-cols-[220px_1fr] items-center">
    <label className="font-semibold text-gray-600">
      Glucose Level
    </label>

    <input
      type="number"
      required
      value={form.glucose}
      onKeyDown={blockInvalidChars}
      onChange={(e) =>
        setForm({
          ...form,
          glucose: e.target.value,
        })
      }
      className="border border-gray-300 rounded-lg px-3 py-2"
    />
  </div>

  <div className="grid grid-cols-[220px_1fr] items-center">
    <label className="font-semibold text-gray-600">
      Haemoglobin
    </label>

    <input
      type="number"
      required
      value={form.haemoglobin}
      onKeyDown={blockInvalidChars}
      onChange={(e) =>
        setForm({
          ...form,
          haemoglobin: e.target.value,
        })
      }
      className="border border-gray-300 rounded-lg px-3 py-2"
    />
  </div>

  <div className="grid grid-cols-[220px_1fr] items-center">
    <label className="font-semibold text-gray-600">
      Cholesterol
    </label>

    <input
      type="number"
      required
      value={form.cholesterol}
      onKeyDown={blockInvalidChars}
      onChange={(e) =>
        setForm({
          ...form,
          cholesterol: e.target.value,
        })
      }
      className="border border-gray-300 rounded-lg px-3 py-2"
    />
  </div>

  <div className="flex justify-end gap-3 pt-4">
    <button
      type="button"
      onClick={() => navigate("/")}
      className="bg-gray-500 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-gray-600"
    >
      Cancel
    </button>

    <button
      type="submit"
      className="bg-green-500 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-green-600"
    >
      Update
    </button>
  </div>

</form>

      </div>

    </div>
  );
}

export default EditPatient;    