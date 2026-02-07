import React from 'react';
import './Tentang.css'; // Import the CSS file

const Tentang = () => {
  return (
    <div className="tentang-container">
      <div className="header">
        <h1>ABOUT CHARTIFY</h1>
      </div>
      <div className="content">
        <div className="image-section">
          <img src="logo.png" alt="Chartify Logo" className="main-logo" />
        </div>
        <div className="text-section">
          <h2>Aplikasi Dashboard Statistik Penjualan No.1 di Indonesia</h2>
          <p>
            Chartify adalah sebuah aplikasi Dashboard Statistik Penjualan yang dirancang secara khusus untuk memberikan visualisasi data penjualan yang komprehensif,
            real-time, dan interaktif. Aplikasi ini membantu bisnis dari berbagai skala—baik kecil, menengah,
            maupun besar—untuk memahami tren penjualan, perilaku konsumen, performa produk,
            dan efektivitas strategi pemasaran melalui tampilan data yang mudah dipahami dan dianalisis.
          </p>
          <p>
            Dengan Chartify, pengguna dapat memantau kinerja penjualan secara menyeluruh melalui berbagai chart interaktif,
            seperti grafik batang, garis, lingkaran (pie), heatmap, hingga visualisasi peta geografis.
            Data yang ditampilkan diambil langsung dari API sistem penjualan atau database internal perusahaan,
            sehingga memastikan informasi yang ditampilkan selalu terupdate dan akurat.
          </p>
        </div>
      </div>
      <h2 className="section-title">Teknologi yang Digunakan</h2>
      <ul className="tech-list">
        <li className="tech-item">
          <strong>Front-End</strong>: Dibangun menggunakan React.
          <img src="react.png" alt="React Logo" className="tech-logo" />
        </li>
        <li className="tech-item">
          <strong>Back-End</strong>: Menggunakan CodeIgniter 4 (CI4).
          <img src="ci4.png" alt="CI4 Logo" className="tech-logo" />
        </li>
      </ul>

      <h2 className="section-title">Fitur</h2>
      <ul className="features-list">
        <li className="feature-item">Chart Interaktif</li>
        <li className="feature-item">Data Real-Time</li>
        <li className="feature-item">Antarmuka yang Mudah Digunakan</li>
      </ul>

      <div className="team-section">
        <h2 className="section-title">Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="hapsoro.jpg" alt="Team Member 1" className="team-photo" />
            <h3>Hapsoro Mahendra P</h3>
            <p>613230008</p>
          </div>
          <div className="team-member">
            <img src="damanis.jpeg" alt="Team Member 2" className="team-photo" />
            <h3>Mochamad Damanis Syarif Putra</h3>
            <p>613230001</p>
          </div>
          <div className="team-member">
            <img src="farrel.jpg" alt="Team Member 3" className="team-photo" />
            <h3>Farrel Shaquille T</h3>
            <p>613230003</p>
          </div>
        </div>
      </div>

      <h2 className="footer-text">
        Aplikasi ini dikembangkan untuk memenuhi penilaian Tugas Besar mata kuliah Mobile Programming Universitas Logistik dan Bisnis Internasional D3TI - 2A.
      </h2>
    </div>
  );
};

export default Tentang;