import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  AlertTitle,
  Button,
  Collapse,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/system';

function ccyFormat(num) {
  return `${num.toLocaleString(undefined, { style: 'currency', currency: 'EUR' })}`;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function QuotationResult({ result, onClose }) {
  console.log(result);
  const { t } = useTranslation();

  const handleValidate = () => {
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  if (!result) return null;

  const total = ((result.prices[0].quantity
    * result.prices[0].pricePerThousand)
    / 1000) + result.additionalCosts.reduce((acc, cur) => acc + (cur.quantity * cur.unitPrice), 0);
  return (
    <>
      <DialogTitle>
        { t('quotation.result.title', { id: result.id }) }
      </DialogTitle>
      <DialogContent>
        <TableContainer component={ Paper }>
          <Table aria-label="simple table">
            { ' ' }
            <TableHead>
              <TableRow>
                <StyledTableCell>{ t('quotation.result.label') }</StyledTableCell>
                <StyledTableCell align="right">
                  { t('quotation.result.quantity') }
                </StyledTableCell>
                <StyledTableCell align="right">
                  { t('quotation.result.unitPrice') }
                </StyledTableCell>
                <StyledTableCell align="right">
                  { t('quotation.result.price') }
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key="main">
                <StyledTableCell component="th" scope="row">
                  { t('quotation.result.item') }
                </StyledTableCell>
                <StyledTableCell align="right">
                  { result.prices[0].quantity.toLocaleString() }
                </StyledTableCell>
                <StyledTableCell align="right">
                  { ccyFormat(result.prices[0].pricePerThousand) }
                </StyledTableCell>
                <StyledTableCell align="right">
                  { ccyFormat((result.prices[0].quantity
                    * result.prices[0].pricePerThousand)
                    / 1000) }
                </StyledTableCell>
              </TableRow>
              { result.additionalCosts.map((row) => (
                <TableRow key={ row.label }>
                  <StyledTableCell component="th" scope="row">
                    { row.label }
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    { row.quantity }
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    { ccyFormat(row.unitPrice) }
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    { ccyFormat(row.quantity * row.unitPrice) }
                  </StyledTableCell>
                </TableRow>
              )) }

              <TableRow sx={ { fontWeight: 'bold' } }>
                { /* <TableCell rowSpan={  } /> */ }
                <TableCell sx={ { fontWeight: 'bold' } } align="right" colSpan={ 3 }>
                  { t('quotation.result.total') }
                </TableCell>
                <TableCell sx={ { fontWeight: 'bold' } } align="right">{ ccyFormat(total) }</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Collapse>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            This is an info alert —
          </Alert>
        </Collapse>
        <Button onClick={ handleClose }>{ t('quotation.result.quit') }</Button>
        <Button variant="contained" onClick={ handleValidate } autoFocus>
          { t('quotation.result.validate') }
        </Button>
      </DialogActions>
    </>
  );
}

QuotationResult.propTypes = {};

export default QuotationResult;
