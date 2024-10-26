import React, { useState, useEffect } from "react";


const EmployeCrud = () => {
    const initialFormState = {
        fullName: "",
        birthDate: "",
        email: "",
        phone: "",
        designation: "",
        city: "",
        department: "",
    };

    const [inputValue, setInputValue] = useState(initialFormState);
    const [storage, setStorage] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [errors, setErrors] = useState({});
    const [showForm, setShowForm] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors = {};
        Object.keys(inputValue).forEach((field) => {
            if (!inputValue[field]) {
                newErrors[field] = `${field[0].toUpperCase() + field.slice(1)} is required.`;
            }
        });
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const updatedStorage = editingIndex !== null
            ? storage.map((employee, idx) => (idx === editingIndex ? inputValue : employee))
            : [...storage, inputValue];

        setStorage(updatedStorage);
        setInputValue(initialFormState);
        setEditingIndex(null);
        setShowForm(false);
    };

    const handleEdit = (index) => {
        setInputValue(storage[index]);
        setEditingIndex(index);
        setShowForm(true);
    };

    const handleDelete = (index) => {
        const updatedStorage = storage.filter((_, i) => i !== index);
        setStorage(updatedStorage);
    };

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("employees")) || [];
        if (storedData.length > 0 && storage.length === 0) {
            setStorage(storedData);
        } else {
            localStorage.setItem("employees", JSON.stringify(storage));
        }
    }, [storage]);

    return (
        <div className="employee-crud-container">
            <nav className="navbar">
                <h2>Employee Management System</h2>
            </nav>
            <button className="add-employee-btn" onClick={() => setShowForm(true)}>Add Employee</button>

            {showForm && (
                <div className="form-container">
                    <h2>{editingIndex !== null ? "Edit Employee" : "Add Employee"}</h2>
                    <form onSubmit={handleSubmit}>
                        {Object.keys(initialFormState).map((field) => (
                            <div key={field} className="form-group">
                                <label htmlFor={field}>
                                    {field[0].toUpperCase() + field.slice(1)}:
                                </label>
                                <input
                                    type={field === "birthDate" ? "date" : "text"}
                                    id={field}
                                    name={field}
                                    placeholder={`Enter ${field[0].toUpperCase() + field.slice(1)}`}
                                    onChange={handleChange}
                                    value={inputValue[field]}
                                />
                                {errors[field] && <span className="error">{errors[field]}</span>}
                            </div>
                        ))}
                        <button type="submit" className="submit-btn">
                            {editingIndex !== null ? "Update" : "Submit"}
                        </button>
                    </form>
                </div>
            )}

            <h2>Employee Data</h2>
            {storage.length > 0 && (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Full Name</th>
                                <th>Birth Date</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Designation</th>
                                <th>City</th>
                                <th>Department</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {storage.map((employee, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{employee.fullName}</td>
                                    <td>{employee.birthDate}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.designation}</td>
                                    <td>{employee.city}</td>
                                    <td>{employee.department}</td>
                                    <td>
                                        <div className="actions">
                                            <button onClick={() => handleEdit(index)} className="action-btn edit-btn">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(index)} className="action-btn delete-btn">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EmployeCrud;
