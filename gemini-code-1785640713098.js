// KHỞI TẠO VÀ XỬ LÝ TÍNH TOÁN RẬP

// 1. Tự động đổ danh sách Form vào Dropdown Select khi trang nạp xong
function initDropdown() {
    const formSelect = document.getElementById('formSelect');
    formSelect.innerHTML = '';
    
    for (const key in FORM_CONFIGS) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = FORM_CONFIGS[key].name;
        formSelect.appendChild(option);
    }
}

// 2. Hàm tính toán thông số theo công thức cắt may
function calculateSpecs() {
    const nguc = parseFloat(document.getElementById('vong_nguc').value) || 0;
    const eo = parseFloat(document.getElementById('vong_eo').value) || 0;
    const kcn = parseFloat(document.getElementById('kcn').value) || 0;
    const formKey = document.getElementById('formSelect').value;

    const config = FORM_CONFIGS[formKey];
    if (!config) return;

    // Tính toán thông số
    const nguc_tong = nguc + config.cd_nguc;
    const eo_tong = eo + config.cd_eo;

    const nguc_tt = (nguc_tong / 4) + 1.0;
    const nguc_ts = (nguc_tong / 4) - 1.0;

    const eo_tt = (eo_tong / 4) + 1.0 + 3.0;
    const eo_ts = (eo_tong / 4) - 1.0 + 3.0;

    const ha_nach = (nguc / 4);
    const rong_co = (nguc / 12);
    const chiet_vai = config.chiet_vai ? ((nguc / 20) + 0.5) : 0;
    const vi_tri_n1 = kcn / 2;

    // Cập nhật giao diện
    document.getElementById('formBadge').innerText = config.name;
    document.getElementById('res_nguc_tt').innerText = nguc_tt.toFixed(1) + " cm";
    document.getElementById('res_nguc_ts').innerText = nguc_ts.toFixed(1) + " cm";
    document.getElementById('res_eo_tt').innerText = eo_tt.toFixed(1) + " cm";
    document.getElementById('res_eo_ts').innerText = eo_ts.toFixed(1) + " cm";
    document.getElementById('res_nach_tt').innerText = ha_nach.toFixed(1) + " cm";
    document.getElementById('res_nach_ts').innerText = ha_nach.toFixed(1) + " cm";
    document.getElementById('res_co_tt').innerText = rong_co.toFixed(1) + " cm";
    document.getElementById('res_co_ts').innerText = rong_co.toFixed(1) + " cm";
    document.getElementById('res_chiet_tt').innerText = chiet_vai > 0 ? chiet_vai.toFixed(1) + " cm" : "Không dùng ly";
    document.getElementById('res_n1').innerText = vi_tri_n1.toFixed(1) + " cm";

    // Cập nhật hình ảnh
    document.getElementById('imgForm').src = config.img_form;
    document.getElementById('imgRap').src = config.img_rap;
}

// Chạy khởi tạo
window.onload = function() {
    initDropdown();
    calculateSpecs();
};