import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { func, bool, number } from 'prop-types'
import { usePlaces } from '../../../hooks/usePlaces'
import CIcon from '@coreui/icons-react'
import { cilPencil } from '@coreui/icons'
import { PlaceDeleteConfirmationModal } from './PlaceDeleteConfirmationModal'

export const PlaceDetails = ({ onClose, visible, id }) => {
  const { getPlace, updatePlace, deletePlace, isLoading } = usePlaces()

  const [place, setPlace] = useState({})
  const [isError, setIsError] = useState(false)
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] = useState(false)

  const [editName, setEditName] = useState(false)
  const [name, setName] = useState('')
  const [prevName, setPrevName] = useState('')

  const [editDescription, setEditDescription] = useState(false)
  const [description, setDescription] = useState('')
  const [prevDescription, setPrevDescription] = useState('')

  const fetchPlace = async (id) => {
    const data = await getPlace(id)
    if (data !== null) setPlace(data)
  }

  const saveChanges = async () => {
    const payload = {
      ...place,
      name,
      description,
    }
    const response = await updatePlace(id, payload)
    if (response === null) {
      setIsError(true)
      setTimeout(() => setIsError(false), 5000)
    }
  }

  const handleChangeName = ({ target }) => {
    setName(target.value)
  }

  const handleChangeDescription = ({ target }) => {
    setDescription(target.value)
  }

  const handleDelete = async () => {
    setOpenDeleteConfirmationModal(true)
  }

  const handleCloseDeleteConfirmationModal = () => {
    setOpenDeleteConfirmationModal(false)
  }

  const confirmDelete = async (confirmed) => {
    if (confirmed) {
      const response = await deletePlace(id)
      if (response === null) {
        setIsError(true)
        setTimeout(() => setIsError(false), 5000)
      } else {
        onClose()
      }
    }
  }

  useEffect(() => {
    setName(place.name ?? '')
    setPrevName(place.name ?? '')

    setDescription(place.description ?? '')
    setPrevDescription(place.description ?? '')
  }, [place])

  useEffect(() => {
    fetchPlace(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <PlaceDeleteConfirmationModal
        onClose={handleCloseDeleteConfirmationModal}
        visible={openDeleteConfirmationModal}
        confirm={confirmDelete}
      />
      <CForm>
        <CModal size="xl" visible={visible} onClose={onClose}>
          <CModalHeader>
            <CModalTitle className="w-100">
              <CContainer>
                <CRow>
                  <CCol>
                    {editName && (
                      <>
                        <CFormInput
                          size="lg"
                          label="Nazwa"
                          placeholder="Podaj nazwę"
                          value={name}
                          onChange={handleChangeName}
                        />

                        <CButton
                          size="sm"
                          className="me-1"
                          onClick={() => {
                            setName(prevName)
                            setEditName(false)
                          }}
                          color="secondary"
                        >
                          Anuluj
                        </CButton>

                        <CButton
                          size="sm"
                          onClick={() => {
                            setPrevName(name)
                            setEditName(false)
                          }}
                        >
                          Zamknij
                        </CButton>
                      </>
                    )}

                    {!editName && (
                      <>
                        {name ? name : '(brak nazwy)'}
                        <CIcon
                          icon={cilPencil}
                          className="ms-3 text-black-50"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setEditName((prevState) => !prevState)}
                        />
                      </>
                    )}
                  </CCol>
                </CRow>
              </CContainer>
            </CModalTitle>
          </CModalHeader>

          <CModalBody>
            <CContainer>
              <CRow>
                <CCol xs={2}>
                  Opis:
                  {!editDescription && (
                    <CIcon
                      icon={cilPencil}
                      className="ms-3 text-black-50"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setEditDescription((prevState) => !prevState)}
                    />
                  )}
                </CCol>

                <CCol>
                  {!editDescription && <>{description ? description : '(brak opisu)'}</>}

                  {editDescription && (
                    <>
                      <CFormTextarea
                        rows="10"
                        size="lg"
                        label="Opis"
                        placeholder="Podaj opis"
                        value={description}
                        onChange={handleChangeDescription}
                        className="mb-1"
                      />

                      <CButton
                        size="sm"
                        className="me-1"
                        onClick={() => {
                          setDescription(prevDescription)
                          setEditDescription(false)
                        }}
                        color="secondary"
                      >
                        Anuluj
                      </CButton>

                      <CButton
                        size="sm"
                        onClick={() => {
                          setPrevDescription(description)
                          setEditDescription(false)
                        }}
                      >
                        Zamknij
                      </CButton>
                    </>
                  )}
                </CCol>
              </CRow>
            </CContainer>
          </CModalBody>

          <CModalFooter className="d-flex flex-row justify-content-between align-items-center">
            <CButton color="danger" onClick={() => handleDelete(place.id)} disabled={isError}>
              <span style={{ fontWeight: 'bold', color: 'white' }}>USUŃ</span>
            </CButton>

            <div className="d-flex flex-row justify-content-end align-items-center">
              {isError && (
                <span className="mx-3" style={{ color: 'red' }}>
                  Coś poszło nie tak...
                </span>
              )}

              <CButton onClick={saveChanges} disabled={isLoading || isError} className="ms-1">
                Zapisz zmiany
              </CButton>

              <CButton
                onClick={onClose}
                disabled={isLoading || isError}
                className="ms-1"
                color="secondary"
              >
                Anuluj
              </CButton>
            </div>
          </CModalFooter>
        </CModal>
      </CForm>
    </>
  )
}

PlaceDetails.propTypes = {
  id: number.isRequired,
  onClose: func.isRequired,
  visible: bool,
}

PlaceDetails.defaultProps = {
  visible: false,
}
