import React, { useState, useEffect, useRef } from "react";
import { useDownloadExcel } from 'react-export-table-to-excel';
import UserService from "../services/user.service";
import '../App.css';
const BoardClass = () => {
    const [content, setContent] = useState([]);
    const [ds, setDs] = useState([]);
    const [dsDiemDanh, setDsDiemDanh] = useState([]);
    const [tenLop, setTenLop] = useState("");
    const [idLop, setIdLop] = useState(0);
    const [ngay, setNgay] = useState("");
    const [ngayid, setNgayId] = useState(0);
    useEffect(() => {
        UserService.getClassBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setContent(_content);
            }
        );
    }, []);
    const danhSachLichByLopId = (id, tenLop) => {
        UserService.getLichByLopId(id).then(
            (response) => {
                setDs(response.data);
                setTenLop(tenLop);
                setIdLop(id);
                setNgay("");
                setDsDiemDanh([]);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setDs(_content);
            })
    }
    const danhSachDiemDanhByLich = (ngayid, ngay) => {
        UserService.getDiemDanhByLopIdAndLichId(idLop, ngayid).then(
            (response) => {
                setDsDiemDanh(response.data);
                setNgayId(ngayid);
                setNgay(ngay);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setDsDiemDanh(_content);
            })
    }
    const updateDiemDanh = (sinhvien_id) => {
        let trang_thai;
        while (1) {
            trang_thai = prompt("Nhap trang thai (0: vang, 1: co mat, 2: di tre)", 0);
            trang_thai = parseInt(trang_thai);
            if (trang_thai === 0 || trang_thai === 1 || trang_thai === 2) {
                break;
            }
        }
        let ghi_chu = prompt("Nhap ghi chu");
        const diem_danh = { sinhvien_id: sinhvien_id, ngay_id: ngayid, trang_thai: trang_thai, ghi_chu: ghi_chu, loptinchi_id: idLop};
        UserService.updateDiemDanh(diem_danh).then(
            (response) => {
                alert('OK');
                danhSachDiemDanhByLich(ngayid,ngay);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                alert(_content);
            })
    }
    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: tenLop + '-' + ngay,
        sheet: 'DiemDanh'
    })
    return (
        <div className="container">
            <header className="jumbotron">
                <div>Danh sách các lớp:</div>
                {content.map((lop) => (<button onClick={() => danhSachLichByLopId(lop.id, lop.monhoc.ma + ' - ' + lop.monhoc.monhoc + ' - Học kỳ ' + lop.hocky.hocky + '-' + lop.hocky.namhoc)}>{lop.monhoc.ma + ' - ' + lop.monhoc.monhoc + ' - Học kỳ ' + lop.hocky.hocky + ' - ' + lop.hocky.namhoc}</button>))}
            </header>
            <body className="jumbotron">
                {tenLop && <div>Lớp: {tenLop}</div>}
                {ds.map((val) => (<button onClick={() => danhSachDiemDanhByLich(val.id, val.ngay)}>{val.ngay}</button>))}
                {ngay && <div>Ngày: {ngay}</div>}
                <div>
                    {ngay && 
                    <div>
                    <table ref={tableRef}>
                        <tr>
                            <td>ID</td>
                            <td>MSSV</td>
                            <td>Họ tên</td>
                            <td>Trạng thái</td>
                            <td>Ngày quét vân tay</td>
                            <td>Ghi chú</td>
                            <td>Ngày cập nhật cuối</td>
                        </tr>
                        {dsDiemDanh.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val.id}</td>
                                    <td>{val.username}</td>
                                    <td>{val.hoten}</td>
                                    <td>{val.trang_thai}</td>
                                    <td>{val.thoi_gian_quet_van_tay}</td>
                                    <td>{val.ghi_chu}</td>
                                    <td>{val.thoi_gian_cap_nhat}</td>
                                    <td><button onClick={() => updateDiemDanh(val.id)}>Sửa</button></td>
                                </tr>
                            )
                        })}
                    </table>
                    <button onClick={onDownload}> Export excel </button>
                    </div>
                    }
                </div>
            </body>
        </div>
    );
};

export default BoardClass;
