import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const TableComponent = ({ columns, data, title }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getMuiTheme = () => createTheme({
    typography: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "13px",
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            padding: '10px 4px',
            fontSize: '8px',
          },
          body: {
            fontSize: '13px',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h6: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: "#2A3546",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            fontSize: '18px',
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            fontSize: '13px',
          },
          toolbar: {
            padding: '0px',
          },
          caption: {
            fontSize: '16px',
          },
          selectIcon: {
            fontSize: '24px',
          },
          select: {
            fontSize: '16px', // Adjust the font size of the select element
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            fontSize: '13px', // Adjust the font size of the select dropdown
          },
          icon: {
            fontSize: '24px', // Adjust the font size of the dropdown icon
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: '16px', // Adjust the font size of the menu items
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            fontSize: '16px', // Adjust the font size of the input field
          },
        },
      },
    },
  });

  const options = {
    selectableRows: false,
    elevation: 0,
    rowsPerPage,
    rowsPerPageOptions: [5, 10, 20, 30, 50],
    textLabels: {
      body: {
        noMatch: "Không tìm thấy dữ liệu",
      },
      pagination: {
        next: "Trang tiếp",
        previous: "Trang trước",
        rowsPerPage: "Số hàng mỗi trang",
        displayRows: "của",
      },
      toolbar: {
        search: "Tìm kiếm",
        downloadCsv: "Tải CSV",
        print: "In",
        viewColumns: "Xem cột",
        filterTable: "Lọc bảng",
      },
      filter: {
        all: "Tất cả",
        title: "Lọc",
        reset: "Đặt lại",
      },
      viewColumns: {
        title: "Xem cột",
        titleAria: "Hiển thị/Ẩn cột bảng",
      },
      selectedRows: {
        text: "hàng được chọn",
        delete: "Xóa",
        deleteAria: "Xóa hàng được chọn",
      },
    },
    onChangeRowsPerPage: (numberOfRows) => {
      setRowsPerPage(numberOfRows);
    },
  };

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  );
};

export default TableComponent;
