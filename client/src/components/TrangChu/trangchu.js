import React, { useEffect, useState } from "react";
import '../../components/TrangChu/CSS/Giaodienmatdinh.css';
import '../../components/TrangChu/CSS/Style.css';



const Trangchu = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const openMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Đảo ngược trạng thái menu
    };
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        // Thêm sự kiện click lắng nghe vào toàn bộ tài liệu
        document.addEventListener("click", handleDocumentClick);
        // Xóa sự kiện click khi component unmount
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    const handleDocumentClick = (event) => {
        // Kiểm tra nếu menu đang mở và không có phần tử nào là nút mở menu thì đóng menu
        if (isMenuOpen && !event.target.closest("#openMenu")) {
            closeMenu();
        }
    };



    return (
        <>
            <div id="idbody" >
                <div className="trangchu">
                    <nav className="navbarTop">

                        <div className="container">
                            <div className="col-xs-7 navbarTopLeft">
                                <a href="#" alt='Sổ Điểm Sinh Viên'>
                                    <span className="logo" alt='Sổ Điểm Sinh Viên'>
                                        <img src="/mau-logo-giao-duc.png" alt='Sổ Điểm Sinh Viên' />
                                    </span>
                                </a>
                                <span id="openMenu" class onClick={openMenu}>
                                    <i className="fa fa-bars" aria-hidden="true"></i>
                                </span>
                                <span id="toggleSearch" className aria-hidden="true">
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </span>
                                <form className="searchBar" action="#">
                                    <input type="text" placeholder="Tìm kiếm trường học"></input>
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                            <div className="col-xs-4 navbarTopMiddle">
                                <center>
                                    <a href="/">
                                        <span className="logo">
                                            <img src="/mau-logo-giao-duc.png" alt></img>
                                        </span>
                                    </a>
                                </center>
                            </div>
                            <div className="col-xs-5 navbarTopRight">
                                <div className="userGroup pull-right">
                                    <div className="loginList">
                                        <span id="notLoginedMenu" className="barLogin" data-toggle="modal" data-target="#myModal">
                                            <a href="#" onClick={openModal}>Đăng nhập</a>
                                        </span>
                                        <div id="myModal" className={`modal fade ${isModalOpen ? 'show' : ''}`} role="dialog" style={{ display: isModalOpen ? 'block' : 'none' }}>
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal">×</button>
                                                        <h4 className="modal-title">Đăng nhập</h4>
                                                    </div>
                                                    <div className="modal-body">
                                                        <center>
                                                            <h4>Chào mừng bạn trở lại</h4>
                                                            <p>Đăng nhập với tư cách là</p>
                                                            <a className="btn btn-info" href="/login/admin">Quản trị viên đăng nhập</a>
                                                            <a className="btn btn-success" href="/login/faculty">Giảng viên đăng nhập</a>
                                                            <a className="btn btn-primary" href="/login/student">Sinh viên đăng nhập</a>
                                                        </center>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className="container mainContainer">
                        <div
                           className={`col-xs-2 leftCol ${isMenuOpen ? "menu-open" : ""}`}
                            style={{ left: "0px" }}
                        >
                            <div className="col-xs-2 leftCol soLienLacLeftCol" style={{ display: "contents", left: '0px' }}>
                                <div className="rightPanel">
                                    <div className="panelContent">
                                        <div className="sll-form-seach">
                                            <div className="header_form ">Tra cứu kết quả học tập</div>

                                        </div>
                                    </div>
                                </div>
                                <div className="rightPanel">
                                    <div className="panelHeader">
                                        <h4>HỖ TRỢ KỸ THUẬT</h4>
                                    </div>
                                    <div className="panelContent">
                                        <ul>
                                            <li>
                                                <a href="tel:18001260">
                                                    <div className="textWrap">
                                                        <span className="imgWrap fa fa-lg fa-phone-square"></span>
                                                        <span className="textWrap">
                                                            "Hotline 24/7: "
                                                            <span className="hotline">18001260</span>
                                                            <i>(Miễn phí)</i>
                                                        </span>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="">
                                    <a href="http://hoc.vnedu.vn/" target="_blank">
                                        <center>
                                            <img src="https://tracuu.vnedu.vn/common/tracuu/vnedu_smartid.jpg" style={{ width: '316px', height: '250px', marginBottom: '10px' }}></img>
                                        </center>
                                    </a>
                                    <a href="#" target="_blank">
                                        <center>
                                            <img src="https://tracuu.vnedu.vn/common/tracuu/vnedu_lms.jpg" style={{ width: '316px', height: '250px', marginBottom: '10px' }}></img>
                                        </center>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-10 secondCol soLienLacSecondCol">
                            <div className="all-editor-webtube-item">
                                <h1 className="title">Sổ Điểm Sinh Viên</h1>
                                <div className="item text">
                                    <div className="item-content">
                                        <p>
                                            <span style={{ color: '#000000', fontFamily: 'Tahoma, Arial, Verdana, sans-serif', fontSize: '12px' }}>Để có thể tra cứu kết quả học tập điểm thi</span>
                                        </p>
                                        <div className="adv-sll">&nbsp;</div>
                                        <p>
                                            <strong style={{ fontFamily: 'Tahoma,Arial,Verdana,sans-serif', fontSize: '12px' }}>+ Đăng ký dịch vụ:</strong>
                                        </p>
                                        <p>
                                            <strong>
                                                <em>
                                                    <span style={{ fontSize: '12px' }}>1.</span>
                                                </em>
                                                <em>
                                                    <span style={{ fontSize: '12px' }}>&nbsp;Đăng k</span>
                                                </em>
                                                <em>ý : Xin vui lòng liên hệ với bang giám hiệu nhà trường để được tư vấn kỉ hơn</em>
                                                <em></em>
                                                ":"
                                            </strong>
                                            " thông qua người ứng dụng này. Những sinh viên có thể tra cứu KQHT trên website vừa có thể nhận được tin nhắn từ hệ thống của nhà trường."
                                        </p>
                                        <div>
                                            <strong style={{ color: '#000000', fontFamily: 'Tahoma, Arial, Verdana, sans-serif', fontSize: '12px' }}>
                                                <span style={{ backgroundColor: '#ffffff' }}>B. Tra cứu KQHT</span>
                                            </strong>
                                            <span style={{ color: '#000000', fontFamily: 'Tahoma, Arial, Verdana, sans-serif', fontSize: '12px' }}>
                                                "Sau khi đã đăng ký dịch vụ SLLĐT thành công, vào thời điểm nhà trường cho phép công bố điểm thi trên website thì PHHS có thể tra cứu kết quả học tập trên website"
                                            </span>
                                            <strong style={{ color: '#000000', fontFamily: 'Tahoma, Arial, Verdana, sans-serif', fontSize: '12px' }}>
                                                <br />
                                            </strong>
                                        </div>
                                        <div>
                                            <strong style={{ fontFamily: 'Tahoma,Arial,Verdana,sans-serif', fontSize: '12px' }}>1. Tra cứu trên website:</strong>
                                            <ul style={{ color: '#000000', fontFamily: 'Tahoma, Arial, Verdana, sans-serif', fontSize: '12px' }}>
                                                <li>
                                                    "Mở trình duyệt website (FireFox, Chrome) truy cập vào địa chỉ website quản lý điểm sinh viên: quanlydiem.com."
                                                </li>
                                            </ul>
                                            <ul style={{ color: '#000000', fontFamily: 'Tahoma, Arial, Verdana, sans-serif', fontSize: '12px' }}>
                                                <li>
                                                    "Muốn biết rõ chi tiết hơn xin vui lòng liên lệ bang giám hiệu nhà trường để được tư vấn kỉ hơn. Xin trân trọng cảm ơn!"
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="clear"></div>
                                <div className="item text">
                                    <div className="item-content">
                                        <ul>
                                            <li>
                                                "Nếu đã có tài khoản xin vui lòng nhấn vào&nbsp;"
                                                <b>Đăng Nhập</b>
                                                "."
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="clear"></div>
                                <div className="item text">
                                    <div className="item-content">
                                        <p>
                                            <span style={{ color: '#ff0000' }}>
                                                <span style={{ fontFamily: 'Tahoma,Arial,Verdana,sans-serif' }}>Lưu ý :</span>
                                                <em style={{ fontFamily: 'Tahoma, Arial, Verdana, sans-serif', color: '#000000' }}>
                                                    <strong>

                                                        <br />
                                                    </strong>
                                                </em>
                                            </span>
                                        </p>
                                        <ol>
                                            <li>
                                                <span style={{ color: '#ff0000' }}>
                                                    <span style={{ fontFamily: 'Tahoma,Arial,Verdana,sans-serif' }}>
                                                        "Để biết được mã học sinh bạn vui lòng&nbsp;truy cập vào trang website sau:&nbsp;"
                                                    </span>
                                                    <span style={{ fontFamily: 'Tahoma,Arial,Verdana,sans-serif' }}>mã học sinh&nbsp;phải&nbsp;là mã của&nbsp;học sinh&nbsp;</span>
                                                    <span style={{ fontFamily: 'Tahoma,Arial,Verdana,sans-serif' }}>trong n</span>
                                                    <span style={{ fontFamily: 'Tahoma,Arial,Verdana,sans-serif' }}>ăm học cần tra cứu KQHT.</span>
                                                </span>
                                            </li>
                                            <li style={{ fontFamily: 'Tahoma, Arial, Verdana, sans-serif', color: '#000000' }}>
                                                <span style={{ color: '#ff0000' }}>
                                                    "Mật khẩu: Mặc đinh là SĐT đã đăng ký SLLĐT. Nếu muốn đổi mật khẩu:&nbsp;sử dụng&nbsp;SĐT&nbsp;đã&nbsp;đăng ký sử dụng dịch vụ SLLĐT&nbsp;để&nbsp;soạn tin SMS với cú pháp&nbsp;"
                                                    <strong>VNEDU MK</strong>
                                                    "&nbsp;Mật khẩu mới gửi&nbsp;"
                                                    <strong>8099</strong>
                                                </span>

                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Trangchu
