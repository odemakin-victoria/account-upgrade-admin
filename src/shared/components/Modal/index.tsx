import React from 'react';
import { Modal, ModalProps as MantineModalProps } from '@mantine/core';

interface CustomModalProps extends Omit<MantineModalProps, 'opened'> {
  isOpen: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, children, ...rest }) => {
  return (
    <Modal opened={isOpen} withCloseButton={false} {...rest}>
      {children}
    </Modal>
  );
};

export default CustomModal;
