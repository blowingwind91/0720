document.addEventListener("DOMContentLoaded", () => {
  const formSelect = document.getElementById("form-select");
  const formImage = document.getElementById("form-image");
  const patternImage = document.getElementById("pattern-image");
  const formTitle = document.getElementById("form-title");
  const btnCalculate = document.getElementById("btn-calculate");

  // Đổi hình ảnh và tiêu đề khi chọn form
  function updateFormUI() {
    const selectedKey = formSelect.value;
    const config = FORM_CONFIGS[selectedKey];
    if (config) {
      formTitle.textContent = config.name;
      if (formImage) formImage.src = config.img_form;
      if (patternImage) patternImage.src = config.img_rap;
      
      // Cập nhật độ cử động mặc định nếu có ô nhập
      const inputCdNguc = document.getElementById("cd_nguc");
      const inputCdEo = document.getElementById("cd_eo");
      if (inputCdNguc) inputCdNguc.value = config.cd_nguc;
      if (inputCdEo) inputCdEo.value = config.cd_eo;
    }
  }

  if (formSelect) {
    formSelect.addEventListener("change", updateFormUI);
    updateFormUI(); // Chạy khởi tạo ban đầu
  }

  // Hàm tính toán chính
  if (btnCalculate) {
    btnCalculate.addEventListener("click", calculateBodice);
  }
});

