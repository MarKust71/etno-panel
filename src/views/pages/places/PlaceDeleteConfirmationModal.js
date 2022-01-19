import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

import { func, bool } from 'prop-types'

export const PlaceDeleteConfirmationModal = ({ visible, onClose, confirm }) => {
  return (
    <CModal alignment="center" visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Usuwanie miejsca</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Czy masz pewność, że chcesz usunąć to miejsce? Operacja jest nieodwracalna.
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          onClick={() => {
            confirm(false)
            onClose()
          }}
        >
          Rezygnuję
        </CButton>
        <CButton
          color="danger"
          onClick={() => {
            confirm(true)
            onClose()
          }}
        >
          <span style={{ fontWeight: 'bold', color: 'white' }}>Potwierdzam usunięcie</span>
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

PlaceDeleteConfirmationModal.propTypes = {
  confirm: func.isRequired,
  onClose: func.isRequired,
  visible: bool,
}

PlaceDeleteConfirmationModal.defaultProps = {
  visible: false,
}
