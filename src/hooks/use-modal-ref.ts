import { FC, useRef } from 'react'
import { NiceModalHocProps, useModal } from '@ebay/nice-modal-react'

export const useModalRef = <T>(modalComponent: FC<T & NiceModalHocProps>) => {
  const modal = useModal(modalComponent)
  const modalRef = useRef(modal)
  modalRef.current = modal

  return {
    modal,
    modalRef,
  }
}