function calculateBodice() {
  // 1. Lấy dữ liệu số đo đầu vào
  const nguc = parseFloat(document.getElementById("vong_nguc")?.value || 0);
  const eo = parseFloat(document.getElementById("vong_eo")?.value || 0);
  const mong = parseFloat(document.getElementById("vong_mong")?.value || 0);
  const haEo = parseFloat(document.getElementById("ha_eo")?.value || 0);
  const vai = parseFloat(document.getElementById("rong_vai")?.value || 0);
  const kvs = parseFloat(document.getElementById("kich_vai_sau")?.value || 0);
  const kvt = parseFloat(document.getElementById("kich_vai_truoc")?.value || 0);
  const kcn = parseFloat(document.getElementById("khoang_cach_nguc")?.value || 0);

  const cdNguc = parseFloat(document.getElementById("cd_nguc")?.value || 0);
  const cdEo = parseFloat(document.getElementById("cd_eo")?.value || 0);

  if (!nguc || !eo || !haEo || !vai) {
    alert("Vui lòng nhập đầy đủ các số đo cơ bản (Ngực, Eo, Hạ eo, Vai)!");
    return;
  }

  // -------------------------------------------------------------
  // 2. TÍNH TOÁN THEO BẢNG CÔNG THỨC (BASIC BODICE BLOCK)
  // -------------------------------------------------------------

  // --- THÂN SAU (TS) ---
  const ts_haSauCo = 2.0;                                     // A-B
  const ts_haXuoiVai = 4.5;                                   // A-B1
  const ts_haSauNach = nguc / 4;                              // A-C
  const ts_haEo = haEo;                                       // A-D
  const ts_rongCo = nguc / 12;                                // A-G
  const ts_rongKichVai = kvs / 2;                             // A-H
  const ts_rongNgangVai = vai / 2;                            // B1-L1
  const ts_rongNgangNguc = (nguc + cdNguc) / 4 - 1.0;         // C-C1
  const ts_rongNgangEo = (eo + cdEo) / 4 - 1.0 + 3.0;        // D-D1 (+3cm ly chiết)
  const ts_duongCongNach = 5.0;                               // I-M (vẽ vuông góc lên 5cm)
  const ts_duongRaNach = 0.3;                                 // M (vẽ vuông góc sang phải 0.3cm)

  // Chiết Thân Sau
  const ts_chietVitrI = (ts_rongNgangEo) / 2;                 // D-R = 1/2 D-D1
  const ts_chietHaR1 = 2.0;                                   // R1 (Từ C-C1 vẽ xuống 2cm)
  const ts_chietRongR3 = 1.5;                                 // R-R3 (sang trái 1.5cm)
  const ts_chietRongR4 = 1.5;                                 // R-R4 (sang phải/trái 1.5cm -> tổng ly 3cm)

  // --- THÂN TRƯỚC (TT) ---
  const tt_caoDauCo = 2.0;                                    // A-A1
  const tt_haSauCo = (nguc / 12) + 0.5;                       // A1-B
  const tt_rongNgangCo = nguc / 12;                           // A1-G
  const tt_diemCongCo = (nguc / 12) + 0.5;                    // A1-B1 (đường cong G-B1-B)
  const tt_haSauNach = nguc / 4;                              // A-C
  const tt_haEo = haEo;                                       // A-D
  const tt_rongKichVai = (kvs / 2) - 1.0;                     // A1-H = 1/2 kích vai sau - 1cm (hoặc kvt/2)
  const tt_rongNgangNguc = (nguc + cdNguc) / 4 + 1.0;         // C-C2
  const tt_rongNgangEo = (eo + cdEo) / 4 + 1.0 + 3.0;         // D-D2 (+3cm ly chiết)
  const tt_duongCongNach = 5.0;                               // I-M
  const tt_duongRaNach = 2.0;                                 // M-M1 (vẽ sang trái 2cm)
  const tt_haXuoiVai = 6.5;                                   // H-L
  const tt_diemL1 = ts_rongNgangVai - 1.5;                    // *L-L1(TT) = L-L1(TS) - 1.5cm
  const tt_chietVaiG1G2 = 1.0;                                // G1-G2 = 1cm
  const tt_diemVaiG1 = (nguc / 20) + 0.5;                     // G-G1
  const tt_haNguc = 1.5;                                      // C-N (vẽ xuống 1.5cm)
  const tt_khoangCachNguc = kcn / 2;                          // N-N1 = 1/2 khoảng cách nguc

  // Chiết Thân Trước
  const tt_chietHaR1 = 2.0;                                   // Từ N1 vẽ xuống 2cm
  const tt_chietR3R4 = 1.5;                                   // R-R3 & R-R4 (Mỗi bên 1.5cm -> tổng ly 3cm)

  // -------------------------------------------------------------
  // 3. HIỂN THỊ KẾT QUẢ RA BẢNG GIAO DIỆN
  // -------------------------------------------------------------
  const resultContainer = document.getElementById("results-container");
  if (!resultContainer) return;

  resultContainer.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
      
      <!-- CỘT THÂN SAU -->
      <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
        <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">THÂN SAU (TS)</h3>
        <table style="width: 100%; text-align: left; border-collapse: collapse;">
          <tr><td><b>Hạ sâu cổ (A-B):</b></td><td>${ts_haSauCo.toFixed(1)} cm</td></tr>
          <tr><td><b>Hạ xuôi vai (A-B1):</b></td><td>${ts_haXuoiVai.toFixed(1)} cm</td></tr>
          <tr><td><b>Hạ sâu nách (A-C):</b></td><td>${ts_haSauNach.toFixed(1)} cm</td></tr>
          <tr><td><b>Hạ eo (A-D):</b></td><td>${ts_haEo.toFixed(1)} cm</td></tr>
          <tr><td><b>Rộng cổ (A-G):</b></td><td>${ts_rongCo.toFixed(1)} cm</td></tr>
          <tr><td><b>Rộng kích vai TS (A-H):</b></td><td>${ts_rongKichVai.toFixed(1)} cm</td></tr>
          <tr><td><b>Rộng ngang vai (B1-L1):</b></td><td>${ts_rongNgangVai.toFixed(1)} cm</td></tr>
          <tr><td><b>Rộng ngang ngực (C-C1):</b></td><td><b style="color: #e74c3c;">${ts_rongNgangNguc.toFixed(1)} cm</b></td></tr>
          <tr><td><b>Rộng ngang eo (D-D1):</b></td><td><b style="color: #e74c3c;">${ts_rongNgangEo.toFixed(1)} cm</b> (gồm 3cm chiết)</td></tr>
          <tr><td><b>Đường cong nách (I-M):</b></td><td>Vẽ vuông góc lên ${ts_duongCongNach} cm</td></tr>
          <tr><td><b>Đường ra nách (M):</b></td><td>Ra bên phải ${ts_duongRaNach} cm</td></tr>
          <tr style="background: #eee;"><td colspan="2"><b>Chiết eo Thân Sau:</b></td></tr>
          <tr><td>- Vị trí chiết (D-R):</td><td>${ts_chietVitrI.toFixed(1)} cm</td></tr>
          <tr><td>- Đầu chiết trên (R1):</td><td>Từ C-C1 hạ xuống ${ts_chietHaR1} cm</td></tr>
          <tr><td>- Rộng chiết (R3-R4):</td><td>3 cm (mỗi bên ${ts_chietRongR3} cm)</td></tr>
        </table>
      </div>

      <!-- CỘT THÂN TRƯỚC -->
      <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #ddd;">
        <h3 style="color: #2c3e50; border-bottom: 2px solid #e74c3c; padding-bottom: 5px;">THÂN TRƯỚC (TT)</h3>
        <table style="width: 100%; text-align: left; border-collapse: collapse;">
          <tr><td><b>Cao đầu cổ (A-A1):</b></td><td>${tt_caoDauCo.toFixed(1)} cm</td></tr>
          <tr><td><b>Hạ sâu cổ (A1-B):</b></td><td>${tt_haSauCo.toFixed(1)} cm</td></tr>
          <tr><td><b>Rộng ngang cổ (A1-G):</b></td><td>${tt_rongNgangCo.toFixed(1)} cm</td></tr>
          <tr><td><b>Hạ sâu nách (A-C):</b></td><td>${tt_haSauNach.toFixed(1)} cm</td></tr>
          <tr><td><b>Hạ eo (A-D):</b></td><td>${tt_haEo.toFixed(1)} cm</td></tr>
          <tr><td><b>Rộng kích vai TT (A1-H):</b></td><td>${tt_rongKichVai.toFixed(1)} cm</td></tr>
          <tr><td><b>Rộng ngang ngực (C-C2):</b></td><td><b style="color: #e74c3c;">${tt_rongNgangNguc.toFixed(1)} cm</b></td></tr>
          <tr><td><b>Rộng ngang eo (D-D2):</b></td><td><b style="color: #e74c3c;">${tt_rongNgangEo.toFixed(1)} cm</b> (gồm 3cm chiết)</td></tr>
          <tr><td><b>Hạ xuôi vai TT (H-L):</b></td><td>${tt_haXuoiVai.toFixed(1)} cm</td></tr>
          <tr><td><b>Chiết vai (G1-G2):</b></td><td>Vẽ vuông góc lên ${tt_chietVaiG1G2} cm</td></tr>
          <tr><td><b>Điểm vai G-G1:</b></td><td>${tt_diemVaiG1.toFixed(1)} cm</td></tr>
          <tr><td><b>Hạ ngực (C-N):</b></td><td>Tọa độ hạ ngực ${tt_haNguc} cm</td></tr>
          <tr><td><b>Khoảng cách ngực (N-N1):</b></td><td>${tt_khoangCachNguc.toFixed(1)} cm</td></tr>
          <tr style="background: #eee;"><td colspan="2"><b>Chiết eo Thân Trước:</b></td></tr>
          <tr><td>- Tọa độ trục chiết:</b></td><td>Từ N1 vẽ vuông góc xuống D-D2</td></tr>
          <tr><td>- Đầu chiết trên (N1-R1):</td><td>Hạ xuống ${tt_chietHaR1} cm</td></tr>
          <tr><td>- Rộng chiết (R3-R4):</td><td>3 cm (mỗi bên ${tt_chietR3R4} cm)</td></tr>
        </table>
      </div>

    </div>
  `;
}
