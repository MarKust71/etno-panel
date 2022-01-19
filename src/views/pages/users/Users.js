import React, { useEffect, useState } from 'react'
import { useUsers } from '../../../hooks/useUsers'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CRow,
  CSpinner,
} from '@coreui/react'

export const Users = () => {
  const { getUsers, isLoading } = useUsers()

  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const data = await getUsers()
    if (data !== null)
      setUsers(
        data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
        })),
      )
  }

  const handleButtonClick = (id) => {
    // TODO: remove!
    console.log('id:', id)
  }

  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <CContainer>
        <CRow className="mb-4">
          <CCol>
            <CCardHeader className="d-flex flex-row align-items-center">
              <h4>Użytkownicy</h4>
              {isLoading && <CSpinner color="primary" size="sm" className="ms-3" />}
            </CCardHeader>
          </CCol>
        </CRow>

        <CRow className="mb-4 h-100" xs={{ cols: 'auto', gutter: 3 }}>
          {users.map((user) => (
            <React.Fragment key={`place-${user.id}`}>
              <CCol sm="auto">
                <CCard className="h-100">
                  <CCardBody style={{ maxWidth: '15em' }}>
                    <CCardTitle>{user.name ? user.name : '(brak)'}</CCardTitle>
                    <CCardText>{user.username}</CCardText>
                  </CCardBody>
                  <CCardFooter className="d-flex justify-content-end">
                    <CButton onClick={() => handleButtonClick(user.id)}>
                      {isLoading ? <CSpinner color="primary" size="sm" /> : 'Szczegóły'}
                    </CButton>
                  </CCardFooter>
                </CCard>
              </CCol>
            </React.Fragment>
          ))}
        </CRow>
      </CContainer>
    </>
  )
}
