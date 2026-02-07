import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LoginCRUD.css';

const LoginCRUD = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'karyawan',
  });
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Ambil role dan username dari localStorage
  const [userRole, setUserRole] = useState('');
  const [usernameLogin, setUsernameLogin] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('role');
    const uname = localStorage.getItem('username');
    setUserRole(role);
    setUsernameLogin(uname);

    // Hanya fetch data jika manager
    if (role === 'manager') {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/login');
      setUsers(res.data);
    } catch (error) {
      console.error('Gagal mengambil data user:', error.message);
      setErrorMessage('Gagal mengambil data user. Silakan coba lagi.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/login/${editingId}`, formData);
      } else {
        const newUser = { ...formData, id: Date.now().toString() };
        await axios.post('http://localhost:8080/login', newUser);
      }
      setFormData({ username: '', password: '', role: 'karyawan' });
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      console.error('Gagal simpan user:', error.response?.data || error.message);
      setErrorMessage('Gagal simpan data user. Periksa kembali formulir input.');
    }
  };

  const handleEdit = (user) => {
    setFormData({
      username: user.username,
      password: user.password,
      role: user.role,
    });
    setEditingId(user._id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Yakin ingin menghapus user ini?');
    if (!confirmDelete) return;

    try {
      console.log("Menghapus user ID:", id);
      await axios.delete(`http://localhost:8080/login/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Gagal hapus:', error.response?.data || error.message);
      alert('Gagal menghapus user. Silakan cek server.');
    }
  };

  // Jika role adalah karyawan, tampilkan pesan saja
  if (userRole === 'karyawan') {
    return (
      <div className="login-crud">
        <h2>Halo, {usernameLogin}</h2>
        <p>Anda login sebagai <strong>karyawan</strong>. Anda tidak memiliki akses ke data karyawan.</p>
        <button onClick={() => {
          localStorage.clear();
          window.location.href = '/login';
        }}>Kembali</button>
      </div>
    );
  }

  return (
    <div className="login-crud">
      <h2>Login CRUD (Admin / Manager)</h2>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="karyawan">Karyawan</option>
          <option value="manager">Manager</option>
        </select>
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4">Belum ada user</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LoginCRUD;
