import React from 'react';
import { Modal } from 'semantic-ui-react';
import Calculator from './Calculator';


interface CalculatorModalProps {
  open: boolean;
  onClose: () => void;
}

const CalculatorModal: React.FC<CalculatorModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} style={{width:450,height:330 ,backgroundColor:"#455d7a"}}>
        <Calculator onClose={onClose} />
    </Modal>
  );
};

export default CalculatorModal;
