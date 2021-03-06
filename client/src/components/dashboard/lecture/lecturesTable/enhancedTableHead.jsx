import { TableCell, TableHead, TableRow, TableSortLabel } from "@material-ui/core";
import React from "react";

const headCells = [
  { id: "title", numeric: false, disablePadding: true, label: "Titulo" },
  { id: "module", numeric: true, disablePadding: true, label: "Modulo" },
  { id: "description", numeric: true, disablePadding: false, label: "Desc" },
  { id: "videoURL", numeric: true, disablePadding: false, label: "Vimeo" },
  { id: "createdAt", numeric: true, disablePadding: false, label: "Fecha" },
  { id: "edit", numeric: true, disablePadding: true, label: "" },
  { id: "view", numeric: true, disablePadding: true, label: "" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    order,
    orderBy,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => {
          if (headCell.id !== "edit" && headCell.id !== "delete") {
            return (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "default"}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          } else {
            return <TableCell key={headCell.id}></TableCell>;
          }
        })}
      </TableRow>
    </TableHead>
  );
}


export default EnhancedTableHead;
