// DANH SÁCH DỮ LIỆU CÁC FORM ÁO
// Bạn có thể dễ dàng thêm bớt form mới tại đây sau này

const FORM_CONFIGS = {
    'can_ban': {
        name: "Áo Căn Bản (Basic Bodice)",
        cd_nguc: 4.0,  // Độ cử động ngực (cm)
        cd_eo: 4.0,    // Độ cử động eo (cm)
        chiet_vai: true,
        img_form: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400",
        img_rap: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bodice_pattern.svg/600px-Bodice_pattern.svg.png"
    },
    'om_body': {
        name: "Áo Ôm Body (Fitted Top)",
        cd_nguc: 0.0,
        cd_eo: 1.0,
        chiet_vai: true,
        img_form: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400",
        img_rap: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bodice_pattern.svg/600px-Bodice_pattern.svg.png"
    },
    'somi_suong': {
        name: "Áo Sơ Mi Form Suông / Rộng",
        cd_nguc: 8.0,
        cd_eo: 8.0,
        chiet_vai: false,
        img_form: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400",
        img_rap: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bodice_pattern.svg/600px-Bodice_pattern.svg.png"
    }
};