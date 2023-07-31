import { Modal, Group, Button, ModalProps } from '@mantine/core';
import { ReactNode } from 'react';

export default function CustomModal({ children,...rest}:ModalProps) {
  return (

    <Modal  withCloseButton={false} {...rest}>
        {children}
      </Modal>

  )
}
